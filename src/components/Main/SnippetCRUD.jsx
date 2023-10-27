import React, { useEffect, useState } from 'react';
import { generateRandomString } from '../../assets/functions';
import './SnippetCRUD.scss';
import styles from './SnippetCRUD.module.scss';
import CodemirrorField from '../CodemirrorField';
import SnippetDescriptionField from './SnippetDescriptionField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncNewSnippet,
  createSnippet,
  deleteSnippet,
  updateSnippet,
} from '../../app/features/snippetsSlice';

const SnippetCRUD = () => {
  const { id } = useParams(); // It is id of snippet
  const userId = useSelector((state) => state.authorization.user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [hidden, setHidden] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [validation, setValidation] = useState(false); // Fill in required fields!

  // useSelectors
  const snippets = useSelector((state) => state.snippets.snippets); // array of snippets

  // getting data from store about snippet.uniqIdнннн
  useEffect(() => {
    if (id) {
      // when we click on snippet in the interface, as you can see above we
      // also put its id in parameters (link), then we get it in "id" variable.
      // so now we compare it with snippets in db with the same id (its title in db is uniqId)
      const selectedSnippet = snippets.find((snippet) => snippet.uniqId === id);
      const { snippet, title, description, tags, hidden } = selectedSnippet;
      setSnippet(snippet);
      setTitle(title);
      setDescription(description);
      setTags(tags);
    }
  }, []);

  // For CRUDs
  const handleEnterTag = (e) => {
    e.preventDefault();

    if (tag) {
      const arr = tags.map((tag) => tag);
      const trimmedTag = tag.trim();
      const cleanedTag = trimmedTag.replace(/\s+/g, ' ');
      arr.push(cleanedTag);
      if (!tags.includes(cleanedTag)) {
        setTags(arr);
      }
      setTag('');
    }
  };
  // owjd238hdhn298dn2i39ubfn3
  const handleConfirm = () => {
    // validation
    if (!title || !snippet) {
      setValidation(true);
      setTimeout(() => {
        setValidation(false);
      }, 3500);
      return;
    }

    if (id) {
      // RUD
      const arr = {
        uniqId: id,
        ownerId: userId,
        title,
        snippet,
        description,
        hidden,
        tags,
        image: [],
      };
      dispatch(updateSnippet(arr));
      navigate('/');
    } else {
      // CRUD
      const newId = generateRandomString(20, title);
      const arr = {
        uniqId: newId,
        ownerId: userId,
        title,
        snippet,
        description,
        hidden,
        tags,
        image: [],
      };
      dispatch(createSnippet(arr));
      dispatch(asyncNewSnippet(arr));
      navigate('/');
    }
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deleteSnippet(id));
      navigate('/snippets');
    } else {
      navigate('/snippets');
    }
  };

  return (
    <div id="SnippetWrapper">
      <form action="submit" onSubmit={(e) => handleEnterTag(e)}>
        <input
          type="text"
          placeholder="Large language model"
          className="input"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button className="dark_gray_button">Add Tag</button>
      </form>

      <div className={styles.tags}>
        {tags.map((tag) => {
          return <div className={styles.tag}>{tag}</div>;
        })}
      </div>
      <div className={styles.update_or_delete}>
        <button className="dark_gray_button" onClick={() => handleConfirm()}>
          Confirm
        </button>
        <button className={styles.delete_button} onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
      {validation && <span className="error_report"> Fill in all placeholders pls!</span>}

      <SnippetDescriptionField
        styles={styles}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />

      <CodemirrorField snippet={snippet} setSnippet={setSnippet} />
    </div>
  );
};

export default SnippetCRUD;
