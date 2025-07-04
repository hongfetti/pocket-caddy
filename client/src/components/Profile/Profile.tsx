import "./Profile.css";
import AddClub from "../Add/Add-Club.tsx";

import {  useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries.ts";

type Score = {
    _id: string;
    courseName: string;
    par: number;
    totalScore: number
}

const Profile = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  const currentUser = data?.currentUser;
  console.log(currentUser);

  const scores = currentUser?.scores;

  const bestScore = scores?.length
    ? scores.reduce((best: Score, current: Score) => {
        const currentDiff = current.totalScore - current.par;
        const bestDiff = best.totalScore - best.par;

        return currentDiff < bestDiff ? current : best;
    }, scores[0])
    : null

  return (
    <main>
      
      <h2>Welcome, {currentUser.name}</h2>
      
      <div className="card" id="main-card">
        <div id="btn-container">
          <button 
            id="add-club-btn"
            onClick={() => setShowAddModal(true)}
          >
            Add Club
          </button>
          
        </div>
        {showAddModal && (
            <AddClub onClose={() => setShowAddModal(false)}/>
          )}
        {bestScore ? (
          <div id="best-score">
            <p><strong>Best Score:</strong> {bestScore.totalScore}</p>
            <p><strong>Course:</strong> {bestScore.courseName}</p>
            <p><strong>Score vs Par:</strong> {bestScore.totalScore - bestScore.par > 0
              ? `+${bestScore.totalScore - bestScore.par}`
              : bestScore.totalScore - bestScore.par}</p>
          </div>
        ) : (
          <p>No scores yet</p>
        )}
      </div>
    </main>
  );
};

export default Profile;
