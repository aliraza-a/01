// src/app/services/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/api";
import { Service } from "@/types/gymmaster";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.serviceid}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{service.servicename}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Price:</strong> {service.price}
                  </p>
                  <p className="text-sm">
                    <strong>Status:</strong> {service.status}
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href={`/services/book/${service.serviceid}`}>
                      Book Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
