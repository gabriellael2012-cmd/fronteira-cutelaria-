import { Product, Collection, User, Follower, CustomPieceRequest, AppNotification, SiteConfig } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  companyName: 'Fronteira Cutelaria',
  whatsappNumber: '5548996129568',
  whatsappFormatted: '+55 (48) 99612-9568',
  instagramHandle: '@fronteiracutelaria',
  instagramUrl: 'https://instagram.com/fronteiracutelaria',
  emailContact: 'contato@fronteiracutelaria.com.br',
  location: 'Serra Gaúcha & Fronteira Sul — Brasil',
  motto: 'PRECISÃO FORJADA EM CADA DETALHE.'
};

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-gaucha',
    name: 'Linha Gaúcha Raiz',
    slug: 'linha-gaucha-raiz',
    description: 'Tradição centenária forjada em aços nobres com empunhaduras nobres de jacarandá e chifre de cervo.',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=1200&auto=format&fit=crop',
    piecesCount: 4,
    badge: 'Tradição & Forja',
    highlightSteel: 'Carbono 5160 & 1095'
  },
  {
    id: 'col-damasco',
    name: 'Edição Especial Damasco Imperial',
    slug: 'edicao-damasco-imperial',
    description: 'Padrões de caldeamento complexos com mais de 380 camadas dobradas em alta temperatura.',
    image: 'https://images.unsplash.com/photo-1589384267710-7a25bf603387?q=80&w=1200&auto=format&fit=crop',
    piecesCount: 3,
    badge: 'Alta Cutelaria',
    highlightSteel: 'Damasco 1095 + 15N20'
  },
  {
    id: 'col-chef',
    name: 'Coleção Alta Gastronomia',
    slug: 'colecao-alta-gastronomia',
    description: 'Geometria de corte refinada com desbaste full flat e equilíbrio milimétrico para chefs e churrasqueiros.',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1200&auto=format&fit=crop',
    piecesCount: 4,
    badge: 'Precisão Culinária',
    highlightSteel: 'Inox Böhler N690 & 14C28N'
  },
  {
    id: 'col-bushcraft',
    name: 'Série Bushcraft & Sobrevivência',
    slug: 'serie-bushcraft-sobrevivencia',
    description: 'Estruturas full tang ultrarresistentes projetadas para suportar condições extremas e trabalho pesado.',
    image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?q=80&w=1200&auto=format&fit=crop',
    piecesCount: 3,
    badge: 'Sobrevivência Pesada',
    highlightSteel: 'Aço Ferramenta D2 & 52100'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'faca-campeira-1',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-1',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/939PxNXk/Whats-App-Image-2026-09-01-at-21-58-51.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-01'
  },
  {
    id: 'faca-campeira-2',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-2',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/4R7QqTQZ/Whats-App-Image-2026-09-01-at-21-58-51-1.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-02'
  },
  {
    id: 'faca-campeira-3',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-3',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/zWXp0Ppq/Whats-App-Image-2026-09-01-at-21-58-52.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-03'
  },
  {
    id: 'faca-campeira-4',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-4',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/N6WjVHSj/Whats-App-Image-2026-09-01-at-21-58-52-1.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-04'
  },
  {
    id: 'faca-campeira-5',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-5',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/DDF74Grm/Whats-App-Image-2026-09-01-at-21-58-53.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-05'
  },
  {
    id: 'faca-campeira-6',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-6',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/YBbwm54B/Whats-App-Image-2026-09-01-at-21-58-53-1.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-06'
  },
  {
    id: 'faca-campeira-7',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-7',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/0yrMyCmC/Whats-App-Image-2026-09-01-at-21-58-53-3.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-07'
  },
  {
    id: 'faca-campeira-8',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-8',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/Jwpb57FZ/Whats-App-Image-2026-09-01-at-21-58-54.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-08'
  },
  {
    id: 'faca-campeira-9',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-9',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/Jjg7xrB0/Whats-App-Image-2026-09-01-at-21-58-54-1.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-09'
  },
  {
    id: 'faca-campeira-10',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-10',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/bhpxk6Z/Whats-App-Image-2026-09-01-at-21-58-54-2.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-10'
  },
  {
    id: 'faca-campeira-11',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-11',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/hJFH7Lrv/Whats-App-Image-2026-09-01-at-21-58-54-3.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-11'
  },
  {
    id: 'faca-campeira-12',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-12',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/yngvQs0y/Whats-App-Image-2026-09-01-at-21-58-55.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-12'
  },
  {
    id: 'faca-campeira-13',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-13',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/XxxSmB69/Whats-App-Image-2026-09-01-at-21-58-55-1.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-13'
  },
  {
    id: 'faca-campeira-14',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-14',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/RGWnn2BY/Whats-App-Image-2026-09-01-at-21-58-55-2.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-14'
  },
  {
    id: 'faca-campeira-15',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-15',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/ZRHVB8WW/Whats-App-Image-2026-09-01-at-21-58-55-3.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-15'
  },
  {
    id: 'faca-campeira-16',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-16',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/Ps7zysCm/Whats-App-Image-2026-09-01-at-21-58-56-1.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-16'
  },
  {
    id: 'faca-campeira-17',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-17',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/39DbDqpY/Whats-App-Image-2026-09-01-at-21-58-56.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-17'
  },
  {
    id: 'faca-campeira-18',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-18',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/GvCVrwsq/Whats-App-Image-2026-09-01-at-21-58-56-2.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-18'
  },
  {
    id: 'faca-campeira-19',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-19',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/39tcTh38/Whats-App-Image-2026-09-01-at-21-58-56-3.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-19'
  },
  {
    id: 'faca-campeira-20',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-20',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/1YYkNShT/Whats-App-Image-2026-09-01-at-21-58-56-4.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-20'
  },
  {
    id: 'faca-campeira-21',
    name: 'FACA CAMPEIRA',
    slug: 'faca-campeira-21',
    category: 'Artesanais',
    subCategory: 'Linha Campeira',
    tag: 'Pronta Entrega',
    shortDescription: '',
    description: '',
    price: 149.9,
    formattedPrice: 'R$ 149,90',
    steel: 'Aço Carbono Forjado',
    hardness: '58-59 HRC',
    bladeLength: '20 cm',
    spineThickness: '4.0 mm',
    handleMaterial: 'Madeira Nobre',
    sheath: 'Couro legítimo',
    finish: 'Artesanal',
    availability: 'available',
    isExclusive: false,
    isFeatured: true,
    images: [
      'https://i.ibb.co/YBbwm54B/Whats-App-Image-2026-09-01-at-21-58-53-1.jpg'
    ],
    specs: {},
    viewsCount: 0,
    createdAt: '2026-09-01T10:00:00Z',
    serialNumber: 'FC-21'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Gabriel Fronteira',
    email: 'admin@fronteiracutelaria.com.br',
    role: 'admin',
    isFollower: false,
    createdAt: '2026-01-01T08:00:00Z',
    phone: '+55 48 99612-9568'
  }
];

