import styles from "./SidebarLink.module.css"
import {Link} from "react-router-dom";

const SidebarLink = (props) => {
    const {
        title,
        url,
        imgPath,
        alt
    } = props
    return (
        <Link to={url} className={styles["sidebar-links"]}>
                <img src={imgPath} alt={alt}/>
                <p>{title}</p>
        </Link>
    )
}

export default SidebarLink