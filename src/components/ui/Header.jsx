import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      name: "Home",
      path: "/",
      icon: "Home",
    },
    {
      name: "Assessment",
      path: "/assessment-dashboard-location-analysis",
      icon: "BarChart3",
    },
    {
      name: "Reports",
      path: "/detailed-report-recommendations",
      icon: "FileText",
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant-water-buddy-interface",
      icon: "Bot",
    },
    {
      name: "Marketplace",
      path: "/solution-marketplace-vendor-directory",
      icon: "Store",
    },
  ];

  const moreMenuItems = [
    {
      name: "Profile",
      path: "/user-profile-progress-tracking",
      icon: "User",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "Settings",
    },
    {
      name: "Help",
      path: "/help",
      icon: "HelpCircle",
    },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-brand transition-all duration-300 group-hover:shadow-brand-lg group-hover:scale-105">
          <Icon name="Droplets" size={24} color="white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="Zap" size={10} color="white" strokeWidth={3} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-text-primary tracking-tight">
          Rain2Recharge
        </span>
        <span className="text-xs text-text-secondary font-medium -mt-1">
          Smart Water Solutions
        </span>
      </div>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-brand shadow-soft border-b border-border"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? "bg-primary text-primary-foreground shadow-brand"
                    : "text-text-secondary hover:text-text-primary hover:bg-hover"
                }`}
              >
                <Icon
                  name={item?.icon}
                  size={18}
                  color={
                    isActivePath(item?.path) ? "currentColor" : "currentColor"
                  }
                />
                <span>{item?.name}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-hover transition-all duration-200">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-elevation border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? "text-primary bg-primary/5"
                          : "text-text-secondary hover:text-text-primary hover:bg-hover"
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm" className="gradient-primary">
              Start Assessment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-hover transition-colors duration-200"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-brand">
            <div className="py-4 space-y-2">
              {[...navigationItems, ...moreMenuItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? "bg-primary text-primary-foreground shadow-brand"
                      : "text-text-secondary hover:text-text-primary hover:bg-hover"
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  className="gradient-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Assessment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
