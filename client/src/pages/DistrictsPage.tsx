// SILENCER: THE ARSIA MONS ARCHIVE — Districts Page
// Full-width master-detail layout with atmospheric images
import { useState } from "react";
import { districts } from "@/data/lore";
import { ClassificationStamp, LoreCard, AnalystNote, StatRow } from "@/components/ArchiveComponents";
import { cn } from "@/lib/utils";

const districtImages: Record<string, string> = {
  'dist-001': '/assets/lore-habitation-ring_f1255c1a.png',
  'dist-002': '/assets/lore-underground-tunnels_15253d3f.png',
  'dist-003': '/assets/lore-satellite-array_57d85633.png',
};

const dangerColors = ['', 'text-green-400', 'text-yellow-400', 'text-orange-400', 'text-red-400', 'text-red-600'];

export default function DistrictsPage() {
  const [selectedId, setSelectedId] = useState<string>(districts[0]?.id || '');
  const selected = districts.find((d) => d.id === selectedId) || districts[0];
  const img = selected ? districtImages[selected.id] : null;

  return (
    <div className="min-h-full w-full flex flex-col">
      {/* Page header */}
      <div className="border-b border-border px-8 py-6 bg-card/50 w-full flex-shrink-0">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / DISTRICTS
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground mb-2">
          COLONY DISTRICTS
        </h1>
        <p className="text-sm font-code text-muted-foreground/80">
          Geographic and administrative divisions of the Arsia Mons colony. Each district has its own power structure, population, and history of conflict.
        </p>
      </div>

      {/* Main content — full width split */}
      <div className="flex flex-1" style={{ minHeight: "calc(100vh - 160px)" }}>
        {/* Left: district list */}
        <div className="w-64 flex-shrink-0 border-r border-border overflow-y-auto bg-card/20">
          {districts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={cn(
                "w-full text-left px-4 py-4 border-b border-border/50 transition-all group",
                selectedId === d.id
                  ? "bg-blue-950/30 border-l-2 border-l-blue-500"
                  : "hover:bg-accent/20 border-l-2 border-l-transparent"
              )}
            >
              <div className="text-[12px] font-bold font-display tracking-wide text-foreground mb-0.5 group-hover:text-blue-400 transition-colors">
                {d.name}
              </div>
              <div className="text-[10px] font-code text-muted-foreground/60 mb-2">
                {d.sector}
              </div>
              <div className="flex items-center gap-2">
                <ClassificationStamp classification={d.classification} />
                <span className={cn("text-[9px] font-code font-bold", dangerColors[d.dangerLevel])}>
                  THREAT {d.dangerLevel}/5
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Right: district detail — full width */}
        {selected && (
          <div className="flex-1 overflow-y-auto">
            {/* Hero image */}
            {img && (
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={img}
                  alt={selected.name}
                  className="w-full h-full object-cover opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-background" />
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <ClassificationStamp classification={selected.classification} />
                    <span className="text-[9px] font-code text-white/50 tracking-widest uppercase">
                      {selected.sector}
                    </span>
                    <span className={cn("text-[9px] font-code font-bold", dangerColors[selected.dangerLevel])}>
                      THREAT LEVEL {selected.dangerLevel}/5
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold font-display text-white tracking-tight drop-shadow-lg">
                    {selected.name}
                  </h2>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="px-8 py-6 animate-entry">
              {!img && (
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <ClassificationStamp classification={selected.classification} />
                    <span className="text-[9px] font-code text-muted-foreground/50 tracking-widest uppercase">
                      {selected.sector}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold font-display text-foreground tracking-tight">
                    {selected.name}
                  </h2>
                </div>
              )}

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="terminal-panel border border-border p-3">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">SECTOR</div>
                  <div className="text-sm font-code text-foreground font-bold">{selected.sector}</div>
                </div>
                <div className="terminal-panel border border-border p-3">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">CONTROLLED BY</div>
                  <div className="text-sm font-code text-foreground font-bold uppercase">
                    {selected.controlledBy === 'gov' ? 'GOVERNMENT' :
                     selected.controlledBy === 'contested' ? 'CONTESTED' :
                     selected.controlledBy.toUpperCase()}
                  </div>
                </div>
                <div className="terminal-panel border border-border p-3">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">THREAT LEVEL</div>
                  <div className={cn("text-sm font-code font-bold", dangerColors[selected.dangerLevel])}>
                    {selected.dangerLevel} / 5
                  </div>
                </div>
                <div className="terminal-panel border border-border p-3">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">CLASSIFICATION</div>
                  <div className="text-sm font-code text-foreground font-bold">{selected.classification}</div>
                </div>
              </div>

              {/* Two-column layout for wider screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <LoreCard title="DISTRICT RECORD" classification={selected.classification}>
                  <p className="text-sm font-code text-muted-foreground leading-relaxed">
                    {selected.description}
                  </p>
                </LoreCard>

                {selected.expandedDescription && (
                  <LoreCard title="EXPANDED INTELLIGENCE" classification="EXPANDED">
                    <p className="text-sm font-code text-muted-foreground leading-relaxed">
                      {selected.expandedDescription}
                    </p>
                  </LoreCard>
                )}
              </div>

              {/* Known locations */}
              {selected.knownLocations.length > 0 && (
                <div className="terminal-panel border border-border p-5 mb-6">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-3">KNOWN LOCATIONS</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selected.knownLocations.map((loc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-blue-500/50 mt-0.5 flex-shrink-0">▸</span>
                        <span className="text-sm font-code text-muted-foreground">{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rumors */}
              {selected.rumors.length > 0 && (
                <LoreCard title="DISTRICT RUMORS — UNVERIFIED" classification="RUMOR">
                  <div className="space-y-3">
                    {selected.rumors.map((r, i) => (
                      <p key={i} className="text-sm font-code text-muted-foreground/85 leading-relaxed italic border-l-2 border-yellow-900/40 pl-3">
                        {r}
                      </p>
                    ))}
                  </div>
                </LoreCard>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
