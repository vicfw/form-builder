"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between w-full px-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg
              width="76"
              height="32"
              viewBox="0 0 76 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.8487 17.1361V16.7508H28.8487V17.1361C28.8487 24.3493 23.0012 30.1968 15.7879 30.1968C8.57464 30.1968 2.72714 24.3493 2.72714 17.1361L2.72714 16.7508H7.72714V17.1361C7.72714 21.5879 11.3361 25.1968 15.7879 25.1968C20.2397 25.1968 23.8487 21.5879 23.8487 17.1361Z"
                fill="#3955D1"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.096 9.91077H2.54126V4.91077H18.096V9.91077Z"
                fill="#3955D1"
              />
              <path
                d="M23.2387 7.41076C23.2387 5.69317 24.6311 4.30078 26.3486 4.30078C28.0662 4.30078 29.4586 5.69317 29.4586 7.41076C29.4586 9.12835 28.0662 10.5207 26.3486 10.5207C24.6311 10.5207 23.2387 9.12835 23.2387 7.41076Z"
                fill="#3955D1"
              />
            </svg>
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-9 bg-muted border-input focus:border-primary focus:ring-ring rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground hover:bg-muted"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-muted border border-input flex items-center justify-center">
              <User className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
