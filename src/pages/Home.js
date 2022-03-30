import { Component } from 'react';
import BookList from '../components/Book/BookList'
import AddBook from '../components/Book/AddBook'

export default class Home extends Component {

  state = {
    books: [],
    categories:[],
    authors:[],
    error: false,
    loading: false,
    error_message: "", 
    image : {}
  }

  async componentDidMount() {
    this.getBooks();
    this.getAuthors();
    this.getCategories();
  }

  uploadImage = async (obj) => {
   
    try {

      let body = new FormData();
      body.append('file', obj.file);
      body.append('name', "anythingcl")

      

      const response = await fetch(" http://localhost:4000/api/files/upload",  { method: "POST", body: body });
      const result = await response.json();

      console.log("result image:", result.response)

      if (result.success) {
       let image = {id: result.response._id, name: result.response.name}
       this.setState({image: image});
      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  }

  getBooks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/books");
      const result = await response.json();

      // console.log("result Books:", result.response)

      if (result.success) {
        const books = result.response;
        this.setState({ books: books });
      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  }

  getCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories");
      const result = await response.json();

      // console.log("result Categories:", result.response)

      if (result.success) {
        const categories = result.response;
        this.setState({ categories });
      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  }

  getAuthors = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/authors");
      const result = await response.json();

      // console.log("result Authors:", result.response)

      if (result.success) {
        const authors = result.response;
        this.setState({ authors });
      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  }

  updateBook = async (id, newBook) => {
    // console.log("id:", id)
    // console.log("book:", newBook)


    try {
      const response = await fetch(`http://localhost:4000/api/books/${id}`,
        { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBook) });

      const result = await response.json();

      console.log("result:", result.response)

      if (result.success) {

        let newBooksArr = [...this.state.books].map(book => {
          if (book._id !== id) return book;

          //make the changes for book
          book.title = newBook.title || book.title;
          book.description = newBook.description || book.description;
          return book;
        })

        this.setState({ books: newBooksArr });


      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  }

  deleteBook = async (id) => {

    console.log("deleted book:", id)

    try {
      const response = await fetch(`http://localhost:4000/api/books/soft/${id}`,
        { method: "DELETE" });
      const result = await response.json();

      console.log("result:", result)
      if (result.success) {
        let newBooksArr = [...this.state.books].filter(book => {
          return (book._id !== id);
        })
        this.setState({ books: newBooksArr });

      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }

  }

  createBook = async (newBook) => {
    console.log("this.state.image:",this.state.image)
    if (this.state.image){
      newBook.image = this.state.image.id
    }
    console.log("newBook:",newBook)
    try {
      const response = await fetch(`http://localhost:4000/api/books`,
        { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBook) });

      const result = await response.json();

      console.log("result:", result.response)

      if (result.success) {

        let newBooksArr = [...this.state.books]
        let {image} = this.state;
        result.response.image = image
        newBooksArr.push(result.response);

        this.setState({ books: newBooksArr });

      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }

  }

  render() {
    return (
    <div className="App">
      <AddBook image={this.state.image} categories={this.state.categories} authors={this.state.authors} createBook={this.createBook} uploadImage={this.uploadImage}></AddBook>
      <BookList books={this.state.books} categories={this.state.categories} authors={this.state.authors} updateBook={this.updateBook} deleteBook={this.deleteBook} />
    </div>)
  }
}