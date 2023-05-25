import React from 'react';
import styles from './Snippets.module.scss';
import sort_icon from '../../assets/images/settings_icon.png';
import search_icon from '../../assets/images/search_icon.png';
import snippetsJson from '../../assets/snippets.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Snippets = () => {
  // states
  const [seeTagsWindow, setSeeTagsWindow] = useState(false);
  const [search, setSearch] = useState(''); // live searching
  const [fileredSnippets, setFilteredSnippets] = useState(snippetsJson); // thats what we render like everytime
  // preparing all tags which exist for tags-list-window
  const tagsForTagsWindow = [];
  snippetsJson.map((snippet) => {
    snippet.tags.map((tag) => {
      if (!tagsForTagsWindow.includes(tag)) {
        tagsForTagsWindow.push(tag);
      }
    });
  });

  console.log(tagsForTagsWindow);
  //* Work with redux-toolkit
  const handleEdit = (index, title, description, snippet, tags, typeOfWork) => {
    console.log(index, title, description, snippet, tags, typeOfWork);
  };

  // dynamic searching by title and tags
  const handleSearch = (value, tags) => {
    // searching by value
    if (value) {
      setSearch(value);
      console.log(value);
      const newArray = snippetsJson.filter((e) => {
        return e.title.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredSnippets(newArray);
    }
    // searching by tags
    if (tags) {
    }
  };

  return (
    <div className={styles.snippets_wrapper}>
      <div className={styles.flex}>
        <img
          onClick={setSeeTagsWindow(!seeTagsWindow)} // its make error 'Too many re-renders. React limits the number of renders to prevent an infinite loop.'
          className={styles.icon50x50}
          src={sort_icon}
        />
        <img className={styles.icon50x50} src={search_icon} />
      </div>
      <div className={styles.tags_window}>s</div> //! finish it
      <form>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by title.."
          type="text"
        />
        <Link to="/edit">
          <button className="dark_gray_button">New Snippet</button>
        </Link>
      </form>
      <div className={styles.rendering_div}>
        {fileredSnippets.map((e, i) => {
          return (
            <div
              className={styles.rendered_item}
              key={i}
              onClick={() => handleEdit(i, e.title, e.description, e.snippet, e.tags)}>
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
