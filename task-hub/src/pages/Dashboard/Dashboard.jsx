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
    const [firstDoc, setFirstDoc] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);

    const [cursor, setCursor] = useState(null);
    const [page, setPage] = useState(0);

    const hasNext = projects.length === PAGE_SIZE;

    useEffect(() => {
        if (!userId) return;

        const unsub = subscribeProjectsPage({
            userId,
            cursor,
            onData: ({items, firstDoc, lastDoc}) => {
                setProjects(items);
                setFirstDoc(firstDoc);
                setLastDoc(lastDoc);
            },
            onError: (err) => console.error(err),
        });

        return () => unsub();
    })

    const onNext = () => {
        if (!lastDoc) return;
        setCursor({ after: lastDoc });
        setPage((p) => p + 1);
    };

    const onPrev = () => {
        if (page === 0) return;

        if (page === 1) {
            setCursor(null);
            setPage(0);
            return;
        }

        setCursor({ before: firstDoc });
        setPage((p) => p - 1);
    };

    return (
        <div className={styles.dashboard}>
            <h1>Welcome</h1>
            <button onClick={() => {
                addProject("title3", "info3")
                setCursor(null);
                setPage(0);
            }}>add</button>

            <div className={styles["card-field"]}>
                {projects.map(p => (
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
            <p>Page: {page+1}</p>
            <button onClick={onPrev} disabled={page === 0}>
                Prev
            </button>

            <button onClick={onNext} disabled={!hasNext}>
                Next
            </button>

        </div>
    )
}

export default Dashboard