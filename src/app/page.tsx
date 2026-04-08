"use client";
import Masonry from "@/components/Masonry";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";

/*
------------------FONT CONFIGURATION------------------
Headings: Playfair Display Bold
Subheadings: Playfair Display Medium
Body: Sora
*/

const items = [
  {
    id: "1",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2",
    img: "https://picsum.photos/id/1011/600/750?grayscale",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://example.com/one",
    height: 400,
  },
];

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
          whileInView="visible"
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

      {/* ABOUT CRE8R */}
      <section className="mt-16 px-5 min-h-[70vh] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-6 w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-center leading-tight"
            variants={itemVariants}
          >
            What is Cre8r?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 w-full items-center"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center"
            >
              <p className="text-lg md:text-xl font-sora text-pretty text-center md:text-left leading-relaxed">
                Cre8r is a platform dedicated to showcasing the incredible
                talents of Nigerian creatives across the globe. From artists and
                designers to writers and innovators, we provide a space for
                creators to share their work, connect with like-minded
                individuals, and gain the recognition they deserve. Whether
                you're an artist looking to exhibit your work or an enthusiast
                seeking inspiration, Cre8r is your gateway to the vibrant world
                of Nigerian creativity.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center w-full h-full"
            >
              <Image
                src="/images/ari-he-MamWbmmaylY-unsplash.jpg"
                alt="Illustration representing Nigerian creativity"
                width={500}
                height={500}
                className="rounded-lg object-cover w-full h-auto max-w-sm md:max-w-md lg:max-w-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED SECTION */}
      <section className="mt-14 px-5 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-6 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-center leading-tight"
            variants={itemVariants}
          >
            Featured Artists
          </motion.h2>

          <motion.p
            className="text-md md:text-lg font-sora text-center"
            variants={itemVariants}
          >
            Beauty is subjective? Not on Cre8r. We feature the best of the best
            Nigerian creatives, showcasing their work and giving them the
            recognition they deserve. From painters and sculptors to
            photographers and digital artists, our featured section highlights
            the incredible talent that Nigeria has to offer.
          </motion.p>
        </motion.div>
      </section>

      {/* MASONRY GRID */}
      <section className="mt-8 px-5 flex items-center justify-center w-full">
        <div className="w-full">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="top"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </section>
    </>
  );
}
