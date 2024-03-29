export interface CreatePointDto {
  image?: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  address: string;
  phoneNumber?: string;
}
