import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Counter from "./Counter/Counter";

export const ClickedContext = React.createContext(false)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      cars: [
        { name: "Ford", year: 2018 },
        { name: "Audi", year: 2017 },
        { name: "Mazda", year: 2016 },
      ],
      pageTitle: "Cars for sale",
      showCars: false,
    };
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars,
    });
  };

  onChangeName(name, index) {
    console.log(name, index);
    const car = this.state.cars[index];
    car.name = name;
    const cars = [...this.state.cars];
    cars[index] = car;
    this.setState({ cars });
  }

  deleteHandler(index) {
    const cars = this.state.cars.concat();
    cars.splice(index, 1);

    this.setState({ cars });
  }

  componentWillMount() {
    console.log('App will mount')
  }

  componentDidMount() {
    console.log("App DidMount");
  }

  render() {
    console.log("App render");
    const divStyle = {
      textAlign: "center",
    };

    let cars = null;

    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
        return (
          <ErrorBoundary key={index}>
          <Car
            name={car.name}
            year={car.year}
            index={index}
            onDelete={this.deleteHandler.bind(this, index)}
            onChangeName={(event) =>
              this.onChangeName(event.target.value, index)
            }
          />
          </ErrorBoundary >
        );
      });
    }

    return (
      <div style={divStyle}>
        {/* <h1>{this.state.pageTitle}</h1> */}
        <h1>{this.props.title}</h1>

        <ClickedContext.Provider value={this.state.clicked}>
        <Counter />
        </ClickedContext.Provider>
        
        <hr/>
        <button onClick={this.toggleCarsHandler}>Toggle cars</button>

        <button onClick={() => this.setState({clicked: true})}>Change clicked</button>

        <div
          style={{
            width: 400,
            margin: "auto",
            paddingTop: "20px",
          }}
        >
          {cars}
        </div>

        {/* { this.state.showCars ?
       this.state.cars.map((car, index) => {
         return (
           <Car
           key={index} 
           name={car.name}
           year={car.year}
             onChangeName={() => this.changeTitleHandler(car.name)}
           />
         )
       }) 
       : null
    } */}
      </div>
    );
  }
}

export default App;
