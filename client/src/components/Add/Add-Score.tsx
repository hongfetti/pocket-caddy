import "./modal.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SCORE } from "../../utils/mutations";

type AddScoreProps = {
  onClose: () => void;
};

const AddScore = ({ onClose }: AddScoreProps) => {
  const [formState, setFormState] = useState({
    courseName: "",
    par: "",
    totalScore: "",
  });

  const [addScore, { loading, error }] = useMutation(ADD_SCORE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addScore({
        variables: {
          input: {
            courseName: String(formState.courseName),
            par: Number(formState.par),
            totalScore: Number(formState.totalScore),
          },
        },
      });

      alert("New Score Added");
      console.log("Mutation Success:", data);
      window.location.reload();
    } catch (error) {
      console.error("Mutation Error:", error);
    }
  };

  return (
    <main className="modal-overlay">
      <div className="modal-content">
        <form>
          <input
            className="add-score-form"
            placeholder="Course Name"
            name="Course Name"
            type="string"
            value={formState.courseName}
            onChange={(e) =>
              setFormState({ ...formState, courseName: e.target.value })
            }
          />
          <input
            className="add-score-form"
            placeholder="Par"
            name="Par"
            type="number"
            value={formState.par}
            onChange={(e) =>
              setFormState({ ...formState, par: e.target.value })
            }
          />
          <input
            className="add-score-form"
            placeholder="Total Score"
            name="Total Score"
            type="numberg"
            value={formState.totalScore}
            onChange={(e) =>
              setFormState({ ...formState, totalScore: e.target.value })
            }
          />
          <button
            type="button"
            className="btn uniform-button"
            onClick={handleSubmit}
            disabled={loading || !!error}
          >
            {loading ? "Adding..." : "Add to Scores"}
          </button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </main>
  );
};

export default AddScore