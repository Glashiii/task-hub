import {auth, db} from "../../firebase.js";
import {
    addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot,
    orderBy, query, serverTimestamp, startAfter
} from "firebase/firestore";

export const TASKS_PAGE_SIZE = 10;

export const addTask = async (title, projectId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    try {
        await addDoc(collection(db, "users", userId, "projects", projectId, "tasks"), {
            title,
            completed: false,
            createdAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding task: ", e);
    }
}

export const deleteTask = async (taskId, projectId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    try {
        await deleteDoc(doc(db, "users", userId, "projects", projectId, "tasks", taskId));
    } catch (e) {
        console.error("Error delete document: ", e);
    }
}


function mapDoc(d) {
    return { id: d.id, ...d.data() };
}

function tasksColRef(db, userId, projectId) {
    return collection(db, "users", userId, "projects", projectId, "tasks");
}


export function subscribeTasksHead({
                                       db,
                                       userId,
                                       projectId,
                                       pageSize = TASKS_PAGE_SIZE,
                                       onData,
                                       onError,
                                   }) {
    if (!userId) throw new Error("userId is required");
    if (!projectId) throw new Error("projectId is required");

    const colRef = tasksColRef(db, userId, projectId);
    const q = query(colRef, orderBy("createdAt", "desc"), limit(pageSize));

    return onSnapshot(
        q,
        (snap) => {
            const items = snap.docs.map(mapDoc);
            const lastDoc = snap.docs[snap.docs.length - 1] ?? null;
            onData?.({ items, lastDoc });
        },
        (err) => onError?.(err)
    );
}

export async function fetchTasksNextPage({
                                             db,
                                             userId,
                                             projectId,
                                             afterDoc,
                                             pageSize = TASKS_PAGE_SIZE,
                                         }) {
    if (!afterDoc) return { items: [], lastDoc: null };

    const colRef = tasksColRef(db, userId, projectId);
    const q = query(
        colRef,
        orderBy("createdAt", "desc"),
        startAfter(afterDoc),
        limit(pageSize)
    );

    const snap = await getDocs(q);
    const items = snap.docs.map(mapDoc);
    const lastDoc = snap.docs[snap.docs.length - 1] ?? null;

    return { items, lastDoc };
}