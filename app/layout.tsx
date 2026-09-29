import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shilujas.dev"),
  title: "Shilu Jas | Full-Stack Developer & MERN Specialist",
  description:
    "Portfolio of Shilu Jas, Full-Stack Developer specializing in MERN Stack, React.js, Next.js, Node.js, and scalable RESTful API architectures. Building digital experiences that actually work.",
  keywords: [
    "Shilu Jas",
    "Full-Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Software Engineer",
    "Kozhikode Developer",
    "Kerala Developer",
    "Eventura",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Shilu Jas" }],
  creator: "Shilu Jas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shilujas.dev",
    title: "Shilu Jas | Full-Stack Developer & MERN Specialist",
    description:
      "Building digital experiences that actually work. Explore production projects, architecture case studies, and live demos.",
    siteName: "Shilu Jas Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shilu Jas - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shilu Jas | Full-Stack Developer",
    description: "Building digital experiences that actually work.",
    creator: "@shilujas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shilu Jas",
    jobTitle: "Full-Stack Developer",
    url: "https://shilujas.dev",
    sameAs: [
      "https://github.com/shilujas",
      "https://linkedin.com/in/shilujas",
    ],
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "TypeScript",
      "JavaScript",
      "Full-Stack Web Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kozhikode",
      addressRegion: "Kerala",
      addressCountry: "India",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio_theme");if(t==="light"){document.documentElement.classList.add("light");document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");document.documentElement.classList.remove("light");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-primaryText antialiased selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
