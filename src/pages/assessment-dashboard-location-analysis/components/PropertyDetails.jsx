import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PropertyDetails = ({ propertyData, onPropertyUpdate }) => {
  const [selectedHouseType, setSelectedHouseType] = useState(propertyData?.houseType || '');
  const [roofSize, setRoofSize] = useState(propertyData?.roofSize || 1500);
  const [lotSize, setLotSize] = useState(propertyData?.lotSize || 0.25);

  const houseTypes = [
    {
      id: 'single-family',
      name: 'Single Family Home',
      icon: 'Home',
      description: 'Detached house with private yard'
    },
    {
      id: 'townhouse',
      name: 'Townhouse',
      icon: 'Building',
      description: 'Multi-level attached home'
    },
    {
      id: 'condo',
      name: 'Condominium',
      icon: 'Building2',
      description: 'Unit in multi-unit building'
    },
    {
      id: 'apartment',
      name: 'Apartment',
      icon: 'Buildings',
      description: 'Rental unit in complex'
    }
  ];

  const handleHouseTypeSelect = (type) => {
    setSelectedHouseType(type);
    onPropertyUpdate({
      houseType: type,
      roofSize,
      lotSize
    });
  };

  const handleRoofSizeChange = (size) => {
    setRoofSize(size);
    onPropertyUpdate({
      houseType: selectedHouseType,
      roofSize: size,
      lotSize
    });
  };

  const handleLotSizeChange = (size) => {
    setLotSize(size);
    onPropertyUpdate({
      houseType: selectedHouseType,
      roofSize,
      lotSize: size
    });
  };

  const getRoofSizeComparison = (sqft) => {
    if (sqft < 1000) return "Small roof - like a studio apartment";
    if (sqft < 1500) return "Medium roof - typical 2-bedroom home";
    if (sqft < 2500) return "Large roof - spacious family home";
    return "Very large roof - mansion-sized property";
  };

  const getLotSizeComparison = (acres) => {
    const sqft = acres * 43560;
    if (sqft < 5000) return `${Math.round(sqft)} sq ft - smaller than a basketball court`;
    if (sqft < 10000) return `${Math.round(sqft)} sq ft - about 2 basketball courts`;
    if (sqft < 20000) return `${Math.round(sqft)} sq ft - like 4 basketball courts`;
    return `${Math.round(sqft)} sq ft - multiple acres of land`;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Home" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Property Details</h3>
          <p className="text-sm text-text-secondary">Tell us about your property characteristics</p>
        </div>
      </div>
      {/* House Type Selection */}
      <div className="space-y-4 mb-8">
        <h4 className="text-md font-medium text-text-primary">Property Type</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {houseTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => handleHouseTypeSelect(type?.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedHouseType === type?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-hover'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedHouseType === type?.id ? 'bg-primary text-white' : 'bg-muted'
                }`}>
                  <Icon name={type?.icon} size={20} />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{type?.name}</p>
                  <p className="text-sm text-text-secondary">{type?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Roof Size Slider */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-text-primary">Roof Size Estimation</h4>
          <span className="text-lg font-semibold text-primary">{roofSize?.toLocaleString()} sq ft</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={roofSize}
            onChange={(e) => handleRoofSizeChange(parseInt(e?.target?.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>500 sq ft</span>
            <span>5,000 sq ft</span>
          </div>
          <p className="text-sm text-text-secondary italic">{getRoofSizeComparison(roofSize)}</p>
        </div>
      </div>
      {/* Lot Size Input */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-text-primary">Lot Size</h4>
          <span className="text-lg font-semibold text-secondary">{lotSize} acres</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.05"
            value={lotSize}
            onChange={(e) => handleLotSizeChange(parseFloat(e?.target?.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>0.1 acres</span>
            <span>2.0 acres</span>
          </div>
          <p className="text-sm text-text-secondary italic">{getLotSizeComparison(lotSize)}</p>
        </div>
      </div>
      {/* Property Summary */}
      {selectedHouseType && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-blue-800">Property Summary</span>
          </div>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Property Type: {houseTypes?.find(t => t?.id === selectedHouseType)?.name}</p>
            <p>• Roof Area: {roofSize?.toLocaleString()} square feet</p>
            <p>• Lot Size: {lotSize} acres ({Math.round(lotSize * 43560)?.toLocaleString()} sq ft)</p>
            <p>• Estimated Collection Potential: {Math.round(roofSize * 0.623)} gallons per inch of rainfall</p>
          </div>
        </div>
      )}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default PropertyDetails;