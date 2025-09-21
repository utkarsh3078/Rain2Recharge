import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ImpactMetrics from './components/ImpactMetrics';
import AssessmentLauncher from './components/AssessmentLauncher';
import SuccessStories from './components/SuccessStories';
import InteractiveInfographics from './components/InteractiveInfographics';
import AIAssistantPreview from './components/AIAssistantPreview';
import TrustSignals from './components/TrustSignals';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Rain2Recharge - Smart Water Sustainability Platform | AI-Powered Rainwater Harvesting Solutions</title>
        <meta 
          name="description" 
          content="Transform your property with AI-powered water sustainability solutions. Get personalized rainwater harvesting assessments, expert guidance, and connect with certified installers. Start your water conservation journey today." 
        />
        <meta name="keywords" content="rainwater harvesting, water conservation, sustainability, AI assistant, groundwater recharge, water savings, environmental impact" />
        <meta property="og:title" content="Rain2Recharge - Smart Water Sustainability Platform" />
        <meta property="og:description" content="AI-powered platform for rainwater harvesting and water conservation solutions" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://rain2recharge.com/homepage-smart-water-platform" />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <ImpactMetrics />
        <AssessmentLauncher />
        <SuccessStories />
        <InteractiveInfographics />
        <AIAssistantPreview />
        <TrustSignals />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;