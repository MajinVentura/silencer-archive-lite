// SILENCER: THE ARSIA MONS ARCHIVE — Conspiracies Page
import { useState } from "react";
import { conspiracies } from "@/data/lore";
import { ClassificationStamp, FactionBadge, AnalystNote } from "@/components/ArchiveComponents";
import type { FactionId } from "@/data/lore";
import { AlertTriangle, Eye, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  unverified: { label: "UNVERIFIED", color: "#fbbf24", icon: HelpCircle },
  partially_confirmed: { label: "PARTIAL", color: "#3b82f6", icon: Eye },
  confirmed: { label: "CONFIRMED", color: "#4ade80", icon: CheckCircle },
  debunked: { label: "DEBUNKED", color: "#6b7280", icon: XCircle },
};

export default function ConspiraciesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = selectedStatus
    ? conspiracies.filter((c) => c.status === selectedStatus)
    : conspiracies;

  return (
    <div className="min-h-full">
      <div className="border-b border-border px-6 py-5 bg-card/50">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / CONSPIRACIES
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground mb-1">
          OPEN CONSPIRACY THREADS
        </h1>
        <p className="text-[12px] font-code text-muted-foreground/60">
          Intelligence threads that have not been resolved. Some may be disinformation. Some may be the most important things in this archive.
        </p>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 px-6 py-3 border-b border-border overflow-x-auto">
        <button
          onClick={() => setSelectedStatus(null)}
          className={cn(
            "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors whitespace-nowrap",
            !selectedStatus
              ? "border-blue-500/50 text-blue-400 bg-blue-950/20"
              : "border-border text-muted-foreground/50 hover:text-muted-foreground"
          )}
        >
          ALL ({conspiracies.length})
        </button>
        {Object.entries(statusConfig).map(([status, cfg]) => {
          const Icon = cfg.icon;
          const count = conspiracies.filter((c) => c.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
              className={cn(
                "flex items-center gap-1.5 text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors whitespace-nowrap",
                selectedStatus === status
                  ? "border-opacity-50 bg-opacity-20"
                  : "border-border text-muted-foreground/50 hover:text-muted-foreground"
              )}
              style={selectedStatus === status ? {
                borderColor: `${cfg.color}50`,
                color: cfg.color,
                backgroundColor: `${cfg.color}10`,
              } : {}}
            >
              <Icon className="w-3 h-3" />
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Conspiracy cards */}
      <div className="p-6 space-y-4 max-w-3xl">
        {filtered.map((conspiracy, i) => {
          const cfg = statusConfig[conspiracy.status];
          const Icon = cfg.icon;
          const isExpanded = expandedId === conspiracy.id;

          return (
            <div
              key={conspiracy.id}
              className={cn("terminal-panel border border-border animate-entry", `animate-entry-delay-${Math.min(i + 1, 5)}`)}
            >
              {/* Header */}
              <div
                className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : conspiracy.id)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" style={{ color: cfg.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <ClassificationStamp classification={conspiracy.classification} />
                    <span
                      className="text-[9px] font-code font-bold tracking-widest uppercase px-1.5 py-0.5 border"
                      style={{ color: cfg.color, borderColor: `${cfg.color}40`, background: `${cfg.color}10` }}
                    >
                      <Icon className="w-2.5 h-2.5 inline mr-1" />
                      {cfg.label}
                    </span>
                  </div>
                  <h3 className="text-[13px] font-display font-bold text-foreground/90">
                    {conspiracy.title}
                  </h3>
                  <p className="text-[11px] font-code text-muted-foreground/65 leading-relaxed mt-1">
                    {conspiracy.summary}
                  </p>
                  {conspiracy.factions.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {conspiracy.factions.map((f) => (
                        <FactionBadge key={f} factionId={f as FactionId} size="sm" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-border px-4 py-4 animate-decrypt">
                  {/* Evidence */}
                  <div className="mb-4">
                    <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-2">
                      SUPPORTING EVIDENCE
                    </div>
                    <ul className="space-y-1.5">
                      {conspiracy.evidence.map((ev, i) => (
                        <li key={i} className="flex gap-2 text-[11px] font-code text-muted-foreground/70 leading-relaxed">
                          <span className="text-muted-foreground/30 flex-shrink-0">•</span>
                          {ev}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Analyst note */}
                  <AnalystNote>{conspiracy.analystNote}</AnalystNote>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
