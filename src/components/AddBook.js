import { Component} from 'react';

export default class AddBook extends Component {

  state = {
    title: "",
    description: ""
  }

  handleChange = (event) => {
    let {name, value} = event.target;
    this.setState({ [name] : value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let {title, description} = this.state;
    this.props.createBook({title, description});
  }

  render() {
    return (
      <div className="book_card">
      <form onSubmit={this.handleSubmit}>
        <div className="book_input">
          <input
            required
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
          />
        </div>
        <div className="book_input">
          <input
            required
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
        </div>
        <div className="book_input">
          <input
            type="file"
            name="image"
            onChange={this.handleChangeField}
          />
        </div>
        <div className="book_input">
          <button type="submit">create book</button>
        </div>

      </form>
    </div>
    )
  }
}