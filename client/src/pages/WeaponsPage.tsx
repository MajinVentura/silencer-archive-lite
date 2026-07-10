// SILENCER: THE ARSIA MONS ARCHIVE — Equipment Registry Page
// Full-width layout with atmospheric images per item
import { useState } from "react";
import { agencies } from "@/data/lore";
import { ClassificationStamp, FactionBadge } from "@/components/ArchiveComponents";
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

// Map equipment names to atmospheric images
const equipmentImages: Record<string, string> = {
  'Sporria-7 Lung Augmentation': '/assets/lore-oxygen-plant_2b32dfc6.png',
  'Atmospheric Processor Suit': '/assets/lore-arsia-mons-surface_9648b909.png',
  'Dead Signal Uplink Module': '/assets/lore-satellite-array_57d85633.png',
  'Cypher Lock Breaker': '/assets/lore-satellite-array_57d85633.png',
  'Social Engineering Kit': '/assets/lore-habitation-ring_f1255c1a.png',
  'Contact Ledger (Encrypted)': '/assets/lore-habitation-ring_f1255c1a.png',
  'Lazarus Serum (Partial Formula)': '/assets/lore-underground-tunnels_15253d3f.png',
  'Hollowhead Compound': '/assets/lore-underground-tunnels_15253d3f.png',
  'Thorn Pistol': '/assets/lore-weapon-laser_d463ac86.png',
  'Jetpack (Mk. III)': '/assets/lore-weapon-jetpack_bee532ec.png',
  'Incendiary Projector': '/assets/lore-weapon-flamer_e09e46ba.png',
  'Defense Laser (Mounted)': '/assets/lore-weapon-laser_d463ac86.png',
};

// Fallback images by type
const typeImages: Record<string, string> = {
  weapon: '/assets/lore-weapon-laser_d463ac86.png',
  tool: '/assets/lore-satellite-array_57d85633.png',
  enhancement: '/assets/lore-oxygen-plant_2b32dfc6.png',
  compound: '/assets/lore-underground-tunnels_15253d3f.png',
};

export default function WeaponsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<FactionId | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filtered = allEquipment.filter((item) => {
    const matchType = !selectedType || item.type === selectedType;
    const matchAgency = !selectedAgency || item.ownerAgency === selectedAgency;
    return matchType && matchAgency;
  });

  return (
    <div className="min-h-full w-full">
      {/* Page header */}
      <div className="border-b border-border px-8 py-6 bg-card/50 w-full">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / EQUIPMENT
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground mb-2">
          EQUIPMENT REGISTRY
        </h1>
        <p className="text-sm font-code text-muted-foreground/80">
          Weapons, tools, enhancements, and compounds used by Silencer operatives. Agency-exclusive items are marked.
        </p>
      </div>

      {/* Filters */}
      <div className="px-8 py-4 border-b border-border space-y-3 w-full">
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mr-1">TYPE:</span>
          {Object.entries(typeLabels).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={cn(
                "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors",
                selectedType === type
                  ? "border-blue-500/50 text-blue-400 bg-blue-950/20"
                  : "border-border text-muted-foreground/50 hover:text-muted-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mr-1">AGENCY:</span>
          {agencies.map((agency) => (
            <button
              key={agency.id}
              onClick={() => setSelectedAgency(selectedAgency === agency.id ? null : agency.id)}
              className={cn(
                "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors",
                selectedAgency === agency.id ? "" : "border-border text-muted-foreground/50 hover:text-muted-foreground"
              )}
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

      {/* Equipment grid — full width */}
      <div className="px-8 py-6 w-full">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-5">
          {filtered.length} ITEM{filtered.length !== 1 ? "S" : ""} IN REGISTRY
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((item, i) => {
              const agency = agencies.find((a) => a.id === item.ownerAgency);
              const itemImg = equipmentImages[item.name] || typeImages[item.type];
              const isExpanded = expandedItem === `${item.ownerAgency}-${item.name}`;

              return (
                <div
                  key={`${item.ownerAgency}-${item.name}`}
                  className={cn(
                    "terminal-panel border border-border overflow-hidden cursor-pointer group transition-all hover:border-border/80 animate-entry",
                    `animate-entry-delay-${Math.min(i + 1, 5)}`,
                    isExpanded && "border-blue-500/30"
                  )}
                  style={agency ? { borderTopColor: `${agency.color}30` } : {}}
                  onClick={() => setExpandedItem(isExpanded ? null : `${item.ownerAgency}-${item.name}`)}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-black/50">
                    <img
                      src={itemImg}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
                    {/* Type badge on image */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] font-code font-bold tracking-widest uppercase px-2 py-1 bg-black/60 border border-border/40 text-muted-foreground/70">
                        {typeLabels[item.type]}
                      </span>
                    </div>
                    {/* Classification on image */}
                    <div className="absolute top-3 left-3">
                      <ClassificationStamp classification={item.classification} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Agency badge */}
                    <div className="mb-2">
                      <FactionBadge factionId={item.ownerAgency} size="sm" />
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-display font-bold text-foreground mb-2 leading-tight">
                      {item.name}
                    </h3>

                    {/* Description — always visible, but truncated when collapsed */}
                    <p className={cn(
                      "text-sm font-code text-muted-foreground leading-relaxed",
                      !isExpanded && "line-clamp-3"
                    )}>
                      {item.description}
                    </p>

                    {/* Expand hint */}
                    <div className="mt-3 text-[9px] font-code text-muted-foreground/30 tracking-wider uppercase">
                      {isExpanded ? "▲ COLLAPSE" : "▼ READ FULL RECORD"}
                    </div>

                    {/* Agency exclusive tag */}
                    {item.agencyExclusive && (
                      <div className="mt-2">
                        <span
                          className="text-[9px] font-code font-bold tracking-widest uppercase px-2 py-0.5 border"
                          style={agency ? { borderColor: `${agency.color}40`, color: agency.color } : {}}
                        >
                          AGENCY EXCLUSIVE
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <Crosshair className="w-10 h-10 text-muted-foreground/20 mb-3" />
            <div className="text-[11px] font-code text-muted-foreground/30 tracking-widest uppercase">
              NO ITEMS MATCH FILTER
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
