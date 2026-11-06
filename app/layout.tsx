import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Novaka — Graphic Designer & Video Editor",
    template: "%s — Novaka",
  },
  description:
    "Portofolio kreatif Novaka: desain grafis, thumbnail YouTube, carousel IG, poster, banner, dan video editing.",
  openGraph: {
    title: "Novaka — Graphic Designer & Video Editor",
    description:
      "Lihat karya-karya desain dan video editing Novaka di sini.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novaka — Graphic Designer & Video Editor",
    description: "Portofolio desain grafis & video editing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${poppins.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
