import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Home from "./Home";

export default async function Page() {
  const session = await getIronSession(
    await cookies(),
    sessionOptions
  );

  if (!session.user?.id) {
    redirect("/login");
  }

  return <Home />;
}