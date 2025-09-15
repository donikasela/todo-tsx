import { FolderCode } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Todo-tsx. Built with Next.js, Typescript and shadcn/ui.
          </p>
        </div>
        <a
          href="https://github.com/donikasela/todo-tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-gray-900 transition-colors"
        >
          <FolderCode />
        </a>
      </div>
    </footer>
  );
}
