/**
 * Decoupled mock data extracted from the Stitch ChaiOps wireframes.
 * All user-facing strings, menu items, prices, and assets are defined here.
 */

export interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly categoryId: string;
  readonly imageUri: string;
  readonly badge?: string;
  readonly badgeType?: 'bestseller' | 'chef' | 'pairing';
  readonly tags: readonly string[];
  readonly unitLabel?: string;
}

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly count?: number;
}

export interface TableContext {
  readonly brandName: string;
  readonly branchName: string;
  readonly tableId: string;
  readonly tableLabel: string;
  readonly queueTimeEst: string;
  readonly isOnline: boolean;
}

export interface CartItem {
  readonly menuItem: MenuItem;
  readonly quantity: number;
  readonly selectedModifiers: readonly string[];
}

export interface KitchenTicket {
  readonly id: string;
  readonly ticketNumber: string;
  readonly orderSource: string;
  readonly amount: number;
  readonly paymentType: 'CASH' | 'UPI' | 'CARD';
  readonly paymentStatus: 'PAID' | 'PENDING_CASH';
  readonly timeAgo: string;
  readonly items: readonly {
    readonly name: string;
    readonly quantity: number;
    readonly notes?: string;
  }[];
  readonly bomDetails?: string;
  readonly customerNote?: string;
  readonly stage: 'pending_cash' | 'brewing' | 'ready' | 'handover';
}

export const tableContext: TableContext = {
  brandName: 'ChaiOps',
  branchName: 'KR Mangalam Hub (Flagship)',
  tableId: 'T-04',
  tableLabel: 'Table #04',
  queueTimeEst: '3 min',
  isOnline: true,
};

export const heroBannerData = {
  pillTag: 'ARTISANAL DECOC',
  subTag: 'Single-Estate Harvest',
  headline: 'Freshly brewed in artisanal clay kulhads.',
  description: 'Instant UPI triggers immediate decantation in the kitchen ledger. Zero paper tickets.',
  feature1: 'Kiln-fired Clay',
  feature2: 'Instant Dispatch',
};

export const categories: readonly Category[] = [
  { id: 'all', name: 'All (18)' },
  { id: 'chais', name: 'Signature Chais' },
  { id: 'iced', name: 'Iced Brews' },
  { id: 'bites', name: 'Quick Bites & Bun Maska' },
  { id: 'biscuits', name: 'Biscuits & Snacks' },
];

export const menuItems: readonly MenuItem[] = [
  {
    id: 'item-1',
    name: 'Masala Chai in Kulhad',
    price: 40,
    description: 'Assam CTC slow-brewed with crushed cardamom, fresh ginger, and full-cream buffalo milk.',
    categoryId: 'chais',
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1xDNN5JYozDn_zJJ46tgQqECdKHgcMHsdgKs39SfFyN1Zg2sPwh4zIsSohF1ZjPWSpRfukn5SMpasxBSra3k65AOOMg86B_OBuAPVKcN1VNFAKn3NwFzAhc3b4zCR9_iRM6CFgvhMTL9n113Y8CWD1TXRMpABMn8yMXhvKJdkIJ9FMdXHOEvzkLT0u6WdDqExyaaRjBrQyjWKdBgme74UiLDFsK-QP7y_ktOaJyPl094Let1-GKIk',
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    tags: ['Less Sugar', 'Strong Kadak'],
    unitLabel: '₹40.00 / unit',
  },
  {
    id: 'item-2',
    name: 'Saffron Royal Elaichi',
    price: 60,
    description: 'Premium Kashmiri saffron strands infused with royal green cardamom and almond flakes.',
    categoryId: 'chais',
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjAWUESSmIORgFW81OhJw2_Zt8iisGdWOlhS5vSUarBk9xH0cZhudTg95nnHPIiMbkTAO4O8gmMF7MM9yjwgue7lhtAdUpLnK9UAMvewICyeDfQwXX3-Fbi8M16x3b1V0XZ-DMgmE4h5FlNP8djA7sizgOkt8Yk8Vrdj7cyrYyifHcKagcFQhcjzjND78lcatJLmJ_dYNJR-MTuqpCixmVXla3q2Kszt-iGyOGS4mDfNgk6BNnSX0X',
    badge: "CHEF'S SPECIAL",
    badgeType: 'chef',
    tags: ['Royal Blend'],
    unitLabel: 'Pot Service',
  },
  {
    id: 'item-3',
    name: 'Bun Maska (Amul Butter)',
    price: 50,
    description: 'Warm lightly grilled sweet bakery pav laden with melting cold salted butter.',
    categoryId: 'bites',
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7lswW4da9q_jHK5t2Xl8SDcGgW_qMCbtXr9dOuKnE9wH2ghwMLLq6e4-_eC5iWtiWNm8-gC82HVgC_Ou8SP-tiZNamB7_RjBtSfe2hGmJZLzHIEuk3KT25EWvnHxJ0Lo1OSnyigv0kZeEyc0tDv8yrFAmvqULqNa6hTn_YOgdJ8WMZWlEA7kKDRRwUBCCTD4Neht2X77_5WMRBxJ2MR70x_2Li1TrSExyHMTTv19Uvq1wbNqbM82I',
    badge: 'PAIRING',
    badgeType: 'pairing',
    tags: ['Hot Pressed'],
    unitLabel: '₹50.00 / unit',
  },
  {
    id: 'item-4',
    name: 'Osmania Biscuits (2 pcs)',
    price: 25,
    description: 'Heritage Hyderabad bakery recipe blending sweet, salty, and buttery textures for dipping.',
    categoryId: 'biscuits',
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWLajMMhcAZ0ZxoEU9g5QCOL4mRK6YaXJaNkowDSTox77aOfBTRK3RAb4JZq8IZd5bqAtV9UJJOj8h_tshipCjeUeQc8CkWxjGr3rIjf77hi4r-00QEzvJx_wpYKauq5LYGUCOwbTY-ErnOpSXvRIUDxaIR3HixHIHBTe_Ib6qBUtSjRGSnJSu_eY29l7FhKxp5Z1DAcBfToD4L9oF_FngUaxFB4HE42-KK_v3_SblT45_TnN7Dili',
    tags: ['Chai Dip'],
    unitLabel: '₹25.00 / unit',
  },
  {
    id: 'item-5',
    name: 'Ginger Lemongrass Chai',
    price: 35,
    description: 'Zesty pounded ginger roots simmered with garden-fresh lemongrass and Assam leaf.',
    categoryId: 'chais',
    imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8U-_QVBYkKEl1iBSnn8Wd225AI6niLI0q0ZqEStHMyQ-yvoY5Lx1jLaZzDzZiooZ-ddDezE2lnx5xdxgPu9odSKzIbkjspMKfvDgz8CII7LxeF0o0fwtn6i3kI3VOm2DLNFDB4O45IplVshF5L60ijdI4ckYFwt5hou98F67hU6TdttvT0Q2mBJA3bw-nNkApHmy4q9Z5rt1Jyha7VZ7F6GHnV8k9-ob__qiydiwfpV8yDYABOIE',
    tags: ['Immunity'],
    unitLabel: '₹35.00 / unit',
  },
];

