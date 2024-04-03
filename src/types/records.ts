import { DocumentData } from "firebase/firestore";

export interface LaptopImagesProps {
  img_url: string;
  metadata: {
    alt: string;
  };
}

export interface Laptop extends DocumentData {
  id?: string;
  title: string;
  slug: string;
  others: string;
  images: {
    primary: LaptopImagesProps;
    all: LaptopImagesProps[];
  };
  character: {
    [index: string]: string;
    battery: string;
    display: string;
    cpu: string;
    memory: string;
    gpu: string;
    storage: string;
    os: string;
  };
  price: number;
}
