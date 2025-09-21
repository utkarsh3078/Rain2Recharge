import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaintenanceScheduler = ({ maintenanceData }) => {
  const [selectedView, setSelectedView] = useState('upcoming');

  const views = [
    { id: 'upcoming', name: 'Upcoming', icon: 'Calendar' },
    { id: 'overdue', name: 'Overdue', icon: 'AlertTriangle' },
    { id: 'completed', name: 'Completed', icon: 'CheckCircle' },
    { id: 'seasonal', name: 'Seasonal', icon: 'Sun' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'overdue': return 'AlertTriangle';
      case 'due-soon': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'scheduled': return 'Calendar';
      default: return 'Circle';
    }
  };

  const filteredTasks = maintenanceData?.tasks?.filter(task => {
    switch (selectedView) {
      case 'upcoming': return task?.status === 'scheduled' || task?.status === 'due-soon';
      case 'overdue': return task?.status === 'overdue';
      case 'completed': return task?.status === 'completed';
      case 'seasonal': return task?.type === 'seasonal';
      default: return true;
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Wrench" size={24} color="var(--color-primary)" />
          <h2 className="text-xl font-bold text-text-primary">Maintenance Scheduler</h2>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Task
        </Button>
      </div>
      {/* View Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {views?.map((view) => (
          <button
            key={view?.id}
            onClick={() => setSelectedView(view?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedView === view?.id
                ? 'bg-primary text-primary-foreground shadow-brand'
                : 'bg-muted text-text-secondary hover:bg-hover hover:text-text-primary'
            }`}
          >
            <Icon name={view?.icon} size={16} />
            {view?.name}
            {view?.id === 'overdue' && maintenanceData?.overdueTasks > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full">
                {maintenanceData?.overdueTasks}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Maintenance Tasks */}
      <div className="space-y-4">
        {filteredTasks?.map((task, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${getPriorityColor(task?.priority)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  task?.status === 'completed' ? 'bg-success text-success-foreground' :
                  task?.status === 'overdue' ? 'bg-error text-error-foreground' :
                  'bg-primary text-primary-foreground'
                }`}>
                  <Icon name={getStatusIcon(task?.status)} size={20} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">{task?.title}</h3>
                  <p className="text-text-secondary text-sm mb-2">{task?.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>{task?.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{task?.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} />
                      <span>{task?.system}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task?.priority)}`}>
                  {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
                </span>
                
                {task?.status !== 'completed' && (
                  <Button variant="outline" size="sm">
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>

            {/* Task Details */}
            {task?.checklist && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <h4 className="text-sm font-medium text-text-primary mb-2">Checklist:</h4>
                <div className="space-y-1">
                  {task?.checklist?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-sm">
                      <Icon name="Square" size={14} color="var(--color-text-secondary)" />
                      <span className="text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seasonal Tips */}
            {task?.seasonalTip && (
              <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-start gap-2">
                  <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
                  <div>
                    <h4 className="text-sm font-medium text-accent mb-1">Seasonal Tip</h4>
                    <p className="text-sm text-text-secondary">{task?.seasonalTip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">{maintenanceData?.stats?.completed}</div>
            <div className="text-xs text-text-secondary">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">{maintenanceData?.stats?.upcoming}</div>
            <div className="text-xs text-text-secondary">Upcoming</div>
          </div>
          <div>
            <div className="text-lg font-bold text-error">{maintenanceData?.stats?.overdue}</div>
            <div className="text-xs text-text-secondary">Overdue</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{maintenanceData?.stats?.nextDue}</div>
            <div className="text-xs text-text-secondary">Next Due</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScheduler;