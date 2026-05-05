"use client";
import Masonry from "@/components/Masonry";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  Users,
  Palette,
  Trophy,
  Eye,
} from "lucide-react";

/*
------------------FONT CONFIGURATION------------------
Headings: Playfair Display Bold
Subheadings: Playfair Display Medium
Body: Sora
*/

// Mock Data for Live Events
const liveExhibits = [
  {
    id: 1,
    title: "Lagos Photo Week",
    date: "Oct 12, 2026",
    location: "Victoria Island, Lagos",
    type: "Physical",
  },
  {
    id: 2,
    title: "The Writer's Block: Live Poetry",
    date: "Oct 15, 2026",
    location: "Zoom / Virtual",
    type: "Virtual",
  },
];

// Stats Data
const stats = [
  {
    id: 1,
    number: "500+",
    label: "Nigerian Creatives",
    icon: Users,
  },
  {
    id: 2,
    number: "2,500+",
    label: "Artworks Featured",
    icon: Palette,
  },
  {
    id: 3,
    number: "50+",
    label: "Active Exhibits",
    icon: Trophy,
  },
  {
    id: 4,
    number: "25K+",
    label: "Monthly Visitors",
    icon: Eye,
  },
];

// How It Works Data
const howItWorks = [
  {
    id: 1,
    step: "01",
    title: "Create Your Profile",
    description:
      "Sign up and build your creative profile showcasing your work, skills, and background.",
  },
  {
    id: 2,
    step: "02",
    title: "Submit Your Work",
    description:
      "Upload your artworks, projects, or creative pieces to be featured on our platform.",
  },
  {
    id: 3,
    step: "03",
    title: "Get Discovered",
    description:
      "Connect with fellow creatives, participate in exhibits, and gain recognition in the community.",
  },
];

const items = [
  {
    id: "1",
    img: "/images/adura-flames-touching.jpg",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2",
    img: "/images/adura-hair-chains.jpg",
    url: "https://example.com/two",
    height: 350,
  },
  {
    id: "3",
    img: "/images/adura-mother-nature.jpg",
    url: "https://x.com/AduraTheArtist",
    height: 600,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "5",
    img: "/images/rotr-book-cover-cinematic-variant-2.jpg",
    url: "https://www.wattpad.com/story/407399764?utm_source=android&utm_medium=link&utm_content=share_writing&wp_page=create&wp_uname=Chikaimaaa_",
    height: 800,
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
          className="flex flex-col items-center gap-6 max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h1
            className="text-5xl md:text-8xl font-playfair tracking-tight font-bold text-center leading-tight"
            variants={itemVariants}
          >
            The Home of <br />{" "}
            <span className="text-gray-400 font-playfair italic font-light">
              Nigerian
            </span>{" "}
            Creatives
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-sora text-center"
            variants={itemVariants}
          >
            Discover and connect with talented Nigerian artists, designers,
            writers, and creators showcasing their extraordinary work.
          </motion.p>

          <motion.div className="flex gap-4 mt-4" variants={itemVariants}>
            <button className="px-8 py-3 bg-black text-white border rounded-lg font-sora hover:opacity-75 transition">
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
            className="text-4xl md:text-7xl lg:text-7xl font-playfair font-bold text-center leading-tight"
            variants={itemVariants}
          >
            What is Cre8r?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt- w-full items-center"
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

      {/* STATS SECTION */}
      <section className="mt-20 px-5 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  className="flex flex-col items-center text-center"
                  variants={itemVariants}
                >
                  <div className="p-4 bg-black text-white rounded-full mb-4">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-sora text-sm md:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="mt-20 px-5 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-6 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-playfair font-bold text-center leading-tight"
            variants={itemVariants}
          >
            Featured Creators
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

      {/* EXHIBITS SECTION */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="uppercase text-sm font-sora tracking-widest text-gray-400">
                Live & Upcoming
              </span>
              <h2 className="text-4xl font-playfair font-bold mt-2">
                Active Exhibits
              </h2>
            </div>
            <button className="text-black font-sora flex items-center gap-2 group">
              View Calendar{" "}
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveExhibits.map((event) => (
              <div
                key={event.id}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-black transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                    <Calendar size={24} />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-sora">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-4 text-gray-500 font-sora text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {event.location}
                  </span>
                  <span>•</span>
                  <span>{event.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-playfair font-bold mb-6"
              variants={itemVariants}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl font-sora text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Join the vibrant community of Nigerian creatives in three simple
              steps
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {howItWorks.map((step) => (
              <motion.div
                key={step.id}
                className="text-center group"
                variants={itemVariants}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-playfair font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  {step.id < howItWorks.length && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-sora leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-20 px-5 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-playfair font-bold mb-6"
              variants={itemVariants}
            >
              Stay Connected
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl font-sora text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Get the latest updates on new exhibits, featured creators, and
              creative opportunities delivered to your inbox.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              variants={itemVariants}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-black font-sora focus:outline-none focus:ring-2 focus:ring-slate-600 bg-white"
              />
              <button className="px-8 py-3 bg-white text-black rounded-lg font-sora font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mt-20 px-5 py-20 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-8 max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2
            className="text-4xl md:text-7xl font-playfair font-bold leading-tight"
            variants={itemVariants}
          >
            Ready to Showcase Your Talent?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-sora text-gray-600 max-w-2xl leading-relaxed"
            variants={itemVariants}
          >
            Join thousands of Nigerian creatives who are already making their
            mark. Whether you're an artist, designer, writer, or innovator,
            Cre8r is your platform to shine and connect with a global audience.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6"
            variants={itemVariants}
          >
            <button className="px-10 py-4 bg-black text-white rounded-lg font-sora font-semibold text-lg hover:bg-gray-800 transition-colors">
              Join as Creator
            </button>
            <button className="px-10 py-4 border-2 border-black text-black rounded-lg font-sora font-semibold text-lg hover:bg-black hover:text-white transition-colors">
              Explore Gallery
            </button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
