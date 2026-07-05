// SILENCER: THE ARSIA MONS ARCHIVE
// Design: Dark Faction Terminal — faction-chromatic identity, classified dossier aesthetic
// Routes: Home, Agencies (5), Timeline, Districts, Files, Conspiracies, Search

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ArchiveLayout from "./components/ArchiveLayout";
import Home from "./pages/Home";
import AgencyPage from "./pages/AgencyPage";
import TimelinePage from "./pages/TimelinePage";
import DistrictsPage from "./pages/DistrictsPage";
import FilesPage from "./pages/FilesPage";
import ConspiraciesPage from "./pages/ConspiraciesPage";
import SearchPage from "./pages/SearchPage";
import WeaponsPage from "./pages/WeaponsPage";
import AboutPage from "./pages/AboutPage";

function Router() {
  return (
    <ArchiveLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/agency/:id" component={AgencyPage} />
        <Route path="/timeline" component={TimelinePage} />
        <Route path="/districts" component={DistrictsPage} />
        <Route path="/files" component={FilesPage} />
        <Route path="/conspiracies" component={ConspiraciesPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/weapons" component={WeaponsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </ArchiveLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
