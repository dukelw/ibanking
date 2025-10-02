export default interface User {
  id: number;
  sID?: string;
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
