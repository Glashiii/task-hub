import styles from "./SidebarLink.module.css"
import {Link} from "react-router-dom";

const SidebarLink = (props) => {
    const {
        title,
        url,
    } = props
    return (
        <Link to={url} className={styles["sidebar-link"]}>{title}</Link>
    )
}

export default SidebarLink