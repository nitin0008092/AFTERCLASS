"use client";

import { useState } from "react";
import { X, Ruler, Sparkles, Check, HelpCircle, ArrowRight } from "lucide-react";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

type Unit = "in" | "cm";
type Tab = "chart" | "recommender";

interface SizeSpec {
  size: string;
  label: string;
  bodyChestIn: string;
  bodyChestCm: string;
  garmentChestIn: string;
  garmentChestCm: string;
  lengthIn: string;
  lengthCm: string;
  heightRec: string;
  weightRec: string;
  fitTag: string;
}

const SIZE_DATA: SizeSpec[] = [
  {
    size: "XS",
    label: "Extra Small",
    bodyChestIn: '34" - 36"',
    bodyChestCm: "86 - 91 cm",
    garmentChestIn: '40"',
    garmentChestCm: "102 cm",
    lengthIn: '27"',
    lengthCm: "68 cm",
    heightRec: "5'2\" - 5'5\" (157 - 165 cm)",
    weightRec: "48 - 58 kg",
    fitTag: "Petite / Slim Relaxed",
  },
  {
    size: "S",
    label: "Small",
    bodyChestIn: '36" - 38"',
    bodyChestCm: "91 - 96 cm",
    garmentChestIn: '42"',
    garmentChestCm: "107 cm",
    lengthIn: '28"',
    lengthCm: "71 cm",
    heightRec: "5'5\" - 5'8\" (165 - 173 cm)",
    weightRec: "58 - 68 kg",
    fitTag: "Comfort Streetwear",
  },
  {
    size: "M",
    label: "Medium",
    bodyChestIn: '38" - 40"',
    bodyChestCm: "96 - 102 cm",
    garmentChestIn: '44"',
    garmentChestCm: "112 cm",
    lengthIn: '29"',
    lengthCm: "74 cm",
    heightRec: "5'8\" - 5'11\" (173 - 180 cm)",
    weightRec: "68 - 78 kg",
    fitTag: "Popular Drop Fit",
  },
  {
    size: "L",
    label: "Large",
    bodyChestIn: '40" - 42"',
    bodyChestCm: "102 - 107 cm",
    garmentChestIn: '46"',
    garmentChestCm: "117 cm",
    lengthIn: '30"',
    lengthCm: "76 cm",
    heightRec: "5'10\" - 6'1\" (178 - 185 cm)",
    weightRec: "78 - 88 kg",
    fitTag: "Signature Baggy",
  },
  {
    size: "XL",
    label: "Extra Large",
    bodyChestIn: '42" - 45"',
    bodyChestCm: "107 - 114 cm",
    garmentChestIn: '48"',
    garmentChestCm: "122 cm",
    lengthIn: '31"',
    lengthCm: "79 cm",
    heightRec: "6'0\" - 6'3\" (183 - 190 cm)",
    weightRec: "88 - 98 kg",
    fitTag: "Heavyweight Boxy",
  },
  {
    size: "XXL",
    label: "2X Large",
    bodyChestIn: '45" - 48"',
    bodyChestCm: "114 - 122 cm",
    garmentChestIn: '50"',
    garmentChestCm: "127 cm",
    lengthIn: '32"',
    lengthCm: "81 cm",
    heightRec: "6'1\"+ (185+ cm)",
    weightRec: "98 - 112 kg",
    fitTag: "Maximum Drape",
  },
  {
    size: "3XL",
    label: "3X Large",
    bodyChestIn: '48" - 52"',
    bodyChestCm: "122 - 132 cm",
    garmentChestIn: '53"',
    garmentChestCm: "135 cm",
    lengthIn: '33"',
    lengthCm: "84 cm",
    heightRec: "Any Height",
    weightRec: "110 - 130 kg",
    fitTag: "Ultra Roomy",
  },
];

