import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/my_profile.css";

function MyProfile() {
  const navigate = useNavigate();

  return (
    <main className="main-container">
      <div className="profile-box">
        <img
          src="/assets/icons/Default_user.jpg"
          alt="Фото користувача"
          className="profile-photo"
        />
        <h2>
          Добрий день, <strong>*Користувач*!</strong>
        </h2>

        <button
          className="startup-link"
          onClick={() => navigate("/my_startups")}
        >
          ● Переглянути мої стартапи
        </button>
      </div>
    </main>
  );
}

export default MyProfile;
