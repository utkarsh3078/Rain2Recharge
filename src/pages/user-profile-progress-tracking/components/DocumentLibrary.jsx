import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentLibrary = ({ documents }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Documents', icon: 'FileText', count: documents?.length },
    { id: 'reports', name: 'Reports', icon: 'BarChart3', count: documents?.filter(d => d?.category === 'reports')?.length },
    { id: 'permits', name: 'Permits', icon: 'Shield', count: documents?.filter(d => d?.category === 'permits')?.length },
    { id: 'warranties', name: 'Warranties', icon: 'Award', count: documents?.filter(d => d?.category === 'warranties')?.length },
    { id: 'maintenance', name: 'Maintenance', icon: 'Wrench', count: documents?.filter(d => d?.category === 'maintenance')?.length },
    { id: 'certificates', name: 'Certificates', icon: 'Medal', count: documents?.filter(d => d?.category === 'certificates')?.length }
  ];

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'doc': case'docx': return 'FileText';
      case 'xls': case'xlsx': return 'Sheet';
      case 'jpg': case'jpeg': case'png': return 'Image';
      case 'zip': return 'Archive';
      default: return 'File';
    }
  };

  const getFileColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'text-error';
      case 'doc': case'docx': return 'text-primary';
      case 'xls': case'xlsx': return 'text-success';
      case 'jpg': case'jpeg': case'png': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const filteredDocuments = documents?.filter(doc => selectedCategory === 'all' || doc?.category === selectedCategory)?.filter(doc => 
      doc?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      doc?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="FolderOpen" size={24} color="var(--color-primary)" />
          <h2 className="text-xl font-bold text-text-primary">Document Library</h2>
        </div>
        <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
          Upload Document
        </Button>
      </div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <Icon name="Search" size={20} color="var(--color-text-secondary)" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-brand'
                : 'bg-muted text-text-secondary hover:bg-hover hover:text-text-primary'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            {category?.name}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category?.id
                ? 'bg-white/20 text-primary-foreground'
                : 'bg-white text-text-secondary'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments?.map((document, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
            {/* Document Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${getFileColor(document?.type)}`}>
                <Icon name={getFileIcon(document?.type)} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary truncate mb-1">{document?.name}</h3>
                <p className="text-sm text-text-secondary line-clamp-2">{document?.description}</p>
              </div>
              
              <button className="p-1 hover:bg-hover rounded">
                <Icon name="MoreVertical" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>

            {/* Document Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Type:</span>
                <span className="font-medium text-text-primary uppercase">{document?.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Size:</span>
                <span className="font-medium text-text-primary">{formatFileSize(document?.size)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Modified:</span>
                <span className="font-medium text-text-primary">{document?.modifiedDate}</span>
              </div>
            </div>

            {/* Tags */}
            {document?.tags && (
              <div className="flex flex-wrap gap-1 mb-4">
                {document?.tags?.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <Button variant="ghost" size="sm" iconName="Eye" className="flex-1">
                View
              </Button>
              <Button variant="ghost" size="sm" iconName="Download" className="flex-1">
                Download
              </Button>
              <Button variant="ghost" size="sm" iconName="Share">
                <Icon name="Share" size={16} />
              </Button>
            </div>

            {/* Cloud Backup Status */}
            {document?.cloudBackup && (
              <div className="mt-2 flex items-center gap-1 text-xs text-success">
                <Icon name="Cloud" size={12} />
                <span>Backed up to cloud</span>
              </div>
            )}

            {/* Expiry Warning */}
            {document?.expiryDate && new Date(document.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
              <div className="mt-2 flex items-center gap-1 text-xs text-warning">
                <Icon name="AlertTriangle" size={12} />
                <span>Expires {document?.expiryDate}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredDocuments?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No documents found</h3>
          <p className="text-text-secondary mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Upload your first document to get started.'}
          </p>
          <Button variant="default" iconName="Upload" iconPosition="left">
            Upload Document
          </Button>
        </div>
      )}
      {/* Storage Summary */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-text-primary">Storage Usage</h3>
          <span className="text-sm text-text-secondary">2.3 GB of 5 GB used</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '46%' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">{documents?.length}</div>
            <div className="text-xs text-text-secondary">Total Files</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">{documents?.filter(d => d?.cloudBackup)?.length}</div>
            <div className="text-xs text-text-secondary">Backed Up</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">
              {documents?.filter(d => d?.expiryDate && new Date(d.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))?.length}
            </div>
            <div className="text-xs text-text-secondary">Expiring Soon</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              {Math.round(documents?.reduce((sum, d) => sum + d?.size, 0) / (1024 * 1024))} MB
            </div>
            <div className="text-xs text-text-secondary">Total Size</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLibrary;