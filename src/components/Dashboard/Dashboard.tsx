import React from 'react';
import { TrendingUp, Package, Radio, CheckSquare, DollarSign, AlertTriangle } from 'lucide-react';
import { mockSales, mockStock, mockBeacons, mockTasks } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const totalSales = mockSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const lowStockItems = mockStock.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length;
  const activeBeacons = mockBeacons.filter(beacon => beacon.status === 'active').length;
  const pendingTasks = mockTasks.filter(task => task.status === 'pending').length;

  const stats = [
    {
      title: 'Total Sales',
      value: `$${totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.5%'
    },
    {
      title: 'Active Beacons',
      value: activeBeacons.toString(),
      icon: Radio,
      color: 'bg-blue-500',
      change: '+5'
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks.toString(),
      icon: CheckSquare,
      color: 'bg-orange-500',
      change: '-2'
    },
    {
      title: 'Stock Alerts',
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '+1'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your After Sales Beacon Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className={`font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    {' '}from last month
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-4">
            {mockSales.slice(0, 3).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sale.customerName}</p>
                  <p className="text-sm text-gray-600">{sale.productType}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${sale.totalAmount.toLocaleString()}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                    sale.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">Low Stock Alert</p>
                <p className="text-sm text-red-700">Beacon Mini M1 is out of stock</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Package className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Battery Warning</p>
                <p className="text-sm text-yellow-700">Beacon BC003 has low battery (15%)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">New Task Created</p>
                <p className="text-sm text-blue-700">Setup beacon zone for Smart Mall Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;