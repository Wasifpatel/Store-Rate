"use client";

import React, { useState, useMemo } from 'react';
import { users as initialUsers, stores, getAverageRating } from '@/lib/data';
import type { User, Store } from '@/lib/definitions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddUserForm } from '@/components/forms/add-user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: 'all' });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(filters.email.toLowerCase());
      const addressMatch = user.address.toLowerCase().includes(filters.address.toLowerCase());
      const roleMatch = filters.role === 'all' || user.role === filters.role;
      return nameMatch && emailMatch && addressMatch && roleMatch;
    });
  }, [users, filters]);

  const handleUserAdded = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
    setIsAddUserOpen(false);
  }

  const getOwnerStoreRating = (userId: string) => {
    const ownerStores = stores.filter(s => s.ownerId === userId);
    if (ownerStores.length === 0) return 'N/A';
    
    const totalRating = ownerStores.reduce((acc, store) => {
        return acc + getAverageRating(store.id)
    }, 0);

    return (totalRating / ownerStores.length).toFixed(1);
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">User Management</h1>
            <p className="text-muted-foreground">View, filter, and add users.</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2" />Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a New User</DialogTitle>
                </DialogHeader>
                <AddUserForm onUserAdded={handleUserAdded} />
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine the user list based on specific criteria.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Filter by name..."
              value={filters.name}
              onChange={e => handleFilterChange('name', e.target.value)}
            />
            <Input
              placeholder="Filter by email..."
              value={filters.email}
              onChange={e => handleFilterChange('email', e.target.value)}
            />
            <Input
              placeholder="Filter by address..."
              value={filters.address}
              onChange={e => handleFilterChange('address', e.target.value)}
            />
            <Select value={filters.role} onValueChange={value => handleFilterChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
            <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Owner Avg. Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'owner' ? 'secondary' : 'default'}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.role === 'owner' ? getOwnerStoreRating(user.id) : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             {filteredUsers.length === 0 && <p className="text-center text-muted-foreground py-8">No users found.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
