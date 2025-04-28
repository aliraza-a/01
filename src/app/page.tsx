"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-purple-900 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4 text-white">Hi, I’m Ali</h1>
        <p className="text-xl mb-6 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <Link href="/projects">
          <Button variant="default" size="lg">
            Explore My Work
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
