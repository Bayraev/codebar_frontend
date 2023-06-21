import React, { useEffect, useState } from 'react';

import './SnippetCRUD.scss';
import styles from './SnippetCRUD.module.scss';
import CodemirrorField from '../CodemirrorField';
import SnippetDescriptionField from './SnippetDescriptionField';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SnippetCRUD = () => {
  const { id } = useParams(); // if we have it we got it

  const [snippet, setSnippet] = useState('\n\n\n\n\n\n\n\n');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const snippets = useSelector((state) => state.snippets.snippets); // array

  useEffect(() => {
    if (snippets) {
      const selectedSnippet = snippets.find((snippet) => snippet.uniqId === id);
      const { snippet, title, description, tags, hidden } = selectedSnippet;
      setSnippet(snippet);
      setTitle(title);
      setDescription(description);
      setTags(tags);
    }
  }, []);

  const handleSubmit = (data) => {
    if (id) {
      // Обновление существующего сниппета
      // dispatch(updateSnippet({ id, data }));
    } else {
      // Создание нового сниппета
      // dispatch(createSnippet(data));
    }
  };

  const options = {
    mode: 'jsx',
    theme: 'material',
    lineNumbers: true,
  };

  return (
    <div id="SnippetWrapper">
      <form action="submit" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Large language model" className="input" />
        <button className="dark_gray_button">Add Tag</button>
      </form>
      <div className={styles.tags}>
        {tags.map((tag) => {
          return <div className={styles.tag}>{tag}</div>;
        })}
      </div>
      <div className={styles.update_or_delete}>
        <Link to="/">
          <button className="dark_gray_button">Confirm</button>
          <button className={styles.delete_button}>Delete</button>
        </Link>
      </div>

      <SnippetDescriptionField
        styles={styles}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />

      <CodemirrorField options={options} snippet={snippet} setSnippet={setSnippet} />
    </div>
  );
};

export default SnippetCRUD;