export const initialCartItems: readonly CartItem[] = [
  {
    menuItem: menuItems[0],
    quantity: 2,
    selectedModifiers: ['Less Sugar', 'Full Kadak Decoction'],
  },
  {
    menuItem: menuItems[2],
    quantity: 1,
    selectedModifiers: ['Hot Pressed', 'Double Salted Amul Butter'],
  },
  {
    menuItem: menuItems[3],
    quantity: 1,
    selectedModifiers: ['Classic Chai Dip', 'Sweet-Salty'],
  },
];

export const checkoutCharges = {
  gstRate: 0.05,
  ecoDiscountAmount: 5.0,
  packagingLabel: 'COMPLIMENTARY',
  platformFeeLabel: '₹0.00 (ChaiOps Zero-Fee)',
  footerNotice: 'Powered by ChaiOps Live Sync · 100% Recipe-Tracked & Freshly Prepared',
};

export const kitchenTickets: readonly KitchenTicket[] = [
  {
    id: 't-1846',
    ticketNumber: '#1846',
    orderSource: 'Table QR #08',
    amount: 130,
    paymentType: 'CASH',
    paymentStatus: 'PENDING_CASH',
    timeAgo: 'Placed 1m ago',
    items: [
      { name: 'Masala Chai (Kulhad)', quantity: 2, notes: 'Mod: Less Sugar, Strong Kadak' },
      { name: 'Bun Maska (Amul Salted)', quantity: 1 },
    ],
    customerNote: 'Needs 2 kulhads extra piping hot',
    stage: 'pending_cash',
  },
  {
    id: 't-1844',
    ticketNumber: '#1844',
    orderSource: 'Dine-in #04',
    amount: 90,
    paymentType: 'UPI',
    paymentStatus: 'PAID',
    timeAgo: '03:45 / 05:00',
    items: [
      { name: 'Masala Chai in Kulhad', quantity: 2, notes: 'Kadai #1 Simmering' },
      { name: 'Bun Maska (Griddled)', quantity: 1, notes: 'On Flat Griddle' },
    ],
    bomDetails: '100ml Buffalo Milk, 20g Wagh Bakri CTC, 2 Clay Kulhads, 50g Amul Butter',
    stage: 'brewing',
  },
  {
    id: 't-1841',
    ticketNumber: '#1841',
    orderSource: 'Token #28 · Counter',
    amount: 75,
    paymentType: 'UPI',
    paymentStatus: 'PAID',
    timeAgo: 'Ready 1m',
    items: [
      { name: 'Ginger Lemongrass Chai (Kulhad)', quantity: 1 },
      { name: 'Bun Maska (Warm)', quantity: 1 },
    ],
    stage: 'ready',
  },
];
