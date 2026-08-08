import { useSignIn } from "@clerk/react";
import { Button } from "./ui/button";

export const SignInOAuthButtons = () => {
  const { signIn } = useSignIn();

  if (!signIn) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.sso({
      strategy: "oauth_google",
      redirectCallbackUrl: "/sso-callback",
      redirectUrl: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className={"w-full text-white  h-11"}
    >
      Continue with Google
    </Button>
  );
};
