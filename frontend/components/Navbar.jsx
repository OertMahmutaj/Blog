import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div>
            <Link to={"/blogs"}>Blogs</Link>
            {" "}
            <Link to={"/users"}>Users</Link>
            {" "}
            <Link to={"/login"}>Log in</Link>
        </div>
    )

}

export default Navbar