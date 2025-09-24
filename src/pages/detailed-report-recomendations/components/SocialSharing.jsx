import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import logo from '../../../assets/water.jpeg'

const SocialSharing = ({ reportData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('impact');
  const [customMessage, setCustomMessage] = useState('');

  const shareTemplates = [
    {
      id: 'impact',
      name: 'Environmental Impact',
      preview: `🌍 Just completed my rainwater harvesting assessment! My property can save ${reportData?.waterSavings?.toLocaleString()} gallons annually and reduce CO₂ by ${reportData?.co2Reduction} lbs/year. Every drop counts! #RainwaterHarvesting #Sustainability`,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      hashtags: ['#RainwaterHarvesting', '#Sustainability', '#WaterConservation', '#EcoFriendly']
    },
    {
      id: 'savings',
      name: 'Cost Savings',
      preview: `💰 Smart water investment ahead! My rainwater system will save $${((reportData?.waterSavings * 0.004) * 10)?.toLocaleString()} over 10 years with a ${reportData?.feasibilityScore}/100 feasibility score. ROI in ${reportData?.roiTimeline} years! #SmartInvestment #WaterSavings`,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      hashtags: ['#SmartInvestment', '#WaterSavings', '#ROI', '#HomeImprovement']
    },
    {
      id: 'community',
      name: 'Community Challenge',
      preview: `🏘️ Leading by example in water sustainability! If every home in our neighborhood harvested rainwater like this, we could save millions of gallons annually. Who's joining the movement? #CommunityAction #WaterStewardship`,image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      hashtags: ['#CommunityAction', '#WaterStewardship', '#NeighborhoodGoals', '#SustainableLiving']
    }
  ];

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-500',
      maxLength: 280,
      action: 'Share Tweet'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600',
      maxLength: 500,
      action: 'Share Post'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700',
      maxLength: 700,
      action: 'Share Update'
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      maxLength: 150,
      action: 'Share Story'
    }
  ];

  const currentTemplate = shareTemplates?.find(t => t?.id === selectedTemplate);
  const shareText = customMessage || currentTemplate?.preview;

  const generateImpactGraphic = () => {
    return (
      <div className="relative bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              {/* <Icon name="Droplets" size={24} color="white" /> */}
              <img src={logo} alt="" className="h-[48px] w-[48px] rounded-md" color="var(--color-primary)"/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#FAF3E0]">Rain2Recharge</h3>
              <p className="text-white/80 text-sm">Smart Water Assessment</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{reportData?.waterSavings?.toLocaleString()}</div>
              <div className="text-white/80 text-sm">Gallons/Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{reportData?.feasibilityScore}</div>
              <div className="text-white/80 text-sm">Feasibility Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">₹{reportData?.costRange?.min?.toLocaleString()}</div>
              <div className="text-white/80 text-sm">Starting Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{reportData?.co2Reduction}</div>
              <div className="text-white/80 text-sm">lbs CO₂ Saved</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/90 text-sm mb-2">Every drop counts for our planet's future</p>
            <div className="flex justify-center space-x-2">
              {currentTemplate?.hashtags?.slice(0, 3)?.map((tag, index) => (
                <span key={index} className="bg-white/20 px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleShare = (platform) => {
    const url = window.location?.href;
    const text = encodeURIComponent(shareText);
    
    // let shareUrl = '';
    // switch (platform?.name) {
    //   case 'Twitter':
    //     shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    //     break;
    //   case 'Facebook':
    //     shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    //     break;
    //   case 'LinkedIn':
    //     shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`;
    //     break;
    //   default:
    //     navigator.clipboard?.writeText(`${shareText} ${url}`);
    //     return;
    // }

    let shareUrl = '';
    switch (platform?.name) {
      case 'Twitter':
        shareUrl = "#";
        break;
      case 'Facebook':
        shareUrl = "#";
        break;
      case 'LinkedIn':
        shareUrl = "#";
        break;
        case 'Instagram':
        shareUrl = "#";
        break;
      default:
        navigator.clipboard?.writeText(`${shareText} ${url}`);
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const downloadGraphic = () => {
    // In a real implementation, this would generate and download the graphic
    console.log('Downloading impact graphic...');
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Share Your Impact</h2>
          <p className="text-text-secondary">Inspire others with your sustainability commitment</p>
        </div>
        <Button variant="outline" onClick={downloadGraphic}>
          <Icon name="Download" size={16} className="mr-2" />
          Download Graphic
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Template Selection & Preview */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Choose Your Message</h3>
          
          <div className="space-y-3 mb-6">
            {shareTemplates?.map((template) => (
              <div
                key={template?.id}
                onClick={() => setSelectedTemplate(template?.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedTemplate === template?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-hover'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary">{template?.name}</h4>
                  {selectedTemplate === template?.id && (
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                  )}
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">{template?.preview}</p>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Custom Message (Optional)
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e?.target?.value)}
              placeholder="Write your own message or use the template above..."
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-text-secondary">
                {shareText?.length} characters
              </span>
              <div className="flex space-x-1">
                {currentTemplate?.hashtags?.map((tag, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Graphic & Sharing */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Impact Graphic</h3>
          
          <div className="mb-6">
            {generateImpactGraphic()}
          </div>

          <div>
            <h4 className="font-medium text-text-primary mb-4">Share On</h4>
            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms?.map((platform) => (
                <button
                  key={platform?.name}
                  onClick={() => handleShare(platform)}
                  className={`${platform?.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                >
                  <Icon name={platform?.icon} size={20} />
                  <span className="font-medium">{platform?.action}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">Community Impact</span>
            </div>
            <p className="text-sm text-text-secondary">
              Join thousands of homeowners making a difference. Your shared story could inspire 
              others to start their own water sustainability journey.
            </p>
          </div>

          <div className="mt-4 flex space-x-3">
            <Button variant="outline" size="sm" fullWidth>
              <Icon name="Copy" size={16} className="mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" fullWidth>
              <Icon name="Mail" size={16} className="mr-2" />
              Email Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSharing;