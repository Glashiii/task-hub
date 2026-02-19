import {useState} from 'react'
import styles from './AuthForm.module.css'

const AuthForm = ({title, handleClick, isInvalidCreds}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={styles["auth-form"]}>
            <div className={styles["auth-form-input"]}>
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

            </div>

            {isInvalidCreds && (
                <div className={styles["invalid"]}>invalid credentials</div>
            )}
            <button onClick={() => handleClick(email, password)}>
                {title}
            </button>
        </div>
    )
}

export {AuthForm}