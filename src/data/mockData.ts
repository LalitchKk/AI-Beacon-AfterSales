import { Sale, Stock, BannerRequest, Beacon, Task, BeaconZone, BeaconMessage, Account } from '../types';

export const mockSales: Sale[] = [
  {
    id: 'S001',
    customerName: 'TechCorp Ltd.',
    customerEmail: 'contact@techcorp.com',
    productType: 'Premium Beacon Package',
    quantity: 50,
    saleDate: '2024-01-15',
    status: 'completed',
    totalAmount: 125000,
    accountCreated: true,
    accountStatus: 'created'
  },
  {
    id: 'S002',
    customerName: 'Retail Solutions Inc.',
    customerEmail: 'info@retailsolutions.com',
    productType: 'Standard Beacon Kit',
    quantity: 25,
    saleDate: '2024-01-16',
    status: 'completed',
    totalAmount: 47500,
    accountCreated: true,
    accountStatus: 'created'
  },
  {
    id: 'S003',
    customerName: 'Smart Mall Group',
    customerEmail: 'tech@smartmall.com',
    productType: 'Enterprise Beacon System',
    quantity: 100,
    saleDate: '2024-01-17',
    status: 'completed',
    totalAmount: 285000,
    accountCreated: false
  },
  {
    id: 'S004',
    customerName: 'Metro Shopping Center',
    customerEmail: 'operations@metroshopping.com',
    productType: 'Standard Beacon Kit',
    quantity: 30,
    saleDate: '2024-01-18',
    status: 'processing',
    totalAmount: 57000,
    accountCreated: false
  },
  {
    id: 'S005',
    customerName: 'Digital Plaza',
    customerEmail: 'tech@digitalplaza.com',
    productType: 'Premium Beacon Package',
    quantity: 75,
    saleDate: '2024-01-19',
    status: 'pending',
    totalAmount: 187500,
    accountCreated: false
  }
];

export const mockStock: Stock[] = [
  {
    id: 'ST001',
    productName: 'Beacon Pro X1',
    category: 'Premium Beacons',
    currentQuantity: 150,
    minimumQuantity: 50,
    status: 'in-stock',
    lastUpdated: '2024-01-17'
  },
  {
    id: 'ST002',
    productName: 'Beacon Standard S2',
    category: 'Standard Beacons',
    currentQuantity: 25,
    minimumQuantity: 30,
    status: 'low-stock',
    lastUpdated: '2024-01-17'
  },
  {
    id: 'ST003',
    productName: 'Beacon Mini M1',
    category: 'Compact Beacons',
    currentQuantity: 0,
    minimumQuantity: 20,
    status: 'out-of-stock',
    lastUpdated: '2024-01-16'
  }
];

export const mockBannerRequests: BannerRequest[] = [
  {
    id: 'BR001',
    saleId: 'S001',
    customerName: 'TechCorp Ltd.',
    bannerType: 'Premium Display Banner',
    requestDate: '2024-01-15',
    status: 'completed',
    priority: 'high'
  },
  {
    id: 'BR002',
    saleId: 'S002',
    customerName: 'Retail Solutions Inc.',
    bannerType: 'Standard Marketing Banner',
    requestDate: '2024-01-16',
    status: 'in-production',
    priority: 'medium'
  },
  {
    id: 'BR003',
    saleId: 'S003',
    customerName: 'Smart Mall Group',
    bannerType: 'Enterprise Brand Banner',
    requestDate: '2024-01-17',
    status: 'pending',
    priority: 'high'
  }
];

