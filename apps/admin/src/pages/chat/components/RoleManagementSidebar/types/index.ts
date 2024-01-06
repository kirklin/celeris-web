export interface Role {
  id: string;
  name: string;
  avatar: string;
  prompt: string;
  available: boolean;
  lastDate: Date;
  lastDateText: string;
  description: string;
}
