"use client"


/*
------------------FONT CONFIGURATION------------------
Headings: Playfair Display Bold
Subheadings: Playfair Display Medium
Body: Sora
*/


export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="mt-16 px-5 flex flex-col items-center gap-8">
        <h1 className="text-4xl md:text-6xl font-playfair text-center">
          The Home of Nigerian Creatives
        </h1>
        <p className="text-lg font-sora text-center">
          Discover and connect with talented Nigerian artists, designers,
          writers, and creators.
        </p>
      </section>
    </>
  );
}
