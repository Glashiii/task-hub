import ProjectCard from "../../shared/ProjectCard/ProjectCard.jsx";
import styles from "./Dashboard.module.css"
import {
    PAGE_SIZE,
    subscribeProjectsPage
} from "../../features/projects.js"
import {useEffect, useState} from "react";
import {auth} from "../../../firebase.js"
import {Modal} from "../../shared/modal/Modal.jsx";
import AddProjectForm from "../../widgets/addProjectForm/AddProjectForm.jsx";
import SearchBar from "../../shared/searchBar/SearchBar.jsx";


const Dashboard = () => {

    const userId = auth.currentUser?.uid;

    const [projects, setProjects] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageCursors, setPageCursors] = useState([null]);

    const afterDoc = pageCursors[pageIndex];

    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortDir, setSortDir] = useState("desc");

    useEffect(() => {
        if (!userId) return;

        setLoading(true);

        const unsub = subscribeProjectsPage({
                userId,
                afterDoc,
                sortDir,
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
    }, [userId, afterDoc, sortDir]);


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

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredProjects = clearSearchQuery.length > 0
        ? projects.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
        : null

    return (
        <div className={styles.dashboard}>
            <div className={styles["dashboard-header"]}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                           placeholder={"Search by project"}
                           id={"taskSearchBar"}
                           label={""}
                           type={"search"}
                />

                <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
                    <option value="desc">New first</option>
                    <option value="asc">Old first</option>
                </select>

                <button type="button" onClick={() => (setModalOpen(true))}>
                  <span className={styles['add-button-short']}>
                      Add
                  </span>
                    <span className={styles['add-button-long']}>
                        Add new task
                    </span>
                </button>
            </div>


            <div className={styles.dashboardContent}>
                {loading ? (
                    <div>Projects are loading...</div>
                ) : projects.length === 0 ? (
                    <div>No projects yet</div>
                ) : (
                    <div className={styles.cardField}>
                        {(filteredProjects ?? projects).map((p) => (
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

                <button type="button" onClick={onPrev} disabled={pageIndex === 0} className={styles["flip-horizontal"]}>
                    <img src={new URL("./img/arrow.svg", import.meta.url).href} alt="prev"/>
                </button>
                <p>Page: {pageIndex + 1}</p>
                <button onClick={onNext} disabled={projects.length !== PAGE_SIZE}>
                    <img src={new URL("./img/arrow.svg", import.meta.url).href} alt="next"/>
                </button>
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <AddProjectForm setPageCursors={setPageCursors}
                                setPageIndex={setPageIndex}/>
            </Modal>
        </div>
    )
}

export default Dashboard