import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import Hero from "@/components/Hero";

async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.emailAddresses[0].emailAddress);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <Hero userId={user?.id} />
  );
}

export default Home;
