// src/app/promotions/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPromotions } from "@/lib/api";
import { Promotion } from "@/types/gymmaster";

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      const data = await getPromotions();
      setPromotions(data);
    };
    fetchPromotions();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Promotions</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promotion) => (
          <motion.div
            key={promotion.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{promotion.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Special offer available now!</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
