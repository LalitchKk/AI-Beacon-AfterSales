import React from 'react';
import { 
  BarChart3, 
  ShoppingCart, 
  Package, 
  Image, 
  Radio, 
  CheckSquare, 
  Users, 
  MessageSquare,
  Home,
  MessageCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'sales', label: 'Sales Management', icon: ShoppingCart },
    { id: 'stock', label: 'Stock Check', icon: Package },
    { id: 'banners', label: 'Banner Requests', icon: Image },
    { id: 'beacons', label: 'Beacon Management', icon: Radio },
    { id: 'tasks', label: 'Task Management', icon: CheckSquare },
    { id: 'accounts', label: 'Account Management', icon: Users },
    { id: 'line-oa', label: 'LINE OA Management', icon: MessageCircle },
    { id: 'messages', label: 'Beacon Messages', icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Beacon Manager</h1>
            <p className="text-sm text-gray-500">After Sales System</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;