"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  User,
  MessageSquare,
  Copy,
  DollarSign,
  Package,
} from "lucide-react";

const navItems = [
  {
    name: "Home",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    name: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    name: "Messages",
    icon: MessageSquare,
    href: "/messages",
  },
  {
    name: "Documents",
    icon: Copy,
    href: "/documents",
  },
  {
    name: "Billing",
    icon: DollarSign,
    href: "/billing",
  },
  {
    name: "Products",
    icon: Package,
    href: "/products",
  },
];

export default function LeftNav() {
  const pathname = usePathname();

  return (
    <nav className="w-[56px] h-full border-r bg-background">
      <div className="flex flex-col items-center py-4 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
              title={item.name}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
