import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const CostBenefitAnalysis = ({ costData }) => {
  const [selectedScenario, setSelectedScenario] = useState('standard');
  const [timeframe, setTimeframe] = useState(10);

  const scenarios = [
    {
      id: 'basic',
      name: 'Basic System',
      upfront: 170000,
      maintenance: 4000,
      savings: 9600,
      description: 'Essential rainwater collection with basic storage'
    },
    {
      id: 'standard',
      name: 'Standard System',
      upfront: 250000,
      maintenance: 6000,
      savings: 14400,
      description: 'Comprehensive system with filtration and automation'
    },
    {
      id: 'premium',
      name: 'Premium System',
      upfront: 370000,
      maintenance: 9000,
      savings: 21600,
      description: 'Advanced system with smart controls and backup'
    }
  ];

  const generateCashFlowData = (scenario) => {
    const data = [];
    let cumulativeSavings = -scenario?.upfront;
    
    for (let year = 0; year <= timeframe; year++) {
      if (year === 0) {
        data?.push({
          year,
          investment: -scenario?.upfront,
          savings: 0,
          maintenance: 0,
          cumulative: -scenario?.upfront,
          netBenefit: -scenario?.upfront
        });
      } else {
        const annualSavings = scenario?.savings;
        const annualMaintenance = scenario?.maintenance;
        const netAnnual = annualSavings - annualMaintenance;
        cumulativeSavings += netAnnual;
        
        data?.push({
          year,
          investment: 0,
          savings: annualSavings,
          maintenance: -annualMaintenance,
          cumulative: cumulativeSavings,
          netBenefit: netAnnual
        });
      }
    }
    return data;
  };

  const currentScenario = scenarios?.find(s => s?.id === selectedScenario);
  const cashFlowData = generateCashFlowData(currentScenario);
  const breakEvenYear = cashFlowData?.find(d => d?.cumulative > 0)?.year || timeframe;
  const totalSavings = (currentScenario?.savings - currentScenario?.maintenance) * timeframe;
  const roi = ((totalSavings - currentScenario?.upfront) / currentScenario?.upfront) * 100;

  const costBreakdown = [
    { category: 'Collection System', amount: currentScenario?.upfront * 0.35, percentage: 35 },
    { category: 'Storage Tank', amount: currentScenario?.upfront * 0.30, percentage: 30 },
    { category: 'Filtration', amount: currentScenario?.upfront * 0.15, percentage: 15 },
    { category: 'Installation', amount: currentScenario?.upfront * 0.20, percentage: 20 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-elevation border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Cost-Benefit Analysis</h2>
          <p className="text-text-secondary">Interactive financial analysis with scenario comparison</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-text-secondary">Timeframe:</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e?.target?.value))}
              className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={5}>5 years</option>
              <option value={10}>10 years</option>
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
            </select>
          </div>
        </div>
      </div>
      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {scenarios?.map((scenario) => (
          <div
            key={scenario?.id}
            onClick={() => setSelectedScenario(scenario?.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedScenario === scenario?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-hover'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-primary">{scenario?.name}</h3>
              {selectedScenario === scenario?.id && (
                <Icon name="CheckCircle" size={20} className="text-primary" />
              )}
            </div>
            <p className="text-sm text-text-secondary mb-4">{scenario?.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Upfront Cost:</span>
                <span className="font-medium text-text-primary">₹{scenario?.upfront?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Annual Savings:</span>
                <span className="font-medium text-success">₹{scenario?.savings?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Annual Maintenance:</span>
                <span className="font-medium text-warning">₹{scenario?.maintenance?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="TrendingUp" size={24} className="text-primary" />
            <span className="text-sm font-medium text-text-secondary">ROI</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">{roi?.toFixed(1)}%</div>
          <div className="text-sm text-text-secondary">Over {timeframe} years</div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Calendar" size={24} className="text-success" />
            <span className="text-sm font-medium text-text-secondary">Break-even</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">{breakEvenYear} years</div>
          <div className="text-sm text-text-secondary">Payback period</div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border border-secondary/20">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="IndianRupee" size={24} className="text-secondary" />
            <span className="text-sm font-medium text-text-secondary">Total Savings</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">₹{totalSavings?.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Over {timeframe} years</div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Droplets" size={24} className="text-accent" />
            <span className="text-sm font-medium text-text-secondary">Water Saved</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">{(54000 * 3.785* timeframe / 1000)?.toFixed(0)}K</div>
          <div className="text-sm text-text-secondary">Litres over {timeframe} years</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cash Flow Chart */}
        {/* <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Cumulative Cash Flow</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="year" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value?.toLocaleString()}`, 'Cumulative']}
                  labelFormatter={(year) => `Year ${year}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#2563eb" 
                  fill="url(#colorCumulative)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        {/* Cost Breakdown */}
        {/* <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Cost Breakdown</h3>
          <div className="space-y-4">
            {costBreakdown?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 90}, 60%, 50%)` }}
                  ></div>
                  <span className="font-medium text-text-primary">{item?.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-text-primary">₹{item?.amount?.toLocaleString()}</div>
                  <div className="text-sm text-text-secondary">{item?.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calculator" size={20} className="text-primary" />
              <span className="font-semibold text-text-primary">Financial Summary</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Investment:</span>
                <span className="font-medium text-text-primary">₹{currentScenario?.upfront?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Net Annual Benefit:</span>
                <span className="font-medium text-success">₹{(currentScenario?.savings - currentScenario?.maintenance)?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-medium text-text-primary">Net Present Value:</span>
                <span className="font-bold text-primary">₹{(totalSavings - currentScenario?.upfront)?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div> */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Cost Breakdown</h3>
          <div className="space-y-4 ">
            {costBreakdown?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 90}, 60%, 50%)` }}
                  ></div>
                  <span className="font-medium text-text-primary">{item?.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-text-primary">₹{item?.amount?.toLocaleString()}</div>
                  <div className="text-sm text-text-secondary">{item?.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calculator" size={20} className="text-primary" />
              <span className="font-semibold text-text-primary">Financial Summary</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Investment:</span>
                <span className="font-medium text-text-primary">₹{currentScenario?.upfront?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Net Annual Benefit:</span>
                <span className="font-medium text-success">₹{(currentScenario?.savings - currentScenario?.maintenance)?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-medium text-text-primary">Net Present Value:</span>
                <span className="font-bold text-primary">₹{(totalSavings - currentScenario?.upfront)?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBenefitAnalysis;