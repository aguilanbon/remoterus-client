import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { User } from "../types/user.types";

export const userAtom = atom<User | null>(null);
export const storage = createJSONStorage(() => sessionStorage);
export const newUserAtom = atomWithStorage("some-key", userAtom, storage);
export const strAtomWithPersistence = atom(
  (get) => {
    const user = get(userAtom);
    if (!user) {
      const storedUser = localStorage.getItem("userInformation");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    }
    return user;
  },
  (get, set, newStr: User) => {
    set(userAtom, newStr);
    localStorage.setItem("userInformation", JSON.stringify(newStr));
  }
);
