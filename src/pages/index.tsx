import { type NextPage } from "next";
import Image from "next/image";
import {
  Home as HomeIcon,
  Search,
  Bell,
  Bookmark,
  User,
  PlusCircle,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

import Logo from "../../public/Logo.webp";
import ThemeToggle from "~/components/ThemeToggle";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen justify-center gap-4">
      {/* Sidebar */}
      <Sidebar />
      <div className="min-h-screen w-full border-x border-neutral-content md:max-w-2xl lg:max-w-3xl">
        {/* Timeline */}
        <Timeline />
      </div>
      {/* Right Sidebar */}
      <RightSidebar />
    </main>
  );
};

export default Home;

export function Sidebar() {
  return (
    <div className=" flex flex-col items-center gap-4 lg:items-start">
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
        href={"/"}
        className="flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <User className=" h-8 w-8" />
        <h3 className="hidden lg:block">Profile</h3>
      </Link>
      <div className="dropdown-right dropdown hover:cursor-pointer">
        <div
          tabIndex={0}
          className=" flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
        >
          <MoreHorizontal className=" h-8 w-8 " />
          <h3 className="hidden lg:block">Settings</h3>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
      <Link
        href={"/"}
        className="flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <PlusCircle className=" h-8 w-8" />
        <h3 className="hidden lg:block">Create New</h3>
      </Link>
    </div>
  );
}

export function Timeline() {
  const { data: sessionData, status } = useSession();
  return (
    <div>
      <h2 className=" border-b border-neutral-content p-4 text-2xl font-semibold">
        Home
      </h2>
      {/* Create Tweet box */}
      <div className="border-b border-b-neutral-content">
        <div className="flex w-full items-center ">
          <div className="flex h-full grow flex-col self-start p-2">
            <div className="avatar">
              <div className=" w-12 rounded-full">
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
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex grow flex-col gap-2 p-2">
              <textarea
                placeholder="What's happening?"
                rows={3}
                wrap="soft"
                className="textarea w-full grow resize-none text-base outline-none focus:outline-none"
              />
              <div className="divider m-0 px-2"></div>
              <button className="btn-accent btn-sm btn self-end rounded-md text-base capitalize dark:btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
        {status === "unauthenticated" && (
          <div className="flex w-full items-center justify-center gap-4 p-4">
            <button
              onClick={() => void signIn()}
              className="btn-accent btn dark:btn-primary"
            >
              Login
            </button>
            <span>To create a new post</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function RightSidebar() {
  return <div className="hidden lg:flex">Right Sidebar</div>;
}
