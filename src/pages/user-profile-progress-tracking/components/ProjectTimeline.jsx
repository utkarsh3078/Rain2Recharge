import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectTimeline = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'planned': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'planned': return 'Circle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Timeline" size={24} color="var(--color-primary)" />
          <h2 className="text-xl font-bold text-text-primary">Project Timeline</h2>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Project
        </Button>
      </div>
      {/* Project Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {projects?.map((project, index) => (
          <button
            key={index}
            onClick={() => setSelectedProject(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedProject === index
                ? 'bg-primary text-primary-foreground shadow-brand'
                : 'bg-muted text-text-secondary hover:bg-hover hover:text-text-primary'
            }`}
          >
            {project?.name}
          </button>
        ))}
      </div>
      {/* Timeline */}
      <div className="space-y-4">
        {projects?.[selectedProject]?.phases?.map((phase, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(phase?.status)}`}>
                <Icon name={getStatusIcon(phase?.status)} size={20} />
              </div>
              {index < projects?.[selectedProject]?.phases?.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2" />
              )}
            </div>

            {/* Phase Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-text-primary">{phase?.title}</h3>
                <span className="text-sm text-text-secondary">{phase?.date}</span>
              </div>
              <p className="text-text-secondary text-sm mb-3">{phase?.description}</p>
              
              {phase?.tasks && (
                <div className="space-y-2">
                  {phase?.tasks?.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2 text-sm">
                      <Icon 
                        name={task?.completed ? "CheckCircle2" : "Circle"} 
                        size={16} 
                        color={task?.completed ? "var(--color-success)" : "var(--color-text-secondary)"} 
                      />
                      <span className={task?.completed ? 'text-text-secondary line-through' : 'text-text-primary'}>
                        {task?.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {phase?.nextAction && (
                <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 text-primary">
                    <Icon name="ArrowRight" size={16} />
                    <span className="text-sm font-medium">Next: {phase?.nextAction}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Project Stats */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-success">{projects?.[selectedProject]?.stats?.completed}</div>
            <div className="text-xs text-text-secondary">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">{projects?.[selectedProject]?.stats?.inProgress}</div>
            <div className="text-xs text-text-secondary">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-text-secondary">{projects?.[selectedProject]?.stats?.planned}</div>
            <div className="text-xs text-text-secondary">Planned</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{projects?.[selectedProject]?.stats?.totalSavings}</div>
            <div className="text-xs text-text-secondary">Est. Savings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;