export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_urls: Array<{[key: string]: string}>;
}


export interface Brand {
  id: string;
  name: string;
  description: string;
  images: {
    logo: string;
  };
}
