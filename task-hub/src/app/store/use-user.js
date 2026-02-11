import {create} from "zustand";

const initialState = {
    email: null,
    token: null,
    id: null,
};

export const useUser = create((set,get) => ({
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
    })

}))


