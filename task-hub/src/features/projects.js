import {auth, db} from "../../firebase.js";
import {
    addDoc, collection, serverTimestamp, deleteDoc, getDoc,
    doc, onSnapshot, query, orderBy, limit, startAfter
} from "firebase/firestore";

export const PAGE_SIZE = 6;

export const addProject = async (title, info) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    try {
        await addDoc(collection(db, "users", userId, "projects"), {
            title, info,
            taskCount: 0,
            completedCount: 0,
            createdAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export const deleteProject = async (projectId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    try {
        await deleteDoc(doc(db, "users", userId, "projects", projectId));
    } catch (e) {
        console.error("Error delete document: ", e);
    }
}

export function buildProjectsPageQuery(userId, afterDoc) {
    const colRef = collection(db, "users", userId, "projects");

    return afterDoc
        ? query(colRef, orderBy("createdAt", "desc"), startAfter(afterDoc), limit(PAGE_SIZE))
        : query(colRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
}

export function subscribeProjectsPage({ userId, afterDoc, onData, onError }) {
    const q = buildProjectsPageQuery(userId, afterDoc);

    return onSnapshot(
        q,
        (snap) => {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            const lastDoc = snap.docs[snap.docs.length - 1] ?? null;
            onData({ items, lastDoc });
        },
        onError
    );
}

export const getProjectById = async (projectId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    try{
        const docRef = doc(db, "users", userId, "projects", projectId);
        const docSnap  =
            await getDoc(docRef);
        return docSnap.data()
    } catch (e) {
        throw new Error(e)
    }

}