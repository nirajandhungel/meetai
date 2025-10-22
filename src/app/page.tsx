"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = async () => {
    const user = await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (err) => {
          console.error(err);
        },
        onSuccess: (data) => {
          console.log("Sign up success:", data);
        },
      }
    );
  };

  const onLogin = async () => {
    const user = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (err) => {
          console.error(err);
        },
        onSuccess: (data) => {
          console.log("Sign up success:", data);
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col gap-y-4 p-4">
        <p>Logged in as {session.user.email}</p>
        <Button
          onClick={() => {
            authClient.signOut();
          }}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        <Button
          onClick={() => {
            onSubmit();
          }}
        >
          Create User
        </Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        <Button
          onClick={() => {
            onLogin();
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Page;
