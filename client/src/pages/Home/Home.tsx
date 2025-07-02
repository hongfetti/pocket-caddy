import "./Home.css"
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries.ts";
import auth from "../../utils/auth.ts";
import Login from "../../components/Login/Login.tsx";
import Profile from "../../components/Profile/Profile.tsx"

const Home = () => {

  const loggedIn = auth.loggedIn();
  const { loading, error } = useQuery(GET_CURRENT_USER, {
    skip: !loggedIn,
    fetchPolicy: "network-only"
  });

  if (!loggedIn) {
    return (
    <div>
      <main id="home-login">
        <h1>Log in to get started!</h1>
        <Login />
      </main>
    </div>
  );
}

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>Error fetching user: {error.message}</p>;
  
  return (
    <div>
      <main>
        <h1>
          Home (logged in)
          <Profile />
        </h1>
      </main>
    </div>
  );
};

export default Home;
