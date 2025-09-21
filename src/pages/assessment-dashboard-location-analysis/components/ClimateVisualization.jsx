import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const ClimateVisualization = ({ locationData }) => {
  const [activeTab, setActiveTab] = useState('rainfall');

  const rainfallData = [
    { month: 'Jan', rainfall: 2.1, average: 2.3, year: '2024' },
    { month: 'Feb', rainfall: 1.8, average: 2.1, year: '2024' },
    { month: 'Mar', rainfall: 3.2, average: 2.8, year: '2024' },
    { month: 'Apr', rainfall: 4.1, average: 3.5, year: '2024' },
    { month: 'May', rainfall: 5.3, average: 4.8, year: '2024' },
    { month: 'Jun', rainfall: 3.7, average: 4.2, year: '2024' },
    { month: 'Jul', rainfall: 2.9, average: 3.1, year: '2024' },
    { month: 'Aug', rainfall: 2.4, average: 2.8, year: '2024' },
    { month: 'Sep', rainfall: 4.6, average: 4.1, year: '2024' },
    { month: 'Oct', rainfall: 3.8, average: 3.9, year: '2024' },
    { month: 'Nov', rainfall: 2.7, average: 2.9, year: '2024' },
    { month: 'Dec', rainfall: 2.2, average: 2.4, year: '2024' }
  ];

  const droughtData = [
    { year: '2019', frequency: 15, severity: 'Moderate' },
    { year: '2020', frequency: 22, severity: 'Severe' },
    { year: '2021', frequency: 8, severity: 'Mild' },
    { year: '2022', frequency: 18, severity: 'Moderate' },
    { year: '2023', frequency: 12, severity: 'Mild' },
    { year: '2024', frequency: 16, severity: 'Moderate' }
  ];

  const seasonalData = [
    { season: 'Spring', collection: 850, demand: 720, efficiency: 92 },
    { season: 'Summer', collection: 420, demand: 980, efficiency: 65 },
    { season: 'Fall', collection: 680, demand: 650, efficiency: 88 },
    { season: 'Winter', collection: 380, demand: 520, efficiency: 78 }
  ];

  const tabs = [
    { id: 'rainfall', label: 'Rainfall Patterns', icon: 'CloudRain' },
    { id: 'drought', label: 'Drought Analysis', icon: 'Sun' },
    { id: 'seasonal', label: 'Seasonal Trends', icon: 'Calendar' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="font-medium text-text-primary">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {activeTab === 'rainfall' && ' inches'}
              {activeTab === 'drought' && ' days'}
              {activeTab === 'seasonal' && (entry?.name?.includes('collection') || entry?.name?.includes('demand') ? ' gallons' : '%')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="CloudRain" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Climate Data Analysis</h3>
          <p className="text-sm text-text-secondary">Local weather patterns and water availability</p>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Container */}
      <div className="h-80 mb-6">
        {activeTab === 'rainfall' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rainfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rainfall" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="average" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'drought' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={droughtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="frequency" 
                stroke="var(--color-warning)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'seasonal' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="season" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="collection" 
                stackId="1" 
                stroke="var(--color-primary)" 
                fill="var(--color-primary)" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="demand" 
                stackId="2" 
                stroke="var(--color-secondary)" 
                fill="var(--color-secondary)" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Climate Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CloudRain" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-blue-800">Annual Rainfall</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">38.6"</p>
          <p className="text-sm text-blue-600">+12% above average</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Sun" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-orange-800">Drought Risk</span>
          </div>
          <p className="text-2xl font-bold text-orange-900">Moderate</p>
          <p className="text-sm text-orange-600">16 dry days expected</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Droplets" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-green-800">Collection Potential</span>
          </div>
          <p className="text-2xl font-bold text-green-900">24,000</p>
          <p className="text-sm text-green-600">gallons annually</p>
        </div>
      </div>
      {/* Climate Insights */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800 mb-1">Climate Insights</p>
            <ul className="text-yellow-700 space-y-1">
              <li>• Peak collection months: April-May and September</li>
              <li>• Summer water demand exceeds collection by 40%</li>
              <li>• Storage capacity of 2,500+ gallons recommended</li>
              <li>• Drought-resistant landscaping could reduce demand by 25%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateVisualization;