import {useAuth} from "../../entities/user/model/hooks/use-auth.js";
import {useUser} from "../../app/store/use-user.js";
import ProjectCard from "../../shared/ProjectCard/ProjectCard.jsx";
import styles from "./Dashboard.module.css"


const Dashboard = () => {

    const removeUser = useUser((state) => state.removeUser);

    const {
        email
    } = useAuth()

    return (
        <div className={styles.dashboard}>
            <h1>Welcome</h1>
            <div className={styles["card-field"]}>
                <ProjectCard />
                <ProjectCard />
            </div>

        </div>
    )
}

export default Dashboard