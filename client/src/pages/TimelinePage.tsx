// SILENCER: THE ARSIA MONS ARCHIVE — Timeline Page
// Full-width layout with atmospheric images per event
import { useState } from "react";
import { timeline } from "@/data/lore";
import { ClassificationStamp, FactionBadge, AnalystNote } from "@/components/ArchiveComponents";
import { cn } from "@/lib/utils";
import type { FactionId } from "@/data/lore";

const erasSet = new Set(timeline.map((e) => e.era));
const eras = Array.from(erasSet);

// Map timeline entry IDs to atmospheric images
const timelineImages: Record<string, string> = {
  'tl-001': '/manus-storage/lore-oxygen-plant_2b32dfc6.png',
  'tl-002': '/manus-storage/lore-underground-tunnels_15253d3f.png',
  'tl-003': '/manus-storage/lore-habitation-ring_f1255c1a.png',
  'tl-004': '/manus-storage/lore-arsia-mons-surface_9648b909.png',
  'tl-005': '/manus-storage/lore-oxygen-plant_2b32dfc6.png',
  'tl-006': '/manus-storage/lore-habitation-ring_f1255c1a.png',
  'tl-007': '/manus-storage/lore-satellite-array_57d85633.png',
  'tl-008': '/manus-storage/lore-satellite-array_57d85633.png',
  'tl-009': '/manus-storage/lore-underground-tunnels_15253d3f.png',
  'tl-010': '/manus-storage/lore-satellite-array_57d85633.png',
  'tl-011': '/manus-storage/lore-cleansing-protocol_10a85b67.png',
};

export default function TimelinePage() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = selectedEra
    ? timeline.filter((e) => e.era === selectedEra)
    : timeline;

  return (
    <div className="min-h-full w-full">
      {/* Page header — full width */}
      <div className="border-b border-border px-8 py-6 bg-card/50 w-full">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / TIMELINE
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground mb-2">
          COLONY TIMELINE
        </h1>
        <p className="text-sm font-code text-muted-foreground/80 max-w-2xl">
          A chronological record of events in the Arsia Mons colony. Canon events are drawn from the original game source. Expanded records represent intelligence reconstructed from recovered documents.
        </p>
      </div>

      {/* Era filter */}
      <div className="flex gap-2 px-8 py-3 border-b border-border overflow-x-auto w-full">
        <button
          onClick={() => setSelectedEra(null)}
          className={cn(
            "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors whitespace-nowrap",
            !selectedEra
              ? "border-blue-500/50 text-blue-400 bg-blue-950/20"
              : "border-border text-muted-foreground/50 hover:text-muted-foreground hover:border-border/80"
          )}
        >
          ALL ERAS
        </button>
        {eras.map((era) => (
          <button
            key={era}
            onClick={() => setSelectedEra(era === selectedEra ? null : era)}
            className={cn(
              "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors whitespace-nowrap",
              selectedEra === era
                ? "border-blue-500/50 text-blue-400 bg-blue-950/20"
                : "border-border text-muted-foreground/50 hover:text-muted-foreground hover:border-border/80"
            )}
          >
            {era}
          </button>
        ))}
      </div>

      {/* Timeline — full width, alternating image layout */}
      <div className="w-full px-8 py-8">
        <div className="space-y-6">
          {filtered.map((entry, i) => {
            const isExpanded = expandedId === entry.id;
            const img = timelineImages[entry.id];
            const isEven = i % 2 === 0;

            return (
              <div
                key={entry.id}
                className={cn("animate-entry", `animate-entry-delay-${Math.min(i + 1, 5)}`)}
              >
                <div
                  className={cn(
                    "grid gap-0 border border-border hover:border-border/80 transition-all cursor-pointer group overflow-hidden",
                    img ? "grid-cols-1 lg:grid-cols-[1fr_320px]" : "grid-cols-1",
                    isExpanded && "border-blue-500/30"
                  )}
                  style={isEven && img ? {} : {}}
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                >
                  {/* Text content */}
                  <div className={cn(
                    "p-5 bg-card/30 group-hover:bg-card/50 transition-colors",
                    img && !isEven ? "lg:order-2" : ""
                  )}>
                    {/* Meta row */}
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="text-[11px] font-code text-blue-400 tracking-wider font-bold">
                        {entry.year}
                      </span>
                      <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase border border-border/30 px-1.5 py-0.5">
                        {entry.era}
                      </span>
                      <ClassificationStamp classification={entry.classification} />
                    </div>

                    <h3 className="text-lg font-display font-bold text-foreground mb-2 leading-tight">
                      {entry.title}
                    </h3>
                    <p className="text-sm font-code text-muted-foreground leading-relaxed mb-3">
                      {entry.summary}
                    </p>

                    {/* Factions */}
                    {entry.factions.length > 0 && (
                      <div className="flex gap-1 flex-wrap mb-3">
                        {entry.factions.map((f) => (
                          <FactionBadge key={f} factionId={f as FactionId} size="sm" />
                        ))}
                      </div>
                    )}

                    {/* Expand hint */}
                    <div className="text-[9px] font-code text-muted-foreground/30 tracking-wider uppercase">
                      {isExpanded ? "▲ COLLAPSE RECORD" : "▼ EXPAND RECORD"}
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border animate-decrypt">
                        <p className="text-sm font-code text-muted-foreground leading-relaxed mb-3">
                          {entry.detail}
                        </p>
                        {entry.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {entry.tags.map((tag) => (
                              <span key={tag} className="text-[9px] font-code text-muted-foreground/30 tracking-wider uppercase px-1.5 py-0.5 border border-border/30">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Image panel */}
                  {img && (
                    <div className={cn(
                      "relative overflow-hidden bg-black/50 min-h-[200px] lg:min-h-0",
                      !isEven ? "lg:order-1" : ""
                    )}>
                      <img
                        src={img}
                        alt={entry.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-500"
                        style={{ minHeight: '200px' }}
                      />
                      {/* Gradient overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent lg:from-transparent lg:to-black/40" />
                      {/* Year stamp on image */}
                      <div className="absolute bottom-3 right-3 text-[9px] font-code text-white/40 tracking-widest uppercase">
                        {entry.year}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <AnalystNote>
            This timeline is incomplete. Records from Colony Years 1–30 are fragmentary. Records from Colony Years 44–67 show evidence of systematic deletion. The gaps are as significant as the entries.
          </AnalystNote>
        </div>
      </div>
    </div>
  );
}
