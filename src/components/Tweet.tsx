import dayjs from "dayjs";
import Image from "next/image";
import { api, type RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  MoreHorizontal,
  Repeat,
  MessageSquare,
  Heart,
  Bookmark,
  Share,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/router";
dayjs.extend(relativeTime);

type Tweet = RouterOutputs["tweets"]["getAll"][0];
export default function Tweet({ tweet }: { tweet: Tweet }) {
  const { data: sessionData } = useSession();
  const ctx = api.useContext();
  // const [likes, setLikes] = useState(tweet.likes.length);

  const { mutateAsync: deleteMutation } = api.tweets.deleteTweet.useMutation({
    onSuccess: async () => {
      await ctx.tweets.getAll.invalidate();
      await ctx.tweets.getPostsByUserId.invalidate({
        userId: sessionData?.user.id ?? "",
      });
    },
  });

  const { mutateAsync: likeTweetMutation } = api.likes.likeTweet.useMutation({
    onSuccess: async () => {
      await ctx.tweets.getAll.invalidate();
      await ctx.tweets.getPostsByUserId.invalidate({
        userId: tweet.author.id,
      });
      await ctx.tweets.getPostByTweetId.invalidate({
        tweetId: tweet.id,
      });
    },
  });

  const { mutateAsync: unlikeTweetMutation } =
    api.likes.unlikeTweet.useMutation({
      onSuccess: async () => {
        await ctx.tweets.getAll.invalidate();
        await ctx.tweets.getPostsByUserId.invalidate({
          userId: tweet.author.id,
        });
        await ctx.tweets.getPostByTweetId.invalidate({
          tweetId: tweet.id,
        });
      },
    });

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
            <h3 className="text-base font-semibold">
              {tweet.author.displayName}
            </h3>
            <Link href={`/u/${tweet.author.id}`}>
              <span className="text-xs font-light underline-offset-1 hover:underline">
                @{tweet.author.name}
              </span>
            </Link>
            <span className="text-xs font-extralight">
              {dayjs(tweet.createdAt).fromNow()}
            </span>
          </div>
          <div className="dropdown-bottom dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-sm btn rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-40 bg-base-300 p-2 shadow"
            >
              <li>
                <a>To be filled</a>
              </li>
              {sessionData?.user.id === tweet.author.id && (
                <li>
                  <button
                    onClick={() => void deleteMutation({ id: tweet.id })}
                    className=" btn normal-case text-red-400"
                  >
                    Delete Tweet
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Link href={`/p/${tweet.id}`} className="">
          <p className="text-base">{tweet.content}</p>
        </Link>
        <div className=" flex w-full grow items-center justify-evenly py-1 px-2">
          <div className="flex items-center gap-2 hover:cursor-pointer hover:text-orange-400">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs font-extralight">{"10"}</span>
          </div>
          <div className="flex items-center gap-2 hover:cursor-pointer hover:text-green-400">
            <Repeat className="h-5 w-5" />
            <span className="text-xs font-extralight">{"10"}</span>
          </div>
          <div
            onClick={() => {
              if (
                tweet.likes.filter((l) => l.userId === sessionData?.user.id)
                  .length == 1
              )
                void unlikeTweetMutation({
                  tweetId: tweet.id,
                });
              else if (
                tweet.likes.filter((l) => l.userId === sessionData?.user.id)
                  .length == 0
              )
                void likeTweetMutation({
                  tweetId: tweet.id,
                });
            }}
            className={`flex items-center gap-2 hover:cursor-pointer ${
              tweet.likes.filter((l) => l.userId === sessionData?.user.id)
                .length == 1
                ? "text-red-400"
                : "hover:text-red-400"
            }`}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs font-extralight">
              {tweet.likes.length}
            </span>
          </div>
          <div className="flex items-center gap-2 hover:cursor-pointer hover:text-blue-400">
            <Bookmark className="h-5 w-5" />
            <span className="text-xs font-extralight">{"10"}</span>
          </div>
          <div className="flex items-center gap-2 hover:cursor-pointer hover:text-purple-400">
            <Share className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
