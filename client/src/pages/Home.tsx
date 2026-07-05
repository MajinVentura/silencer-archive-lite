// SILENCER: THE ARSIA MONS ARCHIVE — Home/Overview Page
// Design: Dark Faction Terminal — classified intelligence overview
// The entry point feels like booting into a recovered terminal

import { Link } from "wouter";
import { agencies, timeline, classifiedFiles, conspiracies } from "@/data/lore";
import { ClassificationStamp, FactionBadge, AnalystNote } from "@/components/ArchiveComponents";
import { Clock, AlertTriangle, FileText, ChevronRight, Zap, Shield, Eye } from "lucide-react";

const OPENING_STATEMENT = `This archive was assembled from recovered intelligence files, intercepted transmissions, and field reports submitted before the Colony Year 89 cleansing protocol was activated. Some records are incomplete. Some are corrupted. Some have been deliberately altered by parties unknown.

What you are reading is the closest thing to truth that survived.

The Arsia Mons colony on Mars is governed by a tyrant. Five agencies work to expose its secrets. Agents called Silencers move through the colony's corridors, hacking terminals, stealing files, and killing each other for information that the government would rather bury.

This is what we know. This is what we suspect. This is what we cannot explain.`;

function StatCard({ value, label, color }: { value: string | number; label: string; color?: string }) {
  return (
    <div className="terminal-panel px-4 py-3 border border-border">
      <div
        className="text-2xl font-bold font-display mb-0.5"
        style={color ? { color } : {}}
      >
        {value}
      </div>
      <div className="text-[10px] font-code text-muted-foreground/60 tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
}

function AgencyQuickCard({ agency }: { agency: typeof agencies[0] }) {
  return (
    <Link href={`/agency/${agency.id}`}>
      <div
        className="faction-card terminal-panel p-4 cursor-pointer interactive-scale animate-entry"
        style={{ borderLeftColor: agency.color }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div
            className="text-[14px] font-bold font-display tracking-wide"
            style={{ color: agency.color }}
          >
            {agency.name.toUpperCase()}
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
        </div>
        <div           className="text-[10px] font-code text-muted-foreground/60 tracking-widest uppercase mb-2">
          {agency.codename}
        </div>
        <p           className="text-[12px] font-code text-muted-foreground leading-relaxed line-clamp-2">
          {agency.tagline}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {agency.advantages.map((adv) => (
            <span
              key={adv}
              className="text-[9px] font-code px-1.5 py-0.5 border tracking-wider"
              style={{ borderColor: `${agency.color}30`, color: `${agency.color}80` }}
            >
              {adv}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function RecentTimelineEntry({ entry }: { entry: typeof timeline[0] }) {
  return (
    <div className="flex gap-3 py-3 border-b border-border/50 last:border-0">
      <div className="flex-shrink-0 pt-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-1" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-[9px] font-code text-muted-foreground/50 tracking-wider">
            {entry.year}
          </span>
          <ClassificationStamp classification={entry.classification} />
        </div>
        <div         className="text-[13px] font-display font-medium text-foreground leading-tight">
          {entry.title}
        </div>
        <p           className="text-[12px] font-code text-muted-foreground/80 mt-0.5 leading-relaxed line-clamp-2">
          {entry.summary}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const recentTimeline = timeline.slice(-4).reverse();
  const lockedFiles = classifiedFiles.filter((f) => f.isLocked);
  const unverifiedConspiracies = conspiracies.filter((c) => c.status === "unverified");

  return (
    <div className="min-h-full">
      {/* Hero section */}
      <div
        className="relative border-b border-border overflow-hidden"
        style={{
          background: `linear-gradient(180deg, oklch(0.09 0.015 240) 0%, oklch(0.08 0.01 240) 100%)`,
          backgroundImage: `url(/manus-storage/hero-terminal-bg_95950a83.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative px-6 py-8">
          <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.3em] uppercase mb-3">
            ARSIA MONS ARCHIVE — COLONY YEAR 89 — ACTIVE CLEANSING PROTOCOL
          </div>
          <h1 className="text-4xl font-bold font-display tracking-tight text-foreground mb-2">
            SILENCER
          </h1>
          <div className="text-[13px] font-code text-muted-foreground/60 tracking-[0.15em] uppercase mb-6">
            THE ARSIA MONS INTELLIGENCE ARCHIVE
          </div>
          <div className="max-w-2xl mt-4">
            {OPENING_STATEMENT.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-[13px] font-code text-muted-foreground leading-relaxed mb-3"
              >
                {para}
              </p>
            ))}
          </div>
          <AnalystNote>
            Records marked CANON are drawn directly from the original game source material. Records marked EXPANDED RECORD represent lore extrapolated from canon seeds. Records marked CLASSIFIED contain intelligence of uncertain provenance. Records marked REDACTED have been partially suppressed — hover to reveal.
          </AnalystNote>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px border-b border-border bg-border">
        <StatCard value={5} label="Active Agencies" color="#3b82f6" />
        <StatCard value={timeline.length} label="Timeline Events" color="#06b6d4" />
        <StatCard value={classifiedFiles.length} label="Classified Files" color="#d97706" />
        <StatCard value={conspiracies.length} label="Open Conspiracies" color="#dc2626" />
      </div>

      {/* Game Screenshots — Canon Artifacts */}
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
              RECOVERED VISUAL INTELLIGENCE
            </div>
            <h2 className="text-[15px] font-bold font-display tracking-wide">FIELD CAPTURES — ARSIA MONS COLONY</h2>
          </div>
          <ClassificationStamp classification="CANON" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: "/manus-storage/game-modern-corridor_b5e75b7d.png", caption: "PUBLIC TERMINAL CORRIDOR — SECTOR 4" },
            { src: "/manus-storage/game-modern-hacking_08438222.png", caption: "NOXIS SAFE HOUSE — CYPHER LOCK ACTIVE" },
            { src: "/manus-storage/game-modern-robot_063491bc.png", caption: "GOVERNMENT DEFENSE UNIT — GRID 7" },
            { src: "/manus-storage/game-modern-flamer_0d8a3cec.png", caption: "INCENDIARY ENGAGEMENT — SECTOR 2" },
            { src: "/manus-storage/game-modern-base_bf458508.png", caption: "UNDERGROUND AGENCY BASE — LEVEL 3" },
          ].map((img) => (
            <div key={img.caption} className="border border-border overflow-hidden group">
              <div className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-28 object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="px-2 py-1.5 bg-card/80">
                <div className="text-[8px] font-code text-muted-foreground/40 tracking-wider leading-tight">
                  {img.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left: Agencies */}
        <div className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
                FACTION REGISTRY
              </div>
              <h2 className="text-lg font-bold font-display tracking-wide">THE FIVE AGENCIES</h2>
            </div>
            <ClassificationStamp classification="CANON" />
          </div>
          <p className="text-[13px] font-code text-muted-foreground leading-relaxed mb-5">
            Five competing agencies operate within the Arsia Mons colony. Each sends agents — called Silencers — into the field to hack government terminals and steal secrets. Their origins, methods, and true objectives differ radically. Their conflict defines the colony's political reality.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {agencies.map((agency, i) => (
              <div
                key={agency.id}
                className={`animate-entry-delay-${i + 1}`}
              >
                <AgencyQuickCard agency={agency} />
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Link href="/timeline">
              <div className="terminal-panel border border-border p-3 cursor-pointer hover:bg-accent/20 transition-colors interactive-scale">
                <Clock className="w-4 h-4 text-blue-400 mb-2" />
                <div className="text-[11px] font-display font-bold tracking-wide mb-0.5">TIMELINE</div>
                <div className="text-[10px] font-code text-muted-foreground/50">Colony history</div>
              </div>
            </Link>
            <Link href="/files">
              <div className="terminal-panel border border-border p-3 cursor-pointer hover:bg-accent/20 transition-colors interactive-scale">
                <FileText className="w-4 h-4 text-amber-400 mb-2" />
                <div className="text-[11px] font-display font-bold tracking-wide mb-0.5">FILES</div>
                <div className="text-[10px] font-code text-muted-foreground/50">Classified docs</div>
              </div>
            </Link>
            <Link href="/conspiracies">
              <div className="terminal-panel border border-border p-3 cursor-pointer hover:bg-accent/20 transition-colors interactive-scale">
                <AlertTriangle className="w-4 h-4 text-red-400 mb-2" />
                <div className="text-[11px] font-display font-bold tracking-wide mb-0.5">CONSPIRACIES</div>
                <div className="text-[10px] font-code text-muted-foreground/50">Open questions</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right: Intelligence feed */}
        <div className="p-6">
          <div className="mb-4">
            <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
              INTELLIGENCE FEED
            </div>
            <h2 className="text-[15px] font-bold font-display tracking-wide">RECENT EVENTS</h2>
          </div>
          <div className="mb-6">
            {recentTimeline.map((entry) => (
              <RecentTimelineEntry key={entry.id} entry={entry} />
            ))}
            <Link href="/timeline">
              <div className="flex items-center gap-1.5 mt-3 text-[10px] font-code text-blue-400/70 hover:text-blue-400 transition-colors cursor-pointer">
                <span>VIEW FULL TIMELINE</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          </div>

          {/* Lore Status */}
          <div className="border-t border-border pt-4 mb-4">
            <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-3">
              ARCHIVE STATUS
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2 bg-red-950/20 border border-red-900/30">
                <Zap className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-code text-red-400 font-bold tracking-wider">IN-WORLD: CLEANSING PROTOCOL</div>
                  <div className="text-[11px] font-code text-muted-foreground/70 mt-0.5">The colony government has issued elimination orders. This is the lore setting of the archive.</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-amber-950/20 border border-amber-900/30">
                <FileText className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-code text-amber-400 font-bold tracking-wider">
                    {lockedFiles.length} ENCRYPTED LORE ENTRIES
                  </div>
                  <div className="text-[11px] font-code text-muted-foreground/70 mt-0.5">Some classified files contain hidden text — hover over blacked-out passages to reveal them.</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-violet-950/20 border border-violet-900/30">
                <Eye className="w-3 h-3 text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-code text-violet-400 font-bold tracking-wider">
                    {unverifiedConspiracies.length} OPEN CONSPIRACY THREADS
                  </div>
                  <div className="text-[11px] font-code text-muted-foreground/70 mt-0.5">Unresolved mysteries in the Conspiracies section — intentionally left unanswered.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mars surface image */}
          <div className="border border-border overflow-hidden">
            <img
              src="/manus-storage/mars-surface_81e2b867.png"
              alt="Arsia Mons surface"
              className="w-full h-32 object-cover opacity-60"
            />
            <div className="px-3 py-2 bg-card/80">
              <div className="text-[9px] font-code text-muted-foreground/40 tracking-wider">
                ARSIA MONS — SURFACE GRID 90-NORTH — COLONY YEAR 89
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
