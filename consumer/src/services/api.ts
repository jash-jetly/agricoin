export interface VerificationData {
  status: 'VERIFIED' | 'WARNING' | 'NOT_FOUND' | 'PENDING';
  farmer: {
    name: string;
    village: string;
    photoUrl?: string;
    contact?: string;
  };
  soil: {
    ph: number;
    fertilizers: string[];
    organic: boolean;
  };
  farmAreaHectares: number;
  harvestDate: string;
  journey: Array<{
    actor: string;
    action: string;
    time: string;
    location: string;
    tx: string;
  }>;
  weightKg: number;
  warnings?: string[];
}

const mockData: Record<string, VerificationData> = {
  AGR001: {
    status: 'VERIFIED',
    farmer: {
      name: 'Ramesh Patel',
      village: 'Nashik, Maharashtra',
      contact: '+91-9876543210'
    },
    soil: {
      ph: 6.5,
      fertilizers: ['Urea (last used 2025-07-23)', 'NPK (last used 2025-06-15)'],
      organic: true
    },
    farmAreaHectares: 1.2,
    harvestDate: '2025-08-12',
    journey: [
      {
        actor: 'Farmer',
        action: 'minted',
        time: '2025-08-12T09:12:00Z',
        location: 'Nashik, Maharashtra',
        tx: '0x1a2b3c4d5e6f7890abcdef1234567890'
      },
      {
        actor: 'Aggregator',
        action: 'collected',
        time: '2025-08-13T07:20:00Z',
        location: 'Nashik Collection Center',
        tx: '0x2b3c4d5e6f7890abcdef1234567890ab'
      },
      {
        actor: 'Transport',
        action: 'scanned',
        time: '2025-08-15T02:12:00Z',
        location: 'Mumbai Highway Checkpoint',
        tx: '0x3c4d5e6f7890abcdef1234567890abcd'
      },
      {
        actor: 'Retailer',
        action: 'received',
        time: '2025-08-18T10:30:00Z',
        location: 'Fresh Market, Mumbai',
        tx: '0x4d5e6f7890abcdef1234567890abcdef'
      }
    ],
    weightKg: 100,
    warnings: []
  },
  AGR002: {
    status: 'WARNING',
    farmer: {
      name: 'Suresh Kumar',
      village: 'Pune, Maharashtra',
      contact: '+91-9876543211'
    },
    soil: {
      ph: 7.2,
      fertilizers: ['Organic compost', 'Potash (last used 2025-07-10)'],
      organic: true
    },
    farmAreaHectares: 0.8,
    harvestDate: '2025-08-10',
    journey: [
      {
        actor: 'Farmer',
        action: 'minted',
        time: '2025-08-10T08:00:00Z',
        location: 'Pune, Maharashtra',
        tx: '0xa1b2c3d4e5f6789012345678901234567890'
      },
      {
        actor: 'Aggregator',
        action: 'collected',
        time: '2025-08-11T06:30:00Z',
        location: 'Pune Collection Center',
        tx: '0xb2c3d4e5f678901234567890123456789012'
      },
      {
        actor: 'Transport',
        action: 'scanned',
        time: '2025-08-13T14:15:00Z',
        location: 'Delhi Highway',
        tx: '0xc3d4e5f67890123456789012345678901234'
      },
      {
        actor: 'Transport',
        action: 'scanned',
        time: '2025-08-13T14:45:00Z',
        location: 'Kolkata Market',
        tx: '0xd4e5f678901234567890123456789012345678'
      }
    ],
    weightKg: 75,
    warnings: ['DoubleScanAtDifferentGeo']
  },
  AGR003: {
    status: 'VERIFIED',
    farmer: {
      name: 'Priya Sharma',
      village: 'Indore, Madhya Pradesh',
      contact: '+91-9876543212'
    },
    soil: {
      ph: 6.8,
      fertilizers: ['100% Organic'],
      organic: true
    },
    farmAreaHectares: 2.1,
    harvestDate: '2025-08-14',
    journey: [
      {
        actor: 'Farmer',
        action: 'minted',
        time: '2025-08-14T07:45:00Z',
        location: 'Indore, Madhya Pradesh',
        tx: '0xe5f6789012345678901234567890123456789'
      },
      {
        actor: 'Aggregator',
        action: 'collected',
        time: '2025-08-15T05:20:00Z',
        location: 'Indore Organic Hub',
        tx: '0xf67890123456789012345678901234567890a'
      },
      {
        actor: 'Transport',
        action: 'scanned',
        time: '2025-08-17T12:00:00Z',
        location: 'Bhopal Transit',
        tx: '0x67890123456789012345678901234567890ab'
      },
      {
        actor: 'Retailer',
        action: 'received',
        time: '2025-08-19T09:15:00Z',
        location: 'Organic Store, Bhopal',
        tx: '0x7890123456789012345678901234567890abc'
      }
    ],
    weightKg: 150,
    warnings: []
  },
  AGR005: {
    status: 'WARNING',
    farmer: {
      name: 'Vikash Singh',
      village: 'Kanpur, Uttar Pradesh',
      contact: '+91-9876543213'
    },
    soil: {
      ph: 5.9,
      fertilizers: ['DAP (last used 2025-07-20)', 'Urea (last used 2025-08-01)'],
      organic: false
    },
    farmAreaHectares: 0.6,
    harvestDate: '2025-08-11',
    journey: [
      {
        actor: 'Farmer',
        action: 'minted',
        time: '2025-08-11T06:30:00Z',
        location: 'Kanpur, Uttar Pradesh',
        tx: '0x890123456789012345678901234567890abcd'
      },
      {
        actor: 'Aggregator',
        action: 'collected',
        time: '2025-08-12T04:45:00Z',
        location: 'Kanpur Hub',
        tx: '0x90123456789012345678901234567890abcde'
      },
      {
        actor: 'Retailer',
        action: 'received',
        time: '2025-08-16T11:20:00Z',
        location: 'Local Market, Kanpur',
        tx: '0x0123456789012345678901234567890abcdef'
      }
    ],
    weightKg: 80,
    warnings: ['WeightMismatch']
  },
  "16045": {
    status: 'VERIFIED',
    farmer: {
      name: 'Ramesh Patel',
      village: 'Nashik, Maharashtra',
      contact: '+91-9876543210'
    },
    soil: {
      ph: 6.5,
      fertilizers: ['Urea (last used 2025-07-23)', 'NPK (last used 2025-06-15)'],
      organic: true
    },
    farmAreaHectares: 1.2,
    harvestDate: '2025-08-12',
    journey: [
      {
        actor: 'Farmer',
        action: 'minted',
        time: '2025-08-12T09:12:00Z',
        location: 'Nashik, Maharashtra',
        tx: '0x1a2b3c4d5e6f7890abcdef1234567890'
      },
      {
        actor: 'Aggregator',
        action: 'collected',
        time: '2025-08-13T07:20:00Z',
        location: 'Nashik Collection Center',
        tx: '0x2b3c4d5e6f7890abcdef1234567890ab'
      },
      {
        actor: 'Transport',
        action: 'scanned',
        time: '2025-08-15T02:12:00Z',
        location: 'Mumbai Highway Checkpoint',
        tx: '0x3c4d5e6f7890abcdef1234567890abcd'
      },
      {
        actor: 'Retailer',
        action: 'received',
        time: '2025-08-18T10:30:00Z',
        location: 'Fresh Market, Mumbai',
        tx: '0x4d5e6f7890abcdef1234567890abcdef'
      }
    ],
    weightKg: 100,
    warnings: []
  }
};

export async function getVerificationData(batchId: string): Promise<VerificationData | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const data = mockData[batchId.toUpperCase()];
  
  if (!data) {
    return null;
  }
  
  return data;
}

export async function submitReport(batchId: string, description: string, photo?: File): Promise<void> {
  // Simulate API call to submit report
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Report submitted:', { batchId, description, photo });
}