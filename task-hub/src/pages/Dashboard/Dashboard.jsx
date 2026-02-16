import ProjectCard from "../../shared/ProjectCard/ProjectCard.jsx";
import styles from "./Dashboard.module.css"
import {
    addProject,
    PAGE_SIZE,
    subscribeProjectsPage
} from "../../features/projects.js"
import {useEffect, useState} from "react";
import {auth} from "../../../firebase.js"


const Dashboard = () => {

    const userId = auth.currentUser?.uid;

    const [projects, setProjects] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageCursors, setPageCursors] = useState([null]);

    const afterDoc = pageCursors[pageIndex];

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        setLoading(true);

        const unsub = subscribeProjectsPage({
                userId,
                afterDoc,
                onData: ({items, lastDoc}) => {
                    setProjects(items);
                    setLastDoc(lastDoc);
                    setLoading(false);
                },
                onError: (e) => {
                    console.error(e);
                    setLoading(false);
                },
            }
        )
        return () => unsub();
    }, [userId, afterDoc]);

    const onNext = () => {
        if (!lastDoc) return;

        setPageCursors((prev) => {
            const next = [...prev];
            next[pageIndex + 1] = lastDoc;
            return next;
        });

        setPageIndex((p) => p + 1);
    };

    const onPrev = () => {
        setPageIndex((p) => Math.max(0, p - 1));
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles["dashboard-header"]}>
                <h1>Welcome</h1>
                <button onClick={() => {
                    addProject("title3", "info3")
                    setPageCursors([null]);
                    setPageIndex(0);
                }}>add
                </button>
                <hr />
            </div>


            <div className={styles.dashboardContent}>
                {loading ? (
                    <div>Projects are loading...</div>
                ) : projects.length === 0 ? (
                    <div>No projects yet</div>
                ) : (
                    <div className={styles.cardField}>
                        {projects.map((p) => (
                            <ProjectCard
                                key={p.id}
                                id={p.id}
                                title={p.title}
                                info={p.info}
                                tasksCount={p.taskCount}
                                completedCount={p.completedCount}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className={styles["dashboard-footer"]}>
                <p>Page: {pageIndex + 1}</p>
                <button onClick={onPrev} disabled={pageIndex === 0}>Prev</button>
                <button onClick={onNext} disabled={projects.length !== PAGE_SIZE}>Next</button>
            </div>
        </div>
    )
}

export default Dashboard