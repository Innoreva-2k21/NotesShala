import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "NoteShaala — NIT Jamshedpur Notes & PYQ Sharing",
    template: "%s | NoteShaala",
  },
  description:
    "NoteShaala is NIT Jamshedpur's student-run platform to share branch-wise notes, lecture summaries, and previous year question papers (PYQs) — free and open for every student.",
  keywords: [
    "NoteShaala",
    "NIT Jamshedpur",
    "notes sharing",
    "PYQ",
    "previous year question papers",
    "engineering study material",
  ],
  authors: [{ name: "Team Innoreva — NIT Jamshedpur" }],
  openGraph: {
    title: "NoteShaala — NIT Jamshedpur Notes & PYQ Sharing",
    description:
      "Share and access branch-wise notes and previous year question papers across NIT Jamshedpur.",
    type: "website",
    siteName: "NoteShaala",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#fbfbfa] text-[#191919] dark:bg-[#121212] dark:text-[#ececec] min-h-screen w-full overflow-x-hidden antialiased selection:bg-neutral-200 selection:text-neutral-900 dark:selection:bg-neutral-800 dark:selection:text-neutral-100 transition-colors duration-200`}>
        <ChakraProvider>
          <NavBar />
          <main className="w-full">{children}</main>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
