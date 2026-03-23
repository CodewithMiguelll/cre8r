const Navigation = () => {
  const links = [
    { name: "Explore", href: "/" },
    { name: "About", href: "/about" },
    { name: "Profile", href: "/profile" },
  ];
  const niches = [
    { name: "Writers", href: "/writers" },
    { name: "Visual Art", href: "/visual-art" },
    { name: "Design", href: "/design" },
    { name: "Music", href: "/music" },
    { name: "Video", href: "/video" },
  ];

  return (
    <nav className="p-5 max-w-xl mx-auto py-4 flex items-center justify-between">
      <div className="nav-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.name}
          </a>
        ))}
      </div>
      <div className="flex gap-3 ">
        {niches.map((niche) => (
          <a key={niche.href} href={niche.href}>
            {niche.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
