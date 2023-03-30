import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import BaseLayout from "~/components/BaseLayout";
import { api } from "~/utils/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { tweetRouter } from "~/server/api/routers/tweets";
import superjson from "superjson";
import { prisma } from "~/server/db";
import Tweet from "~/components/Tweet";

const UserProfile: NextPage<{ userId: string }> = ({ userId }) => {
  const { data: postsData, isLoading } = api.tweets.getPostsByUserId.useQuery({
    userId: userId,
  });

  return (
    <BaseLayout>
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
      ) : (
        <>
          <div className="relative h-36 bg-neutral">
            <Image
              src={
                postsData?.uRes?.image ??
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dnffAwADNQGPiCXt9AAAAABJRU5ErkJggg=="
              }
              alt={`Profile picture of ${postsData?.uRes?.name ?? ""}`}
              className="absolute -bottom-16 left-8 rounded-full border-2 border-black"
              width={128}
              height={128}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dnffAwADNQGPiCXt9AAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="h-16"></div>
          <div className=" flex flex-col border-b border-neutral-content p-2 pl-8">
            <h2 className=" text-xl font-bold">
              {postsData?.uRes?.displayName}
            </h2>
            <p className="font-light">{`@${postsData?.uRes?.name ?? ""}`}</p>
          </div>
          <div className="flex flex-col">
            {postsData?.res.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </>
      )}
    </BaseLayout>
  );
};

export default UserProfile;

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: tweetRouter,
    ctx: { prisma, session: null },
    transformer: superjson,
  });

  const userId = context.params?.id as string;

  await ssg.getPostsByUserId.prefetch({ userId: userId });

  return {
    props: {
      dehydratedState: ssg.dehydrate(),
      userId: userId,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
