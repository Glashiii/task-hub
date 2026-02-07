import styles from "./SidebarLink.module.css"

const SidebarLink = (props) => {
    const {
        title,
    } = props
    return (
        <a href="/some-link" className={styles['sidebar-link']}>
            {title}
        </a>
    )
}

export default SidebarLink