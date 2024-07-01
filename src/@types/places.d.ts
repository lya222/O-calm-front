export interface Places {
  id: number;
  name: string;
  description: string;
  images: string[];
  tag: Tag[];
  route: string[];
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}
