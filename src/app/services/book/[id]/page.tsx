// src/app/services/book/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getServices, getRooms, getEquipment, bookService } from "@/lib/api";
import { Service, Room, Equipment } from "@/types/gymmaster";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function BookService({ params }: { params: { id: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [formData, setFormData] = useState({
    day: "",
    bookingstart: "",
    bookingend: "",
    roomid: "",
    equipmentid: "",
  });
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const services = await getServices();
      const foundService = services.find(
        (s) => s.serviceid === parseInt(params.id)
      );
      setService(foundService || null);
      if (foundService && token) {
        const roomsData = await getRooms(
          token,
          foundService.serviceid,
          "2025-05-01",
          "08:00:00",
          "09:00:00"
        );
        const equipmentData = await getEquipment(
          token,
          foundService.serviceid,
          "2025-05-01",
          "08:00:00",
          "09:00:00"
        );
        setRooms(roomsData);
        setEquipment(equipmentData);
      }
    };
    fetchData();
  }, [params.id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !service) return;
    try {
      await bookService({
        token,
        resourceid: 1, // Mock resourceid
        serviceid: service.serviceid,
        benefitid: service.benefitid,
        membershipid: service.membershipid,
        day: formData.day,
        bookingstart: formData.bookingstart,
        bookingend: formData.bookingend,
      });
      router.push("/bookings");
    } catch (err) {
      alert("Failed to book service");
    }
  };

  if (!service) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Book {service.servicename}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="day">Date</Label>
                <Input
                  id="day"
                  type="date"
                  value={formData.day}
                  onChange={(e) =>
                    setFormData({ ...formData, day: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="bookingstart">Start Time</Label>
                <Input
                  id="bookingstart"
                  type="time"
                  value={formData.bookingstart}
                  onChange={(e) =>
                    setFormData({ ...formData, bookingstart: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="bookingend">End Time</Label>
                <Input
                  id="bookingend"
                  type="time"
                  value={formData.bookingend}
                  onChange={(e) =>
                    setFormData({ ...formData, bookingend: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="roomid">Room</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, roomid: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="equipmentid">Equipment</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, equipmentid: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipment.map((equip) => (
                      <SelectItem key={equip.id} value={equip.id.toString()}>
                        {equip.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Book Service</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