export function SizeChartModal({
  isOpen,
  onClose,
  selectedSize,
  onSelectSize,
}: SizeChartModalProps) {
  const [unit, setUnit] = useState<Unit>("in");
  const [activeTab, setActiveTab] = useState<Tab>("chart");

  // Simple 1-step quick finder
  const [finderHeight, setFinderHeight] = useState("avg"); // short, avg, tall
  const [finderBuild, setFinderBuild] = useState("medium"); // slim, medium, athletic, broad
  const [recommended, setRecommended] = useState<string | null>(null);

  if (!isOpen) return null;

  const calculateQuickRecommendation = () => {
    if (finderBuild === "slim") {
      setRecommended(finderHeight === "tall" ? "M" : "S");
    } else if (finderBuild === "medium") {
      setRecommended(finderHeight === "tall" ? "L" : finderHeight === "short" ? "S" : "M");
    } else if (finderBuild === "athletic") {
      setRecommended(finderHeight === "tall" ? "XL" : "L");
    } else {
      // broad
      setRecommended(finderHeight === "tall" ? "XXL" : "XL");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] border-2 border-[#171717] p-5 sm:p-8 shadow-[12px_12px_0px_0px_#171717] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#171717]/10 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#777A61] mb-1">
              <Ruler className="w-4 h-4 text-[#777A61]" />
              <span>UNIVERSAL FIT SPECIFICATION (XS TO 3XL)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
              FIND YOUR PERFECT FIT
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#171717] hover:bg-[#F5F2EB] border border-[#171717]/20 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Unit Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#171717]/10">
          {/* Sub Navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("chart")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider font-mono transition-colors ${
                activeTab === "chart"
                  ? "bg-[#171717] text-[#F5F2EB]"
                  : "bg-[#F5F2EB] text-[#171717] hover:bg-[#E5E2DA]"
              }`}
            >
              Measurements Chart
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("recommender")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider font-mono transition-colors flex items-center gap-1.5 ${
                activeTab === "recommender"
                  ? "bg-[#171717] text-[#F5F2EB]"
                  : "bg-[#F5F2EB] text-[#171717] hover:bg-[#E5E2DA]"
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#777A61]" />
              Instant Size Finder
            </button>
          </div>

          {/* Inches vs CM toggle */}
          {activeTab === "chart" && (
            <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 border border-[#171717]/20 self-start sm:self-auto">
              <span className="text-[10px] font-mono text-[#171717]/60 px-2 uppercase">UNIT:</span>
              <button
                type="button"
                onClick={() => setUnit("in")}
                className={`px-2.5 py-0.5 text-xs font-bold font-mono ${
                  unit === "in" ? "bg-[#171717] text-[#F5F2EB]" : "text-[#171717]"
                }`}
              >
                INCHES
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={`px-2.5 py-0.5 text-xs font-bold font-mono ${
                  unit === "cm" ? "bg-[#171717] text-[#F5F2EB]" : "text-[#171717]"
                }`}
              >
                CM
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: CLEAR COMPREHENSIVE SIZE CHART */}
        {activeTab === "chart" && (
          <div className="space-y-4">
            {/* Quick Human-Readable Fit Summary */}
            <div className="p-3 bg-[#F5F2EB] border border-[#171717]/15 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono text-[#171717]">
                <strong>Cut:</strong> Oversized Boxy with 2&quot; extra room for authentic streetwear drape.
              </span>
              <span className="font-mono text-[#777A61] font-bold">
                ✓ If between sizes or prefer regular fit, SIZE DOWN.
              </span>
            </div>

            {/* Complete Table */}
            <div className="overflow-x-auto border border-[#171717]/20">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#171717] text-[#F5F2EB] font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3">Size</th>
                    <th className="p-3">Your Chest</th>
                    <th className="p-3">Tee Chest (Garment)</th>
                    <th className="p-3">Length</th>
                    <th className="p-3">Typical Height & Weight</th>
                    <th className="p-3 text-right">Selection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171717]/10 font-mono text-[11px]">
                  {SIZE_DATA.map((row) => {
                    const isCurrent = selectedSize === row.size;
                    return (
                      <tr
                        key={row.size}
                        className={`transition-colors ${
                          isCurrent
                            ? "bg-[#777A61]/20 font-bold"
                            : "hover:bg-[#F5F2EB]/60"
                        }`}
                      >
                        <td className="p-3">
                          <span className="text-sm font-black text-[#171717]">{row.size}</span>
                          <span className="block text-[9px] text-[#777A61] font-sans">
                            {row.fitTag}
                          </span>
                        </td>
                        <td className="p-3 text-[#171717]">
                          {unit === "in" ? row.bodyChestIn : row.bodyChestCm}
                        </td>
                        <td className="p-3 text-[#171717] font-semibold">
                          {unit === "in" ? row.garmentChestIn : row.garmentChestCm}
                        </td>
                        <td className="p-3 text-[#171717]/80">
                          {unit === "in" ? row.lengthIn : row.lengthCm}
                        </td>
                        <td className="p-3 text-[#171717]/70">
                          <div>{row.heightRec}</div>
                          <div className="text-[#777A61] font-semibold">{row.weightRec}</div>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSize(row.size);
                              onClose();
                            }}
                            className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                              isCurrent
                                ? "bg-[#171717] text-[#F5F2EB]"
                                : "border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-[#F5F2EB]"
                            }`}
                          >
                            {isCurrent ? "✓ Chosen" : "Choose"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Quick Universal Visual Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-[#171717]/80">
              <div className="p-3 border border-[#171717]/10 bg-white">
                <span className="font-bold text-[#171717] block uppercase font-mono mb-1">
                  1. Snug/Fitted Style
                </span>
                <p>Choose <strong>1 size smaller</strong> than your normal T-shirt for a clean shoulder without excessive bagginess.</p>
              </div>
              <div className="p-3 border border-[#171717]/10 bg-white">
                <span className="font-bold text-[#171717] block uppercase font-mono mb-1">
                  2. True Streetwear Fit
                </span>
                <p>Choose <strong>your standard size</strong>. The shoulders naturally drape 2 inches down with broad elbow sleeves.</p>
              </div>
              <div className="p-3 border border-[#171717]/10 bg-white">
                <span className="font-bold text-[#171717] block uppercase font-mono mb-1">
                  3. Ultra-Baggy / Skater
                </span>
                <p>Choose <strong>1 size up</strong> for an exaggerated Japanese oversized silhouette with maximum fabric movement.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INSTANT SIZE RECOMMENDER (3-SECOND ZERO CONFUSION) */}
        {activeTab === "recommender" && (
          <div className="space-y-6 py-2">
            <div className="text-center max-w-md mx-auto">
              <h4 className="text-lg font-bold uppercase tracking-tight text-[#171717]">
                Not sure about tape measurements?
              </h4>
              <p className="text-xs text-[#171717]/70 mt-1">
                Select your approximate height & body type below to get our instant recommendation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
              {/* Height Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#171717] mb-2 font-bold">
                  Your Height:
                </label>
                <div className="space-y-2">
                  {[
                    { id: "short", label: "Under 5'7\" (Under 170 cm)" },
                    { id: "avg", label: "5'7\" to 5'11\" (170 - 180 cm)" },
                    { id: "tall", label: "6'0\" and Above (182+ cm)" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFinderHeight(item.id)}
                      className={`w-full text-left px-3 py-2 text-xs border transition-colors ${
                        finderHeight === item.id
                          ? "border-[#171717] bg-[#171717] text-[#F5F2EB] font-bold"
                          : "border-[#171717]/20 bg-[#F5F2EB] text-[#171717]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Build Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#171717] mb-2 font-bold">
                  Your Build:
                </label>
                <div className="space-y-2">
                  {[
                    { id: "slim", label: "Slim / Lean" },
                    { id: "medium", label: "Average / Regular" },
                    { id: "athletic", label: "Muscular / Broad Chest" },
                    { id: "broad", label: "Heavy / Full Frame" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFinderBuild(item.id)}
                      className={`w-full text-left px-3 py-2 text-xs border transition-colors ${
                        finderBuild === item.id
                          ? "border-[#171717] bg-[#171717] text-[#F5F2EB] font-bold"
                          : "border-[#171717]/20 bg-[#F5F2EB] text-[#171717]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={calculateQuickRecommendation}
                className="px-6 py-3 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#777A61] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Find My Size</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recommended && (
              <div className="max-w-md mx-auto p-4 bg-[#777A61]/15 border-2 border-[#777A61] text-center space-y-2 animate-in fade-in">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#777A61] block">
                  RECOMMENDED SIZE FOR YOU
                </span>
                <div className="text-4xl font-black text-[#171717] font-mono">
                  {recommended}
                </div>
                <p className="text-xs text-[#171717]/80 leading-relaxed">
                  Based on your build and height, size <strong>{recommended}</strong> will give you the ideal streetwear silhouette with relaxed dropped shoulders.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onSelectSize(recommended);
                    onClose();
                  }}
                  className="mt-2 px-5 py-2 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-wider hover:bg-[#777A61] transition-colors"
                >
                  Confirm & Apply Size {recommended}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer reassurance note */}
        <div className="border-t border-[#171717]/10 mt-6 pt-3 flex items-center justify-between text-[11px] text-[#171717]/60 font-mono">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#777A61]" />
            Free size exchange available if the fit isn&apos;t 100% right.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#171717] font-bold hover:underline uppercase"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
