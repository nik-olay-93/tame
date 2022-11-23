import "./globals.css";

import { headers } from "next/headers";
import BottomMenu from "components/ui/AppFooter";
import ClientSessionProvider from "contexts/SessionProvider";
import { getSession } from "lib/session";
import { getServerSession } from "lib/serverSession";
import SignIn from "components/profile/SignIn";

async function getUser() {
  const data = await getServerSession();
  if (!data?.body?.user) {
    return null;
  }

  const user = data.body.user;

  if (!user.email) {
    return null;
  }

  return user;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionPromise = getSession(headers().get("cookie") ?? "");
  const userPromise = getUser();
  const session = await sessionPromise;
  const user = await userPromise;

  return (
    <html lang="en">
      <head />
      <body>
        <ClientSessionProvider session={session}>
          {user ? (
            <>
              <div className="overflow-y-scroll h-full pb-[150px]">
                {children}
              </div>
              <div className="fixed bottom-0 w-full">
                <BottomMenu />
              </div>
            </>
          ) : (
            <div className="h-full flex flex-row items-center justify-around">
              <SignIn />
            </div>
          )}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
