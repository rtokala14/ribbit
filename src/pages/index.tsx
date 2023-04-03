import { type GetServerSideProps, type NextPage } from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { api } from "~/utils/api";
import Tweet from "~/components/Tweet";
import BaseLayout from "~/components/BaseLayout";
import { getServerAuthSession } from "~/server/auth";
import CreateTweetBox from "~/components/CreateTweet";

dayjs.extend(relativeTime);

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <Timeline />
    </BaseLayout>
  );
};

export default Home;

export function Timeline() {
  const { data: tweetsData, isLoading: isPostLoading } =
    api.tweets.getAll.useQuery();
  return (
    <div>
      <h2 className=" border-b border-neutral-content p-4 text-2xl font-semibold">
        Home
      </h2>
      {/* Create Tweet box */}
      <CreateTweetBox />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};
