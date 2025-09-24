import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      name: "EPA WaterSense",
      logo: "Shield",
      description: "Certified water efficiency partner",
      color: "text-blue-600"
    },
    {
      name: "LEED Certified",
      logo: "Award",
      description: "Green building standard compliance",
      color: "text-green-600"
    },
    {
      name: "ISO 14001",
      logo: "CheckCircle",
      description: "Environmental management certified",
      color: "text-teal-600"
    },
    {
      name: "ENERGY STAR",
      logo: "Star",
      description: "Energy efficiency partnership",
      color: "text-yellow-600"
    }
  ];

  const partnerships = [
    {
      name: "India Water Resources Information System",
      type: "Professional Partnership",
      icon: "Users"
    },
    {
      name: "Central Ground Water Control Board",
      type: "Sustainability Partner",
      icon: "Building"
    },
    // {
    //   name: "Environmental Protection Agency",
    //   type: "Government Partnership",
    //   icon: "Shield"
    // },
    {
      name: "⁠Climate Researh and Services, Pune",
      type: "Research Collaboration",
      icon: "BookOpen"
    }
  ];

  const mediaRecognition = [
    {
      outlet: "Environmental Science Today",
      headline: "Revolutionary AI Platform Transforms Water Conservation",
      date: "September 2024",
      type: "Feature Article"
    },
    {
      outlet: "Green Tech Weekly",
      headline: "Rain2Recharge Wins Innovation Award for Smart Water Solutions",
      date: "August 2024",
      type: "Award Recognition"
    },
    {
      outlet: "Sustainability Journal",
      headline: "How AI is Making Water Harvesting Accessible to Everyone",
      date: "July 2024",
      type: "Industry Analysis"
    }
  ];

  const securityBadges = [
    {
      name: "SSL Secured",
      icon: "Lock",
      description: "256-bit encryption"
    },
    {
      name: "Privacy Compliant",
      icon: "UserCheck",
      description: "GDPR & CCPA compliant"
    },
    {
      name: "Data Protected",
      icon: "Database",
      description: "SOC 2 Type II certified"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our platform is certified, recognized, and trusted by environmental organizations, 
            government agencies, and sustainability experts worldwide.
          </p>
        </div> */}

        {/* Certifications */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-8">
            Environmental Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={cert?.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-brand transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center`}>
                  <Icon name={cert?.logo} size={32} color={cert?.color} />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{cert?.name}</h4>
                <p className="text-sm text-text-secondary">{cert?.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Partnerships */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-8">
            Strategic Partnerships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerships?.map((partner, index) => (
              <div
                key={partner?.name}
                className="flex items-center space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Icon name={partner?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{partner?.name}</h4>
                  <p className="text-sm text-text-secondary">{partner?.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Recognition */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-8">
            Media Recognition
          </h3>
          <div className="space-y-4">
            {mediaRecognition?.map((media, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Newspaper" size={20} color="var(--color-primary)" />
                      <span className="font-medium text-primary">{media?.outlet}</span>
                      <span className="text-sm text-text-secondary">• {media?.type}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-text-primary mb-1">
                      "{media?.headline}"
                    </h4>
                    <p className="text-sm text-text-secondary">{media?.date}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Icon name="ExternalLink" size={20} color="var(--color-accent)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}


        {/* Security & Privacy */}
        {/* <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Security & Privacy First
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Your data is protected with enterprise-grade security measures and 
              privacy-by-design architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {securityBadges?.map((badge, index) => (
              <div
                key={badge?.name}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-brand transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={badge?.icon} size={24} color="var(--color-success)" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{badge?.name}</h4>
                <p className="text-sm text-text-secondary">{badge?.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-text-secondary">
              <Icon name="Shield" size={16} color="var(--color-success)" className="inline mr-2" />
              All user data is encrypted, anonymized, and never shared with third parties
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustSignals;