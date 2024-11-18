import { auth } from "@/auth";
import { Header } from "@/components/header";
import Home from "@/components/home";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <Header session={session} />
      <Home />
    </div>
  );
}
