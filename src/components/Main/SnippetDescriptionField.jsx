import React, { useEffect, useRef } from 'react';

const SnippetDescriptionField = (props) => {
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
      <input type="text" placeholder="Title.." />
      <textarea id="description_area" placeholder="Some description.." />
    </div>
  );
};

export default SnippetDescriptionField;
