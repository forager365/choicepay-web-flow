
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CreditCard, 
  Receipt, 
  Wallet, 
  WalletCards,
  DollarSign 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: WalletCards },
    { id: 'payments', label: 'Make Payment', icon: CreditCard },
    { id: 'vendors', label: 'Vendor Management', icon: Wallet },
    { id: 'history', label: 'Payment History', icon: Receipt },
    { id: 'analytics', label: 'Analytics', icon: DollarSign },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-full flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-blue-400">ChoicePay Pro</h1>
        <p className="text-sm text-slate-400 mt-1">Payment Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
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
