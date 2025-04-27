// src/app/workouts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/types/gymmaster";
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (token) {
        const data = await getWorkouts(token);
        setWorkouts(data);
      }
    };
    fetchWorkouts();
  }, [token]);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Workouts</h1>
        <div className="grid gap-6">
          {workouts.map((workout) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Date:</strong> {workout.workdate}
                  </p>
                  <p>
                    <strong>Type:</strong> {workout.type}
                  </p>
                  <p>
                    <strong>Notes:</strong> {workout.notes}
                  </p>
                  <h4 className="mt-4 font-semibold">Exercises</h4>
                  <ul className="list-disc pl-5">
                    {workout.values.map((exercise) => (
                      <li key={exercise.id}>
                        {exercise.name} - {exercise.sets} sets of{" "}
                        {exercise.reps} reps
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
