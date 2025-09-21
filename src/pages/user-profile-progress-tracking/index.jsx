import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import ProgressOverview from './components/ProgressOverview';
import ProjectTimeline from './components/ProjectTimeline';
import AchievementBadges from './components/AchievementBadges';
import MaintenanceScheduler from './components/MaintenanceScheduler';
import SavedAssessments from './components/SavedAssessments';
import DocumentLibrary from './components/DocumentLibrary';
import NotificationSettings from './components/NotificationSettings';
import Icon from '../../components/AppIcon';

const UserProfileProgressTracking = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [notificationSettings, setNotificationSettings] = useState({
    maintenance: { enabled: true },
    community: { enabled: true },
    seasonal: { enabled: false },
    regulatory: { enabled: true },
    achievements: { enabled: true },
    system: { enabled: true },
    channels: {
      email: true,
      sms: false,
      push: true,
      whatsapp: false
    }
  });

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "Austin, Texas",
    joinDate: "March 2023",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  };

  // Mock stats data
  const statsData = [
    {
      icon: "Droplets",
      value: "12,450",
      label: "Gallons Saved",
      bgColor: "bg-primary/10",
      iconColor: "var(--color-primary)"
    },
    {
      icon: "DollarSign",
      value: "$2,340",
      label: "Cost Savings",
      bgColor: "bg-success/10",
      iconColor: "var(--color-success)"
    },
    {
      icon: "Leaf",
      value: "4.2 tons",
      label: "CO₂ Reduced",
      bgColor: "bg-accent/10",
      iconColor: "var(--color-accent)"
    },
    {
      icon: "Award",
      value: "15",
      label: "Badges Earned",
      bgColor: "bg-warning/10",
      iconColor: "var(--color-warning)"
    }
  ];

  // Mock progress data
  const progressData = {
    overallScore: 78,
    level: "Water Champion",
    categories: [
      {
        label: "Assessment Completion",
        percentage: 100,
        color: "var(--color-success)",
        icon: "CheckCircle"
      },
      {
        label: "System Implementation",
        percentage: 65,
        color: "var(--color-primary)",
        icon: "Settings"
      },
      {
        label: "Maintenance Compliance",
        percentage: 85,
        color: "var(--color-accent)",
        icon: "Wrench"
      },
      {
        label: "Community Engagement",
        percentage: 45,
        color: "var(--color-warning)",
        icon: "Users"
      }
    ],
    nextMilestones: [
      {
        title: "System Optimization",
        progress: "3 of 5 tasks",
        icon: "Target",
        bgColor: "bg-primary/10",
        iconColor: "var(--color-primary)"
      },
      {
        title: "Community Leader",
        progress: "2 referrals needed",
        icon: "Users",
        bgColor: "bg-accent/10",
        iconColor: "var(--color-accent)"
      },
      {
        title: "Maintenance Master",
        progress: "1 month streak",
        icon: "Award",
        bgColor: "bg-warning/10",
        iconColor: "var(--color-warning)"
      }
    ]
  };

  // Mock projects data
  const projectsData = [
    {
      name: "Rainwater Harvesting",
      phases: [
        {
          title: "Site Assessment",
          description: "Complete property evaluation and feasibility analysis",
          date: "Mar 15, 2024",
          status: "completed",
          tasks: [
            { name: "Roof area measurement", completed: true },
            { name: "Drainage analysis", completed: true },
            { name: "Soil permeability test", completed: true }
          ]
        },
        {
          title: "System Design",
          description: "Detailed system design and component selection",
          date: "Apr 2, 2024",
          status: "completed",
          tasks: [
            { name: "Tank sizing calculation", completed: true },
            { name: "Filtration system design", completed: true },
            { name: "Permit applications", completed: true }
          ]
        },
        {
          title: "Installation",
          description: "Professional installation of rainwater harvesting system",
          date: "May 10, 2024",
          status: "in-progress",
          tasks: [
            { name: "Gutter modifications", completed: true },
            { name: "Tank installation", completed: true },
            { name: "Filtration setup", completed: false },
            { name: "Control system", completed: false }
          ],
          nextAction: "Schedule filtration system installation"
        },
        {
          title: "Testing & Commissioning",
          description: "System testing and performance optimization",
          date: "Jun 1, 2024",
          status: "planned"
        }
      ],
      stats: {
        completed: 2,
        inProgress: 1,
        planned: 1,
        totalSavings: "$1,200/year"
      }
    },
    {
      name: "Greywater System",
      phases: [
        {
          title: "Planning Phase",
          description: "Initial planning and design considerations",
          date: "Jul 15, 2024",
          status: "planned"
        }
      ],
      stats: {
        completed: 0,
        inProgress: 0,
        planned: 1,
        totalSavings: "$800/year"
      }
    }
  ];

  // Mock achievements data
  const achievementsData = [
    {
      title: "First Assessment",
      shortDesc: "Completed first water assessment",
      description: "Successfully completed your first comprehensive water assessment",
      icon: "FileText",
      category: "implementation",
      tier: "bronze",
      earned: true,
      earnedDate: "Mar 2024",
      isNew: false
    },
    {
      title: "Water Saver",
      shortDesc: "Saved 10,000+ gallons",
      description: "Achieved significant water savings through conservation efforts",
      icon: "Droplets",
      category: "water-savings",
      tier: "gold",
      earned: true,
      earnedDate: "Aug 2024",
      isNew: true
    },
    {
      title: "System Installer",
      shortDesc: "Installed first system",
      description: "Successfully installed your first water conservation system",
      icon: "Settings",
      category: "implementation",
      tier: "silver",
      earned: true,
      earnedDate: "May 2024",
      isNew: false
    },
    {
      title: "Community Helper",
      shortDesc: "Helped 5 neighbors",
      description: "Assisted community members with their water conservation journey",
      icon: "Users",
      category: "community",
      tier: "bronze",
      earned: true,
      earnedDate: "Jul 2024",
      isNew: false
    },
    {
      title: "Maintenance Pro",
      shortDesc: "6-month maintenance streak",
      description: "Maintained consistent system maintenance for 6 months",
      icon: "Wrench",
      category: "implementation",
      tier: "gold",
      earned: false,
      progress: 4,
      target: 6,
      unit: "months"
    },
    {
      title: "Carbon Reducer",
      shortDesc: "Reduced 5 tons CO₂",
      description: "Achieved significant carbon footprint reduction through water conservation",
      icon: "Leaf",
      category: "environmental",
      tier: "platinum",
      earned: false,
      progress: 4.2,
      target: 5,
      unit: "tons"
    },
    {
      title: "Community Leader",
      shortDesc: "Recruited 10 members",
      description: "Successfully recruited 10 new members to the water conservation community",
      icon: "Crown",
      category: "community",
      tier: "platinum",
      earned: false,
      progress: 7,
      target: 10,
      unit: "members"
    },
    {
      title: "Cost Saver",
      shortDesc: "Saved $2,000+ annually",
      description: "Achieved significant cost savings through water conservation measures",
      icon: "DollarSign",
      category: "water-savings",
      tier: "gold",
      earned: true,
      earnedDate: "Sep 2024",
      isNew: true
    }
  ];

  // Mock maintenance data
  const maintenanceData = {
    overdueTasks: 2,
    stats: {
      completed: 12,
      upcoming: 5,
      overdue: 2,
      nextDue: "Oct 25"
    },
    tasks: [
      {
        title: "Filter Replacement",
        description: "Replace primary filtration system filters for optimal performance",
        dueDate: "Oct 20, 2024",
        estimatedTime: "30 minutes",
        system: "Rainwater System",
        priority: "high",
        status: "overdue",
        checklist: [
          "Turn off system water supply",
          "Remove old filter cartridges",
          "Install new filter cartridges",
          "Check for leaks and proper sealing",
          "Restart system and test flow"
        ],
        seasonalTip: "Fall is the perfect time to replace filters before winter debris accumulation."
      },
      {
        title: "Gutter Cleaning",
        description: "Clean gutters and downspouts to ensure proper water collection",
        dueDate: "Oct 15, 2024",
        estimatedTime: "2 hours",
        system: "Collection System",
        priority: "high",
        status: "overdue",
        checklist: [
          "Remove leaves and debris from gutters",
          "Check downspout connections",
          "Inspect gutter alignment",
          "Test water flow during next rain"
        ]
      },
      {
        title: "Tank Inspection",
        description: "Monthly inspection of storage tank condition and water quality",
        dueDate: "Oct 25, 2024",
        estimatedTime: "45 minutes",
        system: "Storage System",
        priority: "medium",
        status: "due-soon",
        checklist: [
          "Visual inspection of tank exterior",
          "Check water level and quality",
          "Inspect tank fittings and connections",
          "Test overflow and drainage systems"
        ]
      },
      {
        title: "Pump Maintenance",
        description: "Quarterly pump system maintenance and performance check",
        dueDate: "Nov 1, 2024",
        estimatedTime: "1 hour",
        system: "Distribution System",
        priority: "medium",
        status: "scheduled",
        seasonalTip: "Check pump performance before winter to ensure reliable operation during peak usage."
      },
      {
        title: "System Winterization",
        description: "Prepare system for winter weather conditions",
        dueDate: "Dec 1, 2024",
        estimatedTime: "3 hours",
        system: "Complete System",
        priority: "low",
        status: "scheduled",
        type: "seasonal",
        checklist: [
          "Drain exposed pipes and fittings",
          "Insulate vulnerable components",
          "Check heating elements if installed",
          "Review winter operation procedures"
        ],
        seasonalTip: "Proper winterization prevents costly freeze damage and ensures spring startup readiness."
      },
      {
        title: "Annual System Audit",
        description: "Comprehensive annual system performance and efficiency review",
        dueDate: "Mar 15, 2025",
        estimatedTime: "4 hours",
        system: "Complete System",
        priority: "low",
        status: "scheduled",
        type: "seasonal"
      }
    ]
  };

  // Mock saved assessments data
  const savedAssessmentsData = [
    {
      name: "Main Property Assessment",
      location: "123 Oak Street, Austin, TX",
      feasibilityScore: 85,
      potentialSavings: 1200,
      systemType: "Rainwater Harvesting",
      estimatedCost: 8500,
      createdDate: "Sep 15, 2024",
      isFavorite: true,
      tags: ["High ROI", "Recommended", "Primary"],
      versions: 3
    },
    {
      name: "Backyard Greywater System",
      location: "123 Oak Street, Austin, TX",
      feasibilityScore: 72,
      potentialSavings: 800,
      systemType: "Greywater Recycling",
      estimatedCost: 4200,
      createdDate: "Aug 22, 2024",
      isFavorite: false,
      tags: ["Secondary", "Future Project"],
      versions: 1
    },
    {
      name: "Vacation Home Analysis",
      location: "456 Lake View Drive, Hill Country, TX",
      feasibilityScore: 91,
      potentialSavings: 1800,
      systemType: "Rainwater + Solar",
      estimatedCost: 12000,
      createdDate: "Jul 10, 2024",
      isFavorite: true,
      tags: ["High Feasibility", "Off-Grid", "Premium"],
      versions: 2
    },
    {
      name: "Small Garden System",
      location: "123 Oak Street, Austin, TX",
      feasibilityScore: 45,
      potentialSavings: 300,
      systemType: "Simple Collection",
      estimatedCost: 1500,
      createdDate: "Jun 5, 2024",
      isFavorite: false,
      tags: ["Budget", "DIY Friendly"],
      versions: 1
    }
  ];

  // Mock documents data
  const documentsData = [
    {
      name: "Rainwater System Assessment Report",
      description: "Comprehensive feasibility analysis and system recommendations for main property",
      type: "pdf",
      size: 2457600,
      category: "reports",
      modifiedDate: "Sep 15, 2024",
      tags: ["Assessment", "Primary System"],
      cloudBackup: true
    },
    {
      name: "Installation Permit",
      description: "City of Austin rainwater harvesting system installation permit",
      type: "pdf",
      size: 1024000,
      category: "permits",
      modifiedDate: "Apr 10, 2024",
      tags: ["Legal", "Required"],
      cloudBackup: true,
      expiryDate: "Apr 10, 2025"
    },
    {
      name: "Tank Warranty Certificate",
      description: "5-year warranty documentation for 2500-gallon storage tank",
      type: "pdf",
      size: 512000,
      category: "warranties",
      modifiedDate: "May 15, 2024",
      tags: ["Warranty", "Tank"],
      cloudBackup: true,
      expiryDate: "May 15, 2029"
    },
    {
      name: "Monthly Maintenance Checklist",
      description: "Detailed maintenance procedures and scheduling template",
      type: "docx",
      size: 256000,
      category: "maintenance",
      modifiedDate: "Oct 1, 2024",
      tags: ["Maintenance", "Template"],
      cloudBackup: true
    },
    {
      name: "System Installation Photos",
      description: "Before and after photos of rainwater harvesting system installation",
      type: "zip",
      size: 15728640,
      category: "maintenance",
      modifiedDate: "May 20, 2024",
      tags: ["Photos", "Installation"],
      cloudBackup: true
    },
    {
      name: "Water Conservation Certificate",
      description: "City recognition certificate for outstanding water conservation efforts",
      type: "pdf",
      size: 1536000,
      category: "certificates",
      modifiedDate: "Aug 1, 2024",
      tags: ["Achievement", "Recognition"],
      cloudBackup: true
    },
    {
      name: "Pump Specifications",
      description: "Technical specifications and operation manual for distribution pump",
      type: "pdf",
      size: 3072000,
      category: "maintenance",
      modifiedDate: "May 12, 2024",
      tags: ["Technical", "Pump"],
      cloudBackup: false
    },
    {
      name: "Annual Performance Report",
      description: "Year-end system performance analysis and optimization recommendations",
      type: "xlsx",
      size: 2048000,
      category: "reports",
      modifiedDate: "Dec 31, 2023",
      tags: ["Performance", "Annual"],
      cloudBackup: true
    }
  ];

  const sectionNavigation = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'progress', name: 'Progress', icon: 'TrendingUp' },
    { id: 'projects', name: 'Projects', icon: 'Timeline' },
    { id: 'achievements', name: 'Achievements', icon: 'Award' },
    { id: 'maintenance', name: 'Maintenance', icon: 'Wrench' },
    { id: 'assessments', name: 'Assessments', icon: 'FileText' },
    { id: 'documents', name: 'Documents', icon: 'FolderOpen' },
    { id: 'settings', name: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header - Always Visible */}
          <ProfileHeader user={userData} stats={statsData} />

          {/* Section Navigation */}
          <div className="bg-white rounded-xl shadow-md border border-border p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {sectionNavigation?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground shadow-brand'
                      : 'bg-muted text-text-secondary hover:bg-hover hover:text-text-primary'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  {section?.name}
                  {section?.id === 'maintenance' && maintenanceData?.overdueTasks > 0 && (
                    <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full">
                      {maintenanceData?.overdueTasks}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Based on Active Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <ProgressOverview progressData={progressData} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md border border-border p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Icon name="Activity" size={20} color="var(--color-primary)" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                      <span className="text-sm text-text-primary">Completed tank inspection</span>
                      <span className="text-xs text-text-secondary ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Award" size={16} color="var(--color-warning)" />
                      <span className="text-sm text-text-primary">Earned "Water Saver" badge</span>
                      <span className="text-xs text-text-secondary ml-auto">1 day ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="FileText" size={16} color="var(--color-primary)" />
                      <span className="text-sm text-text-primary">Updated assessment report</span>
                      <span className="text-xs text-text-secondary ml-auto">3 days ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md border border-border p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Icon name="Target" size={20} color="var(--color-primary)" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                      <Icon name="Plus" size={16} color="var(--color-primary)" />
                      <span className="text-sm font-medium text-primary">Start New Assessment</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-hover transition-colors">
                      <Icon name="Calendar" size={16} color="var(--color-text-secondary)" />
                      <span className="text-sm text-text-primary">Schedule Maintenance</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-hover transition-colors">
                      <Icon name="Download" size={16} color="var(--color-text-secondary)" />
                      <span className="text-sm text-text-primary">Export Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'progress' && <ProgressOverview progressData={progressData} />}
          {activeSection === 'projects' && <ProjectTimeline projects={projectsData} />}
          {activeSection === 'achievements' && <AchievementBadges achievements={achievementsData} />}
          {activeSection === 'maintenance' && <MaintenanceScheduler maintenanceData={maintenanceData} />}
          {activeSection === 'assessments' && <SavedAssessments assessments={savedAssessmentsData} />}
          {activeSection === 'documents' && <DocumentLibrary documents={documentsData} />}
          {activeSection === 'settings' && (
            <NotificationSettings 
              settings={notificationSettings} 
              onSettingsChange={setNotificationSettings} 
            />
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-text-secondary">
            <p>&copy; {new Date()?.getFullYear()} Rain2Recharge. All rights reserved.</p>
            <p className="text-sm mt-2">Your water sustainability journey, intelligently guided.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfileProgressTracking;