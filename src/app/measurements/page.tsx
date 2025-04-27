// src/app/measurements/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMeasurements, addMeasurement } from "@/lib/api";
import { Measurement } from "@/types/gymmaster";
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Measurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [formData, setFormData] = useState({
    measured_on: "",
    value: "",
    measurementtypeid: 1,
  });
  const { token } = useAuth();

  useEffect(() => {
    const fetchMeasurements = async () => {
      if (token) {
        const data = await getMeasurements(token);
        setMeasurements(data);
      }
    };
    fetchMeasurements();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await addMeasurement(token, formData.measured_on, [
        {
          measurementtypeid: formData.measurementtypeid,
          value: parseFloat(formData.value),
        },
      ]);
      alert("Measurement added");
      setFormData({ measured_on: "", value: "", measurementtypeid: 1 });
      const data = await getMeasurements(token);
      setMeasurements(data);
    } catch (err) {
      alert("Failed to add measurement");
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Measurements</h1>
        <Card>
          <CardHeader>
            <CardTitle>Add Measurement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="measured_on">Date</Label>
                <Input
                  id="measured_on"
                  type="date"
                  value={formData.measured_on}
                  onChange={(e) =>
                    setFormData({ ...formData, measured_on: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value (kg)</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.1"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit">Add Measurement</Button>
            </form>
          </CardContent>
        </Card>
        <div className="grid gap-6">
          {measurements.map((measurement) => (
            <motion.div
              key={measurement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    Measurement on {measurement.measured_on}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {measurement.values.map((value, index) => (
                    <p key={index}>
                      <strong>{value.name}:</strong> {value.value} {value.unit}
                    </p>
                  ))}
                  {measurement.photos.length > 0 && (
                    <div className="mt-4">
                      <strong>Photos:</strong>
                      <div className="flex gap-2">
                        {measurement.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt="Measurement photo"
                            className="w-20 h-20 object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
