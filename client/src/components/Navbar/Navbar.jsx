import { useContext } from "react";
import "./navbar.css";
import {Link} from "react-router-dom"
import { AuthContext } from "../context/authContext";

const Navbar = () => {
    const { user,loading, error, dispatch } = useContext(AuthContext);
    // const {user} = useContext(AuthContext)
    const handleClick = ()=>{
        dispatch({ type: "LOGOUT" });
        location.reload()
    }
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <span className="logo">koobing</span>
                </Link>
                {user ? (
                <>
                    <div className="logged">
                        <span>{user.username}</span>
                        <div className="loggedBtn"><button onClick={handleClick}>log out</button></div>
                    </div>
                </>) : (<div className="navItems">
                    <button className="navButton">Register</button>
                    <Link to = "/login"><button className="navButton">Login</button></Link>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar