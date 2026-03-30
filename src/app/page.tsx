"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/*
------------------FONT CONFIGURATION------------------
Headings: Playfair Display Bold
Subheadings: Playfair Display Medium
Body: Sora
*/

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="mt-16 px-5 min-h-[70vh] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-6 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-center leading-tight"
            variants={itemVariants}
          >
            The Home of Nigerian Creatives
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-sora text-center"
            variants={itemVariants}
          >
            Discover and connect with talented Nigerian artists, designers,
            writers, and creators showcasing their extraordinary work.
          </motion.p>

          <motion.div className="flex gap-4 mt-4" variants={itemVariants}>
            <button className="px-8 py-3 border rounded-lg font-sora hover:opacity-75 transition">
              Explore
            </button>
            <button className="px-8 py-3 border rounded-lg font-sora hover:opacity-75 transition">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
