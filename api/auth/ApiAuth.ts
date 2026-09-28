import {APIRequestContext,Page} from '@playwright/test';

import crypto from 'crypto';
import { env } from '../../config/env';
import { Pkce } from './Pkce';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../test-data/users';

export class ApiAuth {

  static async getAccessToken(
    request: APIRequestContext,
    page: Page
  ): Promise<string> {

    // 1. Generate PKCE
    const codeVerifier =
      Pkce.generateCodeVerifier();

    const codeChallenge =
      Pkce.generateCodeChallenge(codeVerifier);

    // 2. Generate state
    const state = crypto.randomUUID();

    // 3. Build authorization URL
    const authorizationUrl =
      ApiAuth.buildAuthorizationUrl(
        codeChallenge,
        state
      );

    // 4. Get authorization code
    const authorizationCode =
      await ApiAuth.getAuthorizationCode(
        page,
        authorizationUrl,
        state
      );

    // 5. Exchange authorization code for access token
    return await ApiAuth.exchangeCodeForToken(
      request,
      authorizationCode,
      codeVerifier
    );
  }


static buildAuthorizationUrl(
  codeChallenge: string,
  state: string
): string {

  const url = new URL(
    `${env.apiBaseUrl}/web/index.php/oauth2/authorize`
  );

  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', env.apiClientId);
  url.searchParams.set('redirect_uri', env.apiRedirectUri);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('state', state);

  return url.toString();
}


  static async getAuthorizationCode(
    page: Page,
    authorizationUrl: string,
    state: string
  ): Promise<string> {

    const authorizationCodePromise =
      new Promise<string>((resolve, reject) => {

        page.on('request', request => {

          try {

            const url =
              new URL(request.url());

            const redirectUrl =
              new URL(env.apiRedirectUri);

            if (
              url.origin === redirectUrl.origin &&
              url.pathname === redirectUrl.pathname
            ) {

              const code =
                url.searchParams.get('code');

              const returnedState =
                url.searchParams.get('state');

              if (!code) {
                reject(
                  new Error(
                    'Authorization code was not returned'
                  )
                );

                return;
              }

              if (returnedState !== state) {
                reject(
                  new Error(
                    'OAuth state validation failed'
                  )
                );

                return;
              }

              resolve(code);
            }

          } catch {
            // Ignore unrelated requests
          }
        });
      });


    // Open authorization page
    await page.goto(authorizationUrl);


    // Login if required
    const loginPage =
      new LoginPage(page);

    if (
      await loginPage.usernameField.isVisible()
    ) {

      await loginPage.login(
        users.validUser.username,
        users.validUser.password
      );
    }


    // Allow OAuth access
    const allowButton =
      page.getByRole('button', {
        name: /Allow Access/i
      });

    if (
      await allowButton.isVisible()
    ) {
      await allowButton.click();
    }


    // Return authorization code
    return await authorizationCodePromise;
  }

static async exchangeCodeForToken(
  request: APIRequestContext,
  code: string,
  codeVerifier: string
): Promise<string> {

  const response = await request.post(
    `${env.apiBaseUrl}/web/index.php/oauth2/token`,
    {
      form: {
        grant_type: 'authorization_code',
        code,
        client_id: env.apiClientId,
        redirect_uri: env.apiRedirectUri,
        code_verifier: codeVerifier
      }
    }
  );

  if (!response.ok()) {
    throw new Error(
      `Token request failed. Status: ${response.status()}`
    );
  }

  const body = await response.json();

  return body.access_token;
}
}