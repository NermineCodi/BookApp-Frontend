import { Component } from 'react';
import Book from './Book';

export default class BookList extends Component {

  render() {

    return (
      <>
        {this.props.books.map((book) => 
          <Book
            key={book._id}
            id = {book._id} 
            title = {book.title}
            description = {book.description}
            category = {book.category}
            author = {book.author}
            image = {book.image}
            updateBook={this.props.updateBook}
            deleteBook = {this.props.deleteBook}
          />
        )}
      </>


    )
  }

}