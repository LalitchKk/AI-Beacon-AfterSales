import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MessageSquare, Users, CheckCircle, Clock, AlertTriangle, Link, Shield } from 'lucide-react';
import { mockLineOAs, mockAccounts } from '../../data/mockData';
import { LineOA } from '../../types';
import LineOAModal from './LineOAModal';

const LineOAManagement: React.FC = () => {
  const [lineOAs, setLineOAs] = useState<LineOA[]>(mockLineOAs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLineOA, setEditingLineOA] = useState<LineOA | null>(null);

  const filteredLineOAs = lineOAs.filter(lineOA => {
    const matchesSearch = lineOA.lineOfficialAccountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lineOA.lineBasicId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lineOA.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lineOA.status === statusFilter;
    const matchesAccount = accountFilter === 'all' || lineOA.accountId === accountFilter;
    return matchesSearch && matchesStatus && matchesAccount;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'suspended':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'inactive':
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleCreate = () => {
    setEditingLineOA(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lineOA: LineOA) => {
    setEditingLineOA(lineOA);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this LINE OA? This action cannot be undone.')) {
      setLineOAs(prev => prev.filter(lineOA => lineOA.id !== id));
    }
  };

  const handleSave = (lineOAData: Partial<LineOA>) => {
    if (editingLineOA) {
      // Update existing
      setLineOAs(prev => prev.map(lineOA => 
        lineOA.id === editingLineOA.id 
          ? { ...lineOA, ...lineOAData, lastUpdated: new Date().toISOString().split('T')[0] }
          : lineOA
      ));
    } else {
      // Create new
      const newLineOA: LineOA = {
        id: `LOA${String(lineOAs.length + 1).padStart(3, '0')}`,
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        isVerified: false,
        followerCount: 0,
        messagesSent: 0,
        ...lineOAData
      } as LineOA;
      setLineOAs(prev => [...prev, newLineOA]);
    }
    setIsModalOpen(false);
    setEditingLineOA(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">LINE OA Management</h1>
        <p className="text-gray-600">Manage LINE Official Account integrations and configurations</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total LINE OAs</p>
              <p className="text-2xl font-bold text-gray-900">{lineOAs.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Accounts</p>
              <p className="text-2xl font-bold text-green-600">
                {lineOAs.filter(oa => oa.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold text-blue-600">
                {lineOAs.reduce((sum, oa) => sum + (oa.followerCount || 0), 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages Sent</p>
              <p className="text-2xl font-bold text-purple-600">
                {lineOAs.reduce((sum, oa) => sum + (oa.messagesSent || 0), 0).toLocaleString()}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search LINE OAs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <select
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Accounts</option>
              {mockAccounts.map(account => (
                <option key={account.id} value={account.id}>{account.companyName}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add LINE OA
          </button>
        </div>
      </div>

      {/* LINE OA Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLineOAs.map((lineOA) => (
          <div key={lineOA.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    lineOA.status === 'active' ? 'bg-green-100' : 
                    lineOA.status === 'pending' ? 'bg-yellow-100' : 
                    lineOA.status === 'suspended' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <MessageSquare className={`w-6 h-6 ${
                      lineOA.status === 'active' ? 'text-green-600' : 
                      lineOA.status === 'pending' ? 'text-yellow-600' : 
                      lineOA.status === 'suspended' ? 'text-red-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lineOA.lineOfficialAccountName}</h3>
                    <p className="text-sm text-gray-500">{lineOA.lineBasicId}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lineOA.status)}`}>
                    {lineOA.status}
                  </span>
                  {lineOA.isVerified && (
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600 font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{lineOA.accountName}</p>
                  <p className="text-gray-600">Provider: {lineOA.lineProviderName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Followers</p>
                    <p className="font-medium text-gray-900">{lineOA.followerCount?.toLocaleString() || '0'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Messages</p>
                    <p className="font-medium text-gray-900">{lineOA.messagesSent?.toLocaleString() || '0'}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-gray-600">Channel ID</p>
                  <p className="font-mono text-xs text-gray-900 bg-gray-50 px-2 py-1 rounded">
                    {lineOA.lineChannelId}
                  </p>
                </div>

                {lineOA.notes && (
                  <div className="text-sm">
                    <p className="text-gray-600">Notes</p>
                    <p className="text-gray-900">{lineOA.notes}</p>
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  <p>Created: {new Date(lineOA.createdDate).toLocaleDateString()}</p>
                  <p>Updated: {new Date(lineOA.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEdit(lineOA)}
                    className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(lineOA.id)}
                    className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 font-medium">
                  <Link className="w-3 h-3" />
                  Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <LineOAModal
          lineOA={editingLineOA}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingLineOA(null);
          }}
        />
      )}
    </div>
  );
};

export default LineOAManagement;