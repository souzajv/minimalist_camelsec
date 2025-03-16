import type { Metadata } from "next";
import "../../app/globals.css";
import "./page.css";
import { Major_Mono_Display } from 'next/font/google';

const majorMonoDisplay = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});


export const metadata: Metadata = {
  title: "CamelSec",
  description: "Não seja um unicórnio, seja um camelo.",
  icons: {
    icon: "/images/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`variable ${majorMonoDisplay.variable}`}>
        {children}
      </body>
    </html>
  );
}
