import { notFound } from "next/navigation";
import { NichePageClient } from "./_components";

// Define your niches here
const NICHES = {
  writing: {
    title: "Writing",
    description: "Share and discover written content",
    slug: "writing",
  },
  photography: {
    title: "Photography",
    description: "Visual storytelling through images",
    slug: "photography",
  },
  music: {
    title: "Music",
    description: "Create and share original music",
    slug: "music",
  },
  art: {
    title: "Art",
    description: "Digital and traditional artwork",
    slug: "art",
  },
  design: {
    title: "Design",
    description: "Design and creative direction",
    slug: "design",
  },
};

export async function generateStaticParams() {
  return Object.values(NICHES).map((niche) => ({
    slug: niche.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const niche = NICHES[slug as keyof typeof NICHES];

  if (!niche) return {};

  return {
    title: niche.title,
    description: niche.description,
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const niche = NICHES[slug as keyof typeof NICHES];

  if (!niche) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-3">{niche.title}</h1>
          <p className="text-xl text-gray-600">{niche.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <NichePageClient niche={niche.slug} />
      </div>
    </div>
  );
}
