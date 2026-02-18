import {auth, db} from "../../firebase.js";
import {
    addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot,
    orderBy, query, serverTimestamp, startAfter, updateDoc, runTransaction, increment
} from "firebase/firestore";

export const TASKS_PAGE_SIZE = 10;

export const addTask = async (title, projectId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    const projectRef = doc(db, "users", userId, "projects", projectId);
    const taskRef = doc(collection(db, "users", userId, "projects", projectId, "tasks"))

    await runTransaction(db, async (tx) => {
        tx.set(taskRef, {
            title,
            completed: false,
            createdAt: serverTimestamp(),
        });

        tx.update(projectRef, {
            taskCount: increment(1),
        });
    });
}

export const deleteTask = async (taskId, projectId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    const projectRef = doc(db, "users", userId, "projects", projectId);
    const taskRef = doc(db, "users", userId, "projects", projectId, "tasks", taskId);

    await runTransaction(db, async (tx) => {
        const taskSnap = await tx.get(taskRef);
        if (!taskSnap.exists()) return;

        const { completed } = taskSnap.data();

        tx.delete(taskRef);

        tx.update(projectRef, {
            taskCount: increment(-1),
            ...(completed ? { completedCount: increment(-1) } : {}),
        });
    });
}

export const toggleTaskCompleted = async (taskId, projectId, completed) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error("Not authorized");
    }

    const projectRef = doc(db, "users", userId, "projects", projectId);
    const taskRef = doc(db, "users", userId, "projects", projectId, "tasks", taskId);

    await runTransaction(db, async (tx) => {
        const snap = await tx.get(taskRef);
        if (!snap.exists()) return;

        const prev = snap.data().completed;
        const next = !prev;

        tx.update(taskRef, { completed: completed });
        tx.update(projectRef, { completedCount: increment(next ? 1 : -1) });
    });
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