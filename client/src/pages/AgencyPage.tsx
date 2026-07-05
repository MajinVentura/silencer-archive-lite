// SILENCER: THE ARSIA MONS ARCHIVE — Agency Dossier Page
// Design: Dark Faction Terminal — faction color bleeds through entire page
// Each agency has its own chromatic identity

import { useState } from "react";
import { useParams, Link } from "wouter";
import { agencies } from "@/data/lore";
import {
  ClassificationStamp,
  FactionBadge,
  LoreCard,
  PageHeader,
  SectionDivider,
  AnalystNote,
  StatRow,
  RelationshipBadge,
} from "@/components/ArchiveComponents";
import { ChevronLeft, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "overview" | "operatives" | "relationships" | "secrets" | "equipment";

export default function AgencyPage() {
  const params = useParams<{ id: string }>();
  const agency = agencies.find((a) => a.id === params.id);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [showSecretHistory, setShowSecretHistory] = useState(false);
  const [expandedMyths, setExpandedMyths] = useState<number[]>([]);

  if (!agency) {
    return (
      <div className="p-6">
        <div className="text-red-400 font-code text-sm">AGENCY NOT FOUND — RECORD MAY BE CLASSIFIED OR DELETED</div>
        <Link href="/">
          <div className="mt-3 text-[11px] font-code text-blue-400/70 hover:text-blue-400 cursor-pointer flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" />
            RETURN TO ARCHIVE
          </div>
        </Link>
      </div>
    );
  }

  // Map agency IDs to their uploaded bio screenshots
  const agencyBioScreenshots: Record<string, string> = {
    noxis: "/manus-storage/AgencyBio-Noxis_60c9c037.png",
    static: "/manus-storage/AgencyBio-Static_e7eacac6.png",
    caliber: "/manus-storage/AgencyBio-Caliber_a5990ad0.png",
    lazarus: "/manus-storage/AgencyBio-Lazarus_1114196c.png",
    blackrose: "/manus-storage/AgencyBio-BlackRose_0ac9c2d1.png",
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "OVERVIEW" },
    { id: "operatives", label: "OPERATIVES" },
    { id: "relationships", label: "RELATIONS" },
    { id: "secrets", label: "SECRET HISTORY" },
    { id: "equipment", label: "EQUIPMENT" },
  ];

  const toggleMyth = (i: number) => {
    setExpandedMyths((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div className="min-h-full">
      {/* Faction-tinted header */}
      <div
        className="border-b border-border"
        style={{
          background: `linear-gradient(135deg, ${agency.colorDim}15 0%, oklch(0.09 0.012 240) 60%)`,
        }}
      >
        <div className="px-6 py-5">
          <Link href="/">
            <div className="flex items-center gap-1 text-[10px] font-code text-muted-foreground/40 hover:text-muted-foreground/70 cursor-pointer mb-4 transition-colors">
              <ChevronLeft className="w-3 h-3" />
              ARCHIVE / AGENCIES
            </div>
          </Link>

          <div className="flex items-start gap-4">
            {/* Faction color block */}
            <div
              className="w-1 self-stretch rounded-full flex-shrink-0"
              style={{ backgroundColor: agency.color }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <ClassificationStamp classification="CANON" />
                <span className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase">
                  CODENAME: {agency.codename}
                </span>
              </div>
              <h1
                className="text-3xl font-bold font-display tracking-tight mb-1"
                style={{ color: agency.color, textShadow: `0 0 30px ${agency.color}30` }}
              >
                {agency.name.toUpperCase()}
              </h1>
              <p
                className="text-[13px] font-code italic mb-4"
                style={{ color: `${agency.color}80` }}
              >
                "{agency.tagline}"
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="terminal-panel border border-border px-3 py-2">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">SPECIAL ABILITY</div>
                  <div className="text-[12px] font-code text-foreground">{agency.specialAbility.split("—")[0].trim()}</div>
                </div>
                <div className="terminal-panel border border-border px-3 py-2">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">FOUNDED</div>
                  <div className="text-[12px] font-code text-foreground">{agency.founded}</div>
                </div>
                <div className="terminal-panel border border-border px-3 py-2">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">KNOWN OPERATIVES</div>
                  <div className="text-[12px] font-code" style={{ color: agency.color }}>{agency.knownOperatives.length} ON RECORD</div>
                </div>
                <div className="terminal-panel border border-border px-3 py-2">
                  <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1">EQUIPMENT</div>
                  <div className="text-[12px] font-code" style={{ color: agency.color }}>{agency.equipment.length} ITEMS</div>
                </div>
              </div>

              {/* Advantages */}
              <div className="flex flex-wrap gap-2">
                {agency.advantages.map((adv) => (
                  <span
                    key={adv}
                    className="text-[10px] font-code px-2 py-1 border font-bold tracking-wider"
                    style={{ borderColor: `${agency.color}40`, color: agency.color, background: `${agency.color}10` }}
                  >
                    {adv}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2.5 text-[10px] font-code font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-150 border-b-2",
                activeTab === tab.id
                  ? "border-b-2 text-foreground"
                  : "border-transparent text-muted-foreground/50 hover:text-muted-foreground"
              )}
              style={activeTab === tab.id ? { borderBottomColor: agency.color, color: agency.color } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-5 max-w-4xl animate-entry">
            {/* Canon bio */}
            <LoreCard
              title="OFFICIAL DOSSIER — CANON RECORD"
              classification="CANON"
              accentFaction={agency.id}
            >
              <p className="text-[13px] font-code text-muted-foreground leading-relaxed">
                {agency.canonBio}
              </p>
            </LoreCard>

            {/* Expanded bio */}
            <LoreCard
              title="EXPANDED INTELLIGENCE RECORD"
              classification="EXPANDED"
              accentFaction={agency.id}
            >
              {agency.expandedBio.split("\n\n").map((para, i) => (
                <p key={i} className="text-[13px] font-code text-muted-foreground leading-relaxed mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </LoreCard>

            {/* Structure & Doctrine */}
            <div className="grid md:grid-cols-2 gap-4">
              <LoreCard title="ORGANIZATIONAL STRUCTURE" classification="EXPANDED" accentFaction={agency.id}>
                <p className="text-[13px] font-code text-muted-foreground leading-relaxed">
                  {agency.structure}
                </p>
              </LoreCard>
              <LoreCard title="OPERATIONAL DOCTRINE" classification="EXPANDED" accentFaction={agency.id}>
                <p className="text-[13px] font-code text-muted-foreground leading-relaxed italic">
                  "{agency.doctrine}"
                </p>
              </LoreCard>
            </div>

            {/* Myths */}
            <div>
              <SectionDivider label="AGENCY MYTHS — UNVERIFIED" />
              <div className="space-y-2">
                {agency.myths.map((myth, i) => (
                  <div
                    key={i}
                    className="border border-border bg-card/50 cursor-pointer hover:bg-accent/20 transition-colors"
                    onClick={() => toggleMyth(i)}
                  >
                    <div className="flex items-start gap-3 px-4 py-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <span className="stamp-rumor">RUMOR</span>
                      </div>
                      <p className="text-[12px] font-code text-muted-foreground/70 leading-relaxed flex-1">
                        {myth}
                      </p>
                      {expandedMyths.includes(i) ? (
                        <ChevronUp className="w-3.5 h-3.5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    {expandedMyths.includes(i) && (
                      <div className="px-4 pb-3 animate-entry">
                        <AnalystNote>
                          This claim has not been verified by any confirmed intelligence source. It may be disinformation, urban legend, or a truth that the relevant parties have suppressed. Treat with appropriate skepticism.
                        </AnalystNote>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Urban legends */}
            <div>
              <SectionDivider label="URBAN LEGENDS" />
              <div className="space-y-2">
                {agency.urbanLegends.map((legend, i) => (
                  <div key={i} className="flex gap-3 px-4 py-3 border border-border/50 bg-card/30">
                    <div
                      className="w-0.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: `${agency.color}40` }}
                    />
                    <p className="text-[13px] font-code text-muted-foreground/80 leading-relaxed italic">
                      {legend}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Canon Bio Screenshot */}
            {agencyBioScreenshots[agency.id] && (
              <div>
                <SectionDivider label="ORIGINAL GAME RECORD — CANON ARTIFACT" />
                <div className="border border-border overflow-hidden">
                  <img
                    src={agencyBioScreenshots[agency.id]}
                    alt={`${agency.name} agency bio screen`}
                    className="w-full max-w-lg object-cover opacity-90"
                  />
                  <div className="px-3 py-2 bg-card/80 flex items-center justify-between">
                    <div className="text-[9px] font-code text-muted-foreground/40 tracking-wider">
                      IN-GAME AGENCY SELECTION SCREEN — SILENCER v0110 — WON.NET BETA
                    </div>
                    <ClassificationStamp classification="CANON" />
                  </div>
                </div>
              </div>
            )}

            {/* Propaganda */}
            {agency.propaganda && (
              <div>
                <SectionDivider label="RECOVERED PROPAGANDA" />
                <div
                  className="border-l-2 px-4 py-3 bg-card/30"
                  style={{ borderLeftColor: agency.color }}
                >
                  <pre className="text-[13px] font-code text-muted-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {agency.propaganda}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* OPERATIVES TAB */}
        {activeTab === "operatives" && (
          <div className="space-y-4 max-w-3xl animate-entry">
            <div className="text-[13px] font-code text-muted-foreground/80 leading-relaxed mb-4">
              The following operative records were recovered from intercepted intelligence files. Identities are codename-only. Real identities are unknown or classified.
            </div>
            {agency.knownOperatives.map((op) => (
              <LoreCard
                key={op.codename}
                title={op.codename}
                classification={op.classification}
                accentFaction={agency.id}
                date={`STATUS: ${op.status.toUpperCase()}`}
              >
                <div className="space-y-2">
                  <StatRow label="AGENCY" value={agency.name.toUpperCase()} color={agency.color} />
                  <StatRow label="STATUS" value={op.status.toUpperCase()} color={
                    op.status === "active" ? "#4ade80" :
                    op.status === "deceased" ? "#f87171" :
                    op.status === "missing" ? "#fbbf24" :
                    op.status === "turned" ? "#a78bfa" : "#6b7280"
                  } />
                  {op.lastKnownLocation && (
                    <StatRow label="LAST KNOWN" value={op.lastKnownLocation} />
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-[13px] font-code text-muted-foreground leading-relaxed">
                    {op.bio}
                  </p>
                </div>
                {op.notableActions && (
                  <div className="mt-3">
                    <div className="text-[9px] font-code text-muted-foreground/40 tracking-widest uppercase mb-1.5">NOTABLE ACTIONS</div>
                    <p className="text-[13px] font-code text-muted-foreground/80 leading-relaxed">
                      {op.notableActions}
                    </p>
                  </div>
                )}
              </LoreCard>
            ))}
          </div>
        )}

        {/* RELATIONSHIPS TAB */}
        {activeTab === "relationships" && (
          <div className="space-y-3 max-w-3xl animate-entry">
            <div className="text-[13px] font-code text-muted-foreground/80 leading-relaxed mb-4">
              Inter-agency relationships as assessed by archive analysts. Status designations are approximate — all agency relationships are subject to change without notice.
            </div>
            {agency.relationships.map((rel) => {
              const relAgency = agencies.find((a) => a.id === rel.agency);
              return (
                <div
                  key={rel.agency}
                  className="faction-card terminal-panel p-4"
                  style={{ borderLeftColor: relAgency?.color || "#4b5563" }}
                >
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {relAgency ? (
                      <FactionBadge factionId={rel.agency} />
                    ) : (
                      <span className="text-[10px] font-code font-bold text-muted-foreground uppercase">
                        {rel.agency.toUpperCase()}
                      </span>
                    )}
                    <RelationshipBadge status={rel.status} />
                  </div>
                  <p className="text-[13px] font-code text-muted-foreground/90 leading-relaxed">
                    {rel.note}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* SECRETS TAB */}
        {activeTab === "secrets" && (
          <div className="max-w-3xl animate-entry">
            <div className="text-[13px] font-code text-muted-foreground/80 leading-relaxed mb-4">
              The following record contains intelligence that the agency in question has actively suppressed. These are expanded lore entries — not real access restrictions.
            </div>
            <LoreCard
              title="SECRET HISTORY — CLASSIFIED RECORD"
              classification="CLASSIFIED"
              accentFaction={agency.id}
            >
              {agency.secretHistory.split("\n\n").map((para, i) => (
                <p key={i} className="text-[13px] font-code text-muted-foreground leading-relaxed mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </LoreCard>

            {/* Reveal button for secret history */}
            <div className="mt-4">
              <button
                onClick={() => setShowSecretHistory(!showSecretHistory)}
                className="flex items-center gap-2 text-[10px] font-code tracking-widest uppercase transition-colors"
                style={{ color: showSecretHistory ? agency.color : undefined }}
              >
                {showSecretHistory ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showSecretHistory ? "COLLAPSE ANALYST ASSESSMENT" : "EXPAND ANALYST ASSESSMENT"}
              </button>
              {showSecretHistory && (
                <div className="mt-3 animate-entry">
                  <AnalystNote>
                    The secret history of {agency.name} represents the gap between what the agency presents publicly and what the archive has been able to reconstruct from recovered documents. The accuracy of this record cannot be guaranteed. Some details may be disinformation planted by the agency itself.
                  </AnalystNote>
                </div>
              )}
            </div>
          </div>
        )}

        {/* EQUIPMENT TAB */}
        {activeTab === "equipment" && (
          <div className="space-y-4 max-w-3xl animate-entry">
            <div className="text-[13px] font-code text-muted-foreground/80 leading-relaxed mb-4">
              Equipment records for {agency.name} operatives. Agency-exclusive items are marked. General equipment available to all agencies is documented in the Equipment Registry.
            </div>
            {agency.equipment.map((item) => (
              <LoreCard
                key={item.name}
                title={item.name}
                classification={item.classification}
                accentFaction={agency.id}
                tags={[item.type, item.agencyExclusive ? "AGENCY EXCLUSIVE" : "GENERAL"]}
              >
                <p className="text-[13px] font-code text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </LoreCard>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <Link href="/weapons">
                <div className="text-[10px] font-code text-blue-400/70 hover:text-blue-400 cursor-pointer flex items-center gap-1 transition-colors">
                  VIEW FULL EQUIPMENT REGISTRY →
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
