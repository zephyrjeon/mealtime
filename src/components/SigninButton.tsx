'use client';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from './ui/button';

export const SigninButton = () => {
  const { data: session } = useSession();

  const handleSignIn = () => signIn();
  const handleSignOut = () => {
    signOut();
    redirect('/');
  };

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto items-center">
        <p className="text-sky-600">{session.user.name}</p>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn} variant="default">
      Sign In
    </Button>
  );
};