export const INITIAL_FOLLOWERS: Follower[] = [];

export const INITIAL_REQUESTS: CustomPieceRequest[] = [];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [];

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent('fc_storage_update', { detail: { key } }));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  // Products
  getProducts(): Product[] {
    const list = this.get<Product[]>('fc_products', INITIAL_PRODUCTS);
    if (
      !Array.isArray(list) ||
      list.length !== 21 ||
      list.some((p) => p.name !== 'FACA CAMPEIRA' || p.price !== 149.9) ||
      !list[0]?.images?.[0]?.includes('i.ibb.co')
    ) {
      this.saveProducts(INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    return list;
  }

  saveProducts(products: Product[]): void {
    this.set('fc_products', products);
  }

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === product.id);
    if (idx !== -1) {
      products[idx] = product;
    } else {
      products.unshift(product);
    }
    this.saveProducts(products);
  }

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id || p.slug === id);
  }

  incrementProductView(id: string): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id || p.slug === id);
    if (index !== -1) {
      products[index].viewsCount = (products[index].viewsCount || 0) + 1;
      this.saveProducts(products);
    }
  }

  // Collections
  getCollections(): Collection[] {
    return this.get<Collection[]>('fc_collections', INITIAL_COLLECTIONS);
  }

  saveCollections(cols: Collection[]): void {
    this.set('fc_collections', cols);
  }

  // Users & Auth
  getUsers(): User[] {
    return this.get<User[]>('fc_users', INITIAL_USERS);
  }

  saveUsers(users: User[]): void {
    this.set('fc_users', users);
  }

  isValidEmail(email: string): boolean {
    if (!email) return false;
    const trimmed = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }

  isValidPhone(phone: string): boolean {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
  }

  formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  getCurrentUser(): User | null {
    const user = this.get<User | null>('fc_current_user', null);
    if (user && user.name?.trim() && this.isValidEmail(user.email) && user.phone?.trim() && this.isValidPhone(user.phone)) {
      return user;
    }

    // Try to restore from discrete localStorage keys if valid
    try {
      const savedName = localStorage.getItem('fronteira_user_name');
      const savedEmail = localStorage.getItem('fronteira_user_email');
      const savedPhone = localStorage.getItem('fronteira_user_phone');
      if (
        savedName && savedName.trim().length >= 2 &&
        savedEmail && this.isValidEmail(savedEmail) &&
        savedPhone && this.isValidPhone(savedPhone)
      ) {
        const recoveredUser: User = {
          id: 'user-' + Date.now(),
          name: savedName.trim(),
          email: savedEmail.trim().toLowerCase(),
          phone: this.formatPhone(savedPhone),
          role: savedEmail.toLowerCase().includes('admin@fronteiracutelaria') ? 'admin' : 'customer',
          isFollower: false,
          createdAt: new Date().toISOString()
        };
        this.set('fc_current_user', recoveredUser);
        return recoveredUser;
      }
    } catch {}

    return null;
  }

  setCurrentUser(user: User | null): void {
    this.set('fc_current_user', user);
    try {
      if (user) {
        if (user.name) localStorage.setItem('fronteira_user_name', user.name.trim());
        if (user.email) localStorage.setItem('fronteira_user_email', user.email.trim());
        if (user.phone) localStorage.setItem('fronteira_user_phone', user.phone.trim());
      } else {
        localStorage.removeItem('fronteira_user_name');
        localStorage.removeItem('fronteira_user_email');
        localStorage.removeItem('fronteira_user_phone');
      }
    } catch {}
  }

  getVisitorName(): string {
    const curr = this.getCurrentUser();
    return curr?.name || '';
  }

  setVisitorName(name: string): User | null {
    const curr = this.getCurrentUser();
    if (curr) {
      const updated = { ...curr, name: name.trim() };
      this.setCurrentUser(updated);
      this.updateUserProfile(curr.id, { name: name.trim() });
      return updated;
    }
    return null;
  }

  hasIdentifiedVisitor(): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    const hasName = Boolean(user.name && user.name.trim().length >= 2);
    const hasEmail = Boolean(user.email && this.isValidEmail(user.email));
    const hasPhone = Boolean(user.phone && this.isValidPhone(user.phone));
    return hasName && hasEmail && hasPhone;
  }

  saveIdentifiedUser(name: string, email: string, phone: string): User {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const formattedPhone = this.formatPhone(phone.trim());

    try {
      localStorage.setItem('fronteira_user_name', trimmedName);
      localStorage.setItem('fronteira_user_email', trimmedEmail);
      localStorage.setItem('fronteira_user_phone', formattedPhone);
    } catch (e) {
      console.error(e);
    }

    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === trimmedEmail);

    let targetUser: User;
    if (existingIndex !== -1) {
      targetUser = {
        ...users[existingIndex],
        name: trimmedName,
        phone: formattedPhone,
        email: trimmedEmail,
      };
      users[existingIndex] = targetUser;
    } else {
      targetUser = {
        id: 'user-' + Date.now(),
        name: trimmedName,
        email: trimmedEmail,
        phone: formattedPhone,
        role: trimmedEmail.includes('admin@fronteiracutelaria') ? 'admin' : 'customer',
        isFollower: false,
        createdAt: new Date().toISOString()
      };
      users.push(targetUser);
    }

    this.saveUsers(users);
    this.setCurrentUser(targetUser);
    return targetUser;
  }

  identifyUser(name: string, email: string, phone: string): User {
    return this.saveIdentifiedUser(name, email, phone);
  }

  loginUser(email: string, _password?: string): User | null {
    const users = this.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      this.setCurrentUser(found);
      return found;
    }
    if (email.toLowerCase().includes('admin')) {
      const adminUser = users.find(u => u.role === 'admin') || INITIAL_USERS[0];
      this.setCurrentUser(adminUser);
      return adminUser;
    }
    return null;
  }

  registerUser(name: string, email: string, phone?: string): User | null {
    return this.saveIdentifiedUser(name, email, phone || '');
  }

  updateUserProfile(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      this.saveUsers(users);
      const curr = this.getCurrentUser();
      if (curr && curr.id === id) {
        this.setCurrentUser(users[idx]);
      }
      return users[idx];
    }
    return null;
  }

  deleteUser(id: string): void {
    const users = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(users);
  }

  // Followers
  getFollowers(): Follower[] {
    return this.get<Follower[]>('fc_followers', INITIAL_FOLLOWERS);
  }

  saveFollowers(followers: Follower[]): void {
    this.set('fc_followers', followers);
  }

  toggleFollow(user: User): { isFollowing: boolean; user: User } {
    const followers = this.getFollowers();
    const users = this.getUsers();
    const existingIndex = followers.findIndex(f => f.userId === user.id || f.userEmail === user.email);

    let isFollowing = false;
    let updatedUser = { ...user };

    if (existingIndex !== -1) {
      // Unfollow
      followers.splice(existingIndex, 1);
      updatedUser.isFollower = false;
      delete updatedUser.followedAt;
      isFollowing = false;
    } else {
      // Follow
      const now = new Date().toISOString();
      const newFollower: Follower = {
        id: 'fol-' + Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        followedAt: now,
        notificationPref: true
      };
      followers.unshift(newFollower);
      updatedUser.isFollower = true;
      updatedUser.followedAt = now;
      isFollowing = true;

      this.addNotification({
        title: 'Novo Seguidor da Fronteira',
        message: `${user.name} (${user.email}) começou a seguir a Fronteira Cutelaria.`,
        type: 'follower'
      });
    }

    this.saveFollowers(followers);
    
    const uIdx = users.findIndex(u => u.id === user.id);
    if (uIdx !== -1) {
      users[uIdx] = updatedUser;
      this.saveUsers(users);
    }

    this.setCurrentUser(updatedUser);
    return { isFollowing, user: updatedUser };
  }

  // Custom requests
  getRequests(): CustomPieceRequest[] {
    return this.get<CustomPieceRequest[]>('fc_requests', INITIAL_REQUESTS);
  }

  getCustomRequests(): CustomPieceRequest[] {
    return this.getRequests();
  }

  saveRequests(reqs: CustomPieceRequest[]): void {
    this.set('fc_requests', reqs);
  }

  addRequest(req: Omit<CustomPieceRequest, 'id' | 'createdAt' | 'status'>): CustomPieceRequest {
    const requests = this.getRequests();
    const newReq: CustomPieceRequest = {
      ...req,
      id: 'req-' + Date.now(),
      status: 'novo',
      createdAt: new Date().toISOString()
    };
    requests.unshift(newReq);
    this.saveRequests(requests);

    this.addNotification({
      title: 'Nova Solicitação de Personalização',
      message: `${req.customerName} enviou solicitação para: ${req.pieceType}`,
      type: 'order'
    });

    return newReq;
  }

  addCustomRequest(req: Omit<CustomPieceRequest, 'id' | 'createdAt' | 'status'>): CustomPieceRequest {
    return this.addRequest(req);
  }

  updateRequestStatus(id: string, status: CustomPieceRequest['status'], notes?: string): void {
    const requests = this.getRequests();
    const idx = requests.findIndex(r => r.id === id);
    if (idx !== -1) {
      requests[idx].status = status;
      if (notes !== undefined) requests[idx].notes = notes;
      this.saveRequests(requests);
    }
  }

  // Notifications
  getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>('fc_notifications', INITIAL_NOTIFICATIONS);
  }

  saveNotifications(notifs: AppNotification[]): void {
    this.set('fc_notifications', notifs);
  }

  addNotification(notif: Omit<AppNotification, 'id' | 'date' | 'read'>): void {
    const list = this.getNotifications();
    const newN: AppNotification = {
      ...notif,
      id: 'notif-' + Date.now(),
      date: new Date().toISOString(),
      read: false
    };
    list.unshift(newN);
    this.saveNotifications(list);
  }

  markNotificationsAsRead(): void {
    const list = this.getNotifications().map(n => ({ ...n, read: true }));
    this.saveNotifications(list);
  }

  // Saved / Favorite items
  getSavedProducts(): string[] {
    return this.get<string[]>('fc_saved_products', []);
  }

  toggleSaveProduct(id: string): string[] {
    const saved = this.getSavedProducts();
    const idx = saved.indexOf(id);
    if (idx !== -1) {
      saved.splice(idx, 1);
    } else {
      saved.push(id);
    }
    this.set('fc_saved_products', saved);
    return saved;
  }

  // Site Config
  getSiteConfig(): SiteConfig {
    const cfg = this.get<SiteConfig>('fc_site_config', DEFAULT_SITE_CONFIG);
    if (!cfg.whatsappNumber || cfg.whatsappNumber === '5554999123456' || cfg.whatsappFormatted.includes('54')) {
      cfg.whatsappNumber = '5548996129568';
      cfg.whatsappFormatted = '+55 (48) 99612-9568';
      this.saveSiteConfig(cfg);
    }
    return cfg;
  }

  saveSiteConfig(config: SiteConfig): void {
    this.set('fc_site_config', config);
  }
}

export const storage = new StorageService();
