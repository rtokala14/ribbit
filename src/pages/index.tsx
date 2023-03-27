import { type NextPage } from "next";
import ThemeToggle from "~/components/ThemeToggle";

const Home: NextPage = () => {
  return (
    <>
      <main className="">
        <div>Ribbit</div>
        <ThemeToggle />
      </main>
    </>
  );
};

export default Home;
