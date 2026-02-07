import SidebarLink from "../../shared/sidebarLink/SidebarLink.jsx";
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h1>TaskHub</h1>
            </div>
            <hr className={styles.sidebarDivider} />
            <SidebarLink title={'Dashboard'}></SidebarLink>
            <SidebarLink title={'Profile'}></SidebarLink>
        </aside>
    )
}

export default Sidebar