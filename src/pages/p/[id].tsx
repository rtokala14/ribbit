import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { type GetStaticProps, type NextPage } from "next";
import BaseLayout from "~/components/BaseLayout";
import { tweetRouter } from "~/server/api/routers/tweets";
import { api } from "~/utils/api";
import { prisma } from "~/server/db";
import superjson from "superjson";
import Tweet from "~/components/Tweet";

const TweetView: NextPage<{ postId: string }> = ({ postId }) => {
  const { data: postData, isLoading } = api.tweets.getPostByTweetId.useQuery({
    tweetId: postId,
  });
  return (
    <BaseLayout>
      <div className=" border-b border-neutral-content p-4 text-2xl font-semibold">
        Tweet
      </div>
      {isLoading ? (
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
      ) : postData ? (
        <Tweet tweet={postData} />
      ) : (
        <></>
      )}
    </BaseLayout>
  );
};

export default TweetView;

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: tweetRouter,
    ctx: { prisma, session: null },
    transformer: superjson,
  });

  const postId = context.params?.id as string;

  await ssg.getPostByTweetId.prefetch({ tweetId: postId });

  return {
    props: {
      dehydratedState: ssg.dehydrate(),
      postId: postId,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
