import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import FractionsModule from "@/pages/module/fractions";
import DecimalsModule from "@/pages/module/decimals";
import GeometryModule from "@/pages/module/geometry";
import DataHandlingModule from "@/pages/module/data-handling";
import TimeModule from "@/pages/module/time";
import AlgebraicOperationsModule from "@/pages/module/algebraic-operations";
import PlaceValueModule from "@/pages/module/place-value";
import LcmHcfModule from "@/pages/module/lcm-hcf";
import SquaresModule from "@/pages/module/squares";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ChallengePage from "@/pages/challenge/ChallengePage";
import SessionPage from "@/pages/SessionPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/module/number-magic" component={AlgebraicOperationsModule} />
      <Route path="/module/number-building" component={PlaceValueModule} />
      <Route path="/module/number-families" component={LcmHcfModule} />
      <Route path="/module/square-world" component={SquaresModule} />
      <Route path="/module/fractions" component={FractionsModule} />
      <Route path="/module/decimals" component={DecimalsModule} />
      <Route path="/module/geometry" component={GeometryModule} />
      <Route path="/module/data-handling" component={DataHandlingModule} />
      <Route path="/module/time" component={TimeModule} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/module/:moduleId/challenge" component={ChallengePage} />
      <Route path="/session" component={SessionPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gradient-to-br from-skyblue via-turquoise to-mint">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
