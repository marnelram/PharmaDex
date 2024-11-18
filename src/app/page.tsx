import Home from "@/components/home";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  console.log(session);
  return <Home />;
}
