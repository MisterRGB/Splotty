const BASE_URL = 'https://api.spotify.com/v1';

export const getUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const getTopTracks = async (token, timeRange = 'medium_term', limit = 10) => {
  const response = await fetch(`${BASE_URL}/me/top/tracks?time_range=${timeRange}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const getTopArtists = async (token, timeRange = 'medium_term', limit = 10) => {
  const response = await fetch(`${BASE_URL}/me/top/artists?time_range=${timeRange}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const getRecentlyPlayed = async (token, limit = 10) => {
  const response = await fetch(`${BASE_URL}/me/player/recently-played?limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};