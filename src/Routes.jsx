import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CommunityForums from './pages/community-forums';
import KnowledgeRepository from './pages/knowledge-repository';
import DiseaseDetectionLab from './pages/disease-detection-lab';
import FarmerDashboard from './pages/farmer-dashboard';
import MobileOnboarding from './pages/mobile-onboarding';
import ExpertNetwork from './pages/expert-network';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MobileOnboarding />} />
        <Route path="/community-forums" element={<CommunityForums />} />
        <Route path="/knowledge-repository" element={<KnowledgeRepository />} />
        <Route path="/disease-detection-lab" element={<DiseaseDetectionLab />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/mobile-onboarding" element={<MobileOnboarding />} />
        <Route path="/expert-network" element={<ExpertNetwork />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
