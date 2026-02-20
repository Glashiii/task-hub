import {useParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from "react";
import {getProjectById} from '../../features/projects.js'
import {
    addTask, deleteTask, fetchTasksNextPage,
    subscribeTasksHead,
    TASKS_PAGE_SIZE, toggleTaskCompleted
} from '../../features/tasks.js'
import styles from './ProjectDetail.module.css';
import {auth, db} from "../../../firebase.js";
import SearchBar from "../../shared/searchBar/SearchBar.jsx";
import {Modal} from "../../shared/modal/Modal.jsx";
import AddProjectForm from "../../widgets/addProjectForm/AddProjectForm.jsx";
import AddTaskForm from "../../widgets/addTaskForm/AddTaskForm.jsx";

const ProjectDetail = () => {

    const userId = auth.currentUser?.uid;

    const {projectId} = useParams();
    const [projectData, setProjectData] = useState(null)
    const [hasMore, setHasMore] = useState(true);
    const [head, setHead] = useState([]);
    const [tail, setTail] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");


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
                setHasMore(items.length === TASKS_PAGE_SIZE);
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

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
        : null


    if (loading || projectData === null) return <div>Loading tasks...</div>;

    return (
        <div>
            <div className={styles['project-detail']}>
                <div className={styles['project-details']}>
                    <div className={styles["project-detail-main"]}>
                        <h2>{projectData.title}</h2>

                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                   id={"taskSearchBar"}
                                   label={""}
                                   type={"search"}
                                   placeholder={"Search"}
                        />

                        <p>Completed: {projectData.completedCount}/{projectData.taskCount}</p>
                    </div>
                    <hr/>
                    <div className={styles['project-detail-info']}>
                        <p>{projectData.info}</p>
                    </div>
                </div>

                <div className={styles['tasks']}>

                </div>
            </div>

            <div className={styles['task-detail']}>
                {(filteredTasks ?? tasks).map(t => (
                    <div key={t.id} className={`${styles['task']} ${t.completed ? styles['completed'] : ''}`}>
                        <p>{t.title}</p>
                        <div className={styles['task-buttons']}>
                            <button
                                className={styles['task-action-button']}
                                onClick={() => deleteTask(t.id, projectId)}>
                                <img src={new URL("./img/DeleteButton.svg", import.meta.url).href}
                                     alt="delete" />
                            </button>

                            <button
                                type="button"
                                aria-pressed={t.completed}
                                className={styles['task-action-button']}
                                onClick={() => toggleTaskCompleted(t.id, projectId)}
                            >
                                <img src={t.completed ?
                                    new URL("./img/checkbox-done.svg", import.meta.url).href:
                                    new URL("./img/checkbox.svg", import.meta.url).href}
                                     alt="checkbox" />
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {hasMore && <button onClick={loadMore}>Load more</button>}

            <div className={styles['footer-buttons']}>
                <div>
                    <button type="button"
                            onClick={() => (setModalOpen(true))}>
                        <img src={new URL("./img/return.svg", import.meta.url).href}
                             alt="delete" />
                    </button>
                </div>
                <div>

                    <button type="button"
                            onClick={() => (setModalOpen(true))}>
                        <img src={new URL("./img/add.svg", import.meta.url).href}
                             alt="add task" />
                    </button>
                </div>
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <AddTaskForm projectId={projectId}/>
            </Modal>
        </div>


    )
}

export default ProjectDetail
