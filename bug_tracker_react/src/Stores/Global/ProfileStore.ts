import { create } from "zustand";
import type { ProfileType } from "../../Types/types";

type ProfileTypeZustand = ProfileType & {
    setUser: (userData: ProfileType) => void;
    clearUser: () => void;
};

const initialState: ProfileType = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    username: "",
};

export const useProfileStore = create<ProfileTypeZustand>((set) => ({
    ...initialState,
    setUser: (userData) => set(userData),
    clearUser: () => set(initialState),
}));
