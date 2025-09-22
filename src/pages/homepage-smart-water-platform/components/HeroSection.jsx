import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
// import water from 

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "Drought-Affected Landscape",
      description: "Traditional water management challenges",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Thriving Rainwater System",
      description: "Smart water harvesting solutions",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse-gentle"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-teal-200/40 rounded-full animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200/30 rounded-full animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                <Icon name="Droplets" size={20} color="var(--color-primary)" />
                <span className="text-sm font-medium text-primary">Smart Water Solutions</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Every Drop Counts,{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Every Action Matters
                </span>
              </h1>
              
              <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                Transform your property into a water-smart ecosystem with AI-powered assessments, 
                personalized recommendations, and expert guidance for rainwater harvesting and groundwater recharge.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/assessment-dashboard-location-analysis">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="gradient-primary shadow-brand hover:shadow-brand-lg transform hover:scale-105 transition-all duration-300"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Start Your Assessment
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 transition-all duration-300"
                iconName="Calculator"
                iconPosition="left"
              >
                Calculate Impact
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">EPA Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">Industry Leading</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">10,000+ Users</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-elevation">
              {slides?.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide?.image}
                    alt={slide?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{slide?.title}</h3>
                    <p className="text-white/90">{slide?.description}</p>
                  </div>
                </div>
              ))}
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {slides?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-brand flex items-center justify-center animate-pulse-gentle">
              {/* <Image src={water} alt="Rain2Recharge logo" className="" /> */}
              <Icon name="Droplets" size={48} color="var(--color-primary)" />
            </div>
            {/* <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-full shadow-brand flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '1s' }}>
              <Icon name="Leaf" size={24} color="white" />
            </div> */}
          </div>
        </div>
      </div>
      {/* Water Flow Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 opacity-60">
        <div className="h-full bg-white/30 animate-flow"></div>
      </div>
    </section>
  );
};

export default HeroSection;