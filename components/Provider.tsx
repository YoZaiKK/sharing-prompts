'use client';

import React from "react";

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
	children: React.ReactNode;
	session?: any;
}

export const Provider = ({ children, session }: ProviderProps) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};
