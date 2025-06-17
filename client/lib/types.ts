export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "lawyer" | "employer" | "admin";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lawyer {
  id: string;
  userId: string;
  name: string;
  firm: string;
  location: string;
  experience: number;
  rating: number;
  reviews: number;
  barNumber: string;
  specializations: string[];
  image?: string;
  consultationFee: number;
  bio?: string;
  education?: string[];
  languages?: string[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  visaTypes: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  remote: boolean;
  logo?: string;
  postedDate: Date;
  expiryDate: Date;
  approved: boolean;
  employerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employer {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  description?: string;
  logo?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialResource {
  id: string;
  name: string;
  category: "banking" | "remittance" | "credit" | "education" | "loans";
  description: string;
  features: string[];
  link: string;
  rating?: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  userId?: string;
}

export interface SearchFilters {
  query?: string;
  location?: string;
  specializations?: string[];
  visaTypes?: string[];
  experience?: number;
  rating?: number;
  priceRange?: [number, number];
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
