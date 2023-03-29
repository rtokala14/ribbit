import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState, type FC } from "react";

const NewUser: FC = () => {
  const { data: sessionData } = useSession();

  const [username, setUsername] = useState(sessionData?.user.name ?? "");
  const [displayName, setDisplayName] = useState("");

  const router = useRouter();

  const { mutateAsync: updateProfile } = api.users.updateFirstTime.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfile({
      username,
      displayName,
      id: sessionData?.user.id ?? "",
    });
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-neutral">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-neutral-content">{`Hey ${"There!"}`}</h1>
        <p className=" text-neutral-content">{"Let's get you set up."}</p>
      </div>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className=" form-control w-full max-w-md gap-2 rounded-lg border border-neutral-focus p-4"
      >
        <label className="label">
          <span className="label-text text-neutral-content">Username</span>
          <input
            className="input-bordered input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="label">
          <span className="label-text text-neutral-content">Display Name</span>
          <input
            className="input-bordered input"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <button className="btn-secondary btn mt-4 " type="submit">
          Continue
        </button>
      </form>
    </main>
  );
};

export default NewUser;
