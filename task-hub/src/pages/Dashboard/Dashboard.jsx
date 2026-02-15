import {useAuth} from "../../entities/user/model/hooks/use-auth.js";
import {useUser} from "../../app/store/use-user.js";
import ProjectCard from "../../shared/ProjectCard/ProjectCard.jsx";
import styles from "./Dashboard.module.css"
import {readProjects, addProject} from "../../features/projects.js"
import {useEffect, useState} from "react";


const Dashboard = () => {

    const removeUser = useUser((state) => state.removeUser);

    const {
        email, userId,
    } = useAuth()

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        readProjects()
            .then(setProjects)
            .catch(console.error);
    }, []);


    return (
        <div className={styles.dashboard}>
            <h1>Welcome</h1>
            <button onClick={() => {
                addProject("title3", "info3")
            }}>add</button>
            <button onClick={readProjects}>read</button>
            <div className={styles["card-field"]}>
                {projects.map(p => (
                    <ProjectCard
                    key={p.id}
                    title={p.title}
                    info={p.info}
                    tasksCount={p.taskCount}
                    completedCount={p.completedCount}
                    />
                ))}
            </div>

        </div>
    )
}

export default Dashboard