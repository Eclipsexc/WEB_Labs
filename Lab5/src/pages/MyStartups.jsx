import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../data/firebase";
import { Link } from "react-router-dom";
import "../styles/my_startups.css";

function MyStartups() {
  const [startups, setStartups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStartups = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/startup/${user.uid}`);
        const data = await res.json();
        setStartups(data || []);
      } catch {
        setStartups([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStartups();
  }, []);

  const closeModal = () => setSelected(null);

  const renderModal = () => {
    if (!selected) return null;
    const address = `${selected.country || "-"}, ${selected.city || "-"}, ${selected.street || "-"}, ${selected.building || "-"}`;

    return (
      <div className="modal" style={{ display: "flex" }} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={closeModal}>×</span>
          <h2>Детальний опис:</h2>
          <div className="modal-grid">
            <div className="modal-left">
              <p><strong>Назва:</strong> {selected.name}</p>
              <p><strong>Сфера:</strong> {selected.sector}</p>
              <p><strong>Капітал:</strong> ${selected.capital}</p>
              <p><strong>Тип:</strong> {selected.type}</p>
              <p><strong>Адреса:</strong> {address}</p>
            </div>
            <div className="modal-right">
              <p><strong>Працівників:</strong> {selected.employees}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Завантаження стартапів...</div>;

  return (
    <div className="market-container">
      <div className="competitors-grid-wrapper">
        <h1 className="non-clickable">Мої стартапи</h1>
        <div className="competitors-grid">
          {startups.length === 0 ? (
            <div className="competitor-card empty-info">
              <p style={{ fontWeight: "bold", fontSize: "17px" }}>Поки не створено жодного стартапу</p>
              <p style={{ color: "#444" }}>Ви можете це виправити →</p>
            </div>
          ) : (
            startups.map((startup, index) => (
              <div className="competitor-card" key={index}>
                <img src={startup.image} alt={startup.name} />
                <div className="competitor-info">
                  <p><strong>Компанія:</strong> {startup.name}</p>
                  <p><strong>Сфера:</strong> {startup.sector}</p>
                </div>
                <div className="card-buttons">
                  <button className="learn-more-btn" onClick={() => setSelected(startup)}>
                    Дізнатись більше
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit_startup?id=${startup.id}`)}
                    title="Редагувати"
                  >
                    <img src="/assets/icons/edit.png" alt="edit" />
                  </button>
                </div>
              </div>
            ))
          )}
          <Link to="/create_startup" className="competitor-card add-card">
            <span>+</span>
          </Link>
        </div>
      </div>
      {renderModal()}
    </div>
  );
}

export default MyStartups;
