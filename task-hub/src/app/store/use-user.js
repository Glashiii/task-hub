import {create} from "zustand";

const initialState = {
    email: null,
    token: null,
    id: null,
    isInited: false,
};

export const useUser = create((set, get) => ({
    ...initialState,
    setUser: (newEmail, newToken, newId) => set({
        email: newEmail,
        token: newToken,
        id: newId,
    }),
    removeUser: () => set({
        email: null,
        token: null,
        id: null,
    }),
    setInited: (isInited) => set({isInited}),

}))


