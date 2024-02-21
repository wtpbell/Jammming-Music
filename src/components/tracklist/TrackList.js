import React from 'react';
import Track from '../track/Track';

const TrackList = ({ trackList, onClick, trackBtnAction, inPlayList}) => {
  return (
    <div className='TrackList'>
      {trackList.map((track) => 
        <Track 
        key={track.id} 
        track={track}
        albumImg={track.image} 
        artistName={track.artist} 
        albumName={track.album} 
        songName={track.name}
        onClick={onClick} 
        trackBtnAction={trackBtnAction}
        inPlayList={inPlayList} 
        />
      )}
    </div>
  )
}

export default TrackList
