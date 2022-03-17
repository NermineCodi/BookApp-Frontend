import logo from './logo.svg';
import './App.css';
import { Component } from 'react';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { text: "hello", display: true }
    console.log("constructor")
  }

  componentDidMount() {
    console.log("componentDidMount")
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
    console.log("State in did update:", this.state.text)
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  delete = () => {
    this.setState({ display: false });
  };

  render() {
    let comp;
    if (true) {
      comp = <ComponentOne />;
    }
    console.log("Render Parent")
    console.log("Render STATE:", this.state.text)
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.text}</p>
          <button onClick={() => { 
            console.log("STATE before:", this.state)
            this.setState((state)=>{ return {text: `${state.text + '@'}`} })
            this.setState((state)=>{ return {text: `${state.text + '@'}`} })
          
            // console.log("STATE before:", this.state)
            // this.setState({ text: `${this.state.text + '@'}` })
            // this.setState({ text: `${this.state.text + '@'}` })
            
            console.log("STATE after:", this.state)
            // setTimeout(() => {  console.log("World!"); }, 2000);
             }}>Update State</button>
          {comp}
          <button onClick={this.delete}>
            Delete the component
          </button>
        </header>
      </div>
    )
  }
}



class ComponentOne extends Component {

componentDidMount() {

  this.setState({});
}

  // Defining the componentWillUnmount method
  componentWillUnmount() {
    alert('The component is going to be unmounted');
  }

  render() {
    console.log("Render child")
    return <h1>Hello Geeks!</h1>;
  }
}


