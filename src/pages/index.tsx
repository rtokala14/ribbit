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
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Logo from "../../public/Logo.webp";
import ThemeToggle from "~/components/ThemeToggle";
import { type RouterOutputs, api } from "~/utils/api";

dayjs.extend(relativeTime);

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen w-full justify-center gap-4">
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
            className="dropdown-content menu rounded-box z-20 w-52 overflow-hidden bg-base-100 p-2 shadow"
          >
            <li>
              <button
                onClick={() => void signOut()}
                className=" btn capitalize text-red-400"
              >{`Logout @${sessionData?.user.name ?? ""}`}</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function Timeline() {
  const { data: sessionData, status } = useSession();

  const [inputText, setInputText] = useState("");

  const ctx = api.useContext();
  const { mutateAsync: createTweet } = api.tweets.createTweet.useMutation({
    onSuccess: () => {
      // Invalidate the getAll query
      void ctx.tweets.getAll.invalidate();
    },
    onError: (err) => {
      const errorMsg = err.data?.zodError?.fieldErrors.content;
      if (errorMsg && errorMsg[0]) {
        <div className="toast-start toast">
          <div className="alert alert-info">
            <div>
              <span>{errorMsg[0]}</span>
            </div>
          </div>
        </div>;
      } else {
        <div className="toast-start toast">
          <div className="alert alert-error">
            <div>
              <span>{"Something went wrong. Please try again later."}</span>
            </div>
          </div>
        </div>;
      }
    },
  });

  const { data: tweetsData, isLoading: isPostLoading } =
    api.tweets.getAll.useQuery();
  return (
    <div>
      <h2 className=" border-b border-neutral-content p-4 text-2xl font-semibold">
        Home
      </h2>
      {/* Create Tweet box */}
      <div className="border-b border-b-neutral-content">
        {status === "authenticated" && (
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
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  wrap="soft"
                  className="textarea w-full grow resize-none text-base outline-none focus:outline-none"
                />
                <div className="divider m-0 px-2"></div>
                <button
                  onClick={() => {
                    void createTweet({ text: inputText });
                    setInputText("");
                  }}
                  className="btn-accent btn-sm btn self-end rounded-md text-base capitalize dark:btn-primary"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
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
      {isPostLoading ? (
        <div className="mt-4 flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {tweetsData?.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  );
}

type Tweet = RouterOutputs["tweets"]["getAll"][0];
function Tweet({ tweet }: { tweet: Tweet }) {
  return (
    <div className="flex w-full items-center border-b border-b-neutral-content">
      <div className=" flex flex-col items-center self-start p-2">
        <div className="avatar -z-50">
          <div className=" w-10 rounded-full">
            <Image
              alt={`${tweet.author.name ?? ""}'s profile picture`}
              src={
                tweet.author.image ??
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dnffAwADNQGPiCXt9AAAAABJRU5ErkJggg=="
              }
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div className="flex grow flex-col py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h3 className="text-base font-semibold">{tweet.author.name}</h3>
            <span className="text-xs font-light">@{tweet.author.name}</span>
            <span className="text-xs font-extralight">
              {dayjs(tweet.createdAt).fromNow()}
            </span>
          </div>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn-ghost btn-sm btn rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-40 bg-base-100 p-2 shadow"
            >
              <li>
                <a>To be filled</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <p className="text-base">{tweet.content}</p>
        </div>
      </div>
    </div>
  );
}

export function RightSidebar() {
  return <div className="hidden xl:flex">Right Sidebar</div>;
}
