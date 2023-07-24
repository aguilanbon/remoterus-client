import { atom } from "jotai";
import { User } from "../types/user.types";

export const userAtom = atom<User | null>(null);
