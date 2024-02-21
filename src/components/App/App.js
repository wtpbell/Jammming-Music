import React, { useState, useEffect } from "react";
import "./App.css";
import SearchResults from "../search_results/SearchResults";
import SearchBar from "../search_bar/SearchBar";
import PlayList from "../playlist/Playlist";
import Spotify from "../../utilities/Spotify";

function App() {
  const [keyword, setKeyword] = useState("");
  const [userName, setUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [listName, setListName] = useState("");
  const [playListTracks, setPlayListTracks] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const authenticated = Spotify.checkAuth();
    if (authenticated) {
      Spotify.getUserName()
        .then((fetchName) => {
          setUserName(fetchName);
          setLogged(authenticated);
        })
        .catch((err) => {
          console.error("Error fetching user name: ", err);
        });
    } else {
      console.log("Login failed");
    }
  }, []);

  const loginHandler = () => {
    Spotify.getAuth();
  };

  const handleKeywords = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (input) => {
    Spotify.searchTracks(input)
      .then((tracksArray) => {
        setSearchResults(tracksArray);
      })
      .catch((err) => {
        console.error("Error fetching search results: ", err);
      });
  };

  const handleAddSong = (track) => {
    if (playListTracks.some((savedTrack) => savedTrack.id === track.id)) return;

    setPlayListTracks((prev) => [...prev, track]);
  };

  const handleRemoveSong = (track) => {
    setPlayListTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  };

  const changeListName = (name) => {
    setListName(name);
  };

  const handleSavePlaylist = () => {
    if (playListTracks.length === 0) {
      return;
    }
    const urisArray = playListTracks.map((track) => track.uri);
    Spotify.createPlaylist(listName, urisArray)
      .then((res) => {
        if (res) {
          alert("Playlist saved successfully :)");
          setPlayListTracks([]);
          setListName("");
        }
      })
      .catch((error) => {
        console.error("Error saving playlist:", error);
      });
  };

  if (!logged) {
    return (
      <main className="appContainer">
        <section className="loginHeader">
          <h1 className="appName">
            Ja<em>mmm</em>ing
          </h1>
          <p className="loginTitle">Playlist Maker</p>
          <button className="loginBtn" onClick={loginHandler}>
            Login with Spotify
          </button>
        </section>
        <footer>
          <p>Thanks for clicking playing around!</p>
        </footer>
      </main>
    );
  } else {
    return (
      <>
        <header>
          <h1>
            Ja<em>mmm</em>ing
          </h1>
        </header>
        <main className="loginPage">
          <section className="searchContainer">
            <h2 className="sayHello">Hello {userName} 👋🏽</h2>
            <p className="question">Ready to put your playlist together?</p>
            <SearchBar
              className="searchBar"
              input={keyword}
              onChange={handleKeywords}
              submission={handleSearch}
            />
            <SearchResults
              className="searchResults"
              trackList={searchResults}
              onAdd={handleAddSong}
            />
          </section>
          <aside className="playlistContainer">
            <PlayList
              onChangeListName={changeListName}
              playListTracks={playListTracks}
              listName={listName}
              onRemove={handleRemoveSong}
              savePlaylist={handleSavePlaylist}
            />
          </aside>
        </main>
      </>
    );
  }
}

export default App;
