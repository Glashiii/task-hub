import style from "./MobileNavBar.module.css"
import SidebarLink from "../sidebarLink/SidebarLink.jsx";
import MobileNavBarLink from "../mobileNavBarLink/MobileNavBarLink.jsx";

const MobileNavBar = () => {
    return(
        <nav className={style["mobile-nav-bar"]}>
            <MobileNavBarLink title={''} url={'/'}
                         imgPath={new URL("./img/dashboard.svg", import.meta.url).href}
                         alt={"Dashboard"}
            />
            <MobileNavBarLink title={''} url={'/profile'}
                         imgPath={new URL("./img/profile.svg", import.meta.url).href}
                         alt={"Profile"}
            />
        </nav>
    )
}

export default MobileNavBar