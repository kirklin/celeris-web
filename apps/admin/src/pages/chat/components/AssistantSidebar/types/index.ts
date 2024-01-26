export interface Assistant {
  id: string;
  name: string;
  avatar: string;
  prompt: string;
  available: boolean;
  lastDate: Date;
  lastDateText: string;
  description: string;
  likes?: number;
  dislikes?: number;
  shares?: number;
}
