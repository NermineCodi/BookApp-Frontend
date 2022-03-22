import { Component } from 'react';
import BookList from '../components/BookList'
import AddBook from '../components/AddBook'

export default class Home extends Component {

  state = {
    books: [],
    error: false,
    loading: false,
    error_message: ""
  }

  async componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/books");
      const result = await response.json();

      console.log("result:", result.response)

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

  updateBook = async (id, newBook) => {
    console.log("id:", id)
    console.log("book:", newBook)


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

    try {
      const response = await fetch(`http://localhost:4000/api/books`,
        { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBook) });

      const result = await response.json();

      console.log("result:", result.response)

      if (result.success) {

        let newBooksArr = [...this.state.books]
        newBooksArr.unshift(result.response);

        this.setState({ books: newBooksArr });

      } else {
        const error = result.message;
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }

  }

  render() {
    return (<>
      <AddBook createBook={this.createBook}></AddBook>
      <BookList books={this.state.books} updateBook={this.updateBook} deleteBook={this.deleteBook} />
    </>)
  }
}