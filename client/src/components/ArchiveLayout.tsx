// SILENCER: THE ARSIA MONS ARCHIVE
// ArchiveLayout — persistent sidebar navigation + terminal chrome
// Design: Dark Faction Terminal — left sidebar as secure facility access panel

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { agencies } from "@/data/lore";
import { cn } from "@/lib/utils";
import {
  Home,
  Clock,
  Map,
  FileText,
  AlertTriangle,
  Search,
  Crosshair,
  Info,
  Menu,
  X,
  ChevronRight,
  Radio,
  Shield,
} from "lucide-react";

const navItems = [
  { path: "/", label: "OVERVIEW", icon: Home, section: "ARCHIVE" },
  { path: "/timeline", label: "TIMELINE", icon: Clock, section: "ARCHIVE" },
  { path: "/districts", label: "DISTRICTS", icon: Map, section: "ARCHIVE" },
  { path: "/weapons", label: "EQUIPMENT", icon: Crosshair, section: "ARCHIVE" },
  { path: "/files", label: "CLASSIFIED FILES", icon: FileText, section: "INTELLIGENCE" },
  { path: "/conspiracies", label: "CONSPIRACIES", icon: AlertTriangle, section: "INTELLIGENCE" },
  { path: "/search", label: "SEARCH ARCHIVE", icon: Search, section: "SYSTEM" },
  { path: "/about", label: "ABOUT", icon: Info, section: "SYSTEM" },
];

const factionNavItems = agencies.map((a) => ({
  path: `/agency/${a.id}`,
  label: a.name.toUpperCase(),
  color: a.color,
  id: a.id,
}));

function ClassificationBanner() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-950/30 border-b border-amber-900/30">
      <Shield className="w-3 h-3 text-amber-400 flex-shrink-0" />
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-400/80 font-code">
        RESTRICTED — ANALYST CLEARANCE REQUIRED
      </span>
    </div>
  );
}

function SidebarSection({ title }: { title: string }) {
  return (
    <div className="px-4 pt-5 pb-1">
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40 font-code">
        {title}
      </span>
    </div>
  );
}

interface SidebarLinkProps {
  path: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  isActive: boolean;
  onClick?: () => void;
}

function SidebarLink({ path, label, icon: Icon, color, isActive, onClick }: SidebarLinkProps) {
  const activeColor = color || "#3b82f6";
  return (
    <Link href={path} onClick={onClick}>
      <div
        className={cn(
          "relative flex items-center gap-3 px-4 py-2 mx-2 rounded-sm transition-all duration-150",
          "text-[11px] font-medium tracking-wider uppercase font-code",
          isActive
            ? "bg-accent/60"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
        )}
        style={isActive ? { color: activeColor, textShadow: `0 0 10px ${activeColor}40` } : {}}
      >
        {/* Active indicator bar */}
        {isActive && (
          <div
            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
            style={{ backgroundColor: activeColor }}
          />
        )}
        {Icon ? (
          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
        ) : color ? (
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
          />
        ) : null}
        <span className="flex-1">{label}</span>
        {isActive && <ChevronRight className="w-3 h-3 opacity-50" />}
      </div>
    </Link>
  );
}

interface ArchiveLayoutProps {
  children: React.ReactNode;
}

export default function ArchiveLayout({ children }: ArchiveLayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        `CY-89 // ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const sections: Record<string, typeof navItems> = {};
  navItems.forEach((item) => {
    if (!sections[item.section]) sections[item.section] = [];
    sections[item.section].push(item);
  });

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <div className="w-8 h-8 flex-shrink-0 bg-blue-950/50 rounded flex items-center justify-center">
          <img
            src="/manus-storage/silencer-logo_703dba5e.png"
            alt="Silencer Archive"
            className="w-6 h-6 object-contain opacity-90"
          />
        </div>
        <div>
          <div className="text-[13px] font-bold tracking-[0.15em] uppercase text-foreground font-display">
            SILENCER
          </div>
          <div className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground font-code">
            ARSIA MONS ARCHIVE
          </div>
        </div>
      </div>

      <ClassificationBanner />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section}>
            <SidebarSection title={section} />
            {items.map((item) => (
              <SidebarLink
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                isActive={location === item.path}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </div>
        ))}

        <SidebarSection title="AGENCIES" />
        {factionNavItems.map((item) => (
          <SidebarLink
            key={item.path}
            path={item.path}
            label={item.label}
            color={item.color}
            isActive={location === item.path}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Status footer */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <Radio className="w-3 h-3 text-green-500" />
          <span className="text-[9px] font-code text-green-500 tracking-wider">SIGNAL ACTIVE</span>
        </div>
        <div className="text-[9px] font-code text-muted-foreground/50 tracking-wider">
          {currentTime}
        </div>
        <div className="text-[9px] font-code text-muted-foreground/30 tracking-wider mt-0.5">
          DEAD SIGNAL RELAY NODE 7
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 border-r border-border bg-sidebar overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-64 flex flex-col border-r border-border bg-sidebar",
          "transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-4 h-4" />
        </button>
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-sidebar lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/manus-storage/silencer-logo_703dba5e.png"
              alt=""
              className="w-5 h-5 object-contain opacity-80"
            />
            <span className="text-[12px] font-bold tracking-[0.15em] uppercase font-display">
              SILENCER ARCHIVE
            </span>
          </div>
          <div className="ml-auto text-[9px] font-code text-muted-foreground/50">
            {currentTime}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
