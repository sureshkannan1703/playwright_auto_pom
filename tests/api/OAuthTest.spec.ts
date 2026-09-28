import { test } from '@playwright/test';

import { Pkce } from '../../api/auth/Pkce';
import { ApiAuth } from '../../api/auth/ApiAuth';

test('generate OrangeHRM authorization URL', async () => {

  const codeVerifier =
    Pkce.generateCodeVerifier();

  const codeChallenge =
    Pkce.generateCodeChallenge(codeVerifier);

  const state = 'playwright-test';

  const authorizationUrl =
    ApiAuth.buildAuthorizationUrl(
      codeChallenge,
      state
    );

  console.log('Authorization URL:');
  console.log(authorizationUrl);

  console.log('Code Verifier:');
  console.log(codeVerifier);
});