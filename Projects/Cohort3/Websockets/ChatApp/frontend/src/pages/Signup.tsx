import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupMutation } from "@/store/services/authApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  const user: { userId: string; username: string } = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    if (user.userId) {
      navigate("/chats");
    }
  });

  const [signup] = useSignupMutation();

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
      const res = await signup(data);
      if (res.error) {
        const errMsg =
          (res.error as { data?: { message?: string } })?.data?.message ||
          "An error occurred";
        toast.error(errMsg);
        return;
      }
      toast.success(res.data.message);
      localStorage.setItem(
        "user",
        JSON.stringify({ userId: res.data.userId, username })
      );
      navigate("/chats");
      return;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, Please refresh and retry");
      return;
    }
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
              className="text-primary hover:cursor-pointer"
              onClick={() => navigate("/signin")}
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
