
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import PaymentForm from '@/components/PaymentForm';
import VendorManagement from '@/components/VendorManagement';
import PaymentHistory from '@/components/PaymentHistory';
import Analytics from '@/components/Analytics';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'payments':
        return <PaymentForm />;
      case 'vendors':
        return <VendorManagement />;
      case 'history':
        return <PaymentHistory />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
