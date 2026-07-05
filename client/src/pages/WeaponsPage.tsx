// SILENCER: THE ARSIA MONS ARCHIVE — Equipment Registry Page
import { useState } from "react";
import { agencies } from "@/data/lore";
import { ClassificationStamp, FactionBadge, LoreCard } from "@/components/ArchiveComponents";
import type { FactionId, Equipment } from "@/data/lore";
import { Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

// Aggregate all equipment from all agencies
const allEquipment: (Equipment & { ownerAgency: FactionId })[] = [];
agencies.forEach((agency) => {
  agency.equipment.forEach((item) => {
    allEquipment.push({ ...item, ownerAgency: agency.id });
  });
});

const typeLabels: Record<string, string> = {
  weapon: "WEAPON",
  tool: "TOOL",
  enhancement: "ENHANCEMENT",
  compound: "COMPOUND",
};

export default function WeaponsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<FactionId | null>(null);

  const filtered = allEquipment.filter((item) => {
    const matchType = !selectedType || item.type === selectedType;
    const matchAgency = !selectedAgency || item.ownerAgency === selectedAgency;
    return matchType && matchAgency;
  });

  return (
    <div className="min-h-full">
      <div className="border-b border-border px-6 py-5 bg-card/50">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / EQUIPMENT
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground mb-1">
          EQUIPMENT REGISTRY
        </h1>
        <p className="text-[12px] font-code text-muted-foreground/60">
          Weapons, tools, enhancements, and compounds used by Silencer operatives. Agency-exclusive items are marked.
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-border space-y-2">
        <div className="flex gap-2 flex-wrap">
          <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase self-center mr-1">TYPE:</span>
          {Object.entries(typeLabels).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={cn(
                "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1 border transition-colors",
                selectedType === type
                  ? "border-blue-500/50 text-blue-400 bg-blue-950/20"
                  : "border-border text-muted-foreground/50 hover:text-muted-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase self-center mr-1">AGENCY:</span>
          {agencies.map((agency) => (
            <button
              key={agency.id}
              onClick={() => setSelectedAgency(selectedAgency === agency.id ? null : agency.id)}
              className="text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1 border transition-colors"
              style={selectedAgency === agency.id ? {
                borderColor: `${agency.color}50`,
                color: agency.color,
                backgroundColor: `${agency.color}10`,
              } : {}}
            >
              {agency.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment grid */}
      <div className="p-6">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-4">
          {filtered.length} ITEM{filtered.length !== 1 ? "S" : ""} IN REGISTRY
        </div>
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {filtered.map((item, i) => {
              const agency = agencies.find((a) => a.id === item.ownerAgency);
              return (
                <LoreCard
                  key={`${item.ownerAgency}-${item.name}`}
                  title={item.name}
                  classification={item.classification}
                  accentFaction={item.ownerAgency}
                  tags={[typeLabels[item.type], item.agencyExclusive ? "AGENCY EXCLUSIVE" : "GENERAL"]}
                  className={`animate-entry animate-entry-delay-${Math.min(i + 1, 5)}`}
                >
                  <div className="mb-2">
                    <FactionBadge factionId={item.ownerAgency} size="sm" />
                  </div>
                  <p className="text-[12px] font-code text-muted-foreground/75 leading-relaxed">
                    {item.description}
                  </p>
                </LoreCard>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Crosshair className="w-8 h-8 text-muted-foreground/20 mb-3" />
            <div className="text-[11px] font-code text-muted-foreground/30 tracking-widest uppercase">
              NO ITEMS MATCH FILTER
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
