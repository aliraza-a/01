// src/app/memberships/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getMemberships,
  cancelMembership,
  suspendMembership,
  getMembershipAgreement,
} from "@/lib/api";
import { Membership, Agreement } from "@/types/gymmaster";
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Memberships() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [cancelForm, setCancelForm] = useState({ enddate: "", reason: "" });
  const [suspendForm, setSuspendForm] = useState({
    startdate: "",
    enddate: "",
    reason: "",
  });
  const [openDialog, setOpenDialog] = useState<
    "cancel" | "suspend" | "agreement" | null
  >(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchMemberships = async () => {
      if (token) {
        const data = await getMemberships(token);
        setMemberships(data);
      }
    };
    fetchMemberships();
  }, [token]);

  const handleCancel = async (membershipId: number) => {
    if (!token) return;
    try {
      await cancelMembership(
        token,
        membershipId,
        cancelForm.enddate,
        parseInt(cancelForm.reason)
      );
      alert("Membership cancelled");
      setOpenDialog(null);
    } catch (err) {
      alert("Failed to cancel membership");
    }
  };

  const handleSuspend = async () => {
    if (!token) return;
    try {
      await suspendMembership(
        token,
        suspendForm.startdate,
        suspendForm.enddate,
        suspendForm.reason
      );
      alert("Membership suspended");
      setOpenDialog(null);
    } catch (err) {
      alert("Failed to suspend membership");
    }
  };

  const viewAgreement = async (membershiptypeid: number) => {
    if (!token) return;
    try {
      const data = await getMembershipAgreement(token, membershiptypeid);
      setAgreements(data);
      setOpenDialog("agreement");
    } catch (err) {
      alert("Failed to load agreement");
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Memberships</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memberships.map((membership) => (
            <motion.div
              key={membership.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{membership.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {membership.description}
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Price:</strong> {membership.price} (
                    {membership.pricedescription})
                  </p>
                  {membership.promotional_price && (
                    <p className="text-sm text-primary">
                      <strong>Promo Price:</strong>{" "}
                      {membership.promotional_price} for{" "}
                      {membership.promotional_period}
                    </p>
                  )}
                  <div className="mt-4 space-y-2">
                    <Button onClick={() => viewAgreement(membership.id)}>
                      View Agreement
                    </Button>
                    <Dialog
                      open={openDialog === "cancel"}
                      onOpenChange={(open) =>
                        setOpenDialog(open ? "cancel" : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive">Cancel Membership</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Membership</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleCancel(membership.id);
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="enddate">End Date</Label>
                            <Input
                              id="enddate"
                              type="date"
                              value={cancelForm.enddate}
                              onChange={(e) =>
                                setCancelForm({
                                  ...cancelForm,
                                  enddate: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="reason">Reason ID</Label>
                            <Input
                              id="reason"
                              value={cancelForm.reason}
                              onChange={(e) =>
                                setCancelForm({
                                  ...cancelForm,
                                  reason: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <Button type="submit">Confirm Cancellation</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={openDialog === "suspend"}
                      onOpenChange={(open) =>
                        setOpenDialog(open ? "suspend" : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline">Suspend Membership</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Suspend Membership</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSuspend();
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="startdate">Start Date</Label>
                            <Input
                              id="startdate"
                              type="date"
                              value={suspendForm.startdate}
                              onChange={(e) =>
                                setSuspendForm({
                                  ...suspendForm,
                                  startdate: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="enddate">End Date</Label>
                            <Input
                              id="enddate"
                              type="date"
                              value={suspendForm.enddate}
                              onChange={(e) =>
                                setSuspendForm({
                                  ...suspendForm,
                                  enddate: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="reason">Reason</Label>
                            <Input
                              id="reason"
                              value={suspendForm.reason}
                              onChange={(e) =>
                                setSuspendForm({
                                  ...suspendForm,
                                  reason: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <Button type="submit">Confirm Suspension</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Dialog
          open={openDialog === "agreement"}
          onOpenChange={(open) => setOpenDialog(open ? "agreement" : null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Membership Agreement</DialogTitle>
            </DialogHeader>
            {agreements.map((agreement) => (
              <div key={agreement.id}>
                <h3 className="text-lg font-semibold">{agreement.name}</h3>
                <div dangerouslySetInnerHTML={{ __html: agreement.body }} />
                <ul className="list-disc pl-5">
                  {agreement.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
