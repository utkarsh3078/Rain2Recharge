import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all components
import ExecutiveSummary from './components/ExecutiveSummary';
import PropertyVisualization from './components/PropertyVisualization';
import DetailedAnalysis from './components/DetailedAnalysis';
import CostBenefitAnalysis from './components/CostBenefitAnalysis';
import SystemRecommendations from './components/SystemRecommendations';
import ImplementationRoadmap from './components/ImplementationRoadmap';
import SocialSharing from './components/SocialSharing';

const DetailedReportRecommendations = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isSticky, setIsSticky] = useState(false);

  // Mock report data
  const reportData = {
    feasibilityScore: 87,
    waterSavings: 54000,
    costRange: { min: 8500, max: 14500 },
    co2Reduction: 1250,
    roiTimeline: 6.5,
    propertyId: 'PROP-2024-001',
    assessmentDate: new Date()?.toLocaleDateString(),
    location: {
      address: "1234 Maple Street, Austin, TX 78701",
      coordinates: { lat: 30.2672, lng: -97.7431 },
      zone: "Central Texas Hill Country"
    }
  };

  const propertyData = {
    roofArea: 2400,
    lotSize: 8500,
    soilType: "Sandy Loam",
    slope: "Moderate (5-8%)",
    existingDrainage: "Good",
    proximityToUtilities: "15 feet"
  };

  const analysisData = {
    rainfall: {
      annual: 42.5,
      seasonal: {
        spring: 12.8,
        summer: 8.2,
        fall: 11.5,
        winter: 10.0
      }
    },
    soil: {
      type: "Sandy Loam",
      infiltrationRate: 2.5,
      permeability: "High"
    }
  };

  const costData = {
    scenarios: [
      { name: "Basic", upfront: 8500, maintenance: 200, savings: 480 },
      { name: "Standard", upfront: 12500, maintenance: 300, savings: 720 },
      { name: "Premium", upfront: 18500, maintenance: 450, savings: 1080 }
    ]
  };

  const recommendations = {
    primary: "Standard Harvesting System",
    alternatives: ["Basic Collection", "Premium Integrated"],
    vendors: 3
  };

  const roadmapData = {
    totalPhases: 5,
    estimatedDuration: "8-12 weeks",
    startDate: "Spring 2024"
  };

  const navigationSections = [
    { id: 'summary', label: 'Executive Summary', icon: 'FileText' },
    { id: 'visualization', label: 'Property View', icon: 'Eye' },
    { id: 'analysis', label: 'Detailed Analysis', icon: 'BarChart3' },
    { id: 'cost-benefit', label: 'Cost Analysis', icon: 'DollarSign' },
    { id: 'recommendations', label: 'Recommendations', icon: 'CheckCircle' },
    { id: 'roadmap', label: 'Implementation', icon: 'Map' },
    { id: 'sharing', label: 'Share Impact', icon: 'Share2' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const downloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    console.log('Downloading PDF report...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-primary">Assessment Complete</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Your Detailed Water Report
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-6">
              Comprehensive analysis and actionable recommendations for your rainwater harvesting system
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>{reportData?.location?.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>Generated: {reportData?.assessmentDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Hash" size={16} />
                <span>ID: {reportData?.propertyId}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="default" onClick={downloadPDF} className="gradient-primary">
              <Icon name="Download" size={16} className="mr-2" />
              Download PDF Report
            </Button>
            <Link to="/solution-marketplace-vendor-directory">
              <Button variant="outline">
                <Icon name="Store" size={16} className="mr-2" />
                Find Contractors
              </Button>
            </Link>
            <Link to="/ai-assistant-water-buddy-interface">
              <Button variant="secondary">
                <Icon name="Bot" size={16} className="mr-2" />
                Ask WaterBuddy
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Sticky Navigation */}
      <div className={`sticky top-16 z-40 bg-white/95 backdrop-blur-brand border-b border-border transition-all duration-300 ${
        isSticky ? 'shadow-soft' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-4 overflow-x-auto">
            {navigationSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeSection === section?.id
                    ? 'bg-primary text-white shadow-brand'
                    : 'text-text-secondary hover:text-text-primary hover:bg-hover'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Report Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Executive Summary */}
        <section id="summary">
          <ExecutiveSummary reportData={reportData} />
        </section>

        {/* Property Visualization */}
        <section id="visualization">
          <PropertyVisualization propertyData={propertyData} />
        </section>

        {/* Detailed Analysis */}
        <section id="analysis">
          <DetailedAnalysis analysisData={analysisData} />
        </section>

        {/* Cost-Benefit Analysis */}
        <section id="cost-benefit">
          <CostBenefitAnalysis costData={costData} />
        </section>

        {/* System Recommendations */}
        <section id="recommendations">
          <SystemRecommendations recommendations={recommendations} />
        </section>

        {/* Implementation Roadmap */}
        <section id="roadmap">
          <ImplementationRoadmap roadmapData={roadmapData} />
        </section>

        {/* Social Sharing */}
        <section id="sharing">
          <SocialSharing reportData={reportData} />
        </section>
      </main>
      {/* Next Steps CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-8">
            Connect with certified contractors and begin your water sustainability journey today
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/solution-marketplace-vendor-directory">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Icon name="Users" size={20} className="mr-2" />
                Find Local Contractors
              </Button>
            </Link>
            <Link to="/ai-assistant-water-buddy-interface">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Get Expert Guidance
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Icon name="Droplets" size={24} color="white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-text-primary">Rain2Recharge</span>
                  <p className="text-sm text-text-secondary">Smart Water Solutions</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4">
                Transforming complex environmental data into actionable insights for sustainable water management.
              </p>
              <div className="flex space-x-4">
                <Link to="/homepage-smart-water-platform" className="text-text-secondary hover:text-primary">
                  <Icon name="Home" size={20} />
                </Link>
                <Link to="/assessment-dashboard-location-analysis" className="text-text-secondary hover:text-primary">
                  <Icon name="BarChart3" size={20} />
                </Link>
                <Link to="/ai-assistant-water-buddy-interface" className="text-text-secondary hover:text-primary">
                  <Icon name="Bot" size={20} />
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/homepage-smart-water-platform" className="text-text-secondary hover:text-primary">Home</Link></li>
                <li><Link to="/assessment-dashboard-location-analysis" className="text-text-secondary hover:text-primary">Assessment</Link></li>
                <li><Link to="/solution-marketplace-vendor-directory" className="text-text-secondary hover:text-primary">Marketplace</Link></li>
                <li><Link to="/user-profile-progress-tracking" className="text-text-secondary hover:text-primary">Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-secondary hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-text-secondary">
              © {new Date()?.getFullYear()} Rain2Recharge. All rights reserved. Making every drop count for a sustainable future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DetailedReportRecommendations;