import React from 'react';

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  category: 'cleaning' | 'plumbing' | 'electrician' | 'painter' | 'repair' | 'pest_control';
}

export interface Pro {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  jobsCompleted: number;
  availability: 'available' | 'busy' | 'offline';
  specialty: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  proId?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PRO = 'PRO',
  ADMIN = 'ADMIN'
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}