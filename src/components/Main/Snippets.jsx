import React from 'react';
import styles from './Snippets.module.scss';
import sort_icon from '../../assets/images/settings_icon.png';
import search_icon from '../../assets/images/search_icon.png';
import snippetsJson from '../../assets/snippets.json';
import { Link } from 'react-router-dom';

const Snippets = () => {
  //* Work with redux-toolkit
  const handleEdit = (index, title, description, snippet, tags, typeOfWork) => {
    console.log(index, title, description, snippet, tags, typeOfWork);
  };

  return (
    <div className={styles.snippets_wrapper}>
      <div className={styles.flex}>
        <img className={styles.icon50x50} src={sort_icon} />
        <img className={styles.icon50x50} src={search_icon} />
      </div>
      <form>
        <input placeholder="Search by title.." type="text" />
        <Link to="/edit">
          <button className="dark_gray_button">New Snippet</button>
        </Link>
      </form>

      <div className={styles.rendering_div}>
        {snippetsJson.map((e, i) => {
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
                <span>{e.tags.map((e) => e)}</span>
              </div>
            </div>
          );
        })}

        <div className={styles.rendered_item}>
          <div className={styles.description}>
            <h3>Title of bullshit</h3>
            <span>
              Little description is about description a little bit one description is about
              description a little bit one description is about description a little bit one
              description is about description a little bit one description is about description a
              little bit one description is about description a little bit one description is about
              description a little bit one description is about description a little bit oneis about
              description a little bit one description is about description a little bit oneis about
              description a little bit one description is about description a little bit one
            </span>
          </div>
          <div className={styles.tags_and_codepopup}>
            <span>JS, HTML, EcmaScript</span>
            {/* <button className={styles.code_popup}>Check</button> */}
          </div>
        </div>

        <div className={styles.rendered_item}>
          <div className={styles.description}>
            <h3>Title of bullshit</h3>
            <span>
              Little description is about description a little bit one description is about
              description a little bit one description is about description a little bit one
              description is about description a little bit one
            </span>
          </div>
          <div className={styles.tags_and_codepopup}>
            <span>JS, HTML, EcmaScript</span>
            {/* <button className={styles.code_popup}>Check</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snippets;
