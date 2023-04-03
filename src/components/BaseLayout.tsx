import {
  Bell,
  Bookmark,
  Home as HomeIcon,
  MoreHorizontal,
  PlusCircle,
  Search,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "../../public/Logo.webp";

const BaseLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen w-full justify-center gap-4">
      <Sidebar />
      <div className="min-h-screen w-full border-x border-neutral-content md:max-w-2xl lg:max-w-3xl">
        {props.children}
      </div>
      <RightSidebar />
    </main>
  );
};

export default BaseLayout;

export function Sidebar() {
  const { data: sessionData, status } = useSession();

  return (
    <div className="sticky top-0 flex max-h-screen flex-col items-center gap-4 lg:items-start">
      <Link href={"/"}>
        <Image
          alt="Ribbit logo"
          priority={true}
          src={Logo}
          width={80}
          height={80}
        />
      </Link>
      <Link
        href={"/"}
        className="flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <HomeIcon className=" h-8 w-8" />
        <h3 className="hidden lg:block">Home</h3>
      </Link>
      <Link
        href={"/"}
        className="flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <Search className=" h-8 w-8" />
        <h3 className="hidden lg:block">Explore</h3>
      </Link>
      <Link
        href={"/"}
        className="flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <Bell className=" h-8 w-8" />
        <h3 className="hidden lg:block">Notifications</h3>
      </Link>
      <Link
        href={"/"}
        className="flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <Bookmark className=" h-8 w-8" />
        <h3 className="hidden lg:block">Bookmarks</h3>
      </Link>
      <Link
        href={`/u/${sessionData?.user.id ?? ""}`}
        className="flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <User className=" h-8 w-8" />
        <h3 className="hidden lg:block">Profile</h3>
      </Link>
      <div className="dropdown dropdown-right hover:cursor-pointer">
        <div
          tabIndex={0}
          className=" flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
        >
          <MoreHorizontal className=" h-8 w-8 " />
          <h3 className="hidden lg:block">Settings</h3>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-300 p-2 shadow"
        >
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
      <Link
        href={"/create"}
        className="flex items-center gap-2 rounded-full bg-accent p-2 hover:bg-base-200 dark:bg-primary dark:text-base-100 lg:rounded-lg"
      >
        <PlusCircle className=" h-8 w-8 " />
        <h3 className="hidden lg:block">Create New</h3>
      </Link>
      {status === "authenticated" && (
        <div className="dropdown dropdown-top avatar mt-auto mb-4">
          <div tabIndex={0} className=" w-12 rounded-full hover:cursor-pointer">
            <Image
              src={
                sessionData?.user.image ??
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dnffAwADNQGPiCXt9AAAAABJRU5ErkJggg=="
              }
              width={24}
              height={24}
              draggable={false}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dnffAwADNQGPiCXt9AAAAABJRU5ErkJggg=="
              alt={`${sessionData?.user.name ?? ""}'s profile picture`}
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-20 w-52 overflow-hidden bg-base-300 p-2 shadow"
          >
            <li>
              <button
                onClick={() => void signOut()}
                className=" btn normal-case text-red-400"
              >{`Logout @${sessionData?.user.name ?? ""}`}</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function RightSidebar() {
  return <div className="hidden xl:flex">Right Sidebar</div>;
}
