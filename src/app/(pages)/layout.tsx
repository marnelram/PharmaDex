import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AppHeader from "@/components/appHeader";
import AppNav from "@/components/appNav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="bg-[url('/mountains.png')] bg-cover bg-center bg-fixed min-h-screen flex flex-col">
      <AppHeader session={session} />
      <main className="flex-grow w-full">{children}</main>
      <AppNav />
    </div>
  );
}
