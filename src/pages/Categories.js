import {useState, useEffect} from 'react';
import AddCategory from '../components/Category/AddCategory';
import CategoryList from '../components/Category/CategoryList';

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories");
        const result = await response.json();
  
        // console.log("result Books:", result.response)
  
        if (result.success) {
          const categories = result.response;
          console.log("categories:", categories);
          setCategories(categories);
        } else {
          const error = result.message;
        }
      } catch (err) {
        console.log("error:", err);
      }
    }
    getCategories();
  }, [])

  const deleteCategory = async (id) => {

    console.log("deleted category:", id)

    try {
      const response = await fetch(`http://localhost:4000/api/categories/${id}`,
        { method: "DELETE" });
      const result = await response.json();

      console.log("result:", result)
      if (result.success) {
        let newCategoriesArr = [...categories].filter(category => {
          return (category._id !== id);
        })
        setCategories(newCategoriesArr);

      } else {
        const error = result.message;
      }
    } catch (err) {
      console.log(err.message);
    }

  }

  const createCategory = async (newCategory) => {
   
    console.log("newCategory:",newCategory)
    try {
      const response = await fetch(`http://localhost:4000/api/categories`,
        { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCategory) });

      const result = await response.json();

      console.log("result:", result.response)

      if (result.success) {

        let newCategoriesArr = [...categories]
       
        newCategoriesArr.push(result.response);

        setCategories(newCategoriesArr)

      } else {
        const error = result.message;
      }
    } catch (err) {
      console.log(" error_message:", err.message);
    }

  }

  const updateCategory = async (id, newCategory) => {
      console.log("id:", id)
      console.log("newCategory:", newCategory)
      try {
        const response = await fetch(`http://localhost:4000/api/categories/${id}`,
          { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCategory) });
  
        const result = await response.json();
  
        console.log("result:", result.response)
  
        if (result.success) {
  
          let newCategoriesArr = [...categories].map(category => {
            if (category._id !== id) return category;
            //make the changes for category
            category.name = newCategory.name || category.name;
            category.slug = newCategory.slug || category.slug;
            return category;
          })
  
         setCategories(newCategoriesArr)
  
  
        } else {
          const error = result.message;
        }
      } catch (err) {
        this.setState({ error_message: err.message });
      }
  }

  return(
    <div className="">
      <AddCategory createCategory={createCategory}/>
      <CategoryList categories={categories} updateCategory={updateCategory} deleteCategory={deleteCategory}/>
    </div>
  )

}

export default Categories;