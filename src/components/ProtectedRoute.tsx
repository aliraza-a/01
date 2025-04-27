// src/components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  requiresAuth = true,
}: {
  children: React.ReactNode;
  requiresAuth?: boolean;
}) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requiresAuth && !token) {
      router.push("/login");
    } else if (!requiresAuth && token) {
      router.push("/");
    }
  }, [token, router, requiresAuth]);

  if (requiresAuth && !token) return null;
  if (!requiresAuth && token) return null;

  return <>{children}</>;
}
