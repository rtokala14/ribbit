import BaseLayout from "~/components/BaseLayout";
import CreateTweetBox from "~/components/CreateTweet";

function CreateTweetPage() {
  return (
    <BaseLayout>
      <div className=" border-b border-neutral-content p-4 text-2xl font-semibold">
        Create Tweet
      </div>
      <CreateTweetBox isPage={true} />
    </BaseLayout>
  );
}

export default CreateTweetPage;
