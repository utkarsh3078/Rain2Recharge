import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Austin, Texas",
      propertyType: "Single Family Home",
      beforeImage: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      waterSaved: "12,450",
      costSavings: "$2,340",
      co2Reduced: "8.2",
      testimonial: `The Rain2Recharge assessment was incredibly detailed and easy to follow. 
      Within 6 months, we installed a complete rainwater harvesting system. 
      Our water bills dropped by 60% and we're contributing to groundwater recharge!`,
      timeframe: "6 months",
      systemType: "Rainwater Harvesting + Recharge Pit"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Portland, Oregon",
      propertyType: "Commercial Building",
      beforeImage: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
      waterSaved: "45,200",
      costSavings: "$8,900",
      co2Reduced: "32.1",
      testimonial: `As a business owner, I needed concrete ROI data. The platform provided 
      detailed cost-benefit analysis that convinced our board. The system paid for itself 
      in 18 months and now we're a certified green building.`,
      timeframe: "8 months",
      systemType: "Commercial Rainwater System"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Phoenix, Arizona",
      propertyType: "Multi-Family Complex",
      beforeImage: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
      waterSaved: "28,750",
      costSavings: "$5,200",
      co2Reduced: "19.8",
      testimonial: `Managing water costs for 24 units was challenging. The AI recommendations 
      were spot-on for our desert climate. We now have a beautiful courtyard garden that's 
      entirely sustained by harvested rainwater.`,
      timeframe: "4 months",
      systemType: "Multi-Unit Harvesting System"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, stories?.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentStory((prev) => (prev - 1 + stories?.length) % stories?.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentStory((prev) => (prev + 1) % stories?.length);
  };

  const currentData = stories?.[currentStory];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Real Success Stories
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See how property owners like you are transforming their water sustainability 
            and achieving measurable environmental and financial benefits.
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-elevation overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Before/After Images */}
              <div className="relative h-96 lg:h-auto">
                <div className="grid grid-cols-2 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={currentData?.beforeImage}
                      alt={`${currentData?.name} - Before`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Before
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={currentData?.afterImage}
                      alt={`${currentData?.name} - After`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      After
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} color="white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary">{currentData?.name}</h3>
                      <p className="text-text-secondary">{currentData?.location} • {currentData?.propertyType}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{currentData?.waterSaved}</div>
                      <div className="text-sm text-text-secondary">Gallons Saved</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{currentData?.costSavings}</div>
                      <div className="text-sm text-text-secondary">Cost Savings</div>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-xl">
                      <div className="text-2xl font-bold text-teal-600">{currentData?.co2Reduced}t</div>
                      <div className="text-sm text-text-secondary">CO₂ Reduced</div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <blockquote className="text-text-secondary italic leading-relaxed">
                    "{currentData?.testimonial}"
                  </blockquote>

                  {/* System Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} color="var(--color-accent)" />
                      <span className="text-text-secondary">Implementation: {currentData?.timeframe}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Settings" size={16} color="var(--color-accent)" />
                      <span className="text-text-secondary">{currentData?.systemType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {stories?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentStory(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;