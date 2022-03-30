import React, { useState } from 'react';

const Category = (props) => {
  let { id, name, slug, deleteCategory, updateCategory } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [catName, setCatName] = useState(name);
  const [catSlug, setCatSlug] = useState(slug);



  const toggleEditMode = () => {
    setIsEdit(!isEdit);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateCategory(id, { name: catName, slug: catSlug });
    toggleEditMode()
  }

  const handleReset = (event) => {
    event.preventDefault();
    setCatName(name);
    setCatSlug(slug);
    toggleEditMode()
  }

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "name") {
      setCatName(value)
    }
    if (name === "slug") {
      setCatSlug(value);
    }
  }

  const renderViewMode = () => {
    return <div className="book_card">
      <p>{`Name: ${name}`}</p>
      <p>{`Slug: ${slug}`}</p>
      <button onClick={() => { props.deleteCategory(id) }} >Delete</button>
      <button onClick={toggleEditMode}>Edit</button>
    </div>
  }

  const renderEditMode = () => {
    return (<div className="book_card">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="book_input">
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            value={catName}
            onChange={handleChange}
          />
        </div>
        <div className="book_input">
          <input
            required
            type="text"
            name="slug"
            placeholder="Slug"
            value={catSlug}
            onChange={handleChange}
          />
        </div>

        <div className="book_input">
          <button type="reset" className="marginRight">cancel</button>
          <button type="submit">update book</button>
        </div>

      </form>
    </div>
    )
  }

  return (
    <>
      {(isEdit) ? renderEditMode() : renderViewMode()}
      {/* if(isEdit) renderEditMode()
      else renderViewMode() */}
    </>
  )



}

export default Category;