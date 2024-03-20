import { createContext } from "react";
import { Laptop } from "../types/records";
// import { DummyLaptop } from "../utils/DummyData";

export const HomePageContext = createContext<Laptop[]>([]);
