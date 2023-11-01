import React from 'react';
import styles from './Snippets.module.scss';
import sort_icon from '../../assets/images/settings_icon.png';
import search_icon from '../../assets/images/search_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetSnippets } from '../../app/features/snippetsSlice';
const Snippets = ({ userId }) => {
  const dispatch = useDispatch();

  const { snippets } = useSelector((state) => state.snippets); //* async snippets fetching in Main.jsx

  // states
  const [selectedTags, setSelectedTags] = useState([]);
  const [seeTagsWindow, setSeeTagsWindow] = useState(false); // tags window ui
  const [_, setSearch] = useState(''); // live searching
  const [filteredSnippets, setFilteredSnippets] = useState(snippets); // thats what we render like everytime
  // preparing all tags which exist for tags-list-window
  const tagsForTagsWindow = [];

  const navigate = useNavigate();

  // functions
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
      return e.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredSnippets(newArray);
  };

  // useEffect for avent capturing, to register click outside 'tags_window', using useRef
  const refTagsWindow = useRef(null);
  // useEffect for avent capturing, to register click outside 'tags_window', using useRef
  useEffect(() => {
    // This function handles the outside click event.
    const handleOutsideClick = (event) => {
      // Check if the refTagsWindow is defined and if the clicked element is not inside the refTagsWindow.
      if (refTagsWindow.current && !refTagsWindow.current.contains(event.target)) {
        // If the conditions are met, we set the seeTagsWindow state to false to close the tags window.
        setSeeTagsWindow(false);
      }
    };

    // When seeTagsWindow is true, we add the event listener for mousedown on the document.
    if (seeTagsWindow) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // The return statement in useEffect is used for cleanup.
    // It removes the event listener when the component is unmounted or when the seeTagsWindow value changes.
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [seeTagsWindow]);

  // Filter by tags.
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    // Фильтрация объектов на основе выбранных тегов
    const filteredStates = filteredSnippets.filter((snippet) =>
      selectedTags.every((selectedTag) => snippet.tags.includes(selectedTag)),
    );
    setFilteredSnippets(filteredStates);
  };

  return (
    <div className={styles.snippets_wrapper}>
      <div className={styles.flex}>
        <img onClick={() => setSeeTagsWindow(true)} className={styles.icon50x50} src={sort_icon} />
        <img className={styles.icon50x50} src={search_icon} />
      </div>

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

      {seeTagsWindow && (
        <div ref={refTagsWindow} className={styles.tags_window}>
          <span>Tags:</span>
          <div className={styles.tags_list}>
            {tagsForTagsWindow.map((tag) => (
              <span
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={selectedTags.includes(tag) ? styles.selected_tag : ''}>
                {tag},{'  '}
              </span>
            ))}
          </div>
        </div>
      )}

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
