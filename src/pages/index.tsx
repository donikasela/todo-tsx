import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { TodoForm } from "@/components/TodoForm";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="p-8">
      <TodoForm />
    </main>
  );
}
