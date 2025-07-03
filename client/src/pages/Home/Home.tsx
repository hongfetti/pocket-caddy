import "./Home.css";
import auth from "../../utils/auth.ts";
import Login from "../../components/Login/Login.tsx";
import Profile from "../../components/Profile/Profile.tsx";

const Home = () => {
  const loggedIn = auth.loggedIn();

  return loggedIn ? (
    <main>
      <Profile />
    </main>
  ) : (
    <main>
      <h1>Log in to get started!</h1>
      <Login />
    </main>
  );
};

export default Home;
