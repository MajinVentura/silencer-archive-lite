// SILENCER: THE ARSIA MONS ARCHIVE — About Page
import { AnalystNote } from "@/components/ArchiveComponents";
import { ExternalLink } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-full">
      <div className="border-b border-border px-6 py-5 bg-card/50">
        <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-1">
          ARSIA MONS ARCHIVE / ABOUT
        </div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground mb-1">
          ABOUT THIS ARCHIVE
        </h1>
      </div>

      <div className="p-6 max-w-2xl space-y-6">
        {/* Canon disclaimer */}
        <div className="terminal-panel border border-border p-5">
          <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-3">
            CANON DISCLAIMER
          </div>
          <p className="text-[12px] font-code text-muted-foreground/75 leading-relaxed mb-3">
            <strong className="text-foreground/90">Silencer</strong> is a real video game developed by Mind Control Software and published by WON.net in January 2000. It was released as an open beta and removed from WON.net in September 2000 without explanation. The multiplayer servers shut down in October 2000.
          </p>
          <p className="text-[12px] font-code text-muted-foreground/75 leading-relaxed mb-3">
            The game is set on Mars at the Arsia Mons colony. Five agencies — Noxis, Static, Caliber, Lazarus, and Black Rose — compete to steal government secrets. Agents called Silencers hack terminals, use disguises, and fight each other for intelligence.
          </p>
          <p className="text-[12px] font-code text-muted-foreground/75 leading-relaxed">
            The game was never officially reviewed (it was still in open beta when removed), spawned a small but dedicated fan community, and was later partially cloned as O2/Cypher and zSILENCER.
          </p>
        </div>

        {/* About this project */}
        <div className="terminal-panel border border-border p-5">
          <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-3">
            ABOUT THIS PROJECT
          </div>
          <p className="text-[12px] font-code text-muted-foreground/75 leading-relaxed mb-3">
            This archive is a worldbuilding project that treats Silencer as a lost sci-fi artifact. It uses the original game as canon seed material and expands the lore into a serious dark science fiction setting — with the depth of a cult classic that never got to be one.
          </p>
          <p className="text-[12px] font-code text-muted-foreground/75 leading-relaxed mb-3">
            Records marked <span className="stamp-canon">CANON</span> are drawn directly from the game's source material: the Wikipedia article, the in-game agency bio screens, and gameplay documentation. Records marked <span className="stamp-expanded">EXPANDED RECORD</span> are original lore extrapolated from canon seeds. Records marked <span className="stamp-classified">CLASSIFIED</span> or <span className="stamp-rumor">UNVERIFIED</span> are pure invention.
          </p>
          <p className="text-[12px] font-code text-muted-foreground/75 leading-relaxed">
            The goal is to make the new lore feel like it was always hidden inside the game — as if the game's abrupt disappearance from WON.net in September 2000 was itself a lore event.
          </p>
        </div>

        <AnalystNote>
          The game's removal from WON.net was never explained. Mind Control Software announced their closure on May 26, 2000 — four months before Silencer was removed. The gap between those two events is one of the archive's founding mysteries. Why did the game continue to run after the developer closed? Who was maintaining it? Why was it removed without announcement?
        </AnalystNote>

        {/* Real-world links */}
        <div className="terminal-panel border border-border p-5">
          <div className="text-[9px] font-code text-muted-foreground/40 tracking-[0.2em] uppercase mb-3">
            REAL-WORLD RESOURCES
          </div>
          <div className="space-y-2">
            {[
              { label: "Wikipedia — Silencer (video game)", href: "https://en.wikipedia.org/wiki/Silencer_(video_game)" },
              { label: "zSILENCER — Open-source clone", href: "https://github.com/zsilencer" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[12px] font-code text-blue-400/70 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Version */}
        <div className="text-[9px] font-code text-muted-foreground/30 tracking-widest">
          ARCHIVE VERSION 0.1.0 — COLONY YEAR 89 — DEAD SIGNAL RELAY NODE 7
        </div>
      </div>
    </div>
  );
}
