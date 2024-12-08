import { auth } from "@/auth";
import AppHeader from "@/components/appHeader";
import AppNav from "@/components/appNav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <AppHeader session={session} />
      <main className="w-full h-[calc(100dvh-8rem)]">{children}</main>
      <AppNav />
    </>
  );
}
