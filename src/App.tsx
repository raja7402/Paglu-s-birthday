import { useState } from "react";
import { Background } from "@/components/Background";
import { Splash } from "@/components/Splash";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stories } from "@/components/Stories";
import { Memories } from "@/components/Memories";
import { Lens } from "@/components/Lens";
import { Decrees } from "@/components/Decrees";
import { Chat } from "@/components/Chat";
import { Cake } from "@/components/Cake";
import { Footer } from "@/components/Footer";
import { Dock } from "@/components/Dock";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Background />
      <Splash onOpen={() => setOpened(true)} />
      <main>
        <Hero started={opened} />
        <Marquee />
        <Stories />
        <Memories />
        <Marquee reverse />
        <Lens />
        <Decrees />
        <Chat />
        <Cake />
      </main>
      <Footer />
      <Dock visible={opened} />
    </div>
  );
}
