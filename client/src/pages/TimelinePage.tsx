// SILENCER: THE ARSIA MONS ARCHIVE — Timeline Page
import { useState } from "react";
import { timeline } from "@/data/lore";
import { ClassificationStamp, FactionBadge, AnalystNote } from "@/components/ArchiveComponents";
import { cn } from "@/lib/utils";
import type { FactionId } from "@/data/lore";

const erasSet = new Set(timeline.map((e) => e.era));
const eras = Array.from(erasSet);

export default function TimelinePage() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = selectedEra
    ? timeline.filter((e) => e.era === selectedEra)
    : timeline;

  return (
    <div className="min-h-full">
      <div className="border-b border-border px-6 py-5 bg-card/50">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / TIMELINE
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground mb-1">
          COLONY TIMELINE
        </h1>
        <p className="text-[13px] font-code text-muted-foreground/80">
          A chronological record of events in the Arsia Mons colony. Canon events are drawn from the original game source. Expanded records represent intelligence reconstructed from recovered documents.
        </p>
      </div>

      {/* Era filter */}
      <div className="flex gap-2 px-6 py-3 border-b border-border overflow-x-auto">
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

      {/* Timeline */}
      <div className="px-6 py-6 max-w-3xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-1">
            {filtered.map((entry, i) => (
              <div key={entry.id} className={cn("animate-entry", `animate-entry-delay-${Math.min(i + 1, 5)}`)}>
                <div
                  className="flex gap-4 cursor-pointer group"
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                >
                  {/* Node */}
                  <div className="flex-shrink-0 mt-3 relative z-10">
                    <div className={cn(
                      "w-3.5 h-3.5 rounded-full border-2 transition-colors",
                      expandedId === entry.id
                        ? "bg-blue-500 border-blue-500"
                        : "bg-background border-border group-hover:border-blue-500/50"
                    )} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="terminal-panel border border-border p-3 hover:bg-accent/10 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-code text-blue-400/70 tracking-wider font-bold">
                            {entry.year}
                          </span>
                          <span className="text-[9px] font-code text-muted-foreground/30 tracking-widest uppercase">
                            {entry.era}
                          </span>
                          <ClassificationStamp classification={entry.classification} />
                        </div>
                      </div>
                      <h3 className="text-[13px] font-display font-bold text-foreground/90 mb-1">
                        {entry.title}
                      </h3>
                      <p className="text-[13px] font-code text-muted-foreground/85 leading-relaxed">
                        {entry.summary}
                      </p>

                      {/* Factions */}
                      {entry.factions.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {entry.factions.map((f) => (
                            <FactionBadge key={f} factionId={f as FactionId} size="sm" />
                          ))}
                        </div>
                      )}

                      {/* Expanded detail */}
                      {expandedId === entry.id && (
                        <div className="mt-3 pt-3 border-t border-border animate-decrypt">
                          <p className="text-[13px] font-code text-muted-foreground leading-relaxed mb-3">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnalystNote>
          This timeline is incomplete. Records from Colony Years 1-30 are fragmentary. Records from Colony Years 44-67 show evidence of systematic deletion. The gaps are as significant as the entries.
        </AnalystNote>
      </div>
    </div>
  );
}
