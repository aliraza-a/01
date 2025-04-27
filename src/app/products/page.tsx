// src/app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProducts, purchaseProduct } from "@/lib/api";
import { Product } from "@/types/gymmaster";
import { useAuth } from "@/lib/auth-context";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handlePurchase = async (productid: number) => {
    if (!token) return;
    try {
      await purchaseProduct(token, [
        { productid, quantity: quantities[productid] || 1 },
      ]);
      alert("Product purchased");
      setQuantities({ ...quantities, [productid]: 0 });
    } catch (err) {
      alert("Failed to purchase product");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shop Products</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <motion.div
            key={product.productid}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4"
                />
                <p>
                  <strong>Type:</strong> {product.producttype}
                </p>
                <p>
                  <strong>Price:</strong> {product.price}
                </p>
                <div className="mt-4">
                  <Label htmlFor={`quantity-${product.productid}`}>
                    Quantity
                  </Label>
                  <Input
                    id={`quantity-${product.productid}`}
                    type="number"
                    min="1"
                    value={quantities[product.productid] || 1}
                    onChange={(e) =>
                      setQuantities({
                        ...quantities,
                        [product.productid]: parseInt(e.target.value),
                      })
                    }
                    className="w-20"
                  />
                </div>
                <Button
                  className="mt-4"
                  onClick={() => handlePurchase(product.productid)}
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
