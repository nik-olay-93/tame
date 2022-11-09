import "./globals.css";

import { headers } from "next/headers";
import BottomMenu from "components/ui/AppFooter";
import ClientSessionProvider from "contexts/SessionProvider";
import { getSession } from "lib/session";

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
          <div className="overflow-y-scroll h-full pb-[150px]">{children}</div>
          <div className="fixed bottom-0 w-full">
            <BottomMenu />
          </div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
