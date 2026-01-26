import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/Profile.css";
import CountUp from "react-countup";

import { Avatar, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/auth/me").then((res) => setUser(res.data));
    api.get("/videos").then((res) => setVideos(res.data));
  }, []);

  if (!user) return null;

  const memberSince = new Date(user.createdAt);
  const yearsPassed =
    new Date().getFullYear() - memberSince.getFullYear();

  const moodCounts = videos.reduce((acc, v) => {
    acc[v.mood] = (acc[v.mood] || 0) + 1;
    return acc;
  }, {});

  const dominantMood = Object.keys(moodCounts).sort(
    (a, b) => moodCounts[b] - moodCounts[a],
  )[0];

  return (
    <div className={`profile-page mood-${dominantMood || "neutral"}`}>
      {/* HERO */}
      <div className="profile-hero">
        <Link to="/browse" className="back-btn">
          <i className="fa-solid fa-chevron-left"></i> Back
        </Link>

        <div className="profile-hero-content">
          <div className="profile-header">
            <Avatar className="profile-avatar">
              {user.name[0]}
            </Avatar>

            <div className="profile-info">
              <Typography variant="h4" className="profile-name">
                {user.name}
              </Typography>
              <div className="profile-subtitle">
                Your personal video diary
              </div>
            </div>
          </div>

          {/* STATS */}
          <Grid container spacing={2} className="profile-stats">
            <Grid item>
              <div className="stat-card">
                <div className="stat-value">
                  <CountUp end={videos.length} duration={1.2} />
                </div>
                <div className="stat-label">VIDEOS</div>
              </div>
            </Grid>

            <Grid item>
              <div className="stat-card">
                <div className="stat-value">{yearsPassed}</div>
                <div className="stat-label">YEARS</div>
              </div>
            </Grid>
          </Grid>

          {/* ACTIONS */}
          <div className="profile-actions">
            <Link to="/create">
              <button className="btn btn-outline-danger">
                Upload New Memory
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="profile-footer">
        Member since {memberSince.toLocaleDateString()} · Preserving memories
        for {yearsPassed} {yearsPassed === 1 ? "year" : "years"}
      </div>
    </div>
  );
};

export default Profile;
