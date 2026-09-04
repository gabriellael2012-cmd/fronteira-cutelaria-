export type ProductAvailability = 'available' | 'reserved' | 'made_to_order' | 'out_of_stock';

export type ProductCategory = 'Artesanais' | 'Coleções' | 'Exclusivas' | 'Personalizadas' | 'Gastronomia' | 'Bushcraft';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subCategory?: string;
  tag?: string;
  shortDescription: string;
  description: string;
  price: number;
  formattedPrice: string;
  steel: string;
  hardness: string; // e.g. "59-60 HRC"
  bladeLength: string; // e.g. "21 cm (8.2 polegadas)"
  spineThickness: string; // e.g. "5.0 mm"
  handleMaterial: string; // e.g. "Jacarandá da Bahia com Pinos Mosaico"
  sheath: string; // e.g. "Couro bovino de sola costurado à mão"
  finish: string; // e.g. "Acetinado manual / Brut de Forge"
  availability: ProductAvailability;
  isExclusive: boolean;
  isFeatured: boolean;
  images: string[];
  specs: {
    [key: string]: string;
  };
  viewsCount: number;
  createdAt: string;
  serialNumber?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  piecesCount: number;
  badge: string;
  highlightSteel: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  isFollower: boolean;
  followedAt?: string;
  createdAt: string;
  phone?: string;
  preferences?: string;
}

export interface Follower {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  followedAt: string;
  notificationPref: boolean;
}

export type RequestStatus = 'novo' | 'em_analise' | 'em_contato' | 'concluido';

export interface CustomPieceRequest {
  id: string;
  customerName: string;
  email: string;
  whatsapp: string;
  pieceType: string;
  steelChoice: string;
  bladeFinish: string;
  handleChoice: string;
  pinsChoice: string;
  engravingText?: string;
  sheathChoice: string;
  details: string;
  budget?: string;
  status: RequestStatus;
  createdAt: string;
  notes?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'user' | 'follower' | 'order' | 'system';
  date: string;
  read: boolean;
}

export interface SiteConfig {
  companyName: string;
  whatsappNumber: string; // digits only e.g. "5548996129568"
  whatsappFormatted: string; // display e.g. "+55 (48) 99612-9568"
  instagramHandle: string; // e.g. "@fronteiracutelaria"
  instagramUrl: string; // e.g. "https://instagram.com/fronteiracutelaria"
  emailContact: string;
  location: string;
  motto: string;
}
