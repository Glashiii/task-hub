import {useState} from 'react'
import styles from './Form.module.css'

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={styles["form"]}>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={() => handleClick(email, password)}>
                {title}
            </button>
        </div>
    )
}

export {Form}