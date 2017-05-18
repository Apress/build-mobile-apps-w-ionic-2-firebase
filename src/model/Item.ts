export interface Item {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  text?: string;
  descendants?: number;
  kids?: number[];
  isFavorite?: boolean;
}

export interface OpenPage {
  (url: string): void;
}

export interface ViewComment {
  (itemId: number): void;
}

export interface AddToFavorite {
  (itemId: number): Promise<void>;
}

export interface RemoveFromFavorite {
  (itemId: number): Promise<void>;
}

export interface Share {
  (title: string, url: string): void;
}
