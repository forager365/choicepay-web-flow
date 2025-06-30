
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, DollarSign } from 'lucide-react';

const PaymentHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    {
      id: 'TXN-001',
      vendor: 'Acme Corp',
      amount: 15420,
      date: '2024-06-28',
      status: 'Completed',
      method: 'ACH Transfer',
      description: 'Monthly office supplies'
    },
    {
      id: 'TXN-002',
      vendor: 'Supply Co',
      amount: 8750,
      date: '2024-06-28',
      status: 'Pending',
      method: 'Wire Transfer',
      description: 'Equipment purchase'
    },
    {
      id: 'TXN-003',
      vendor: 'Tech Solutions',
      amount: 22100,
      date: '2024-06-27',
      status: 'Completed',
      method: 'ACH Transfer',
      description: 'Software licenses'
    },
    {
      id: 'TXN-004',
      vendor: 'Office Plus',
      amount: 3200,
      date: '2024-06-27',
      status: 'Completed',
      method: 'Check',
      description: 'Furniture repair'
    },
    {
      id: 'TXN-005',
      vendor: 'Marketing Agency',
      amount: 12500,
      date: '2024-06-26',
      status: 'Failed',
      method: 'Credit Card',
      description: 'Campaign management'
    },
    {
      id: 'TXN-006',
      vendor: 'Utilities Corp',
      amount: 1850,
      date: '2024-06-25',
      status: 'Completed',
      method: 'ACH Transfer',
      description: 'Monthly utilities'
    },
    {
      id: 'TXN-007',
      vendor: 'Insurance Co',
      amount: 4200,
      date: '2024-06-24',
      status: 'Completed',
      method: 'Wire Transfer',
      description: 'Quarterly premium'
    },
    {
      id: 'TXN-008',
      vendor: 'Cleaning Service',
      amount: 650,
      date: '2024-06-23',
      status: 'Completed',
      method: 'ACH Transfer',
      description: 'Weekly cleaning'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.status.toLowerCase() === filter;
    const matchesSearch = transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const completedCount = filteredTransactions.filter(t => t.status === 'Completed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Payment History</h1>
        <p className="text-slate-600 mt-2">Track and manage all your payment transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTransactions.length}</div>
            <p className="text-xs text-slate-600">
              {completedCount} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-slate-600">
              ${Math.round(totalAmount / filteredTransactions.length).toLocaleString()} average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((completedCount / filteredTransactions.length) * 100)}%
            </div>
            <p className="text-xs text-slate-600">Payment completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by vendor or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Vendor</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                    <td className="py-3 px-4 font-medium">{transaction.vendor}</td>
                    <td className="py-3 px-4 font-medium">${transaction.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600">{transaction.date}</td>
                    <td className="py-3 px-4 text-slate-600">{transaction.method}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        {transaction.status === 'Failed' && (
                          <Button size="sm" variant="outline">
                            Retry
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;
