import React from 'react';
import './searchBar.css';


const SearchBar = ({ input, submission, onChange }) => {
    const handleSubmit = () => {
        submission(input);
    }

    const handleInput = (e) => {
        onChange(e);
    }

return (
    <>
        <div className="search-bar">
            <form className='searchBar-container' name={input} onSubmit={handleSubmit}>
                <i className="search-icon fa fa-search"/>   
                <input className='searchInput' onChange={handleInput} value={input} placeholder='Search by artist or song' />
                <input className='searchBtn' type='submit' value='Search' />
            </form>
        </div>
    </>
)

}

export default SearchBar;