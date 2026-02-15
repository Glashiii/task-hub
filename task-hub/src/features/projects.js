import {auth, db} from "../../firebase.js";
import {addDoc, collection, serverTimestamp, getDocs} from "firebase/firestore";


export const addProject = async (title, info) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        console.error("Нет userId: пользователь не авторизован");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "users", userId, "projects"), {
            title, info,
            taskCount: 0,
            completedCount: 0,
            createdAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export const readProjects = async () => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    try {
        const snap = await getDocs(collection(db, "users", userId, "projects"))
        return snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (e) {
        console.error("Error read documents: ", e);
    }

}

const deleteProject = async (projectId) => {
}