import "./globals.css";

import { headers } from "next/headers";

import { getSession } from "../lib/session";
import ClientSessionProvider from "../contexts/SessionProvider";
import AppFooter from "../components/ui/AppFooter";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <head />
      <body>
        <ClientSessionProvider session={session}>
          <div className="overflow-y-scroll h-full">{children}</div>
          <div className="fixed bottom-0 w-full">
            <AppFooter />
          </div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}

