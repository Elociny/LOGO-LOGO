import { NavLink } from "react-router-dom";


export function Login() {
    return (
        <>
            <h1>Login</h1>

            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </>
    )
}