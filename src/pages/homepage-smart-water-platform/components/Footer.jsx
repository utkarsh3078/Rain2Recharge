import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Assessment Tool", path: "/assessment-dashboard-location-analysis" },
        { name: "AI Assistant", path: "/ai-assistant-water-buddy-interface" },
        { name: "Solution Marketplace", path: "/solution-marketplace-vendor-directory" },
        { name: "User Profile", path: "/user-profile-progress-tracking" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Knowledge Center", path: "/knowledge-center" },
        { name: "Success Stories", path: "/success-stories" },
        { name: "Best Practices", path: "/best-practices" },
        { name: "Maintenance Guides", path: "/maintenance-guides" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "User Forum", path: "/community-forum" },
        { name: "Local Groups", path: "/local-groups" },
        { name: "Expert Network", path: "/expert-network" },
        { name: "Events", path: "/events" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Contact Us", path: "/contact" },
        { name: "Technical Support", path: "/support" },
        { name: "Training", path: "/training" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/rain2recharge" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/rain2recharge" },
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/rain2recharge" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/rain2recharge" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/rain2recharge" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Data Protection", path: "/data-protection" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/homepage-smart-water-platform" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-brand transition-all duration-300 group-hover:shadow-brand-lg group-hover:scale-105">
                    <Icon name="Droplets" size={28} color="white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={12} color="white" strokeWidth={3} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    Rain2Recharge
                  </span>
                  <span className="text-sm text-blue-200 font-medium -mt-1">
                    Smart Water Solutions
                  </span>
                </div>
              </Link>

              <p className="text-slate-300 leading-relaxed max-w-md">
                Transforming complex environmental data into actionable insights, 
                democratizing rainwater harvesting and groundwater recharge solutions 
                for homeowners and communities worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={18} color="var(--color-accent)" />
                  <span className="text-slate-300">hello@rain2recharge.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={18} color="var(--color-accent)" />
                  <span className="text-slate-300">1-800-RAIN-2-R (1-800-724-6247)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={18} color="var(--color-accent)" />
                  <span className="text-slate-300">San Francisco, CA • Austin, TX</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-300 group"
                  >
                    <Icon name={social?.icon} size={20} color="var(--color-accent)" className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections?.map((section) => (
              <div key={section?.title} className="space-y-4">
                <h3 className="text-lg font-semibold text-white">{section?.title}</h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.name}>
                      <Link
                        to={link?.path}
                        className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <span>{link?.name}</span>
                        <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-12 border-t border-slate-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Stay Updated on Water Innovation
              </h3>
              <p className="text-slate-300">
                Get monthly insights, success stories, and the latest in water sustainability technology.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-primary rounded-lg font-medium text-white hover:shadow-brand transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-slate-400 text-sm">
                © {currentYear} Rain2Recharge. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                {legalLinks?.map((link, index) => (
                  <React.Fragment key={link?.name}>
                    <Link
                      to={link?.path}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      {link?.name}
                    </Link>
                    {index < legalLinks?.length - 1 && (
                      <span className="text-slate-600">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-slate-400 text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Leaf" size={16} color="var(--color-secondary)" />
                <span className="text-slate-400 text-sm">Carbon Neutral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;