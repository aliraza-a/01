// src/app/feedback/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendFeedback } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Feedback() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [messageSent, setMessageSent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendFeedback(formData.email, formData.message);
      setMessageSent("Feedback sent successfully");
      setFormData({ email: "", message: "" });
    } catch (err) {
      setMessageSent("Failed to send feedback");
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Send Feedback</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>We Love Your Input</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                {messageSent && (
                  <p
                    className={
                      messageSent.includes("successfully")
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {messageSent}
                  </p>
                )}
                <Button type="submit">Send Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
