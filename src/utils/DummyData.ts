import { Laptop } from "../types/records";

const DummyLaptop: Laptop = {
  title: "",
  slug: "",
  others: "",
  images: {
    primary: {
      img_url: "",
      metadata: {
        alt: "",
      },
    },
    all: [],
  },
  character: {
    battery: "",
    display: "",
    cpu: "",
    memory: "",
    gpu: "",
    storage: "",
    os: "",
  },
  price: 0,
};

export { DummyLaptop };
