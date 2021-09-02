const authConfig: any = {
  Auth: {
    region: process.env.VUE_APP_AWS_REGION,
    userPoolId: process.env.VUE_APP_AWS_USERPOOLID,
    userPoolWebClientId: process.env.VUE_APP_AWS_WEBCLIENTID,
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};

export default authConfig;
