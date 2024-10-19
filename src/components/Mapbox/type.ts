export type MarkerContent = {
  url: string;
  name: string;
};
export type MarkerArgs = {
  lat: number;
  lng: number;
  content: MarkerContent;
  onClick?: (e: MouseEvent) => void;
};
