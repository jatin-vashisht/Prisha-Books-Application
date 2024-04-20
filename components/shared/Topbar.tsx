import {
  currentUser,
  SignedIn,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

async function Topbar() {
  const user = await currentUser();
  return (
    <nav className="topbar bg-white">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </Link>

      <div className="lg:gap-12 gap-6 hidden md:flex">
        <Link href="/" className="nav-link group relative overflow-hidden">
          Home
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </Link>
        <Link href="/favorites" className="nav-link group relative overflow-hidden">
          Favorites
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Image
          src={user?.imageUrl}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="block">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                  className=""
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
