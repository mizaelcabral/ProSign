export interface SignatureData {
  // General
  name: string;
  title: string;
  company: string;
  department: string;
  
  // Contact
  email: string;
  phone: string;
  mobile: string;
  website: string;
  address: string;
  
  // Images
  profilePic: string;
  logoUrl: string;
  
  // Social
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
  
  // Design
  themeColor: string;
  fontFamily: string;
}

export const defaultSignature: SignatureData = {
  name: 'Alexandre Silva',
  title: 'Diretor de Marketing',
  company: 'TechCorp Brasil',
  department: 'Marketing',
  email: 'alexandre.silva@techcorp.com.br',
  phone: '+55 11 3456-7890',
  mobile: '+55 11 98765-4321',
  website: 'www.techcorp.com.br',
  address: 'Av. Paulista, 1000 - São Paulo, SP',
  profilePic: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
  logoUrl: 'https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff&size=128',
  linkedin: 'linkedin.com/in/alexandresilva',
  twitter: 'twitter.com/alexandresilva',
  facebook: '',
  instagram: 'instagram.com/alexandresilva',
  youtube: '',
  themeColor: '#0ea5e9', // Tailwind sky-500
  fontFamily: 'Arial, sans-serif',
};
