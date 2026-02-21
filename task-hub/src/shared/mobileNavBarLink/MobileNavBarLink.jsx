import styles from "./MobileNavBarLink.module.css"
import {Link} from "react-router-dom";

const MobileNavBarLink = (props) => {
    const {
        title,
        url,
        imgPath,
        alt
    } = props
    return (
        <Link to={url} className={styles["mobile-nav-links"]}>
                <img src={imgPath} alt={alt}/>
                <p>{title}</p>
        </Link>
    )
}

export default MobileNavBarLink