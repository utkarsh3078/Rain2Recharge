import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ImplementationRoadmap = ({ roadmapData }) => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const phases = [
    {
      id: 'planning',
      title: 'Planning & Permits',
      duration: '2-4 weeks',
      season: 'Any season',
      status: 'pending',
      tasks: [
        {
          name: 'Finalize system design',
          duration: '3-5 days',
          dependencies: [],
          critical: true,
          description: 'Review and approve detailed system specifications'
        },
        {
          name: 'Submit permit applications',
          duration: '1-2 weeks',
          dependencies: ['design'],
          critical: true,
          description: 'File building permits and regulatory approvals'
        },
        {
          name: 'Schedule contractor consultations',
          duration: '1 week',
          dependencies: [],
          critical: false,
          description: 'Meet with certified installation partners'
        },
        {
          name: 'Order materials and equipment',
          duration: '1-2 weeks',
          dependencies: ['permits'],
          critical: true,
          description: 'Purchase tanks, pumps, and filtration systems'
        }
      ]
    },
    {
      id: 'preparation',
      title: 'Site Preparation',
      duration: '1-2 weeks',
      season: 'Spring/Summer preferred',
      status: 'pending',
      tasks: [
        {
          name: 'Site excavation',
          duration: '2-3 days',
          dependencies: ['permits'],
          critical: true,
          description: 'Dig foundation for underground storage tank'
        },
        {
          name: 'Utility marking and clearance',
          duration: '1-2 days',
          dependencies: [],
          critical: true,
          description: 'Mark underground utilities and ensure clearances'
        },
        {
          name: 'Drainage and grading',
          duration: '2-3 days',
          dependencies: ['excavation'],
          critical: true,
          description: 'Prepare proper drainage and site grading'
        },
        {
          name: 'Access preparation',
          duration: '1 day',
          dependencies: [],
          critical: false,
          description: 'Clear access routes for equipment delivery'
        }
      ]
    },
    {
      id: 'installation',
      title: 'System Installation',
      duration: '1-2 weeks',
      season: 'Dry weather preferred',
      status: 'pending',
      tasks: [
        {
          name: 'Storage tank installation',
          duration: '2-3 days',
          dependencies: ['excavation'],
          critical: true,
          description: 'Install and position underground cistern'
        },
        {
          name: 'Collection system setup',
          duration: '2-3 days',
          dependencies: [],
          critical: true,
          description: 'Install gutters, downspouts, and collection network'
        },
        {
          name: 'Filtration system installation',
          duration: '1-2 days',
          dependencies: ['tank'],
          critical: true,
          description: 'Set up multi-stage filtration and treatment'
        },
        {
          name: 'Pump and control systems',
          duration: '1-2 days',
          dependencies: ['filtration'],
          critical: true,
          description: 'Install pumps, sensors, and automation controls'
        },
        {
          name: 'Electrical connections',
          duration: '1 day',
          dependencies: ['controls'],
          critical: true,
          description: 'Complete electrical wiring and safety systems'
        }
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Commissioning',
      duration: '1 week',
      season: 'Any season',
      status: 'pending',
      tasks: [
        {
          name: 'System pressure testing',
          duration: '1 day',
          dependencies: ['installation'],
          critical: true,
          description: 'Test all connections for leaks and pressure'
        },
        {
          name: 'Water quality testing',
          duration: '2-3 days',
          dependencies: ['pressure'],
          critical: true,
          description: 'Verify filtration effectiveness and water quality'
        },
        {
          name: 'Automation calibration',
          duration: '1-2 days',
          dependencies: ['installation'],
          critical: true,
          description: 'Configure sensors, controls, and monitoring systems'
        },
        {
          name: 'Final inspection',
          duration: '1 day',
          dependencies: ['testing'],
          critical: true,
          description: 'Municipal inspection and system certification'
        }
      ]
    },
    {
      id: 'optimization',
      title: 'Optimization & Training',
      duration: '2-3 weeks',
      season: 'First rain season',
      status: 'pending',
      tasks: [
        {
          name: 'Initial operation monitoring',
          duration: '1 week',
          dependencies: ['commissioning'],
          critical: false,
          description: 'Monitor system performance during first rainfall'
        },
        {
          name: 'User training session',
          duration: '2-3 hours',
          dependencies: ['commissioning'],
          critical: true,
          description: 'Learn system operation and maintenance procedures'
        },
        {
          name: 'Performance optimization',
          duration: '1 week',
          dependencies: ['monitoring'],
          critical: false,
          description: 'Fine-tune settings based on initial performance'
        },
        {
          name: 'Documentation handover',
          duration: '1 day',
          dependencies: ['training'],
          critical: true,
          description: 'Receive manuals, warranties, and maintenance schedules'
        }
      ]
    }
  ];

  const milestones = [
    {
      name: 'Permits Approved',
      date: 'Week 3',
      status: 'pending',
      description: 'All regulatory approvals obtained'
    },
    {
      name: 'Installation Complete',
      date: 'Week 7',
      status: 'pending',
      description: 'Physical system installation finished'
    },
    {
      name: 'System Operational',
      date: 'Week 8',
      status: 'pending',
      description: 'System tested and ready for use'
    },
    {
      name: 'First Harvest',
      date: 'Week 10',
      status: 'pending',
      description: 'First successful rainwater collection'
    }
  ];

  const currentPhase = phases?.[selectedPhase];
  const totalTasks = phases?.reduce((sum, phase) => sum + phase?.tasks?.length, 0);
  const completedTasks = phases?.reduce((sum, phase) => 
    sum + phase?.tasks?.filter(task => task?.status === 'completed')?.length, 0
  );
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-elevation border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Implementation Roadmap</h2>
          <p className="text-text-secondary">Step-by-step guidance with timeline and milestones</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-text-secondary">Overall Progress</div>
            <div className="text-lg font-semibold text-primary">{progressPercentage?.toFixed(0)}%</div>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeDasharray={`${progressPercentage}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Phase Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-8 overflow-x-auto">
        {phases?.map((phase, index) => (
          <button
            key={phase?.id}
            onClick={() => setSelectedPhase(index)}
            className={`flex-shrink-0 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedPhase === index
                ? 'bg-white text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                phase?.status === 'completed' ? 'bg-success' :
                phase?.status === 'in-progress' ? 'bg-warning' : 'bg-gray-300'
              }`}></div>
              <span>{phase?.title}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phase Details */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">{currentPhase?.title}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={16} />
                  <span>{currentPhase?.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Calendar" size={16} />
                  <span>{currentPhase?.season}</span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentPhase?.status === 'completed' ? 'bg-success/10 text-success' :
              currentPhase?.status === 'in-progress'? 'bg-warning/10 text-warning' : 'bg-gray-100 text-text-secondary'
            }`}>
              {currentPhase?.status === 'completed' ? 'Completed' :
               currentPhase?.status === 'in-progress' ? 'In Progress' : 'Pending'}
            </div>
          </div>

          <div className="space-y-4">
            {currentPhase?.tasks?.map((task, index) => (
              <div key={index} className={`p-4 rounded-lg border transition-all duration-200 ${
                task?.critical ? 'border-primary/30 bg-primary/5' : 'border-border bg-gray-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      task?.status === 'completed' ? 'bg-success border-success' :
                      task?.status === 'in-progress'? 'bg-warning border-warning' : 'bg-white border-gray-300'
                    }`}>
                      {task?.status === 'completed' && (
                        <Icon name="Check" size={14} color="white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{task?.name}</h4>
                      <p className="text-sm text-text-secondary mt-1">{task?.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {task?.critical && (
                      <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        Critical
                      </div>
                    )}
                    <span className="text-sm text-text-secondary">{task?.duration}</span>
                  </div>
                </div>
                
                {task?.dependencies?.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="ArrowRight" size={12} />
                    <span>Depends on: {task?.dependencies?.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline & Milestones */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Project Timeline</h4>
            <div className="space-y-3">
              {phases?.map((phase, index) => (
                <div key={phase?.id} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === selectedPhase ? 'bg-primary' :
                    phase?.status === 'completed'? 'bg-success' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">{phase?.title}</div>
                    <div className="text-xs text-text-secondary">{phase?.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Key Milestones</h4>
            <div className="space-y-3">
              {milestones?.map((milestone, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary">{milestone?.name}</span>
                    <span className="text-xs text-text-secondary">{milestone?.date}</span>
                  </div>
                  <p className="text-xs text-text-secondary">{milestone?.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={20} className="text-primary" />
              <span className="font-semibold text-text-primary">Pro Tip</span>
            </div>
            <p className="text-sm text-text-secondary">
              Start planning during dry season for optimal installation timing. 
              Consider seasonal rainfall patterns when scheduling your project phases.
            </p>
          </div>

          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={20} className="text-secondary" />
              <span className="font-semibold text-text-primary">Seasonal Timing</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Best Start:</span>
                <span className="text-text-primary">Late Spring</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Avoid:</span>
                <span className="text-text-primary">Peak Winter</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">First Harvest:</span>
                <span className="text-text-primary">Fall Season</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationRoadmap;