import React, { useEffect } from 'react';

const SnippetDescriptionField = (props) => {
  /*
        styles={styles}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
  */
  // Textarea's height extending function.
  // UseEffect we need, ig, bcs when we reload page, for 1 moment we lose "textarea"..
  // ..and listener says "cannot read null"
  useEffect(() => {
    // we got element with this id
    const textarea = document.getElementById('description_area');

    // "keyup" listeners listen when we stop holding button on keyboard
    textarea.addEventListener('keyup', (e) => {
      textarea.style.height = 'auto'; // resizes back, if we erase text
      let scHeight = e.target.scrollHeight; // takes infortion about height IN textarea
      textarea.style.height = `${scHeight}px`; // makes texteares height = scHeight
    });
  });

  return (
    <div className={props.styles.description}>
      <input
        type="text"
        placeholder="Title.."
        value={props.title}
        onChange={(e) => {
          props.setTitle(e.target.value);
        }}
      />
      <textarea
        id="description_area"
        placeholder="Some description.."
        value={props.description}
        onChange={(e) => props.setDescription(e.target.value)}
      />
    </div>
  );
};

export default SnippetDescriptionField;
