// src/app/classes/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getClassSchedule } from "@/lib/api";
import { ClassSchedule } from "@/types/gymmaster";
import Link from "next/link";

export default function Classes() {
  const [classes, setClasses] = useState<ClassSchedule[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const today = new Date().toISOString().split("T")[0];
      const data = await getClassSchedule(today);
      setClasses(data);
    };
    fetchClasses();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Class Schedule</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{classItem.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {classItem.description}
                </p>
                <p className="mt-2 text-sm">
                  <strong>Date:</strong> {classItem.arrival}
                </p>
                <p className="text-sm">
                  <strong>Time:</strong> {classItem.starttime} -{" "}
                  {classItem.endtime}
                </p>
                <p className="text-sm">
                  <strong>Location:</strong> {classItem.location}
                </p>
                <p className="text-sm">
                  <strong>Spaces Available:</strong> {classItem.spacesfree}/
                  {classItem.max_students}
                </p>
                <Button className="mt-4" asChild>
                  <Link href={`/classes/${classItem.id}`}>Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
