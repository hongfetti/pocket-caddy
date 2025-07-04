import "./modal.css"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLUB } from "../../utils/mutations";

type DropdownKey = "clubType";
type AddClubProps = {
  onClose: () => void;
};

const clubOptions = [
  { label: "Driver", value: "DRIVER" },
  { label: "3 Wood", value: "THREE_WOOD" },
  { label: "5 Wood", value: "FIVE_WOOD" },
  { label: "7 Wood", value: "SEVEN_WOOD" },
  { label: "3 Hybrid", value: "THREE_HYBRID" },
  { label: "4 Hybrid", value: "FOUR_HYBRID" },
  { label: "5 Hybrid", value: "FIVE_HYBRID" },
  { label: "6 Hybrid", value: "SIX_HYBRID" },
  { label: "7 Hybrid", value: "SEVEN_HYBRID" },
  { label: "2 Iron", value: "TWO_IRON" },
  { label: "3 Iron", value: "THREE_IRON" },
  { label: "4 Iron", value: "FOUR_IRON" },
  { label: "5 Iron", value: "FIVE_IRON" },
  { label: "6 Iron", value: "SIX_IRON" },
  { label: "7 Iron", value: "SEVEN_IRON" },
  { label: "8 Iron", value: "EIGHT_IRON" },
  { label: "9 Iron", value: "NINE_IRON" },
  { label: "Pitching Wedge", value: "PITCHINGWEDGE" },
  { label: "64", value: "SIXTYFOUR" },
  { label: "62", value: "SIXTYTWO" },
  { label: "60", value: "SIXTY" },
  { label: "58", value: "FIFTYEIGHT" },
  { label: "56", value: "FIFTYSIX" },
  { label: "54", value: "FIFTYFOUR" },
  { label: "52", value: "FIFTYTWO" },
  { label: "50", value: "FIFTY" },
  { label: "48", value: "FORTYEIGHT" },
  { label: "Putter", value: "PUTTER" },
];

const AddClub = ({ onClose }: AddClubProps) => {
  const [formState, setFormState] = useState({
    distance: "",
  });

  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    Record<DropdownKey, string>
  >({
    clubType: "Club type",
  });

  const [addClub, { loading, error }] = useMutation(ADD_CLUB);

  const toggleDropdown = (dropdownName: DropdownKey) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleSelect = (dropdownName: DropdownKey, item: string) => {
    setSelectedItems((prev) => ({ ...prev, [dropdownName]: item }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addClub({
        variables: {
          input: {
            clubType: selectedItems.clubType,
            distance: Number(formState.distance),
          },
        },
      });

      alert("Item Added");
      console.log("Mutation Success:", data);
      window.location.reload();
    } catch (error) {
      console.error("Mutation Error:", error);
    }
  };

  return (
    <main className="modal-overlay">
      <div className="modal-content">
        <h1>Add A Club To Your Bag</h1>
        <form>
          <div className="dropdown btn-group w-50 text-center">
            <button
              className="btn dropdown-toggle w-100 py-2"
              type="button"
              onClick={() => toggleDropdown("clubType")}
              aria-expanded={openDropdown === "clubType"}
            >
              {clubOptions.find(
                (option) => option.value === selectedItems.clubType
              )?.label || "Club Type"}
            </button>
            {openDropdown === "clubType" && (
              <ul className="dropdown-menu show w-100 text-center">
                {clubOptions.map(({ label, value }) => (
                  <li
                    key={value}
                    className="dropdown-item"
                    onClick={() => handleSelect("clubType", value)}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            className="add-club-form"
            placeholder="Add distance"
            name="Distance"
            type="number"
            value={formState.distance}
            onChange={(e) =>
              setFormState({ ...formState, distance: e.target.value })
            }
          />
          <button
            type="button"
            className="btn uniform-button"
            onClick={handleSubmit}
            disabled={loading || !!error}
          >
            {loading ? "Adding..." : "Add to Bag"}
          </button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </main>
  );
};

export default AddClub;
