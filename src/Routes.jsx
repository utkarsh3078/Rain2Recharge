import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import UserProfileProgressTracking from "./pages/user-profile-progress-tracking";
import Homepage from "./pages/homepage-smart-water-platform";
import DetailedReportRecommendations from "./pages/detailed-report-recomendations";
import AssessmentDashboard from "./pages/assessment-dashboard-location-analysis";
import AIAssistantWaterBuddyInterface from "./pages/ai-assistant-water-buddy-interface";
import SolutionMarketplace from "./pages/solution-marketplace-vendor-directory";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route
            path="/user-profile-progress-tracking"
            element={<AIAssistantWaterBuddyInterface />}
          />
          <Route
            path="/user-profile-progress-tracking"
            element={<UserProfileProgressTracking />}
          />
          <Route path="/" element={<Homepage />} />
          <Route
            path="/detailed-report-recommendations"
            element={<DetailedReportRecommendations />}
          />
          <Route
            path="/assessment-dashboard-location-analysis"
            element={<AssessmentDashboard />}
          />
          <Route
            path="/ai-assistant-water-buddy-interface"
            element={<AIAssistantWaterBuddyInterface />}
          />
          <Route
            path="/solution-marketplace-vendor-directory"
            element={<SolutionMarketplace />}
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
