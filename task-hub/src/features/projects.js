import {auth, db} from "../../firebase.js";
import {
    addDoc, collection, serverTimestamp, deleteDoc,
    doc, onSnapshot, query, orderBy, limit, startAfter, endBefore, limitToLast
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

export function buildProjectsPageQuery(db, userId, cursor) {
    const colRef = collection(db, "users", userId, "projects");

    if (!cursor) {
        return query(colRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
    }

    if (cursor.after) {
        return query(
            colRef,
            orderBy("createdAt", "desc"),
            startAfter(cursor.after),
            limit(PAGE_SIZE)
        );
    }

    if (cursor.before) {
        return query(
            colRef,
            orderBy("createdAt", "desc"),
            endBefore(cursor.before),
            limitToLast(PAGE_SIZE)
        );
    }

    return query(colRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
}

export function subscribeProjectsPage({ userId, cursor, onData, onError }) {
    if (!userId) throw new Error("Not authorized");

    const q = buildProjectsPageQuery(db, userId, cursor);

    const unsub = onSnapshot(
        q,
        (snap) => {
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            const firstDoc = snap.docs[0] ?? null;
            const lastDoc = snap.docs[snap.docs.length - 1] ?? null;

            onData({ items, firstDoc, lastDoc });
        },
        onError
    );

    return unsub;
}