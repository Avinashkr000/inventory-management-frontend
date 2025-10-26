// User types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
  minStockLevel: number;
  supplier: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
  minStockLevel: number;
  supplier: string;
}

// Order types
export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  orderDate: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateOrderDTO {
  customerId: number;
  customerName: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}

// Transaction types
export interface Transaction {
  id: number;
  productId: number;
  productName: string;
  type: 'STOCK_IN' | 'STOCK_OUT' | 'ADJUSTMENT';
  quantity: number;
  reason: string;
  referenceId?: number;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Form types
export interface ProductFormData {
  name: string;
  description: string;
  sku: string;
  category: string;
  price: string;
  stockQuantity: string;
  minStockLevel: string;
  supplier: string;
}

export interface OrderFormData {
  customerId: string;
  customerName: string;
  items: {
    productId: string;
    quantity: string;
  }[];
}

// Dashboard types
export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  lowStockProducts: number;
  totalRevenue: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}