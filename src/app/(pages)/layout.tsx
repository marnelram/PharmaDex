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
    <div className="bg-[url('/pokemon-background.png')] bg-cover bg-center bg-fixed min-h-screen flex flex-col">
      <AppHeader session={session} />
      <main className="flex-grow w-full">{children}</main>
      <AppNav />
    </div>
  );
}
