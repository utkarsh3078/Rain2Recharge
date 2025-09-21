import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedAssessments = ({ assessments }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'date', label: 'Date Created' },
    { value: 'name', label: 'Name' },
    { value: 'score', label: 'Feasibility Score' },
    { value: 'savings', label: 'Potential Savings' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Assessments' },
    { value: 'high-feasibility', label: 'High Feasibility' },
    { value: 'medium-feasibility', label: 'Medium Feasibility' },
    { value: 'low-feasibility', label: 'Low Feasibility' },
    { value: 'favorites', label: 'Favorites' }
  ];

  const getFeasibilityColor = (score) => {
    if (score >= 80) return 'text-success bg-success/10 border-success/20';
    if (score >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getFeasibilityLabel = (score) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  const sortedAndFilteredAssessments = assessments?.filter(assessment => {
      switch (filterBy) {
        case 'high-feasibility': return assessment?.feasibilityScore >= 80;
        case 'medium-feasibility': return assessment?.feasibilityScore >= 60 && assessment?.feasibilityScore < 80;
        case 'low-feasibility': return assessment?.feasibilityScore < 60;
        case 'favorites': return assessment?.isFavorite;
        default: return true;
      }
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a?.name?.localeCompare(b?.name);
        case 'score': return b?.feasibilityScore - a?.feasibilityScore;
        case 'savings': return b?.potentialSavings - a?.potentialSavings;
        default: return new Date(b.createdDate) - new Date(a.createdDate);
      }
    });

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="FileText" size={24} color="var(--color-primary)" />
          <h2 className="text-xl font-bold text-text-primary">Saved Assessments</h2>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Assessment
        </Button>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-primary mb-2">Filter by:</label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {filterOptions?.map(option => (
              <option key={option?.value} value={option?.value}>{option?.label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-primary mb-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>{option?.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAndFilteredAssessments?.map((assessment, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">{assessment?.name}</h3>
                <p className="text-sm text-text-secondary">{assessment?.location}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-hover rounded">
                  <Icon 
                    name={assessment?.isFavorite ? "Heart" : "Heart"} 
                    size={16} 
                    color={assessment?.isFavorite ? "var(--color-error)" : "var(--color-text-secondary)"} 
                    fill={assessment?.isFavorite ? "var(--color-error)" : "none"}
                  />
                </button>
                <button className="p-1 hover:bg-hover rounded">
                  <Icon name="MoreVertical" size={16} color="var(--color-text-secondary)" />
                </button>
              </div>
            </div>

            {/* Feasibility Score */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3 ${getFeasibilityColor(assessment?.feasibilityScore)}`}>
              <Icon name="Target" size={14} />
              <span>{getFeasibilityLabel(assessment?.feasibilityScore)} Feasibility ({assessment?.feasibilityScore}%)</span>
            </div>

            {/* Key Metrics */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Potential Savings:</span>
                <span className="font-medium text-text-primary">${assessment?.potentialSavings}/year</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">System Type:</span>
                <span className="font-medium text-text-primary">{assessment?.systemType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Investment:</span>
                <span className="font-medium text-text-primary">${assessment?.estimatedCost?.toLocaleString()}</span>
              </div>
            </div>

            {/* Tags */}
            {assessment?.tags && (
              <div className="flex flex-wrap gap-1 mb-4">
                {assessment?.tags?.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-text-secondary">{assessment?.createdDate}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
                <Button variant="outline" size="sm" iconName="Download">
                  Export
                </Button>
              </div>
            </div>

            {/* Version History */}
            {assessment?.versions > 1 && (
              <div className="mt-2 p-2 bg-muted rounded text-xs text-text-secondary">
                <Icon name="GitBranch" size={12} className="inline mr-1" />
                {assessment?.versions} versions available
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {sortedAndFilteredAssessments?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No assessments found</h3>
          <p className="text-text-secondary mb-4">Try adjusting your filters or create a new assessment.</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create Assessment
          </Button>
        </div>
      )}
      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">{assessments?.length}</div>
            <div className="text-xs text-text-secondary">Total Assessments</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">{assessments?.filter(a => a?.feasibilityScore >= 80)?.length}</div>
            <div className="text-xs text-text-secondary">High Feasibility</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{assessments?.filter(a => a?.isFavorite)?.length}</div>
            <div className="text-xs text-text-secondary">Favorites</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              ${Math.round(assessments?.reduce((sum, a) => sum + a?.potentialSavings, 0) / assessments?.length)?.toLocaleString()}
            </div>
            <div className="text-xs text-text-secondary">Avg. Savings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedAssessments;