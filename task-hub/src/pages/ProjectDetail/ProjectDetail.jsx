import {useParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from "react";
import {getProjectById} from '../../features/projects.js'
import {
    addTask, deleteTask, fetchTasksNextPage,
    subscribeTasksHead,
    TASKS_PAGE_SIZE
} from '../../features/tasks.js'
import styles from './ProjectDetail.module.css';
import {auth, db} from "../../../firebase.js";

const ProjectDetail = () => {

    const userId = auth.currentUser?.uid;

    const {projectId} = useParams();
    const [projectData, setProjectData] = useState(null)
    const [hasMore, setHasMore] = useState(true);
    const [head, setHead] = useState([]);
    const [tail, setTail] = useState([]);

    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        (async () => {
                setLoading(true);
                try {
                    const project = await getProjectById(projectId)
                    setProjectData(project)
                } catch (e) {
                    console.error("getProjectById error:", e);
                } finally {
                    console.log('tried')
                    setLoading(false);
                }
            }
        )();

    }, [projectId]);

    useEffect(() => {
        if (!userId || !projectId) return;

        setLoading(true);

        const unsub = subscribeTasksHead({
            db,
            userId,
            projectId,
            pageSize: TASKS_PAGE_SIZE,
            onData: ({items, lastDoc}) => {
                setHead(items);
                setTail([]);
                setCursor(lastDoc);
                setHasMore(items.length === TASKS_PAGE_SIZE); // упрощённо
            },
            onError: console.error,
        });

        return () => unsub();
    }, [userId, projectId]);

    const loadMore = async () => {
        if (!cursor || !hasMore) return;

        const {items, lastDoc} = await fetchTasksNextPage({
            db,
            userId,
            projectId,
            afterDoc: cursor,
            pageSize: TASKS_PAGE_SIZE,
        });

        setTail((prev) => [...prev, ...items]);
        setCursor(lastDoc);
        setHasMore(items.length === TASKS_PAGE_SIZE);
    };

    const tasks = useMemo(() => [...head, ...tail], [head, tail]);


    if (loading || projectData === null) return <div>Loading tasks...</div>;

    return (
        <div>
            <div className={styles['project-detail']}>
                <div className={styles['project-detail-info']}>
                    <div className={styles["project-detail-main"]}>
                        <p>{projectData.title}</p>
                        Filter-plane
                        <p>Completed: {projectData.completedCount}/{projectData.taskCount}</p>
                    </div>
                    <hr/>
                    <div>{projectData.info}</div>
                </div>

                <div className={styles['tasks']}>

                </div>
            </div>

            <div>
                {tasks.map(t => (
                    <div key={t.id} className={styles['task']}>
                        {t.title}
                        <button onClick={() => deleteTask(t.id, projectId)}>
                            delete Task
                        </button>
                    </div>
                ))}
            </div>

            {hasMore && <button onClick={loadMore}>Load more</button>}

            <div className={styles['footer-buttons']}>
                <div>
                    {/*go back*/}
                </div>
                <div>
                    {/*add new task (modal)*/}
                    <button onClick={() => addTask("rnd", projectId)}>
                        add Task
                    </button>
                </div>
            </div>
        </div>


    )
}

export default ProjectDetail
