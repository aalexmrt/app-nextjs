export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "http://localhost:1337/api", // or AUTH0_AUDIENCE
      // Add the `offline_access` scope to also get a Refresh Token
      scope: "openid profile email read:products", // or AUTH0_SCOPE
    },
  }),
});
