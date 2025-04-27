// src/app/bookings/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";

// Mock data for bookings
const mockUpcomingBookings = [
  {
    id: 1,
    name: "Yoga Flow",
    day: "2025-05-01",
    starttime: "08:00:00",
    endtime: "09:00:00",
    location: "Studio A",
  },
];

const mockPastBookings = [
  {
    id: 2,
    name: "Spin Class",
    day: "2025-04-20",
    starttime: "07:00:00",
    endtime: "08:00:00",
    location: "Studio B",
    attended: true,
  },
];

export default function Bookings() {
  const [upcomingBookings] = useState(mockUpcomingBookings);
  const [pastBookings] = useState(mockPastBookings);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="grid gap-6">
              {upcomingBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{booking.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>Date:</strong> {booking.day}
                      </p>
                      <p>
                        <strong>Time:</strong> {booking.starttime} -{" "}
                        {booking.endtime}
                      </p>
                      <p>
                        <strong>Location:</strong> {booking.location}
                      </p>
                      <Button className="mt-4" variant="destructive">
                        Cancel Booking
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="grid gap-6">
              {pastBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{booking.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>Date:</strong> {booking.day}
                      </p>
                      <p>
                        <strong>Time:</strong> {booking.starttime} -{" "}
                        {booking.endtime}
                      </p>
                      <p>
                        <strong>Location:</strong> {booking.location}
                      </p>
                      <p>
                        <strong>Attended:</strong>{" "}
                        {booking.attended ? "Yes" : "No"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
