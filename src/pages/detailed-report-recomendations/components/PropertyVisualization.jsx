import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PropertyVisualization = ({ propertyData }) => {
  const [selectedView, setSelectedView] = useState('aerial');
  const [selectedSystem, setSelectedSystem] = useState(null);

  const viewOptions = [
    { id: 'aerial', label: 'Aerial View', icon: 'Satellite' },
    { id: '3d', label: '3D Model', icon: 'Box' },
    { id: 'cross-section', label: 'Cross Section', icon: 'Layers' }
  ];

  const systemComponents = [
    {
      id: 'gutters',
      name: 'Gutter System',
      position: { top: '15%', left: '20%' },
      description: 'Enhanced gutter collection with leaf guards',
      cost: '₹16,000 - ₹24,000'
    },
    {
      id: 'downspouts',
      name: 'Downspout Diverters',
      position: { top: '35%', left: '25%' },
      description: 'First-flush diverters and filtration',
      cost: '₹4,000 - ₹8,000'
    },
    {
      id: 'storage',
      name: 'Storage Tank',
      position: { top: '60%', left: '70%' },
      description: '2,500 gallon underground cistern',
      cost: '₹70,000 - ₹10,000'
    },
    {
      id: 'infiltration',
      name: 'Infiltration Basin',
      position: { top: '75%', left: '40%' },
      description: 'Bioswale for groundwater recharge',
      cost: '₹30,000 - ₹50,000'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-elevation border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Property Visualization</h2>
          <p className="text-text-secondary">Interactive 3D model with recommended system placement</p>
        </div>
        <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
          {viewOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => setSelectedView(option?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedView === option?.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden mb-6" style={{ height: '500px' }}>
        <Image
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop"
          alt="Property aerial view"
          className="w-full h-full object-cover"
        />
        
        {/* System Component Markers */}
        {systemComponents?.map((component) => (
          <div
            key={component?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ top: component?.position?.top, left: component?.position?.left }}
            onClick={() => setSelectedSystem(selectedSystem === component?.id ? null : component?.id)}
          >
            <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${
              selectedSystem === component?.id ? 'bg-primary scale-125' : 'bg-secondary hover:scale-110'
            }`}>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            
            {selectedSystem === component?.id && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border border-border p-4 z-10">
                <h4 className="font-semibold text-text-primary mb-2">{component?.name}</h4>
                <p className="text-sm text-text-secondary mb-2">{component?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{component?.cost}</span>
                  <button className="text-xs bg-primary text-white px-2 py-1 rounded">
                    Learn More
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* View Controls */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 space-y-2">
          <button className="w-8 h-8 bg-white rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Icon name="ZoomIn" size={16} className="text-text-secondary" />
          </button>
          <button className="w-8 h-8 bg-white rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Icon name="ZoomOut" size={16} className="text-text-secondary" />
          </button>
          <button className="w-8 h-8 bg-white rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Icon name="RotateCw" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemComponents?.map((component) => (
          <div
            key={component?.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedSystem === component?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-hover'
            }`}
            onClick={() => setSelectedSystem(selectedSystem === component?.id ? null : component?.id)}
          >
            <h4 className="font-medium text-text-primary mb-1">{component?.name}</h4>
            <p className="text-xs text-text-secondary mb-2">{component?.description}</p>
            <span className="text-sm font-medium text-primary">{component?.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyVisualization;