import React from 'react';
import './searchResults.css';
import TrackList from '../tracklist/TrackList';

const SearchResults = ({trackList, onAdd}) => {

    return (
        <>
        <div className="SearchResults">
            <h2 className='searchTitle'>Search Results</h2>
            {(trackList.length >0) ? 
            (<TrackList 
                trackList= {trackList}
                onClick= {onAdd}
                trackBtnAction='+'
                inPlayList={false}
            /> ) 
            : <h3 className='nth-to-show'>Nothing to show here. Try let me know what you are looking for</h3>}
        </div>
        </>
    )
}

export default SearchResults;