const AUTH_URL = 'https://accounts.spotify.com/authorize';
const ACCESS_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const REDIRECT_URI = 'http://localhost:3000';
const API_URL = 'https://api.spotify.com/v1';
const SCOPE = 'playlist-modify-public';
const RESPONSE_TYPE = 'token';

let accessToken;
let userId;


const Spotify = {
    getAuth() {
        const tokenURL = `${AUTH_URL}?client_id=${process.env.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        window.location = tokenURL;
    },

    checkAuth() {
        const authenticated = window.location.href.match(/access_token=([^&]*)/);
        if (authenticated) {
            accessToken = authenticated[1];
            return true;
        } else {
            return false;
        }
    },

    getUserName() {
        if(!accessToken) {
            return Promise.reject(new Error('No access token'));
        }
        const nameEndpoint = 'https://api.spotify.com/v1/me';
        return fetch(nameEndpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            }else{
                throw new Error(`Fail to fetch user data because of ${res.statusText}`);
            }
        })
        .then((data) => {
            const userName = data.display_name;
            userId = data.id;
            return userName;
        })
    },

    searchTracks(searchInput) {
        const searchEndpoint =`https://api.spotify.com/v1/search?q=${searchInput}&type=track`;
        return fetch(searchEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        .then((res) => res.json())
        .then((data) => {
            const tracksResults = data.tracks.items.map((track) => ({
                id: track.id,
                artist: track.artists[0].name,
                uri: track.uri,
                album: track.album.name,
                image: track.album.images[0].url,
                name: track.name
            }))
            return tracksResults;
        })
    },

    createPlaylist(listName, urisArray) {
        const createListEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
        
        const playlistData = {
            'name': listName,
        }

         return fetch(createListEndpoint, {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistData)
        })
        .then((res) => {
            if (res.status === 201) {
                return res.json();
            } else {
                throw new Error('Failed to create playlist');
            }
        })
        .then((data) => {
            const playListId = data.id;
            const tracksToAdd = {
                'uris': urisArray,
            }
   
            const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
            return fetch(addTracksEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tracksToAdd),
            })
        })
        .then((res) => res.json())
        .then((result) => {
            if(result){
                return true;
            }else{
                return false;
            }
        })
    }
}

export default Spotify;