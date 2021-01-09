import { createContext } from "react";
import { IUser } from "./IUser";

export const UserContext = createContext<IUser | null>(null);
