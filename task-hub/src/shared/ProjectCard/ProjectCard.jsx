import styles from './ProjectCard.module.css'

const ProjectCard = () => {
    return(
        <div className={styles.card}>
            <h2 className="card-header">Some Header</h2>
            <hr />
            <div className={styles["card-body"]}>
                <p className="card-text">Some text</p>
                <p className="card-text">Tasks count: </p>
                <p className="card-text">Completed: </p>
                <p className="card-text">Uncompleted: </p>
                <p className="card-text">Progress bar</p>
                <button>delete</button>
            </div>
        </div>
    )
}

export default ProjectCard;