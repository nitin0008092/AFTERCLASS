export interface ProductColor {
  name: string;
  hex: string;
  images: {
    model: string;
    flat: string;
    detail?: string;
  };
}

export interface ProductConcept {
  id: string;
  slug: string;
  name: string;
  conceptNumber: string;
  tagline: string;
  description: string;
  launchPrice: number; // 699 target launch price
  mrp: number; // 1499 MRP
  colors: ProductColor[];
  sizes: ("S" | "M" | "L" | "XL" | "XXL")[];
  fit: string;
  ipStatus: string;
  developmentStatus: string;
  flaggedForIpReview: boolean;
  featured: boolean;
}

export const PRODUCTS: ProductConcept[] = [
  {
    id: "01",
    slug: "on-a-diet-coke",
    name: "ON A DIET (COKE)",
    conceptNumber: "CONCEPT 01 // WITTY / GRAPHIC",
    tagline: "Subversive caffeine culture. High-impact monochrome chest strike.",
    description:
      "A witty, minimalist commentary on late-night creative sessions and caffeine-fueled routines. Engineered on an oversized streetwear silhouette with dropped shoulders and reinforced collar piping.",
    launchPrice: 699,
    mrp: 1499,
    fit: "Oversized Streetwear Silhouette / Drop Shoulder",
    colors: [
      {
        name: "Washed Black",
        hex: "#171717",
        images: {
          model: "/images/diet_coke_black_model.jpg",
          flat: "/images/diet_coke_black_hanger.jpg",
        },
      },
      {
        name: "Off-White",
        hex: "#F5F2EB",
        images: {
          model: "/images/diet_coke_white_model.jpg",
          flat: "/images/diet_coke_white_hanger.jpg",
        },
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    ipStatus: "Original typographic parody concept. Flagged for internal IP & trademark review prior to commercial release.",
    developmentStatus: "Concept in prototyping stage. Fabric trials and sample wash tests currently underway.",
    flaggedForIpReview: true,
    featured: true,
  },
  {
    id: "02",
    slug: "wasted",
    name: "WASTED",
    conceptNumber: "CONCEPT 02 // POP-ART / IRONY",
    tagline: "Raw pop-art iconography meeting post-midnight street culture.",
    description:
      "Explores youth burnout, weekend after-hours, and intentional creative chaos. Features high-contrast screenprint artwork inspired by contemporary indie zines.",
    launchPrice: 699,
    mrp: 1499,
    fit: "Relaxed Boxy Cut / Drop Shoulder",
    colors: [
      {
        name: "Washed Black",
        hex: "#171717",
        images: {
          model: "/images/wasted_black_model.jpg",
          flat: "/images/wasted_black_hanger.jpg",
          detail: "/images/wasted_black_print_closeup.jpg",
        },
      },
      {
        name: "Off-White",
        hex: "#F5F2EB",
        images: {
          model: "/images/wasted_white_model.jpg",
          flat: "/images/wasted_white_hanger.jpg",
          detail: "/images/wasted_white_print_closeup.jpg",
        },
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    ipStatus: "100% original bespoke graphic illustration created in-house by AFTERCLASS design team.",
    developmentStatus: "Sample print approved. Color calibration in progress for dark & light garment variants.",
    flaggedForIpReview: false,
    featured: true,
  },
  {
    id: "03",
    slug: "but-first-coffee",
    name: "BUT FIRST COFFEE",
    conceptNumber: "CONCEPT 03 // RELATABLE / DAILY",
    tagline: "Morning ritual meets nocturnal lifestyle. Understated distress typography.",
    description:
      "Built for the transition between late nights and early responsibilities. Features a restrained vintage screenprint aesthetic with subtle typographic distress.",
    launchPrice: 699,
    mrp: 1499,
    fit: "Bespoke Streetwear Drape / Drop Shoulder",
    colors: [
      {
        name: "Washed Black",
        hex: "#171717",
        images: {
          model: "/images/coffee_v3_black_model.jpg",
          flat: "/images/coffee_v3_black_hanger.jpg",
        },
      },
      {
        name: "Off-White",
        hex: "#F5F2EB",
        images: {
          model: "/images/coffee_v3_white_model.jpg",
          flat: "/images/coffee_v3_white_hanger.jpg",
        },
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    ipStatus: "Original graphic composition. Generic phrasing with customized bespoke typography.",
    developmentStatus: "Concept prototype validated. Finalizing pigment wash tones.",
    flaggedForIpReview: false,
    featured: true,
  },
  {
    id: "04",
    slug: "bad-at-replying",
    name: "BAD AT REPLYING",
    conceptNumber: "CONCEPT 04 // EDITORIAL / WIT",
    tagline: "Social battery zero. Reclaiming peace in an always-connected world.",
    description:
      "A typographic nod to unread notifications and digital overwhelm. Minimalist front placement with subtle coordinate and timestamp print on the upper back neckline.",
    launchPrice: 699,
    mrp: 1499,
    fit: "Oversized Streetwear Silhouette / Drop Shoulder",
    colors: [
      {
        name: "Washed Black",
        hex: "#171717",
        images: {
          model: "/images/product-1.jpg",
          flat: "/images/hero.jpg",
        },
      },
      {
        name: "Off-White",
        hex: "#F5F2EB",
        images: {
          model: "/images/product-3.jpg",
          flat: "/images/product-1.jpg",
        },
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    ipStatus: "Original editorial typography designed by AFTERCLASS atelier.",
    developmentStatus: "Design concept stage. Graphic mockups undergoing founder review.",
    flaggedForIpReview: false,
    featured: false,
  },
  {
    id: "05",
    slug: "pretty-suspicious",
    name: "PRETTY SUSPICIOUS",
    conceptNumber: "CONCEPT 05 // SATIRE / STATEMENT",
    tagline: "Intuitive skepticism for the digital age. Brutalist layout framing.",
    description:
      "Contemporary satire addressing surveillance culture, algorithmic feeds, and intuitive skepticism. Features sharp architectural borders and distressed typography.",
    launchPrice: 699,
    mrp: 1499,
    fit: "Relaxed Boxy Fit / Drop Shoulder",
    colors: [
      {
        name: "Washed Black",
        hex: "#171717",
        images: {
          model: "/images/product-2.jpg",
          flat: "/images/city-editorial.jpg",
        },
      },
      {
        name: "Off-White",
        hex: "#F5F2EB",
        images: {
          model: "/images/product-4.jpg",
          flat: "/images/product-2.jpg",
        },
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    ipStatus: "Original graphic artwork. Concept flagged for legal clearance before drop production.",
    developmentStatus: "Digital mockups finalized. Seeking founder sign-off before sample printing.",
    flaggedForIpReview: true,
    featured: false,
  },
  {
    id: "06",
    slug: "bad-decisions-club",
    name: "BAD DECISIONS CLUB",
    conceptNumber: "CONCEPT 06 // CULTURE / NIGHTLIFE",
    tagline: "Honoring stories made after 2:00 AM. Brutalist street aesthetics.",
    description:
      "For the nights that weren't planned and the stories you wouldn't trade. Relaxed drape with high-density typographic back hit and subtle chest emblem.",
    launchPrice: 699,
    mrp: 1499,
    fit: "Heavyweight Boxy Cut / Drop Shoulder",
    colors: [
      {
        name: "Washed Black",
        hex: "#171717",
        images: {
          model: "/images/product-3.jpg",
          flat: "/images/product-4.jpg",
        },
      },
      {
        name: "Off-White",
        hex: "#F5F2EB",
        images: {
          model: "/images/product-1.jpg",
          flat: "/images/product-3.jpg",
        },
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    ipStatus: "Original branding concept. Flagged for title trademark check across clothing classifications.",
    developmentStatus: "Design iteration phase. Initial artwork drafted.",
    flaggedForIpReview: true,
    featured: false,
  },
];

export function getProductBySlug(slug: string): ProductConcept | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
