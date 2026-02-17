export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
  quote?: {
    text: string;
    author: string;
  };
}

export interface MapLayer {
  id: string;
  name: string;
  data: GeoJSON.FeatureCollection;
  visible: boolean;
}

export interface GameStats {
  social: number;
  economic: number;
  ecology: number;
}

export interface Species {
  id: number;
  name: string;
  scientificName: string;
  category: 'marine' | 'terrestrial' | 'avian';
  status: string;
  image: string;
  shortDescription: string;
  description: string;
  threats: string[];
}