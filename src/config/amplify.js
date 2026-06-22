import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_Bs9QIKrgF",
      userPoolClientId: "99rntj53o5murvdrqiaaisvqr",
      region: "us-east-2",
    },
  },
});