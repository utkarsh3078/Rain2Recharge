import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SystemRecommendations = ({ recommendations }) => {
  const [selectedSystem, setSelectedSystem] = useState(0);
  const [comparisonMode, setComparisonMode] = useState(false);

  const systemTypes = [
    {
      id: 'basic-collection',
      name: 'Basic Collection System',
      capacity: '5,600 Litres',
      complexity: 'Low',
      maintenance: 'Minimal',
      cost: '₹13,000 - ₹17,000',
      installTime: '2-3 days',
      efficiency: '75%',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      features: [
        'Roof collection with gutters',
        'Basic filtration system',
        'Above-ground storage tank',
        'Manual overflow management'
      ],
      pros: [
        'Lower upfront investment',
        'Simple installation process',
        'Easy maintenance',
        'Quick ROI'
      ],
      cons: [
        'Limited storage capacity',
        'Manual operation required',
        'Basic filtration only',
        'Weather dependent'
      ],
      bestFor: 'Small properties, budget-conscious homeowners, first-time users'
    },
    {
      id: 'standard-harvesting',
      name: 'Standard Harvesting System',
      capacity: '9,400 Litres',
      complexity: 'Medium',
      maintenance: 'Moderate',
      cost: '₹21,0,000 - ₹2,90,000',
      installTime: '4-5 days',
      efficiency: '85%',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      features: [
        'Enhanced collection network',
        'Multi-stage filtration',
        'Underground cistern',
        'Automated controls',
        'First-flush diverter'
      ],
      pros: [
        'Higher storage capacity',
        'Better water quality',
        'Automated operation',
        'Underground storage'
      ],
      cons: [
        'Higher initial cost',
        'More complex installation',
        'Requires electrical connection',
        'Professional maintenance needed'
      ],
      bestFor: 'Medium properties, families, long-term investment focus'
    },
    {
      id: 'premium-integrated',
      name: 'Premium Integrated System',
      capacity: '18,000+ gallons',
      complexity: 'High',
      maintenance: 'Professional',
      cost: '₹3,70,000 - ₹5,00,000',
      installTime: '7-10 days',
      efficiency: '95%',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      features: [
        'Smart collection optimization',
        'Advanced filtration & UV treatment',
        'Modular storage system',
        'IoT monitoring & controls',
        'Backup pump system',
        'Integration with home systems'
      ],
      pros: [
        'Maximum efficiency',
        'Smart automation',
        'Highest water quality',
        'Scalable design',
        'Remote monitoring'
      ],
      cons: [
        'Highest upfront cost',
        'Complex installation',
        'Requires professional service',
        'Technology dependency'
      ],
      bestFor: 'Large properties, tech enthusiasts, maximum efficiency seekers'
    }
  ];

  const vendors = [
    {
      name: 'AquaTech Solutions',
      rating: 4.8,
      reviews: 127,
      specialties: ['Residential Systems', 'Smart Controls'],
      contact: '1800-xxx-xxx',
      website: 'www.aquatech-solutions.com',
      certified: true,
      experience: '12 years'
    },
    {
      name: 'RainHarvest Pro',
      rating: 4.6,
      reviews: 89,
      specialties: ['Large Scale', 'Commercial'],
      contact: '1800-xxx-xxx',
      website: 'www.rainharvest-pro.com',
      certified: true,
      experience: '8 years'
    },
    {
      name: 'EcoWater Systems',
      rating: 4.7,
      reviews: 156,
      specialties: ['Eco-Friendly', 'Budget Solutions'],
      contact: '1800-xxx-xxx',
      website: 'www.ecowater-systems.com',
      certified: true,
      experience: '15 years'
    }
  ];

  const currentSystem = systemTypes?.[selectedSystem];

  return (
    <div className="bg-white rounded-2xl shadow-elevation border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">System Recommendations</h2>
          <p className="text-text-secondary">Tailored solutions based on your property assessment</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              comparisonMode
                ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            <Icon name="GitCompare" size={16} className="inline mr-2" />
            Compare All
          </button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export Specs
          </Button>
        </div>
      </div>
      {!comparisonMode ? (
        <>
          {/* System Selection Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-8">
            {systemTypes?.map((system, index) => (
              <button
                key={system?.id}
                onClick={() => setSelectedSystem(index)}
                className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedSystem === index
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {system?.name}
              </button>
            ))}
          </div>

          {/* Selected System Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-6">
                <Image
                  src={currentSystem?.image}
                  alt={currentSystem?.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-text-primary">{currentSystem?.efficiency} Efficient</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Icon name="Droplets" size={20} className="text-primary mb-2" />
                  <div className="text-sm text-text-secondary">Capacity</div>
                  <div className="font-semibold text-text-primary">{currentSystem?.capacity}</div>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <Icon name="Clock" size={20} className="text-secondary mb-2" />
                  <div className="text-sm text-text-secondary">Install Time</div>
                  <div className="font-semibold text-text-primary">{currentSystem?.installTime}</div>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <Icon name="Settings" size={20} className="text-accent mb-2" />
                  <div className="text-sm text-text-secondary">Complexity</div>
                  <div className="font-semibold text-text-primary">{currentSystem?.complexity}</div>
                </div>
                <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <Icon name="Wrench" size={20} className="text-warning mb-2" />
                  <div className="text-sm text-text-secondary">Maintenance</div>
                  <div className="font-semibold text-text-primary">{currentSystem?.maintenance}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">{currentSystem?.name}</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-2xl font-bold text-primary">{currentSystem?.cost}</div>
                  <div className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                    Recommended
                  </div>
                </div>
                <p className="text-text-secondary mb-4">{currentSystem?.bestFor}</p>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {currentSystem?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3 text-success">Advantages</h4>
                  <ul className="space-y-1">
                    {currentSystem?.pros?.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Plus" size={14} className="text-success mt-1 flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-3 text-warning">Considerations</h4>
                  <ul className="space-y-1">
                    {currentSystem?.cons?.map((con, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Minus" size={14} className="text-warning mt-1 flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Comparison Mode */
        (<div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold text-text-primary">Feature</th>
                {systemTypes?.map((system) => (
                  <th key={system?.id} className="text-center p-4 font-semibold text-text-primary min-w-48">
                    {system?.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Capacity', key: 'capacity' },
                { label: 'Cost Range', key: 'cost' },
                { label: 'Complexity', key: 'complexity' },
                { label: 'Install Time', key: 'installTime' },
                { label: 'Efficiency', key: 'efficiency' },
                { label: 'Maintenance', key: 'maintenance' }
              ]?.map((row) => (
                <tr key={row?.key} className="border-b border-border hover:bg-gray-50">
                  <td className="p-4 font-medium text-text-primary">{row?.label}</td>
                  {systemTypes?.map((system) => (
                    <td key={system?.id} className="p-4 text-center text-text-secondary">
                      {system?.[row?.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>)
      )}
      {/* Vendor Connections */}
      {/* <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Certified Installation Partners</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendors?.map((vendor, index) => (
            <div key={index} className="p-6 border border-border rounded-xl hover:shadow-soft transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-text-primary">{vendor?.name}</h4>
                {vendor?.certified && (
                  <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
                    <Icon name="Shield" size={12} />
                    <span>Certified</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < Math.floor(vendor?.rating) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {vendor?.rating} ({vendor?.reviews} reviews)
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">{vendor?.experience} experience</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {vendor?.specialties?.map((specialty, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" size="sm" fullWidth>
                  <Icon name="Phone" size={14} className="mr-2" />
                  {vendor?.contact}
                </Button>
                <Button variant="default" size="sm" fullWidth>
                  Get Quote
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default SystemRecommendations;