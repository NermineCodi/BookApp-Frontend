import React from 'react'
import Category from './Category';

function CategoryList(props) {

  let { categories, updateCategory, deleteCategory } = props;

  return (
    <div>
      {categories.map(category =>
        <Category
          key={category.id}
          id={category.id}
          name={category.name}
          slug={category.slug}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
        ></Category>
      )}
    </div>
  )
}

export default CategoryList