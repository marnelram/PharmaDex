import { auth } from "@/auth";
import { Header } from "@/components/header";
import Nav from "@/components/Nav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main className="w-full h-[calc(100dvh-8rem)]">{children}</main>
      <Nav />
    </>
  );
}
