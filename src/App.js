import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium from 'radium';

class App extends Component {
  state = {
    persons: [
      { id:"001" ,name: 'Max', age: 28 },
      { id:"002" ,name: 'Manu', age: 29 },
      { id:"003" ,name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons:false
  }

  

  nameChangedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id;
    });

    const person = {
      // dublicating an array
      ...this.state.persons[personIndex]
    };

    // Aother way for that:
    // const person = Object.assign({}, this.state.persons[personIndex]);
    person.name =  event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {
      persons: persons
    } );
  }
// Add this function to button
// !doesShow means that it always gonna turn to the opposite. If true turn on to false and etc...
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }
  deletePersonHandler = (personIndex) => {
    // const people = this.state.persons.slice(); the same but ES6 =======> next line
    const people = [...this.state.persons];
    people.splice(personIndex,1);
    this.setState({persons:people});
  }

  render () {


    // Inline styles/similar to CSS
    const style = {
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
          backgroundColor:'lightgreen',
          color:'black'
      }
    };

    // Because this is actually a JavaScript a thing like tjat is allowed :D
    // Puting entire JSX into a variable
    // And then outputing everythhing in the render() function 
    // Pretty smart!
    // And clean.
    let persons = null;
    if (this.state.showPersons) {
      persons =(
        <div >
          {this.state.persons.map((person,index) => {
            return <Person 
            click = {() => this.deletePersonHandler(index)}
            name={person.name} 
            age ={person.age}
            key={person.id}
            changed ={(event)=>this.nameChangedHandler(event,person.id)}
            />
          })}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover']= {
        backgroundColor:'salmon',
        color:'black'
    }
  }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); //*Add "red" CSS class to array and then use it with <p> tag. 
      //  classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); //*Add "bold" CSS class to array and then use it with <p> tag. 
      // classes = ['red','bold']
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className = {classes.join(' ')}>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Window</button>
          {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
}



export default Radium(App);
