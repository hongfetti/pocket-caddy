import "./Profile.css"
import auth from "../../utils/auth.ts";

const Profile = () => {
    const profile = auth.getProfile();
    const currentUser = profile?.data

    console.log(currentUser)

    return currentUser ? (
        <div>
            <h2>Welcome, {currentUser.name}</h2>
            <div className="card">
                <div>Card Content</div>
            </div>
        </div>
    ) : (
        <div></div> // have to add conditional as getting ts error for currentUser possible null
    )
};

export default Profile
