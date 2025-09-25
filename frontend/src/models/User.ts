export default interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  gender?: string;
  address: string;
  password: string;
  phone?: string;
  phoneNumber?: string;
  createdAt: string; // Date in ISO string format
  updatedAt: string; // Date in ISO string format
  balance: number;
}