export const mockBeacons: Beacon[] = [
  {
    id: 'BC001',
    name: 'Entrance Beacon #1',
    macAddress: '00:1A:2B:3C:4D:5E',
    zoneId: 'Z001',
    zoneName: 'Main Entrance',
    status: 'active',
    batteryLevel: 85,
    lastSeen: '2024-01-17T10:30:00Z',
    bindingDate: '2024-01-10'
  },
  {
    id: 'BC002',
    name: 'Food Court Beacon #2',
    macAddress: '00:1A:2B:3C:4D:5F',
    zoneId: 'Z002',
    zoneName: 'Food Court Area',
    status: 'active',
    batteryLevel: 62,
    lastSeen: '2024-01-17T10:28:00Z',
    bindingDate: '2024-01-10'
  },
  {
    id: 'BC003',
    name: 'Exit Beacon #3',
    macAddress: '00:1A:2B:3C:4D:60',
    zoneId: 'Z003',
    zoneName: 'Exit Area',
    status: 'maintenance',
    batteryLevel: 15,
    lastSeen: '2024-01-16T15:45:00Z',
    bindingDate: '2024-01-10'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'T001',
    title: 'Setup beacon zone for TechCorp',
    description: 'Configure and deploy 50 beacons in TechCorp office building',
    assignee: 'John Smith',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-01-20',
    createdDate: '2024-01-15',
    relatedSaleId: 'S001'
  },
  {
    id: 'T002',
    title: 'Replace low battery beacon',
    description: 'Replace battery for beacon BC003 in exit area',
    assignee: 'Sarah Johnson',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-01-18',
    createdDate: '2024-01-17',
    relatedBeaconId: 'BC003'
  },
  {
    id: 'T003',
    title: 'Create account for Smart Mall Group',
    description: 'Setup enterprise account and zone management access',
    assignee: 'Mike Wilson',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-19',
    createdDate: '2024-01-17',
    relatedSaleId: 'S003'
  },
  {
    id: 'T004',
    title: 'Auto-create account for Metro Shopping Center',
    description: 'Automatically generate account from completed sale S004',
    assignee: 'System Auto',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-01-20',
    createdDate: '2024-01-18',
    relatedSaleId: 'S004'
  }
];

export const mockBeaconZones: BeaconZone[] = [
  {
    id: 'Z001',
    name: 'Main Entrance',
    description: 'Primary entrance area with welcome messages',
    location: 'Building A - Ground Floor',
    beaconCount: 3,
    accountId: 'ACC001',
    status: 'active',
    createdDate: '2024-01-10'
  },
  {
    id: 'Z002',
    name: 'Food Court Area',
    description: 'Dining area with promotional messages',
    location: 'Building A - 2nd Floor',
    beaconCount: 5,
    accountId: 'ACC001',
    status: 'active',
    createdDate: '2024-01-10'
  },
  {
    id: 'Z003',
    name: 'Exit Area',
    description: 'Exit points with feedback collection',
    location: 'Building A - Ground Floor',
    beaconCount: 2,
    accountId: 'ACC001',
    status: 'inactive',
    createdDate: '2024-01-10'
  }
];

export const mockBeaconMessages: BeaconMessage[] = [
  {
    id: 'BM001',
    beaconId: 'BC001',
    title: 'Welcome to TechCorp!',
    content: 'Thank you for visiting. Check out our latest innovations on the 3rd floor.',
    type: 'information',
    isActive: true,
    createdDate: '2024-01-10'
  },
  {
    id: 'BM002',
    beaconId: 'BC002',
    title: 'Lunch Special!',
    content: 'Get 20% off your meal today! Valid until 3 PM.',
    type: 'promotion',
    isActive: true,
    scheduledStart: '2024-01-17T11:00:00Z',
    scheduledEnd: '2024-01-17T15:00:00Z',
    createdDate: '2024-01-17'
  },
  {
    id: 'BM003',
    beaconId: 'BC003',
    title: 'Share Your Experience',
    content: 'Please rate your visit and help us improve our services.',
    type: 'information',
    isActive: false,
    createdDate: '2024-01-10'
  }
];

export const mockAccounts: Account[] = [
  {
    id: 'ACC001',
    companyName: 'TechCorp Ltd.',
    contactName: 'David Chen',
    email: 'contact@techcorp.com',
    phone: '+1-555-0123',
    status: 'active',
    createdDate: '2024-01-15',
    zoneCount: 3,
    createdFromSale: true,
    saleId: 'S001'
  },
  {
    id: 'ACC002',
    companyName: 'Retail Solutions Inc.',
    contactName: 'Emma Rodriguez',
    email: 'info@retailsolutions.com',
    phone: '+1-555-0124',
    status: 'active',
    createdDate: '2024-01-16',
    zoneCount: 1,
    createdFromSale: true,
    saleId: 'S002'
  },
  {
    id: 'ACC003',
    companyName: 'Smart Mall Group',
    contactName: 'Alex Thompson',
    email: 'tech@smartmall.com',
    phone: '+1-555-0125',
    status: 'pending',
    createdDate: '2024-01-17',
    zoneCount: 0,
    createdFromSale: false
  }
];