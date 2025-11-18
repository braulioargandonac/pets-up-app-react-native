export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  address?: string | null;
  communeId: number;
  shortDescription?: string | null;
  userRoles: {
    role: Role;
  }[];
}