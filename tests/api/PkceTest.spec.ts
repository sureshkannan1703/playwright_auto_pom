import { test, expect } from '@playwright/test';
import { Pkce } from '../../api/auth/Pkce';

test('generate PKCE verifier and challenge', async () => {

  const codeVerifier = Pkce.generateCodeVerifier();

  const codeChallenge =
    Pkce.generateCodeChallenge(codeVerifier);

  expect(codeVerifier).toBeTruthy();
  expect(codeChallenge).toBeTruthy();

  expect(codeVerifier).not.toBe(codeChallenge);

});