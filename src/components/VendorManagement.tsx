
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, DollarSign } from 'lucide-react';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      email: 'billing@acmecorp.com',
      totalPaid: 125420,
      lastPayment: '2024-06-28',
      status: 'Active',
      paymentMethod: 'ACH Transfer'
    },
    {
      id: 2,
      name: 'Supply Co',
      email: 'accounts@supplyco.com',
      totalPaid: 87500,
      lastPayment: '2024-06-25',
      status: 'Active',
      paymentMethod: 'Wire Transfer'
    },
    {
      id: 3,
      name: 'Tech Solutions',
      email: 'finance@techsolutions.com',
      totalPaid: 156800,
      lastPayment: '2024-06-27',
      status: 'Active',
      paymentMethod: 'ACH Transfer'
    },
    {
      id: 4,
      name: 'Office Plus',
      email: 'billing@officeplus.com',
      totalPaid: 45200,
      lastPayment: '2024-06-20',
      status: 'Inactive',
      paymentMethod: 'Check'
    },
  ]);

  const [newVendor, setNewVendor] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'ACH Transfer'
  });

  const handleAddVendor = () => {
    const vendor = {
      id: vendors.length + 1,
      ...newVendor,
      totalPaid: 0,
      lastPayment: 'Never',
      status: 'Active'
    };
    setVendors([...vendors, vendor]);
    setNewVendor({ name: '', email: '', phone: '', address: '', paymentMethod: 'ACH Transfer' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Vendor Management</h1>
          <p className="text-slate-600 mt-2">Manage your vendor relationships and payment information</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add New Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vendor Name</Label>
                <Input
                  id="name"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({...newVendor, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newVendor.phone}
                  onChange={(e) => setNewVendor({...newVendor, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newVendor.address}
                  onChange={(e) => setNewVendor({...newVendor, address: e.target.value})}
                />
              </div>
              <Button onClick={handleAddVendor} className="w-full">
                Add Vendor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vendor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-slate-600">
              {vendors.filter(v => v.status === 'Active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${vendors.reduce((acc, v) => acc + v.totalPaid, 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-600">Across all vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(vendors.reduce((acc, v) => acc + v.totalPaid, 0) / vendors.length).toLocaleString()}
            </div>
            <p className="text-xs text-slate-600">Per vendor</p>
          </CardContent>
        </Card>
      </div>

      {/* Vendor List */}
      <Card>
        <CardHeader>
          <CardTitle>All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Total Paid</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Last Payment</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Payment Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium">{vendor.name}</td>
                    <td className="py-3 px-4 text-slate-600">{vendor.email}</td>
                    <td className="py-3 px-4">${vendor.totalPaid.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600">{vendor.lastPayment}</td>
                    <td className="py-3 px-4 text-slate-600">{vendor.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          vendor.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Pay
                        </Button>
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

export default VendorManagement;
