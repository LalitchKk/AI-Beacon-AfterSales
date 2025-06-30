import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import SalesManagement from './components/Sales/SalesManagement';
import StockCheck from './components/Stock/StockCheck';
import BannerRequests from './components/Banners/BannerRequests';
import BeaconManagement from './components/Beacons/BeaconManagement';
import AccountManagement from './components/Accounts/AccountManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <SalesManagement />;
      case 'stock':
        return <StockCheck />;
      case 'banners':
        return <BannerRequests />;
      case 'beacons':
        return <BeaconManagement />;
      case 'accounts':
        return <AccountManagement />;
      case 'tasks':
        return <div className="p-6"><h1 className="text-2xl font-bold">Task Management</h1><p className="text-gray-600">Task management coming soon...</p></div>;
      case 'messages':
        return <div className="p-6"><h1 className="text-2xl font-bold">Beacon Messages</h1><p className="text-gray-600">Message management coming soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;