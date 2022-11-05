import "./globals.css";

import { headers } from "next/headers";

import { getSession } from "../lib/session";
import ClientSessionProvider from "../contexts/SessionProvider";

export default async function RootLayout({
  children,
  props,
}: {
  children: React.ReactNode;
  props?: any;
}) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <head />
      <body>
        <ClientSessionProvider session={session}>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}

