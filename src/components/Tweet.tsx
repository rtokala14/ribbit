import dayjs from "dayjs";
import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
dayjs.extend(relativeTime);

type Tweet = RouterOutputs["tweets"]["getAll"][0];
export default function Tweet({ tweet }: { tweet: Tweet }) {
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
