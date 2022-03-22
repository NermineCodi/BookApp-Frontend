import { Component} from 'react';

export default class Book extends Component {

  state = {
    edit_mode: false,
    title: this.props.title,
    description: this.props.description
  }

  toggleEditMode = () => {
    let {edit_mode} = this.state;
    this.setState({edit_mode: !edit_mode});
  }

  handleChange = (event) => {
    let {name, value} = event.target;
    this.setState({ [name] : value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let {id} = this.props;
    let {title, description} = this.state;
    this.props.updateBook(id, {title, description});
    this.toggleEditMode()
  }

  handleReset = (event) => {
    event.preventDefault();
    let {title, description} = this.props;
    this.setState({title: title, description: description});
    this.toggleEditMode()
  }

  renderViewMode = () => {
    let {id, title, description, author, category, image} = this.props;
    let url = image && image.name ? "http://localhost:4000/uploads/"  +  image.name : "";
    let authorName = author && author.firstName && author.lastName ? author.firstName + " " + author.lastName : "";

    return (
       <div className="book_card">
        <img alt="Book" style={{ width: '100%' }} src={url}/>
        <p>{`Title: ${title}`}</p>
        <p>{`Description: ${description}`}</p>
        {authorName !== "" && 
        <p>{`Author: ${authorName}`}</p>}

        {category &&
          category.map(item => <div key={item._id} style={{backgroundColor: 'red', margin: 5}}>{item.name}</div>)
        }
        
       
        <br/>
        <button onClick={() => {this.props.deleteBook(id)}} >Delete</button>
        <button onClick={this.toggleEditMode}>Edit</button>
      </div>
     
    )
  }

  renderEditMode = () => {
    let {title, description} = this.state;

    return (
      <div className="book_card">
      <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <div className="book_input">
          <input
            required
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <div className="book_input">
          <input
            required
            type="text"
            name="description"
            placeholder="Description"
            value={description}
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
          <button type="reset" className="marginRight">cancel</button>
          <button type="submit">update book</button>
        </div>

      </form>
    </div>
    )
  }

  render() {
      let {edit_mode} = this.state;

      if(edit_mode) return this.renderEditMode();
      else return this.renderViewMode();
  }
}