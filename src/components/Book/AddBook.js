import { Component} from 'react';
import Select from 'react-select';

export default class AddBook extends Component {

  state = {
    title: "",
    description: "",
    categories: this.props.categories,
    authors: this.props.authors,
    selectedAuthor: "",
    selectedCategories: [],
    file: null,
    image: this.props.image
  }

  handleChange = (event) => {
    let {name, value} = event.target;
    this.setState({ [name] : value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let {title, description, selectedCategories, selectedAuthor, category, image} = this.state;
    console.log(`image: ${JSON.stringify(image)}`);
    this.props.createBook({title, description, category: this.state.selectedCategories, author: this.state.selectedAuthor, isDeleted: false, image: this.state.image._id});
  }

  handleChangeField = (event) => {
    console.log('file', event.target.files[0])
    this.setState({file: event.target.files[0]})
    this.props.uploadImage({file: event.target.files[0]})
  }

  handleSelectAuthor = (event) => {
    console.log("selected Author",event.target.value);
    this.setState({selectedAuthor: event.target.value});
  }

  handleSelectCategory = (arr) => {
      console.log("selected Category",arr);
     let selectedCategories =  arr.map(item => { return item.value})
     this.setState({selectedCategories})
  }

  render() {
    let {categories, authors} =  this.props;

    return (
      <div className="book_add">
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
        <label>
        select an author
        <select onChange={this.handleSelectAuthor}>
        { authors.map(author => { 
          let fullName = author.firstName + ' ' + author.lastName;
          return <option  key={author._id} value={author._id}>{fullName}</option>}) }
    
        </select>
        </label>
          <br/>
        <label> Select Categories
          <Select options={categories.map(category =>
          { return {value: category._id , label: category.name}})}
           onChange={this.handleSelectCategory} isMulti></Select>
        </label>

        
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