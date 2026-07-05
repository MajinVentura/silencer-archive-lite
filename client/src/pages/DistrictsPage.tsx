// SILENCER: THE ARSIA MONS ARCHIVE — Districts Page
import { useState } from "react";
import { districts } from "@/data/lore";
import { ClassificationStamp, LoreCard, AnalystNote, StatRow } from "@/components/ArchiveComponents";
import { cn } from "@/lib/utils";

export default function DistrictsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(districts[0]?.id || null);
  const selected = districts.find((d) => d.id === selectedId);

  return (
    <div className="min-h-full">
      <div className="border-b border-border px-6 py-5 bg-card/50">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / DISTRICTS
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground mb-1">
          COLONY DISTRICTS
        </h1>
        <p className="text-[13px] font-code text-muted-foreground/80">
          Geographic and administrative divisions of the Arsia Mons colony. Each district has its own power structure, population, and history of conflict.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: "calc(100vh - 140px)" }}>
        {/* District list */}
        <div className="lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto">
          {districts.map((district) => (
            <button
              key={district.id}
              onClick={() => setSelectedId(district.id)}
              className={cn(
                "w-full text-left px-4 py-3 border-b border-border/50 transition-colors",
                selectedId === district.id ? "bg-accent/40" : "hover:bg-accent/20"
              )}
            >
              <div className="flex items-start gap-2">
                <div
                  className="w-1 flex-shrink-0 rounded-full mt-1"
                  style={{
                    backgroundColor: selectedId === district.id ? "#3b82f6" : "#3b82f620",
                    minHeight: "24px",
                  }}
                />
                <div>
                  <div
                    className="text-[11px] font-display font-bold tracking-wide"
                    style={selectedId === district.id ? { color: "#3b82f6" } : {}}
                  >
                    {district.name}
                  </div>
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-wider uppercase mt-0.5">
                    {district.sector}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* District detail */}
        <div className="flex-1 overflow-y-auto p-6">
          {selected ? (
            <div className="max-w-2xl space-y-5 animate-entry">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <ClassificationStamp classification={selected.classification} />
                  <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase">
                    {selected.sector}
                  </span>
                </div>
                <h2 className="text-2xl font-bold font-display tracking-tight mb-1 text-foreground">
                  {selected.name}
                </h2>
              </div>

              {/* Stats */}
              <div className="terminal-panel border border-border p-4">
                <StatRow label="SECTOR" value={selected.sector} />
                <StatRow label="CONTROLLED BY" value={selected.controlledBy.toUpperCase()} />
                <StatRow label="DANGER LEVEL" value={`${selected.dangerLevel} / 5`} color={
                  selected.dangerLevel >= 4 ? "#f87171" :
                  selected.dangerLevel >= 3 ? "#fbbf24" : "#4ade80"
                } />
              </div>

              {/* Description */}
              <LoreCard title="DISTRICT RECORD" classification={selected.classification}>
                {selected.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[13px] font-code text-muted-foreground leading-relaxed mb-3 last:mb-0">
                    {para}
                  </p>
                ))}
              </LoreCard>

              {/* Expanded description */}
              {selected.expandedDescription && (
                <LoreCard title="EXPANDED INTELLIGENCE" classification="EXPANDED">
                  {selected.expandedDescription.split("\n\n").map((para, i) => (
                    <p key={i} className="text-[13px] font-code text-muted-foreground leading-relaxed mb-3 last:mb-0">
                      {para}
                    </p>
                  ))}
                </LoreCard>
              )}

              {/* Known locations */}
              {selected.knownLocations.length > 0 && (
                <div>
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-3">
                    KNOWN LOCATIONS
                  </div>
                  <div className="space-y-2">
                    {selected.knownLocations.map((loc) => (
                      <div key={loc} className="flex gap-3 px-4 py-3 border border-border/50 bg-card/30">
                        <div className="w-0.5 flex-shrink-0 rounded-full bg-border" />
                        <p className="text-[13px] font-code text-muted-foreground/80 leading-relaxed">
                          {loc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rumors */}
              {selected.rumors.length > 0 && (
                <LoreCard title="DISTRICT RUMORS — UNVERIFIED" classification="RUMOR">
                  <ul className="space-y-2">
                    {selected.rumors.map((r, i) => (
                      <li key={i} className="text-[13px] font-code text-muted-foreground leading-relaxed italic">
                        • {r}
                      </li>
                    ))}
                  </ul>
                </LoreCard>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-[11px] font-code text-muted-foreground/30 tracking-widest uppercase">
                SELECT A DISTRICT
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
