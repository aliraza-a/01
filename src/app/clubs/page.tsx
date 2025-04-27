// src/app/clubs/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClubs } from "@/lib/api";
import { Club } from "@/types/gymmaster";

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await getClubs();
      setClubs(data);
    };
    fetchClubs();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Our Clubs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Billing Provider:</strong> {club.billingprovider}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
