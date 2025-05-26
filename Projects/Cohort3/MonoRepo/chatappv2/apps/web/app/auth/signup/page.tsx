"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { createUser } from "@/app/actions/user_actions";
import { redirect } from "next/navigation";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length < 3) {
      toast.error("Username cannot have less than 3 characters");
      return;
    }
    if (password.length < 8) {
      toast.error("Password cannot have less than 8 characters");
      return;
    }
    if (password !== verifyPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      username,
      password,
    };

    try {
      const res = await createUser(data);
      if (res.message === "Signed Up") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, Please refresh and retry");
      return;
    }
    redirect("/api/auth/signin");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="min-w-80 max-w-96 w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="grid w-full items-center gap-4 mb-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="JohnDoe123"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password1">Password</Label>
                <Input
                  type="password"
                  id="password1"
                  placeholder="Enter you password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password2">Verify Password</Label>
                <Input
                  id="password2"
                  placeholder="Enter you password again"
                  onChange={(e) => {
                    setVerifyPassword(e.target.value);
                  }}
                  value={verifyPassword}
                />
              </div>
            </div>
            <Button className="w-full cursor-pointer" type="submit">
              Sign Up
            </Button>
          </form>
          <p className="text-xs mt-3">
            Already have an account?{" "}
            <span
              className="underline underline-offset-1 cursor-pointer"
              onClick={() => redirect("/api/auth/signin")}
            >
              Sign in
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
