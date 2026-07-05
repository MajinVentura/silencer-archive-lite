// SILENCER: THE ARSIA MONS ARCHIVE — Classified Files Page
import { useState } from "react";
import { classifiedFiles } from "@/data/lore";
import { ClassificationStamp, FactionBadge, LoreCard } from "@/components/ArchiveComponents";
import type { FactionId } from "@/data/lore";
import { Lock, Unlock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FilesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [filterLocked, setFilterLocked] = useState<boolean | null>(null);

  const filtered = filterLocked === null
    ? classifiedFiles
    : classifiedFiles.filter((f) => f.isLocked === filterLocked);

  const selected = classifiedFiles.find((f) => f.id === selectedId);
  const isUnlocked = selectedId ? unlockedIds.includes(selectedId) : false;

  function handleUnlock(id: string) {
    setUnlockedIds((prev) => [...prev, id]);
  }

  return (
    <div className="min-h-full">
      <div className="border-b border-border px-6 py-5 bg-card/50">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / CLASSIFIED FILES
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground mb-1">
          CLASSIFIED FILES
        </h1>
        <p className="text-[13px] font-code text-muted-foreground/80">
          Recovered intelligence documents. Some files contain hidden text — click DECRYPT to reveal blurred lore passages.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 px-6 py-3 border-b border-border">
        <button
          onClick={() => setFilterLocked(null)}
          className={cn(
            "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors",
            filterLocked === null
              ? "border-blue-500/50 text-blue-400 bg-blue-950/20"
              : "border-border text-muted-foreground/50 hover:text-muted-foreground"
          )}
        >
          ALL FILES ({classifiedFiles.length})
        </button>
        <button
          onClick={() => setFilterLocked(false)}
          className={cn(
            "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors",
            filterLocked === false
              ? "border-green-500/50 text-green-400 bg-green-950/20"
              : "border-border text-muted-foreground/50 hover:text-muted-foreground"
          )}
        >
          <Unlock className="w-3 h-3 inline mr-1" />
          OPEN ({classifiedFiles.filter((f) => !f.isLocked).length})
        </button>
        <button
          onClick={() => setFilterLocked(true)}
          className={cn(
            "text-[10px] font-code font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors",
            filterLocked === true
              ? "border-amber-500/50 text-amber-400 bg-amber-950/20"
              : "border-border text-muted-foreground/50 hover:text-muted-foreground"
          )}
        >
          <Lock className="w-3 h-3 inline mr-1" />
          LOCKED ({classifiedFiles.filter((f) => f.isLocked).length})
        </button>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: "calc(100vh - 180px)" }}>
        {/* File list */}
        <div className="lg:w-72 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto">
          {filtered.map((file) => {
            const unlocked = unlockedIds.includes(file.id);
            return (
              <button
                key={file.id}
                onClick={() => setSelectedId(file.id)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-border/50 transition-colors",
                  selectedId === file.id ? "bg-accent/40" : "hover:bg-accent/20"
                )}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    {file.isLocked && !unlocked ? (
                      <Lock className="w-3 h-3 text-amber-400/60" />
                    ) : (
                      <FileText className="w-3 h-3 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-display font-bold tracking-wide text-foreground leading-tight mb-0.5">
                      {file.title}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <ClassificationStamp classification={file.classification} />
                      <span className="text-[9px] font-code text-muted-foreground/30 tracking-wider">
                        {file.date}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* File viewer */}
        <div className="flex-1 overflow-y-auto p-6">
          {selected ? (
            <div className="max-w-2xl animate-entry">
              {/* File header */}
              <div className="border border-border bg-card/50 p-4 mb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <ClassificationStamp classification={selected.classification} />
                      <span className="text-[9px] font-code text-muted-foreground/40 tracking-wider">
                        {selected.date}
                      </span>
                    </div>
                    <h2 className="text-[15px] font-display font-bold tracking-wide text-foreground">
                      {selected.title}
                    </h2>
                  </div>
                  {selected.isLocked && !isUnlocked && (
                    <button
                      onClick={() => handleUnlock(selected.id)}
                      className="flex items-center gap-1.5 text-[10px] font-code text-amber-400 hover:text-amber-300 border border-amber-900/40 px-2 py-1.5 transition-colors bg-amber-950/20"
                    >
                      <Lock className="w-3 h-3" />
                      DECRYPT
                    </button>
                  )}
                  {selected.isLocked && isUnlocked && (
                    <div className="flex items-center gap-1.5 text-[10px] font-code text-green-400 border border-green-900/40 px-2 py-1.5 bg-green-950/20">
                      <Unlock className="w-3 h-3" />
                      DECRYPTED
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div>
                    <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase">AUTHOR: </span>
                    <span className="text-[12px] font-code text-muted-foreground/80">{selected.author}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {selected.relatedFactions.map((f) => (
                      <FactionBadge key={f} factionId={f as FactionId} size="sm" />
                    ))}
                  </div>
                </div>
              </div>

              {/* File content */}
              <div
                className={cn(
                  "border border-border bg-card/30 p-5 transition-all duration-300",
                  selected.isLocked && !isUnlocked && "blur-sm select-none"
                )}
              >
                <pre className="text-[13px] font-code text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {selected.content}
                </pre>
              </div>

              {/* Tags */}
              {selected.tags.length > 0 && (
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-code text-muted-foreground/30 tracking-wider uppercase px-1.5 py-0.5 border border-border/30">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
                <div className="text-[11px] font-code text-muted-foreground/30 tracking-widest uppercase">
                  SELECT A FILE TO VIEW
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
