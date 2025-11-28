import { Service } from './types';

export const CATEGORIES = ['All', 'AC Services', 'Plumbing', 'Electrical', 'Appliances', 'Smart Home'];

export const SERVICES: Service[] = [
  // --- AC Services ---
  {
    id: 'ac-1',
    name: 'AC Power Jet Service',
    description: 'Advanced foam cleaning of cooling coils, blower, and outdoor unit for 2x cooling.',
    price: 699,
    category: 'AC Services',
    duration: '45 mins',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b9?auto=format&fit=crop&q=80&w=800',
    popular: true,
    bestseller: true
  },
  {
    id: 'ac-2',
    name: 'AC Gas Refill (Complete)',
    description: 'Vacuuming, leak testing, and complete gas recharge (R32/R410A).',
    price: 2499,
    category: 'AC Services',
    duration: '1 hr',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ac-3',
    name: 'AC Installation',
    description: 'Professional installation with vacuum sealing and copper pipe setup.',
    price: 1599,
    category: 'AC Services',
    duration: '2 hrs',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1631545089304-453bb324203b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ac-4',
    name: 'AC Uninstallation',
    description: 'Safely pumping down gas and removing indoor/outdoor units.',
    price: 799,
    category: 'AC Services',
    duration: '45 mins',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-cd1361ddee2e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ac-5',
    name: 'AC PCB Repair',
    description: 'Diagnosis and repair of inverter/non-inverter AC circuit boards.',
    price: 1299,
    category: 'AC Services',
    duration: '24-48 hrs',
    rating: 4.4,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1678732559599-b1d563533800?auto=format&fit=crop&q=80&w=800'
  },

  // --- Plumbing ---
  {
    id: 'pl-1',
    name: 'Tap & Mixer Repair',
    description: 'Fixing dripping taps, changing spindles, or installing new mixers.',
    price: 199,
    category: 'Plumbing',
    duration: '30 mins',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pl-2',
    name: 'Intensive Drain Cleaning',
    description: 'Removing tough blockages in kitchen sinks or bathrooms using chemicals/springs.',
    price: 499,
    category: 'Plumbing',
    duration: '45 mins',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=800',
    popular: true,
    bestseller: true
  },
  {
    id: 'pl-3',
    name: 'Water Tank Cleaning (500L-1000L)',
    description: 'Mechanized de-watering, sludge removal, and UV sanitization.',
    price: 999,
    category: 'Plumbing',
    duration: '1.5 hrs',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1626084478315-74895781a8b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pl-4',
    name: 'Western Toilet Installation',
    description: 'Installing wall-mounted or floor-mounted western commodes.',
    price: 1199,
    category: 'Plumbing',
    duration: '2 hrs',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pl-5',
    name: 'Shower Installation',
    description: 'Installing overhead showers, hand showers, or divertor panels.',
    price: 349,
    category: 'Plumbing',
    duration: '45 mins',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?auto=format&fit=crop&q=80&w=800'
  },

  // --- Electrical ---
  {
    id: 'el-1',
    name: 'Fan Repair & Install',
    description: 'Repairing noise/wobble or installing new ceiling/exhaust fans.',
    price: 249,
    category: 'Electrical',
    duration: '30 mins',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1616422323719-7e21a224f84f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'el-2',
    name: 'Switchboard Repair',
    description: 'Replacing burnt switches, sockets, or fixing loose connections.',
    price: 149,
    category: 'Electrical',
    duration: '20 mins',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'el-3',
    name: 'Full Home Electrical Checkup',
    description: 'Comprehensive health check of MCBs, wiring, and earthing to prevent shocks.',
    price: 699,
    category: 'Electrical',
    duration: '1 hr',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: 'el-4',
    name: 'Chandelier Installation',
    description: 'Heavy duty drilling and secure mounting for decorative lights.',
    price: 599,
    category: 'Electrical',
    duration: '1 hr',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1540932296774-7dd57d60910b?auto=format&fit=crop&q=80&w=800'
  },

  // --- Appliances ---
  {
    id: 'ap-1',
    name: 'Geyser Repair (Electric)',
    description: 'Fixing heating issues, thermostat replacement, or leakage repair.',
    price: 399,
    category: 'Appliances',
    duration: '1 hr',
    rating: 4.6,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1663089851613-207077659556?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ap-2',
    name: 'Washing Machine Repair',
    description: 'Fixing drum issues, water drainage, or spin motor problems.',
    price: 499,
    category: 'Appliances',
    duration: '1 hr',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ap-3',
    name: 'Refrigerator Checkup',
    description: 'Gas check, compressor diagnostics, and cooling issue resolution.',
    price: 349,
    category: 'Appliances',
    duration: '45 mins',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d58b794a?auto=format&fit=crop&q=80&w=800'
  },

  // --- Smart Home ---
  {
    id: 'sm-1',
    name: 'Smart Lock Installation',
    description: 'Installing digital locks for main doors with app configuration.',
    price: 1299,
    category: 'Smart Home',
    duration: '1.5 hrs',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sm-2',
    name: 'Video Doorbell Setup',
    description: 'Smart doorbell mounting and WiFi setup.',
    price: 899,
    category: 'Smart Home',
    duration: '1 hr',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&q=80&w=800'
  }
];