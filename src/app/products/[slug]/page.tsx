import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found // AFTERCLASS",
    };
  }

  return {
    title: `${product.name} // AFTERCLASS Collection Zero`,
    description: product.description,
    openGraph: {
      title: `${product.name} — AFTERCLASS Streetwear`,
      description: product.tagline,
      images: [
        {
          url: product.colors[0]?.images.model || "/images/hero.jpg",
          width: 1000,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EB] text-[#171717]">
      <AnnouncementBar />
      <Navbar />
      <ProductDetailClient product={product} />
      <Footer />
    </div>
  );
}
