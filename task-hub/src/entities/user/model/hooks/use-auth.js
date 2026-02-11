import {useUser} from "../../../../app/store/use-user.js";
import {shallow} from "zustand/shallow";

export const useAuth = () => {
    const email = useUser((state) => state.email);
    const token = useUser((state) => state.token);
    const id = useUser((state) => state.id);

    return { isAuth: !!email, email, token, id };
};
