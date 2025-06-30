import React, { useState } from 'react';
import { Search, Radio, Battery, MapPin, Settings, Plus, AlertTriangle } from 'lucide-react';
import { mockBeacons } from '../../data/mockData';
import { Beacon } from '../../types';

const BeaconManagement: React.FC = () => {
  const [beacons, setBeacons] = useState<Beacon[]>(mockBeacons);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBeacons = beacons.filter(beacon => {
    const matchesSearch = beacon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beacon.zoneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beacon.macAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || beacon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBatteryIcon = (level: number) => {
    if (level <= 20) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    return <Battery className={`w-4 h-4 ${getBatteryColor(level)}`} />;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Beacon Management</h1>
        <p className="text-gray-600">Monitor and manage beacon devices and zones</p>
      </div>

      {/* Beacon Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Beacons</p>
              <p className="text-2xl font-bold text-gray-900">{beacons.length}</p>
            </div>
            <Radio className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {beacons.filter(b => b.status === 'active').length}
              </p>
            </div>
            <Radio className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Battery</p>
              <p className="text-2xl font-bold text-yellow-600">
                {beacons.filter(b => b.batteryLevel <= 20).length}
              </p>
            </div>
            <Battery className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-red-600">
                {beacons.filter(b => b.status === 'maintenance').length}
              </p>
            </div>
            <Settings className="w-8 h-8 text-red-500" />
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
                placeholder="Search beacons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Beacon
          </button>
        </div>
      </div>

      {/* Beacons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeacons.map((beacon) => (
          <div key={beacon.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  beacon.status === 'active' ? 'bg-green-100' : 
                  beacon.status === 'maintenance' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <Radio className={`w-5 h-5 ${
                    beacon.status === 'active' ? 'text-green-600' : 
                    beacon.status === 'maintenance' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{beacon.name}</h3>
                  <p className="text-sm text-gray-500">{beacon.id}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(beacon.status)}`}>
                {beacon.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{beacon.zoneName}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {getBatteryIcon(beacon.batteryLevel)}
                <span className={`font-medium ${getBatteryColor(beacon.batteryLevel)}`}>
                  {beacon.batteryLevel}% Battery
                </span>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>MAC: {beacon.macAddress}</p>
                <p>Last seen: {new Date(beacon.lastSeen).toLocaleString()}</p>
                <p>Bound: {new Date(beacon.bindingDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <button className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                Configure
              </button>
              <button className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeaconManagement;