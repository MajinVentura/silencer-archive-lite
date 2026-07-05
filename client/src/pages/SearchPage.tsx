// SILENCER: THE ARSIA MONS ARCHIVE — Search Page
import { useState, useMemo } from "react";
import { agencies, timeline, classifiedFiles, conspiracies, districts } from "@/data/lore";
import { ClassificationStamp, FactionBadge } from "@/components/ArchiveComponents";
import type { FactionId } from "@/data/lore";
import { Search, FileText, Clock, AlertTriangle, Map, Shield } from "lucide-react";
import { Link } from "wouter";

type ResultType = "agency" | "timeline" | "file" | "conspiracy" | "district";

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  summary: string;
  href: string;
  factions?: FactionId[];
  classification?: string;
}

const typeConfig: Record<ResultType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  agency: { label: "AGENCY", icon: Shield, color: "#3b82f6" },
  timeline: { label: "TIMELINE", icon: Clock, color: "#06b6d4" },
  file: { label: "FILE", icon: FileText, color: "#d97706" },
  conspiracy: { label: "CONSPIRACY", icon: AlertTriangle, color: "#dc2626" },
  district: { label: "DISTRICT", icon: Map, color: "#8b5cf6" },
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  agencies.forEach((a) => {
    results.push({
      id: `agency-${a.id}`,
      type: "agency",
      title: a.name,
      summary: a.tagline,
      href: `/agency/${a.id}`,
      factions: [a.id],
      classification: "CANON",
    });
  });

  timeline.forEach((e) => {
    results.push({
      id: `timeline-${e.id}`,
      type: "timeline",
      title: e.title,
      summary: `${e.year} — ${e.summary}`,
      href: "/timeline",
      factions: e.factions,
      classification: e.classification,
    });
  });

  classifiedFiles.forEach((f) => {
    results.push({
      id: `file-${f.id}`,
      type: "file",
      title: f.title,
      summary: f.isLocked ? "[ENCRYPTED — ANALYST CLEARANCE REQUIRED]" : f.content.slice(0, 120) + "...",
      href: "/files",
      factions: f.relatedFactions,
      classification: f.classification,
    });
  });

  conspiracies.forEach((c) => {
    results.push({
      id: `conspiracy-${c.id}`,
      type: "conspiracy",
      title: c.title,
      summary: c.summary,
      href: "/conspiracies",
      factions: c.factions,
      classification: c.classification,
    });
  });

  districts.forEach((d) => {
    results.push({
      id: `district-${d.id}`,
      type: "district",
      title: d.name,
      summary: d.description.slice(0, 120) + "...",
      href: "/districts",
      classification: d.classification,
    });
  });

  return results;
}

const searchIndex = buildIndex();

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<ResultType[]>([]);

  const results = useMemo(() => {
    if (!query.trim() && selectedTypes.length === 0) return [];
    const q = query.toLowerCase();
    return searchIndex.filter((r) => {
      const matchesQuery = !q || r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(r.type);
      return matchesQuery && matchesType;
    });
  }, [query, selectedTypes]);

  function toggleType(type: ResultType) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  return (
    <div className="min-h-full">
      <div className="border-b border-border px-6 py-5 bg-card/50">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / SEARCH
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground mb-1">
          SEARCH ARCHIVE
        </h1>
        <p className="text-[12px] font-code text-muted-foreground/60">
          Full-text search across all archive records. Results include agencies, timeline events, classified files, conspiracies, and districts.
        </p>
      </div>

      <div className="p-6 max-w-3xl">
        {/* Search input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agencies, events, files, conspiracies..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border text-[13px] font-code text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-blue-500/50 transition-colors"
            autoFocus
          />
        </div>

        {/* Type filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(Object.entries(typeConfig) as [ResultType, typeof typeConfig[ResultType]][]).map(([type, cfg]) => {
            const Icon = cfg.icon;
            const active = selectedTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className="flex items-center gap-1.5 text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors"
                style={active ? {
                  borderColor: `${cfg.color}50`,
                  color: cfg.color,
                  backgroundColor: `${cfg.color}10`,
                } : {}}
              >
                <Icon className="w-3 h-3" />
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-2">
            <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-3">
              {results.length} RESULT{results.length !== 1 ? "S" : ""} FOUND
            </div>
            {results.map((result) => {
              const cfg = typeConfig[result.type];
              const Icon = cfg.icon;
              return (
                <Link key={result.id} href={result.href}>
                  <div className="flex gap-3 px-4 py-3 border border-border hover:bg-accent/20 transition-colors cursor-pointer animate-entry">
                    <div className="flex-shrink-0 mt-0.5" style={{ color: cfg.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span
                          className="text-[9px] font-code font-bold tracking-widest uppercase"
                          style={{ color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                        {result.classification && (
                          <ClassificationStamp classification={result.classification as any} />
                        )}
                      </div>
                      <div className="text-[12px] font-display font-bold text-foreground/80 mb-0.5">
                        {result.title}
                      </div>
                      <p className="text-[11px] font-code text-muted-foreground/55 leading-relaxed line-clamp-2">
                        {result.summary}
                      </p>
                      {result.factions && result.factions.length > 0 && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {result.factions.slice(0, 3).map((f) => (
                            <FactionBadge key={f} factionId={f} size="sm" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : query.trim() ? (
          <div className="text-center py-12">
            <div className="text-[11px] font-code text-muted-foreground/30 tracking-widest uppercase">
              NO RECORDS FOUND — QUERY: "{query}"
            </div>
            <div className="text-[10px] font-code text-muted-foreground/20 mt-2">
              The record may be classified, deleted, or may never have existed.
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
            <div className="text-[11px] font-code text-muted-foreground/30 tracking-widest uppercase">
              ENTER SEARCH QUERY
            </div>
            <div className="text-[10px] font-code text-muted-foreground/20 mt-2">
              {searchIndex.length} RECORDS INDEXED
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
