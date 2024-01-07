export interface SearchGroupItem {
  iconName: string | null;
  iconImage: string | null;
  key: number | string;
  title: string;
  label: string;
  tags?: string;
  action: () => void;
}

export interface SearchGroup {
  name: string;
  items: SearchGroupItem[];
}
export type SearchGroups = SearchGroup[];
