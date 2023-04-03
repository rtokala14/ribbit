import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

function CreateTweetBox({ isPage }: { isPage?: boolean }) {
  const { data: sessionData, status } = useSession();

  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const ctx = api.useContext();
  const { mutateAsync: createTweet } = api.tweets.createTweet.useMutation({
    onSuccess: () => {
      // Invalidate the getAll query
      void ctx.tweets.getAll.invalidate();
      if (isPage) {
        void router.push("/");
      }
      void ctx.tweets.getPostsByUserId.invalidate({
        userId: sessionData?.user.id ?? "",
      });
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
  return (
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
  );
}

export default CreateTweetBox;
