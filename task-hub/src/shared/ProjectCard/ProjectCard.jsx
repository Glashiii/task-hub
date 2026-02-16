import styles from './ProjectCard.module.css'
import {deleteProject} from "../../features/projects.js"
import { useNavigate } from "react-router-dom";

const ProjectCard = (props) => {
    const {
        id,
        title,
        info,
        tasksCount,
        completedCount,
    } = props

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/projects/" + id);
    }

    return(
        <div className={styles.card} onClick={handleClick}>
            <div className={styles["card-header"]}>
                <h2>{title}</h2>
                <div className={styles["card-delete-area"]}>
                    <button className={styles["delete-btn"]} onClick={() => deleteProject(id)}>
                        <img src={new URL("./img/ic_baseline-delete.svg", import.meta.url).href} alt="DEL" />
                    </button>
                </div>
            </div>
            <hr />
            <div className={styles["card-body"]}>
                <p className={styles["card-text-info"]}>{info}</p>
                <p className="card-text">Tasks count: {tasksCount} </p>
                <p className="card-text">Completed: {completedCount}/{tasksCount}</p>
                <p className="card-text">Progress bar</p>


            </div>
        </div>
    )
}

export default ProjectCard;