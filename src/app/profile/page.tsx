// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMemberProfile } from "@/lib/api";
import { Member } from "@/types/gymmaster";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Profile() {
  const [member, setMember] = useState<Member | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getMemberProfile("mock-token");
      setMember(data);
    };
    fetchProfile();
  }, []);

  if (!member) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      value={member.firstname}
                      onChange={(e) =>
                        setMember({ ...member, firstname: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="surname">Surname</Label>
                    <Input
                      id="surname"
                      value={member.surname}
                      onChange={(e) =>
                        setMember({ ...member, surname: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={member.email}
                      onChange={(e) =>
                        setMember({ ...member, email: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" onClick={() => setIsEditing(false)}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="ml-2"
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {member.firstname} {member.surname}
                  </p>
                  <p>
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {member.phonecell}
                  </p>
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
