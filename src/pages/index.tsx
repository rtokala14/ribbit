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
        <Image alt="Ribbit logo" src={Logo} width={80} height={80} />
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
      <Link
        href={"/"}
        className="dropdown-right dropdown flex items-center gap-2 rounded-full p-2 hover:bg-base-200 lg:rounded-lg"
      >
        <div>
          <MoreHorizontal className=" h-8 w-8 " />
          <h3 className="hidden lg:block">Settings</h3>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-4 shadow"
        >
          <li>
            <div>
              <label className="label cursor-pointer">
                <span className="label-text">Dark Mode</span>
                <input type="checkbox" className="toggle" checked />
              </label>
            </div>
          </li>
        </ul>
      </Link>
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
  return <div>Timeline</div>;
}

export function RightSidebar() {
  return <div className="hidden lg:flex">Right Sidebar</div>;
}
