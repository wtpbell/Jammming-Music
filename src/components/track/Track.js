import React from 'react';
import './track.css';

const Track = ({track, albumImg, artistName, albumName, songName, onClick, trackBtnAction}) => {

    const handleAdd = (e) => {
        onClick(track);
    }
    return(
        <>
        <div className="Track">
            <div className="track-container">
                <img className="track-image" src={albumImg} alt={songName}/>
                <div className="track-info">
                    <h3 className="track-name">{songName}</h3>
                    <p className="track-artist">{artistName} | {albumName}</p>
                </div>
                <button className="add-button" onClick={handleAdd}>{trackBtnAction}</button>
            </div>
        </div>
        </>
    )
}

export default Track;