import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/profile.css';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        const data = response.data.foodPartner;
        setProfile(data);
        setVideos(data.foodItems || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.25rem' }}>
        Loading profile...
      </p>
    );
  }

  if (!profile) {
    return (
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.25rem', color: 'red' }}>
        Profile not found.
      </p>
    );
  }

  return (
    <main className="profile-page">
      {/* Header */}
      <section className="profile-header">
        <div className="profile-meta">
          <img
            className="profile-avatar"
            src={profile.avatar || 'https://via.placeholder.com/120'}
            alt={profile.name}
          />
          <div className="profile-info">
            <h1 className="profile-pill profile-business">{profile.name}</h1>
            <p className="profile-pill profile-address">{profile.address}</p>
          </div>
        </div>

        <div className="profile-stats" role="list" aria-label="Stats">
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">Total Meals</span>
            <span className="profile-stat-value">{profile.totalMeals}</span>
          </div>
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">Customers Served</span>
            <span className="profile-stat-value">{profile.customersServed}</span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      {/* Video Grid */}
      <section className="profile-grid" aria-label="Food Reels">
        {videos.length > 0 ? (
          videos.map((v) => (
            <div key={v.id} className="profile-grid-item video-container">
              <video
                src={v.video || 'https://via.placeholder.com/400x700?text=No+Video'}
                muted
                controls
              />
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.25rem', marginTop: '2rem' }}>
            No food reels uploaded yet.
          </p>
        )}
      </section>
    </main>
  );
};

export default Profile;
