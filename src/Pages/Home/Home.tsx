import { NavLink } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";


export function Home() {
    return (
        <Layout>
            <h1>Home</h1>

            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </Layout>
    )
}