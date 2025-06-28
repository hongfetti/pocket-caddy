// import { Link } from "react-router-dom"
import auth from "../../utils/auth.ts";
import Login from "../../components/Login/Login.tsx";

const Home = () => {
  return auth.loggedIn() ? (
    <div>
      <main>
        <h1>Home (logged in)</h1>
      </main>
    </div>
  ) : (
    <div>
      <main>
        <h1>Log in to get started!</h1>
        <Login />
      </main>
    </div>
  );
};

export default Home;
