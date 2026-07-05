// SILENCER: THE ARSIA MONS ARCHIVE
// Shared UI components for the archive
// Design: Dark Faction Terminal — classification stamps, faction badges, lore cards

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Classification, FactionId } from "@/data/lore";
import { agencies } from "@/data/lore";
import { Lock, Unlock, ChevronDown, ChevronUp } from "lucide-react";

// ============================================================
// CLASSIFICATION STAMP
// ============================================================

interface ClassificationStampProps {
  classification: Classification;
  className?: string;
}

export function ClassificationStamp({ classification, className }: ClassificationStampProps) {
  const styles: Record<Classification, string> = {
    CANON: "stamp-canon",
    EXPANDED: "stamp-expanded",
    CLASSIFIED: "stamp-classified",
    REDACTED: "stamp-redacted",
    RUMOR: "stamp-rumor",
  };

  const labels: Record<Classification, string> = {
    CANON: "CANON",
    EXPANDED: "EXPANDED RECORD",
    CLASSIFIED: "CLASSIFIED",
    REDACTED: "REDACTED",
    RUMOR: "UNVERIFIED",
  };

  return (
    <span className={cn(styles[classification], className)}>
      {labels[classification]}
    </span>
  );
}

// ============================================================
// FACTION BADGE
// ============================================================

interface FactionBadgeProps {
  factionId: FactionId;
  size?: "sm" | "md";
  className?: string;
}

export function FactionBadge({ factionId, size = "md", className }: FactionBadgeProps) {
  const agency = agencies.find((a) => a.id === factionId);
  if (!agency) return null;

  const govColors: Record<string, string> = {
    gov: "#4b5563",
    independent: "#6b7280",
  };

  const color = agency.color || govColors[factionId] || "#4b5563";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-code font-bold tracking-widest uppercase",
        size === "sm" ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5",
        className
      )}
      style={{
        color,
        border: `1px solid ${color}40`,
        background: `${color}10`,
      }}
    >
      <span
        className="w-1 h-1 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {agency.name.toUpperCase()}
    </span>
  );
}

// ============================================================
// LORE CARD
// ============================================================

interface LoreCardProps {
  title: string;
  classification: Classification;
  factions?: FactionId[];
  children: React.ReactNode;
  expandable?: boolean;
  defaultExpanded?: boolean;
  className?: string;
  accentFaction?: FactionId;
  tags?: string[];
  date?: string;
  isLocked?: boolean;
}

export function LoreCard({
  title,
  classification,
  factions = [],
  children,
  expandable = false,
  defaultExpanded = true,
  className,
  accentFaction,
  tags = [],
  date,
  isLocked = false,
}: LoreCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [unlocked, setUnlocked] = useState(!isLocked);

  const agency = accentFaction ? agencies.find((a) => a.id === accentFaction) : null;
  const accentColor = agency?.color;

  const factionClass = accentFaction
    ? `faction-card-${accentFaction}`
    : "faction-card-gov";

  return (
    <div
      className={cn(
        "faction-card terminal-panel animate-entry",
        factionClass,
        className
      )}
    >
      {/* Card header */}
      <div
        className={cn(
          "flex items-start justify-between gap-3 px-4 py-3 border-b border-border",
          expandable && "cursor-pointer hover:bg-accent/20 transition-colors"
        )}
        onClick={expandable ? () => setExpanded(!expanded) : undefined}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <ClassificationStamp classification={classification} />
            {date && (
              <span className="text-[9px] font-code text-muted-foreground/50 tracking-wider">
                {date}
              </span>
            )}
          </div>
          <h3
            className="text-[13px] font-bold tracking-wide font-display text-foreground leading-tight"
            style={accentColor ? { color: accentColor } : {}}
          >
            {title}
          </h3>
          {factions.length > 0 && (
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              {factions.map((f) => (
                <FactionBadge key={f} factionId={f} size="sm" />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isLocked && !unlocked && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setUnlocked(true);
              }}
              className="text-amber-400 hover:text-amber-300 transition-colors"
              title="Decrypt file"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
          {isLocked && unlocked && (
            <Unlock className="w-3.5 h-3.5 text-green-500/50" />
          )}
          {expandable && (
            <div className="text-muted-foreground">
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card content */}
      {(!expandable || expanded) && (
        <div className={cn("px-4 py-3", isLocked && !unlocked && "blur-sm select-none")}>
          {children}
          {tags.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-code text-muted-foreground/40 tracking-wider uppercase px-1.5 py-0.5 border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PAGE HEADER
// ============================================================

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  classification?: Classification;
  breadcrumb?: string;
  accentColor?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  classification,
  breadcrumb,
  accentColor,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-b border-border px-6 py-5 bg-card/50">
      {breadcrumb && (
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-2">
          ARSIA MONS ARCHIVE / {breadcrumb}
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          {classification && (
            <div className="mb-2">
              <ClassificationStamp classification={classification} />
            </div>
          )}
          <h1
            className="text-2xl font-bold tracking-tight font-display"
            style={accentColor ? { color: accentColor } : {}}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 font-code">{subtitle}</p>
          )}
        </div>
        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  );
}

// ============================================================
// SECTION DIVIDER
// ============================================================

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="section-divider">
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// ANALYST NOTE
// ============================================================

export function AnalystNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-amber-900/40 bg-amber-950/20 px-4 py-3 my-4">
      <div className="text-[9px] font-code text-amber-400/60 tracking-[0.2em] uppercase mb-1.5">
        ANALYST NOTE
      </div>
      <div className="text-[13px] font-code text-amber-200/80 leading-relaxed italic">
        {children}
      </div>
    </div>
  );
}

// ============================================================
// STAT ROW
// ============================================================

export function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-baseline gap-3 py-1.5 border-b border-border/50 last:border-0">
      <span className="text-[11px] font-code text-muted-foreground/70 tracking-widest uppercase w-28 flex-shrink-0">
        {label}
      </span>
      <span
        className="text-[13px] font-code text-foreground flex-1"
        style={color ? { color } : {}}
      >
        {value}
      </span>
    </div>
  );
}

// ============================================================
// RELATIONSHIP STATUS BADGE
// ============================================================

export function RelationshipBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    allied: "text-green-400 border-green-900/50 bg-green-950/20",
    hostile: "text-red-400 border-red-900/50 bg-red-950/20",
    unknown: "text-gray-400 border-gray-700/50 bg-gray-900/20",
    complicated: "text-amber-400 border-amber-900/50 bg-amber-950/20",
  };

  return (
    <span
      className={cn(
        "text-[9px] font-code font-bold tracking-widest uppercase px-1.5 py-0.5 border",
        styles[status] || styles.unknown
      )}
    >
      {status.toUpperCase()}
    </span>
  );
}
