"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type FC } from "react";

const FormSchema = z.object({
  username: z.string().min(3).max(20),
  displayName: z.string().min(3).max(24),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const NewUser: FC = () => {
  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: sessionData?.user?.name || "",
      displayName: "",
    },
  });

  const router = useRouter();

  const { mutateAsync: updateProfile } = api.users.updateFirstTime.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });

  // const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
  //   const res = await updateProfile({
  //     username: data.username,
  //     displayName: data.displayName,
  //     id: sessionData?.user.id ?? "",
  //   });

  //   await router.push("/");

  //   console.log(res);
  // };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-neutral">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-neutral-content">{`Hey ${
          sessionData?.user.name ?? "There"
        }`}</h1>
        <p className=" text-neutral-content">{"Let's get you set up."}</p>
      </div>
      <form
        className=" form-control w-full max-w-md gap-2 rounded-lg border border-neutral-focus p-4"
        onSubmit={() =>
          handleSubmit(async (data) => {
            console.log(data);
            const res = await updateProfile({
              username: data.username,
              displayName: data.displayName,
              id: sessionData?.user.id ?? "",
            });

            await router.push("/");

            console.log(res);
          })
        }
      >
        <label className="label">
          <span className="label-text text-neutral-content">Username</span>
          <input
            className="input-bordered input"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-error">{errors.username.message}</p>
          )}
        </label>
        <label className="label">
          <span className="label-text text-neutral-content">Display Name</span>
          <input
            className="input-bordered input"
            type="text"
            {...register("displayName")}
          />
          {errors.displayName && (
            <p className="text-error">{errors.displayName.message}</p>
          )}
        </label>
        <button className="btn-secondary btn mt-4 " type="submit">
          Continue
        </button>
      </form>
    </main>
  );
};

export default NewUser;
