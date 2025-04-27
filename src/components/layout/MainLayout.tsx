// src/components/layout/MainLayout.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: "Bookings", href: "/bookings" },
    { name: "Services", href: "/services" },
    { name: "Memberships", href: "/memberships" },
    { name: "Charges", href: "/charges" },
    { name: "Workouts", href: "/workouts" },
    { name: "Measurements", href: "/measurements" },
    { name: "Feedback", href: "/feedback" },
    { name: "Upload", href: "/upload" },
    { name: "Clubs", href: "/clubs" },
    { name: "Promotions", href: "/promotions" },
    { name: "Products", href: "/products" },
    { name: "Questionnaires", href: "/questionnaires" },
    ...(token
      ? [
          { name: "Profile", href: "/profile" },
          { name: "Logout", href: "#", onClick: logout },
        ]
      : [
          { name: "Login", href: "/login" },
          { name: "Sign Up", href: "/signup" },
        ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">
                  GymMaster
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
                  onClick={item.onClick}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          className="sm:hidden overflow-hidden"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-primary"
                onClick={() => {
                  setIsOpen(false);
                  if (item.onClick) item.onClick();
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
