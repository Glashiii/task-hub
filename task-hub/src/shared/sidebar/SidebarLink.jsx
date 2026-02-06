const SidebarLink = (props) => {
    const {
        title,
    } = props
    return (
        <>
        <a href="/some-link" className={`sidebar-link`}>
            {title}
        </a>

        </>
    )
}

export default SidebarLink