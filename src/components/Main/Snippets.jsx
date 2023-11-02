import React from 'react';
import styles from './Snippets.module.scss';
// import sort_icon from '../../assets/images/settings_icon.png';
// import search_icon from '../../assets/images/search_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const Snippets = () => {
  const navigate = useNavigate();
  const { snippets } = useSelector((state) => state.snippets); //* async snippets fetching in Main.jsx

  // states
  const [_, setSearch] = useState(''); // live searching..
  console.log(_); //  ..and then using '_' for EsLint
  const [filteredSnippets, setFilteredSnippets] = useState(snippets); // thats what we render like everytime
  // preparing all tags which exist for tags-list-window

  // functions
  // This function clears searchbar and updated array of filtererd snippets (Which is rendering all time)
  useEffect(() => {
    setFilteredSnippets(snippets);
    setSearch('');
  }, [snippets]);

  //* Work with redux-toolkit
  const handleEdit = (uniqId) => {
    navigate(`/snippet/${uniqId}`);
  };

  // dynamic searching by title and tags
  const handleSearch = (value) => {
    setSearch(value);

    const newArray = snippets.filter((e) => {
      const lowerCaseValue = value.toLowerCase();
      return (
        e.title.toLowerCase().includes(lowerCaseValue) ||
        e.tags.some((tag) => tag.toLowerCase().includes(lowerCaseValue))
      );
    });

    setFilteredSnippets(newArray);
  };

  return (
    <div className={styles.snippets_wrapper}>
      <form>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by title.."
          type="text"
        />
        <Link to="/snippet/new">
          <button className="dark_gray_button">New Snippet</button>
        </Link>
      </form>

      <div className={styles.rendering_div}>
        {filteredSnippets.map((e, i) => {
          return (
            <div className={styles.rendered_item} key={i} onClick={() => handleEdit(e._id)}>
              <div className={styles.description}>
                <h3>{e.title}</h3>
                <span>{e.description}</span>
              </div>
              <div className={styles.tags_and_codepopup}>
                <span>{e.tags.map((e) => e + ' ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Snippets;
