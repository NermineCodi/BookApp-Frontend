import React, { useState } from 'react';

const AddCategory = (props) => {

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "name") {
      setName(value)
    }
    if (name === "slug") {
      setSlug(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createCategory({name, slug})
  }

  return(
      <div className="book_add">
      <form onSubmit={handleSubmit}>
        <div className="book_input">
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className="book_input">
          <input
            required
            type="text"
            name="slug"
            placeholder="Slug"
            onChange={handleChange}
          />
        </div>
        <div className="book_input">
          <button type="submit">create category</button>
        </div>

      </form>
    </div>
    )

}

export default AddCategory;