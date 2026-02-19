import SidebarLink from "../../shared/sidebarLink/SidebarLink.jsx";
import styles from './Sidebar.module.css';
import LogoutButton from "../../features/auth/Logout.jsx";

const Sidebar = () => {
    return (<aside className={styles.sidebar}>
        <div className={styles["sidebar-header"]}>
            <h1 className={styles["header-text"]}>TaskHub</h1>
        </div>
        <hr className={styles.sidebarDivider}/>
        <nav className={styles["sidebar-nav"]}>
            <SidebarLink title={'Dashboard'} url={'/'}
                         imgPath={new URL("./img/dashboard.svg", import.meta.url).href}
                         alt={"Dashboard"}
            />
            <SidebarLink title={'Profile'} url={'/profile'}
                         imgPath={new URL("./img/profile.svg", import.meta.url).href}
                         alt={"Profile"}
            />
        </nav>
        <LogoutButton className={styles.logoutBtn}/>
    </aside>)
}

export default Sidebar