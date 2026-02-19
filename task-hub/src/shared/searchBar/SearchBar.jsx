import style from './SearchBar.module.css';


const SearchBar = (props) => {

    const {
        id,
        label,
        type,
        placeholder,
        searchQuery,
        setSearchQuery,
    } = props

    return (
        <form className={style['search-bar']}  onSubmit={(event) => event.preventDefault()}>
            <label
                className="field__label"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="field__input"
                id={id}
                placeholder={placeholder}
                autoComplete="off"
                type={type}
                value={searchQuery}
                onInput={(event) => setSearchQuery(event.target.value)}
            />
        </form>
    )
}

export default SearchBar;