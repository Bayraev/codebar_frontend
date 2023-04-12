import React from 'react';
import styles from './Snippets.module.scss';
import sort_icon from '../../assets/images/settings_icon.png';
import search_icon from '../../assets/images/search_icon.png';

const Snippets = () => {
  return (
    <div className={styles.snippets_wrapper}>
      <div className={styles.flex}>
        <img className={styles.icon50x50} src={sort_icon} />
        <img className={styles.icon50x50} src={search_icon} />
      </div>
      <form>
        <input placeholder="Search by title.." type="text" />
        <button className="dark_gray_button">New Snippet</button>
      </form>

      <div className={styles.rendering_div}>
        <div className={styles.rendered_item}>
          <div>
            <h3>Title of bullshit</h3>
            <span>
              Little description is about description a little bit one description is about
              description a little bit one description is about description a little bit one
              description is about description a little bit one description is about description a
              little bit one description is about description a little bit one description is about
              description a little bit one description is about description a little bit one
            </span>
          </div>
          {/* <button className={styles.code_popup}>Check</button> */}
        </div>
        <div className={styles.rendered_item}>
          <div>
            <h3>Title of bullshit</h3>
            <span>
              Little description is about description a little bit one description is about
              description a little bit one description is about description a little bit one
              description is about description a little bit one
            </span>
          </div>
          {/* <button className={styles.code_popup}>Check</button> */}
        </div>

        <div className={styles.rendered_item}>
          <div>
            <h3>Title of bullshit</h3>
            <span>
              Little description is about description a little bit one description is about
              description a little bit one description is about description a little bit one
              description is about description a little bit one
            </span>
          </div>
          {/* <button className={styles.code_popup}>Check</button> */}
        </div>
        <div className={styles.rendered_item}>
          <div>
            <h3>Title of bullshit</h3>
            <span>
              Little description is about description a little bit one description is about
              description a little bit one description is about description a little bit one
              description is about description a little bit one
            </span>
          </div>
          {/* <button className={styles.code_popup}>Check</button> */}
        </div>
      </div>
    </div>
  );
};

export default Snippets;
