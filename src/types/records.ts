import { DocumentData } from "firebase/firestore";

export interface Laptop extends DocumentData {
  title: string;
  slug: string;
  others: string;
  images: {
    primary: {
      img_url: string;
      metadata: {
        alt: string;
      };
    };
    all: {
      img_url: string;
      metadata: {
        alt: string;
      };
    }[];
  };
  character: {
    [index: string]: string
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
