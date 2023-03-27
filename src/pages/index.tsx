import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen justify-center gap-4">
      {/* Sidebar */}
      <Sidebar />
      <div className="min-h-screen w-full border-x border-neutral-content md:max-w-2xl lg:max-w-3xl">
        {/* Timeline */}
        <Timeline />
      </div>
      {/* Right Sidebar */}
      <RightSidebar />
    </main>
  );
};

export default Home;

export function Sidebar() {
  return <div className=" flex flex-col gap-2">Sidebar</div>;
}

export function Timeline() {
  return <div>Timeline</div>;
}

export function RightSidebar() {
  return <div className="hidden lg:flex">Right Sidebar</div>;
}
