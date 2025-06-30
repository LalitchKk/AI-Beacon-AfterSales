export interface Sale {
  id: string;
  customerName: string;
  customerEmail: string;
  productType: string;
  quantity: number;
  saleDate: string;
  status: 'completed' | 'processing' | 'pending';
  totalAmount: number;
  accountCreated?: boolean;
  accountStatus?: 'created' | 'pending' | 'failed';
}

export interface Stock {
  id: string;
  productName: string;
  category: string;
  currentQuantity: number;
  minimumQuantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export interface BannerRequest {
  id: string;
  saleId: string;
  customerName: string;
  bannerType: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'in-production' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Beacon {
  id: string;
  name: string;
  macAddress: string;
  zoneId: string;
  zoneName: string;
  status: 'active' | 'inactive' | 'maintenance';
  batteryLevel: number;
  lastSeen: string;
  bindingDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdDate: string;
  relatedSaleId?: string;
  relatedBeaconId?: string;
}

export interface BeaconZone {
  id: string;
  name: string;
  description: string;
  location: string;
  beaconCount: number;
  accountId: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

export interface BeaconMessage {
  id: string;
  beaconId: string;
  title: string;
  content: string;
  type: 'promotion' | 'information' | 'warning';
  isActive: boolean;
  scheduledStart?: string;
  scheduledEnd?: string;
  createdDate: string;
}

export interface Account {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  createdDate: string;
  zoneCount: number;
  createdFromSale?: boolean;
  saleId?: string;
}

export interface LineOA {
  id: string;
  accountId: string;
  accountName: string;
  lineOfficialAccountName: string;
  lineBasicId: string;
  linePremiumId?: string;
  lineProviderId: string;
  lineProviderName: string;
  lineChannelId: string;
  lineChannelSecret: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  createdDate: string;
  lastUpdated: string;
  isVerified: boolean;
  followerCount?: number;
  messagesSent?: number;
  notes?: string;
}