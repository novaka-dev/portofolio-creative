import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Novaka — Graphic Designer & Video Editor",
  description:
    "Portofolio kreatif Novaka: desain grafis, thumbnail YouTube, carousel IG, poster, banner, dan video editing.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Contact />
    </main>
  );
}
