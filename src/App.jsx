import { useState, useEffect } from 'react';
import './App.css';
import { getUserProfile, getTopTracks, getTopArtists, getRecentlyPlayed } from './spotifyAPI';

const SPOTIFY_CLIENT_ID = 'bd96946fb9404e2f832ad9e12cc0096c';
const REDIRECT_URI = 'https://misterrgb.github.io/spottystats/';
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played'
].join('%20');

export default function App() {
  const [token, setToken] = useState('');
  const [userStats, setUserStats] = useState(null);
  const [timeRange, setTimeRange] = useState('medium_term');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const getStats = async () => {
    try {
      const [profile, topTracks, topArtists, recentlyPlayed] = await Promise.all([
        getUserProfile(token),
        getTopTracks(token, timeRange),
        getTopArtists(token, timeRange),
        getRecentlyPlayed(token)
      ]);
      
      setUserStats({
        profile,
        topTracks: topTracks.items,
        topArtists: topArtists.items,
        recentlyPlayed: recentlyPlayed.items
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SpottyStats</h1>
        {!token ? (
          <a 
            href={`${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
            className="login-btn"
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <button onClick={logout} className="logout-btn">Logout</button>
            <div className="time-range-selector">
              <button onClick={getStats} className="stats-btn">Get My Stats</button>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="range-select"
              >
                <option value="short_term">Last 4 Weeks</option>
                <option value="medium_term">Last 6 Months</option>
                <option value="long_term">All Time</option>
              </select>
            </div>
            {userStats && (
              <div className="stats-container">
                <h2>{userStats.profile.display_name}'s Stats</h2>
                <div className="stats-section">
                  <h3>Top Tracks</h3>
                  <ul>
                    {userStats.topTracks.map(track => (
                      <li key={track.id}>{track.name} by {track.artists.map(a => a.name).join(', ')}</li>
                    ))}
                  </ul>
                </div>
                <div className="stats-section">
                  <h3>Top Artists</h3>
                  <ul>
                    {userStats.topArtists.map(artist => (
                      <li key={artist.id}>{artist.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="stats-section">
                  <h3>Recently Played</h3>
                  <ul>
                    {userStats.recentlyPlayed.map(item => (
                      <li key={item.track.id}>{item.track.name} by {item.track.artists.map(a => a.name).join(', ')}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}