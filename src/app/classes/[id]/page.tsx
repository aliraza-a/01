// src/app/classes/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getClassSchedule } from "@/lib/api";
import { ClassSchedule } from "@/types/gymmaster";
import { useRouter } from "next/navigation";

export default function ClassDetail({ params }: { params: { id: string } }) {
  const [classItem, setClassItem] = useState<ClassSchedule | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClass = async () => {
      const today = new Date().toISOString().split("T")[0];
      const classes = await getClassSchedule(today);
      const foundClass = classes.find((c) => c.id === parseInt(params.id));
      setClassItem(foundClass || null);
    };
    fetchClass();
  }, [params.id]);

  const handleBook = async () => {
    // Mock booking logic
    alert("Class booked! (Mock action)");
    router.push("/bookings");
  };

  if (!classItem) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{classItem.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{classItem.description}</p>
            <p className="mt-2">
              <strong>Date:</strong> {classItem.arrival}
            </p>
            <p>
              <strong>Time:</strong> {classItem.starttime} - {classItem.endtime}
            </p>
            <p>
              <strong>Location:</strong> {classItem.location}
            </p>
            <p>
              <strong>Spaces Available:</strong> {classItem.spacesfree}/
              {classItem.max_students}
            </p>
            <Button className="mt-4" onClick={handleBook}>
              Book Class
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
