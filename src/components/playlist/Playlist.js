import React from "react";
import Tracklist from "../tracklist/TrackList";
import "./playlist.css";

const Playlist = ({
  listName,
  playListTracks,
  onChangeListName,
  onRemove,
  savePlaylist,
}) => {
  const changeListName = (e) => {
    onChangeListName(e.target.value);
  };

  return (
    <>
      <div className="playlist">
        <h2>Your Playlist</h2>
        <div className="playlistNameBox">
          <i className="music-icon fa fa-headphones" />
          <input
            onChange={changeListName}
            value={listName}
            placeholder="Name your playlist..."
          />
          <div className="saveBtnBox">
            <button className="saveBtn" onClick={savePlaylist}>
              Save Playlist
            </button>
          </div>
        </div>
        <Tracklist
          trackList={playListTracks}
          onClick={onRemove}
          trackBtnAction="-"
          inPlayList={true}
        />
      </div>
    </>
  );
};

export default Playlist;
