import "./Bag.css";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries.ts";

const Bag = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  const currentUser = data?.currentUser;
  console.log(currentUser);

  return (
    <main>
      <h1>Bag</h1>

      {currentUser?.bag?.length ? (
        <ul className="club-list">
          {currentUser.bag.map((club: any) => (
            <li key={club._id} className="club-item">
              <strong>{club.clubType.replaceAll("_", " ")}</strong> —{" "}
              {club.distance} yds
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not added any clubs yet.</p>
      )}
    </main>
  );
};

export default Bag;
