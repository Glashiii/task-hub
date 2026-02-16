import SidebarLink from "../../shared/sidebarLink/SidebarLink.jsx";
import styles from './Sidebar.module.css';
import LogoutButton from "../../features/auth/Logout.jsx";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h1>TaskHub</h1>
            </div>
            <hr className={styles.sidebarDivider}/>
            <nav>
                <SidebarLink title={'Dashboard'} url={'/'}></SidebarLink>
                <SidebarLink title={'Profile'} url={'/profile'}></SidebarLink>
            </nav>
            <LogoutButton className={styles.logoutBtn} />
        </aside>
    )
}

export default Sidebar