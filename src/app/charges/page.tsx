// src/app/charges/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOutstandingCharges, payCharges, logPayment } from "@/lib/api";
import { MemberCharge } from "@/types/gymmaster";
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Charges() {
  const [charges, setCharges] = useState<MemberCharge[]>([]);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    note: "",
    paymentmethod_name: "",
  });
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchCharges = async () => {
      if (token) {
        try {
          const data = await getOutstandingCharges(token);
          setCharges(data);
        } catch (err) {
          setError("Failed to load charges");
        }
      }
    };
    fetchCharges();
  }, [token]);

  const handlePay = async (postingid: number) => {
    if (!token) {
      setError("Please log in to pay charges");
      return;
    }
    try {
      await payCharges(token, [postingid]);
      alert("Charge paid successfully");
      setCharges(charges.filter((charge) => charge.postingid !== postingid));
      setError("");
    } catch (err) {
      setError("Failed to pay charge");
    }
  };

  const handleLogPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Please log in to log payments");
      return;
    }
    try {
      await logPayment(
        token,
        paymentForm.amount,
        paymentForm.note,
        paymentForm.paymentmethod_name
      );
      alert("Payment logged successfully");
      setPaymentForm({ amount: "", note: "", paymentmethod_name: "" });
      setError("");
    } catch (err) {
      setError("Failed to log payment");
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Outstanding Charges</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid gap-6">
          {charges.map((charge) => (
            <motion.div
              key={charge.postingid}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Charge ID: {charge.postingid}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Date:</strong> {charge.occurred}
                  </p>
                  <p className="text-sm">
                    <strong>Note:</strong> {charge.note}
                  </p>
                  <p className="text-sm">
                    <strong>Amount:</strong> {charge.total}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => handlePay(charge.postingid)}
                  >
                    Pay Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Log External Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogPayment} className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={paymentForm.amount}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, amount: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="note">Note</Label>
                <Input
                  id="note"
                  value={paymentForm.note}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, note: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="paymentmethod_name">Payment Method</Label>
                <Input
                  id="paymentmethod_name"
                  value={paymentForm.paymentmethod_name}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      paymentmethod_name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <Button type="submit">Log Payment</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
