// src/app/layout.tsx
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

export const metadata = {
  title: "GymMaster Member Portal",
  description: "Manage your gym membership and bookings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
