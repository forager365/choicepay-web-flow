
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { DollarSign, Receipt, Wallet, CreditCard } from 'lucide-react';

const Analytics = () => {
  const monthlyTrends = [
    { month: 'Jan', payments: 45000, transactions: 28, vendors: 15 },
    { month: 'Feb', payments: 52000, transactions: 32, vendors: 18 },
    { month: 'Mar', payments: 48000, transactions: 29, vendors: 16 },
    { month: 'Apr', payments: 61000, transactions: 38, vendors: 22 },
    { month: 'May', payments: 55000, transactions: 35, vendors: 19 },
    { month: 'Jun', payments: 67000, transactions: 42, vendors: 24 },
  ];

  const paymentMethodTrends = [
    { month: 'Jan', ach: 28000, wire: 12000, check: 3000, card: 2000 },
    { month: 'Feb', ach: 32000, wire: 15000, check: 3500, card: 1500 },
    { month: 'Mar', ach: 30000, wire: 13000, check: 3200, card: 1800 },
    { month: 'Apr', ach: 38000, wire: 18000, check: 3800, card: 1200 },
    { month: 'May', ach: 34000, wire: 16000, check: 3500, card: 1500 },
    { month: 'Jun', ach: 42000, wire: 19000, check: 4200, card: 1800 },
  ];

  const vendorAnalytics = [
    { vendor: 'Acme Corp', amount: 125420, transactions: 12, avgAmount: 10451 },
    { vendor: 'Tech Solutions', amount: 156800, transactions: 8, avgAmount: 19600 },
    { vendor: 'Supply Co', amount: 87500, transactions: 15, avgAmount: 5833 },
    { vendor: 'Office Plus', amount: 45200, transactions: 10, avgAmount: 4520 },
    { vendor: 'Marketing Agency', amount: 62500, transactions: 6, avgAmount: 10417 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Payment Analytics</h1>
        <p className="text-slate-600 mt-2">Detailed insights into your payment activities</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">6-Month Total</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328,000</div>
            <p className="text-xs text-blue-100">Average: $54,667/month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Receipt className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">204</div>
            <p className="text-xs text-green-100">Average: 34/month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Wallet className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-purple-100">Average payment: $13,667</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CreditCard className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.5%</div>
            <p className="text-xs text-orange-100">7 failed transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                <Area 
                  type="monotone" 
                  dataKey="payments" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Count by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transactions" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={paymentMethodTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="ach" stroke="#3b82f6" strokeWidth={3} name="ACH Transfer" />
              <Line type="monotone" dataKey="wire" stroke="#10b981" strokeWidth={3} name="Wire Transfer" />
              <Line type="monotone" dataKey="check" stroke="#f59e0b" strokeWidth={3} name="Check" />
              <Line type="monotone" dataKey="card" stroke="#ef4444" strokeWidth={3} name="Credit Card" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vendor Analytics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Vendors by Payment Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Vendor</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Total Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Transactions</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Average Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {vendorAnalytics.map((vendor, index) => {
                  const percentage = (vendor.amount / 477420) * 100;
                  return (
                    <tr key={vendor.vendor} className="border-b hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium">{vendor.vendor}</td>
                      <td className="py-3 px-4">${vendor.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">{vendor.transactions}</td>
                      <td className="py-3 px-4">${vendor.avgAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">{percentage.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
