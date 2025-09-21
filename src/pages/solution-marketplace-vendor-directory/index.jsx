import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import VendorCard from './components/VendorCard';
import FilterSidebar from './components/FilterSidebar';
import VendorModal from './components/VendorModal';
import QuoteRequestModal from './components/QuoteRequestModal';
import ComparisonTool from './components/ComparisonTool';

const SolutionMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [comparisonVendors, setComparisonVendors] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    systemTypes: [],
    services: [],
    budgetMin: '',
    budgetMax: '',
    rating: '',
    availability: '',
    certifications: []
  });

  // Mock vendor data
  const mockVendors = [
    {
      id: 1,
      name: "AquaTech Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 127,
      location: "Austin, TX",
      specializations: ["Rainwater Harvesting", "Groundwater Recharge", "Smart Systems"],
      projectsCompleted: 250,
      yearsExperience: 12,
      responseTime: "2-4 hours",
      availability: "Available",
      priceRange: "$8,500",
      verified: true,
      isBookmarked: false,
      certifications: ["Licensed Contractor", "Water Efficiency Certified", "Green Building Certified"],
      description: `AquaTech Solutions is a leading provider of sustainable water management systems with over 12 years of experience. We specialize in custom rainwater harvesting and groundwater recharge solutions for residential and commercial properties.\n\nOur team of certified professionals ensures every installation meets the highest standards of quality and efficiency. We pride ourselves on innovative designs that maximize water conservation while minimizing environmental impact.`,
      services: ["System Design", "Installation", "Maintenance", "Consultation", "Permit Assistance"],
      phone: "(512) 555-0123",
      email: "info@aquatechsolutions.com",
      website: "www.aquatechsolutions.com",
      address: "1234 Water Way, Austin, TX 78701",
      serviceArea: "Austin Metro Area, Central Texas (50-mile radius)",
      businessHours: [
        { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Closed" }
      ],
      portfolio: [
        {
          title: "Residential Rainwater System",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
          description: "5,000-gallon underground cistern with smart monitoring",
          cost: "$12,500",
          duration: "3 weeks"
        },
        {
          title: "Commercial Groundwater Recharge",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
          description: "Large-scale infiltration system for office complex",
          cost: "$45,000",
          duration: "6 weeks"
        }
      ],
      reviews: [
        {
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          rating: 5,
          date: "2 weeks ago",
          comment: "Exceptional service from start to finish. The team was professional, knowledgeable, and completed the installation ahead of schedule. Our water bills have decreased significantly!",
          projectType: "Rainwater Harvesting"
        },
        {
          name: "Mike Chen",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          rating: 5,
          date: "1 month ago",
          comment: "AquaTech designed a perfect solution for our property. The system works flawlessly and the maintenance support is outstanding.",
          projectType: "Groundwater Recharge"
        }
      ]
    },
    {
      id: 2,
      name: "EcoFlow Systems",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 89,
      location: "Dallas, TX",
      specializations: ["Greywater Recycling", "Stormwater Management", "Water Storage"],
      projectsCompleted: 180,
      yearsExperience: 8,
      responseTime: "4-6 hours",
      availability: "Busy",
      priceRange: "$6,200",
      verified: true,
      isBookmarked: true,
      certifications: ["Licensed Contractor", "Manufacturer Certified"],
      description: `EcoFlow Systems specializes in innovative water recycling and stormwater management solutions. Our expertise lies in creating efficient greywater systems that reduce water waste and lower utility costs.\n\nWe serve both residential and commercial clients throughout the Dallas-Fort Worth metroplex, delivering sustainable water solutions that make environmental and economic sense.`,
      services: ["System Design", "Installation", "Maintenance", "Consultation"],
      phone: "(214) 555-0456",
      email: "contact@ecoflowsystems.com",
      website: "www.ecoflowsystems.com",
      address: "5678 Green Valley Rd, Dallas, TX 75201",
      serviceArea: "Dallas-Fort Worth Metroplex",
      businessHours: [
        { day: "Monday - Friday", hours: "7:30 AM - 5:30 PM" },
        { day: "Saturday", hours: "8:00 AM - 2:00 PM" },
        { day: "Sunday", hours: "Closed" }
      ],
      portfolio: [
        {
          title: "Greywater Recycling System",
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
          description: "Complete greywater treatment and reuse system",
          cost: "$8,900",
          duration: "2 weeks"
        }
      ],
      reviews: [
        {
          name: "Jennifer Martinez",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          rating: 5,
          date: "3 weeks ago",
          comment: "Great experience with EcoFlow. They explained everything clearly and the installation was smooth.",
          projectType: "Greywater Recycling"
        }
      ]
    },
    {
      id: 3,
      name: "Pure Water Innovations",
      logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 203,
      location: "Houston, TX",
      specializations: ["Smart Water Systems", "IoT Integration", "Advanced Filtration"],
      projectsCompleted: 320,
      yearsExperience: 15,
      responseTime: "1-2 hours",
      availability: "Available",
      priceRange: "$12,800",
      verified: true,
      isBookmarked: false,
      certifications: ["Licensed Contractor", "Water Efficiency Certified", "Smart Home Certified", "Manufacturer Certified"],
      description: `Pure Water Innovations leads the industry in smart water management technology. We integrate IoT sensors, automated controls, and advanced filtration systems to create intelligent water solutions.\n\nOur cutting-edge approach combines traditional water conservation methods with modern technology, providing clients with real-time monitoring, predictive maintenance, and optimal system performance.`,
      services: ["System Design", "Installation", "Maintenance", "Consultation", "Smart Integration", "Monitoring"],
      phone: "(713) 555-0789",
      email: "hello@purewaterinnovations.com",
      website: "www.purewaterinnovations.com",
      address: "9012 Innovation Blvd, Houston, TX 77001",
      serviceArea: "Greater Houston Area, Southeast Texas",
      businessHours: [
        { day: "Monday - Friday", hours: "8:00 AM - 7:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
        { day: "Sunday", hours: "10:00 AM - 2:00 PM" }
      ],
      portfolio: [
        {
          title: "Smart Rainwater System",
          image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
          description: "AI-powered rainwater harvesting with mobile app control",
          cost: "$18,500",
          duration: "4 weeks"
        },
        {
          title: "Commercial Water Management",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
          description: "Enterprise-grade water conservation system",
          cost: "$65,000",
          duration: "8 weeks"
        }
      ],
      reviews: [
        {
          name: "David Wilson",
          avatar: "https://randomuser.me/api/portraits/men/52.jpg",
          rating: 5,
          date: "1 week ago",
          comment: "The smart features are incredible! I can monitor everything from my phone and the system optimizes itself automatically.",
          projectType: "Smart Water Systems"
        }
      ]
    },
    {
      id: 4,
      name: "Green Valley Water Co.",
      logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 156,
      location: "San Antonio, TX",
      specializations: ["Traditional Systems", "Budget Solutions", "Rural Properties"],
      projectsCompleted: 420,
      yearsExperience: 20,
      responseTime: "6-8 hours",
      availability: "Available",
      priceRange: "$4,800",
      verified: true,
      isBookmarked: false,
      certifications: ["Licensed Contractor", "Rural Water Specialist"],
      description: `Green Valley Water Co. has been serving Texas communities for over 20 years, specializing in cost-effective water conservation solutions. We focus on traditional, proven methods that deliver reliable results.\n\nOur experience with rural and agricultural properties makes us the go-to choice for large-scale water management projects. We pride ourselves on honest pricing and dependable service.`,
      services: ["System Design", "Installation", "Maintenance", "Agricultural Solutions"],
      phone: "(210) 555-0321",
      email: "info@greenvalleywater.com",
      website: "www.greenvalleywater.com",
      address: "3456 Ranch Road, San Antonio, TX 78201",
      serviceArea: "South Texas, Rural Communities",
      businessHours: [
        { day: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "8:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Emergency Only" }
      ],
      portfolio: [
        {
          title: "Ranch Water System",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
          description: "Large-scale rainwater collection for livestock",
          cost: "$25,000",
          duration: "5 weeks"
        }
      ],
      reviews: [
        {
          name: "Maria Rodriguez",
          avatar: "https://randomuser.me/api/portraits/women/41.jpg",
          rating: 4,
          date: "2 months ago",
          comment: "Reliable service and fair pricing. They understand rural water needs better than anyone.",
          projectType: "Agricultural Solutions"
        }
      ]
    },
    {
      id: 5,
      name: "Urban Water Solutions",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 94,
      location: "Fort Worth, TX",
      specializations: ["Urban Systems", "Space-Efficient Design", "Multi-Unit Buildings"],
      projectsCompleted: 140,
      yearsExperience: 6,
      responseTime: "3-5 hours",
      availability: "Booked",
      priceRange: "$9,200",
      verified: true,
      isBookmarked: false,
      certifications: ["Licensed Contractor", "Urban Planning Certified"],
      description: `Urban Water Solutions specializes in water conservation systems designed for city environments and space-constrained properties. We excel at maximizing water efficiency in minimal space.\n\nOur innovative designs are perfect for condominiums, townhomes, and urban commercial buildings where traditional systems won't fit.`,
      services: ["System Design", "Installation", "Urban Planning", "Multi-Unit Solutions"],
      phone: "(817) 555-0654",
      email: "contact@urbanwatersolutions.com",
      website: "www.urbanwatersolutions.com",
      address: "7890 City Center Dr, Fort Worth, TX 76101",
      serviceArea: "Fort Worth, Urban Dallas-Fort Worth",
      businessHours: [
        { day: "Monday - Friday", hours: "8:30 AM - 5:30 PM" },
        { day: "Saturday", hours: "By Appointment" },
        { day: "Sunday", hours: "Closed" }
      ],
      portfolio: [
        {
          title: "Condo Complex System",
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
          description: "Compact rainwater system for 24-unit building",
          cost: "$32,000",
          duration: "6 weeks"
        }
      ],
      reviews: [
        {
          name: "Alex Thompson",
          avatar: "https://randomuser.me/api/portraits/men/33.jpg",
          rating: 5,
          date: "5 weeks ago",
          comment: "Perfect solution for our tight urban space. The design is both functional and aesthetically pleasing.",
          projectType: "Urban Systems"
        }
      ]
    },
    {
      id: 6,
      name: "Sustainable H2O",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 78,
      location: "Plano, TX",
      specializations: ["Eco-Friendly Materials", "Solar Integration", "Sustainable Design"],
      projectsCompleted: 95,
      yearsExperience: 5,
      responseTime: "4-6 hours",
      availability: "Available",
      priceRange: "$11,500",
      verified: true,
      isBookmarked: true,
      certifications: ["Green Building Certified", "Solar Integration Certified"],
      description: `Sustainable H2O focuses on environmentally conscious water solutions using eco-friendly materials and renewable energy integration. We believe in creating systems that benefit both our clients and the planet.\n\nOur solar-powered water systems reduce energy consumption while maximizing water conservation efficiency.`,
      services: ["System Design", "Installation", "Solar Integration", "Eco-Consulting"],
      phone: "(972) 555-0987",
      email: "info@sustainableh2o.com",
      website: "www.sustainableh2o.com",
      address: "2468 Solar Way, Plano, TX 75023",
      serviceArea: "North Dallas, Collin County",
      businessHours: [
        { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
        { day: "Sunday", hours: "Closed" }
      ],
      portfolio: [
        {
          title: "Solar-Powered System",
          image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
          description: "Rainwater harvesting with solar pump and controls",
          cost: "$15,200",
          duration: "3 weeks"
        }
      ],
      reviews: [
        {
          name: "Lisa Park",
          avatar: "https://randomuser.me/api/portraits/women/25.jpg",
          rating: 5,
          date: "4 weeks ago",
          comment: "Love the sustainable approach! The solar integration works perfectly and our carbon footprint is much smaller.",
          projectType: "Solar Integration"
        }
      ]
    }
  ];

  const [filteredVendors, setFilteredVendors] = useState(mockVendors);

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'experience', label: 'Most Experience' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'response', label: 'Fastest Response' }
  ];

  // Filter and sort vendors
  useEffect(() => {
    let filtered = mockVendors?.filter(vendor => {
      // Search query filter
      if (searchQuery && !vendor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
          !vendor?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
          !vendor?.specializations?.some(spec => spec?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
        return false;
      }

      // Location filter
      if (filters?.location && !vendor?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())) {
        return false;
      }

      // System types filter
      if (filters?.systemTypes?.length > 0) {
        const hasMatchingType = filters?.systemTypes?.some(type => 
          vendor?.specializations?.some(spec => 
            spec?.toLowerCase()?.includes(type?.replace('-', ' ')?.toLowerCase())
          )
        );
        if (!hasMatchingType) return false;
      }

      // Rating filter
      if (filters?.rating && vendor?.rating < parseFloat(filters?.rating)) {
        return false;
      }

      // Availability filter
      if (filters?.availability && vendor?.availability !== filters?.availability) {
        return false;
      }

      return true;
    });

    // Sort vendors
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'reviews':
          return b?.reviewCount - a?.reviewCount;
        case 'experience':
          return b?.yearsExperience - a?.yearsExperience;
        case 'price-low':
          return parseFloat(a?.priceRange?.replace(/[$,]/g, '')) - parseFloat(b?.priceRange?.replace(/[$,]/g, ''));
        case 'price-high':
          return parseFloat(b?.priceRange?.replace(/[$,]/g, '')) - parseFloat(a?.priceRange?.replace(/[$,]/g, ''));
        case 'response':
          return a?.responseTime?.localeCompare(b?.responseTime);
        default:
          return 0;
      }
    });

    setFilteredVendors(filtered);
  }, [searchQuery, filters, sortBy]);

  const handleViewProfile = (vendor) => {
    setSelectedVendor(vendor);
    setIsVendorModalOpen(true);
  };

  const handleRequestQuote = (vendor) => {
    setSelectedVendor(vendor);
    setIsQuoteModalOpen(true);
  };

  const handleQuoteSubmit = (quoteData) => {
    console.log('Quote request submitted:', quoteData);
    // Here you would typically send the data to your backend
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      systemTypes: [],
      services: [],
      budgetMin: '',
      budgetMax: '',
      rating: '',
      availability: '',
      certifications: []
    });
  };

  const handleAddToComparison = (vendor) => {
    if (comparisonVendors?.length < 3 && !comparisonVendors?.find(v => v?.id === vendor?.id)) {
      setComparisonVendors([...comparisonVendors, vendor]);
    }
  };

  const handleRemoveFromComparison = (vendorId) => {
    setComparisonVendors(comparisonVendors?.filter(v => v?.id !== vendorId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect Water Solution Partner
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Connect with certified professionals who transform water conservation dreams into reality. 
                Compare quotes, read reviews, and choose the right vendor for your project.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search by vendor name, location, or specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                  />
                </div>
                <div className="md:w-64">
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Sort by"
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Search"
                  iconPosition="left"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">250+</div>
                <div className="text-white/80">Verified Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5,000+</div>
                <div className="text-white/80">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="text-white/80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24hr</div>
                <div className="text-white/80">Avg Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              {/* Filter Sidebar */}
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />

              {/* Main Content Area */}
              <div className="flex-1 lg:ml-6">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-hover transition-colors duration-200"
                    >
                      <Icon name="Filter" size={20} />
                      <span>Filters</span>
                    </button>
                    <h2 className="text-xl font-semibold text-text-primary">
                      {filteredVendors?.length} Vendors Found
                    </h2>
                  </div>

                  <div className="flex items-center space-x-3">
                    {comparisonVendors?.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsComparisonOpen(true)}
                        iconName="BarChart3"
                        iconPosition="left"
                      >
                        Compare ({comparisonVendors?.length})
                      </Button>
                    )}
                    <div className="flex items-center space-x-2">
                      <Icon name="ArrowUpDown" size={16} color="var(--color-text-secondary)" />
                      <Select
                        options={sortOptions}
                        value={sortBy}
                        onChange={setSortBy}
                        className="w-48"
                      />
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {(filters?.location || filters?.systemTypes?.length > 0 || filters?.rating || filters?.availability) && (
                  <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-text-secondary">Active filters:</span>
                    {filters?.location && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center space-x-1">
                        <span>Location: {filters?.location}</span>
                        <button onClick={() => handleFiltersChange({ ...filters, location: '' })}>
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    )}
                    {filters?.systemTypes?.map((type, index) => (
                      <span key={index} className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full flex items-center space-x-1">
                        <span>{type?.replace('-', ' ')}</span>
                        <button onClick={() => handleFiltersChange({ 
                          ...filters, 
                          systemTypes: filters?.systemTypes?.filter(t => t !== type) 
                        })}>
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    ))}
                    {filters?.rating && (
                      <span className="px-3 py-1 bg-warning/10 text-warning text-sm rounded-full flex items-center space-x-1">
                        <span>{filters?.rating}+ Stars</span>
                        <button onClick={() => handleFiltersChange({ ...filters, rating: '' })}>
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      Clear All
                    </Button>
                  </div>
                )}

                {/* Vendor Grid */}
                {filteredVendors?.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredVendors?.map((vendor) => (
                      <VendorCard
                        key={vendor?.id}
                        vendor={vendor}
                        onViewProfile={handleViewProfile}
                        onRequestQuote={handleRequestQuote}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={64} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No vendors found</h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your search criteria or filters to find more vendors.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}

                {/* Load More */}
                {filteredVendors?.length > 0 && (
                  <div className="text-center mt-12">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="ChevronDown"
                      iconPosition="right"
                    >
                      Load More Vendors
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Why Choose Our Marketplace?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                We've curated the best water solution professionals to ensure you get quality service and peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} color="var(--color-primary)" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Verified Professionals</h3>
                <p className="text-text-secondary">
                  All vendors are licensed, insured, and verified through our rigorous screening process.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={32} color="var(--color-secondary)" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Quality Guaranteed</h3>
                <p className="text-text-secondary">
                  Read authentic reviews and compare ratings to make informed decisions with confidence.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={32} color="var(--color-accent)" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Support & Protection</h3>
                <p className="text-text-secondary">
                  Our team provides ongoing support and dispute resolution throughout your project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-secondary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Water Conservation Project?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get personalized recommendations based on your assessment results and connect with the perfect vendor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assessment-dashboard-location-analysis">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-secondary hover:bg-white/90"
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  Start Assessment
                </Button>
              </Link>
              <Link to="/ai-assistant-water-buddy-interface">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  iconName="Bot"
                  iconPosition="left"
                >
                  Ask WaterBuddy
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      {/* Modals */}
      <VendorModal
        vendor={selectedVendor}
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onRequestQuote={handleRequestQuote}
      />
      <QuoteRequestModal
        vendor={selectedVendor}
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSubmit={handleQuoteSubmit}
      />
      <ComparisonTool
        vendors={comparisonVendors}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onRequestQuote={handleRequestQuote}
      />
    </div>
  );
};

export default SolutionMarketplace;