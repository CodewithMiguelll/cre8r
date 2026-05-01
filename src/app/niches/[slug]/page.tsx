import { notFound } from "next/navigation";

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">{niche.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{niche.description}</p>

        {/* Niche-specific content will go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content cards will be rendered here */}
        </div>
      </div>
    </div>
  );
}
