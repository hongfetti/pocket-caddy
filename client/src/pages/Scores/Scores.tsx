import "./Scores.css"
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries.ts";

const Scores = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  const currentUser = data?.currentUser;
  console.log(currentUser);

    return(
    <main>
      <h1>Scores</h1>

      {currentUser?.scores?.length ? (
        <ul className="scores-list">
          {currentUser.scores.map((round: any) => (
            <li key={round._id} className="round-item">
              <strong>{round.courseName} - Par: </strong>
              {round.par}
              <br />
              <strong>Total Score: </strong>{round.totalScore}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not added any rounds yet.</p>
      )}
    </main>
  );
}

export default Scores