"use client";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="text-lg mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Necessitatibus, labore. Voluptates doloribus quae officia quaerat
          possimus natus officiis facilis adipisci iure pariatur molestias ad,
          aut aspernatur blanditiis culpa accusamus! In sapiente suscipit
          asperiores quas ex perspiciatis.
        </p>
        <p className="text-lg">
          Skills: React, Next.js, TypeScript, Tailwind CSS, and a knack for
          making interfaces.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutPage;
