import { create } from "zustand";

interface IProfile {
    id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

type ProfileType = {
    id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
};

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
