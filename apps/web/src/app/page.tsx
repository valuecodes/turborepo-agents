import { Button } from "@turborepo-agents/ui/components/button";
import { Slider } from "@turborepo-agents/ui/components/slider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <Slider defaultValue={[50]} max={100} className="w-full my-8" />
        <Button variant={"destructive"} size="lg">
          Get Started
        </Button>
        <Button variant={"outline"} size="lg">
          Get Started
        </Button>
      </main>
    </div>
  );
}
