import './Header.css'
import { Link } from "react-router-dom";
import auth from "../../utils/auth";

export default function Header() {
    return (
        <header>
            <h1>Pocket Caddy</h1>
            <div className="nav-bar">
                {auth.loggedIn() ? (
                    <ul>
                        <li>
                            <Link
                              className="nav-link"
                              to="/bag"
                              >
                                Bag
                              </Link>
                        </li>
                        <li>
                            <Link
                              className="nav-link"
                              to="/scores"
                              >
                                Scores
                              </Link>
                        </li>
                        <li>
                            <Link
                              className="nav-link"
                              to="/"
                              onClick={auth.logout}
                              >
                                Logout
                              </Link>
                        </li>
                    </ul>
                ) : (
                    <div></div>
                )}
            </div>
        </header>
    )
}