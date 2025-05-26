import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function SignIn({
  searchParams,
}: {
  searchParams: { error?: string; callbackUrl?: string };
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(searchParams.callbackUrl || "/");
  }

  const csrfResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/csrf`,
    {
      headers: {
        cookie: (await cookies()).toString(),
      },
    }
  );
  const { csrfToken } = await csrfResponse.json();

  const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid username or password.",
    Default: "An error occurred. Please try again.",
  };

  const searchParamsResolved = await searchParams;

  const errorMessage = searchParamsResolved.error
    ? errorMessages[searchParamsResolved.error] || errorMessages.Default
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="min-w-80 max-w-96 w-96">
        {errorMessage ? (
          <Alert className="border-red-500/20 w-fit m-auto rounded-lg">
            <AlertDescription className="text-red-500 font-extraboldlight w-fit">
              {errorMessage}
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
        <CardHeader>
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="post" action="/api/auth/callback/credentials">
            <Input name="csrfToken" type="hidden" value={csrfToken} />
            <div className="grid w-full items-center gap-4 mb-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                />
              </div>
            </div>
            <Button className="w-full cursor-pointer" type="submit">
              Sign In
            </Button>
          </form>
          <p className="text-xs mt-3">
            Dont have an account?{" "}
            <Link
              href={"/auth/signup"}
              className="underline underline-offset-1 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;
