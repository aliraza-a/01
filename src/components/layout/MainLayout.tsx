// src/components/layout/MainLayout.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  BookOpen,
  Briefcase,
  CreditCard,
  DollarSign,
  Dumbbell,
  Ruler,
  MessageSquare,
  Upload,
  Building,
  Gift,
  ShoppingBag,
  Clipboard,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils"; // shadcn/ui utility for conditional classNames

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop collapse state
  const { token, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    {
      name: "Classes",
      href: "/classes",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Bookings",
      href: "/bookings",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Services",
      href: "/services",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "Memberships",
      href: "/memberships",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Charges",
      href: "/charges",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      name: "Workouts",
      href: "/workouts",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      name: "Measurements",
      href: "/measurements",
      icon: <Ruler className="h-5 w-5" />,
    },
    {
      name: "Feedback",
      href: "/feedback",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    { name: "Upload", href: "/upload", icon: <Upload className="h-5 w-5" /> },
    { name: "Clubs", href: "/clubs", icon: <Building className="h-5 w-5" /> },
    {
      name: "Promotions",
      href: "/promotions",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      name: "Products",
      href: "/products",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Questionnaires",
      href: "/questionnaires",
      icon: <Clipboard className="h-5 w-5" />,
    },
    ...(token
      ? [
          {
            name: "Profile",
            href: "/profile",
            icon: <User className="h-5 w-5" />,
          },
          {
            name: "Logout",
            href: "#",
            icon: <LogOut className="h-5 w-5" />,
            onClick: logout,
          },
        ]
      : [
          {
            name: "Login",
            href: "/login",
            icon: <LogIn className="h-5 w-5" />,
          },
          {
            name: "Sign Up",
            href: "/signup",
            icon: <UserPlus className="h-5 w-5" />,
          },
        ]),
  ];

  // Toggle sidebar collapse for desktop
  const toggleSidebarCollapse = () =>
    setIsSidebarCollapsed(!isSidebarCollapsed);

  // Toggle sidebar open for mobile
  const toggleSidebarOpen = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: isSidebarCollapsed ? 80 : 250 }}
        animate={{ width: isSidebarCollapsed ? 80 : 250 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "hidden md:block border-r bg-background fixed top-0 left-0 h-full z-40",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            {!isSidebarCollapsed && (
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-primary">
                  GymMaster
                </span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebarCollapse}
              aria-label="Toggle sidebar"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-2 rounded-md text-foreground hover:bg-accent hover:text-primary transition-colors",
                      isSidebarCollapsed ? "justify-center" : "justify-start",
                      pathname === item.href && "bg-accent text-primary"
                    )}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {!isSidebarCollapsed && (
                      <span className="ml-3">{item.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden bg-background"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-primary">
                    GymMaster
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebarOpen}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center p-2 rounded-md text-foreground hover:bg-accent hover:text-primary",
                          pathname === item.href && "bg-accent text-primary"
                        )}
                        onClick={() => {
                          toggleSidebarOpen();
                          if (item.onClick) item.onClick();
                        }}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <header className="md:hidden border-b p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">GymMaster</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebarOpen}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Content */}
        <main
          className={cn(
            "flex-1 p-4 sm:p-6 lg:p-8",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
