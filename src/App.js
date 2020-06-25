import React, { Component } from 'react';
import Universe from './components/Universe.js';

import './App.scss';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      universe: new Universe(),
      size: [25,25],
      gameRunning: false,
      speed: 1000,
      random: false,
      color: "#0000FF"
    }

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.randomize = this.randomize.bind(this);
    this.storeCell = this.storeCell.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.romanize = this.romanize.bind(this);
  }
  
  runGame() {
    this.setState({
      universe: this.state.universe.addGeneration()
    })
  }

  handleRowChange(e) {
    if(!this.state.gameRunning){
      let actualSize = this.state.size;

      if(e.target.value < 90){
        actualSize[1] = e.target.value;
      } else {
        actualSize[1] = 25;
      }
        
      this.setState({
        size: actualSize
      });

      this.renderBoard();
    }
  }

  handleColumnChange(e) {
    if(!this.state.gameRunning){
      let actualSize = this.state.size;

      if(e.target.value < 90){
        actualSize[0] = e.target.value;
      } else {
        actualSize[0] = 25;
      }
        
      this.setState({
        size: actualSize
      });

      this.renderBoard();
    }
  }

  startGame() {
    console.log('started game')
    if(!this.state.gameRunning){
      this.setState({
        gameRunning: true,
      }, () => {
        this.intervalRef = setInterval(()=> this.runGame(), this.state.speed);
      })
    }
  }

  changeSpeed(e){
    console.log('changed speed to ', e.target.value)
    this.setState({
        speed: e.target.value
      })
    if(this.state.gameRunning){
      this.stopGame()
      setTimeout(()=> {this.startGame()}, 100)
    }
  }

  stopGame(){
    console.log('stopped game')
    this.setState({
      gameRunning: false
    }, () => {
      if(this.intervalRef){
        clearInterval(this.intervalRef)
      }
    })
  }

  resetGame(){
    console.log('reset game')
    this.setState({
      gameRunning: false,
      universe: new Universe()
    }, () => {
      if(this.intervalRef){
        clearInterval(this.intervalRef)
      }
    })
  }

  storeCell(position){
    if(!this.state.gameRunning){
      this.setState({
        universe: this.state.universe.storeCell(position)
      })
    }
  }

  changeColor(e){
    console.log('changed color to ', e.target.value)
    this.setState({
        color: e.target.value
      })
    
  }

  renderBoard() {
    let newWorld = [];
    let cellRow = [];

    if (this.state.random == false){
      console.log('render board!')
      for(let i = 0; i < this.state.size[0]; i++) {
        for (let j = 0; j < this.state.size[1]; j++){
          if(this.state.universe.isCellAlive(i + " , " + j)){
            cellRow.push(
              <Cell color={this.state.color} key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>
            );
          } else {
            cellRow.push(
              <Cell color={"#deffeb"} key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>
            );
          }
        }
        newWorld.push(<div className="row" key={i}>{cellRow}</div>);
        cellRow = [];
      }
      return newWorld;
    } else {
      console.log('random board timeout!')
      setTimeout(() => {
        this.setState({
        random: false
        })
      }, 100)
      // setTimeout(() => {
        
      // }, 200)
      return this.randomBoard()
    }
    
  }


  randomBoard() {
    let newWorld = [];
    let cellRow = [];
    console.log('random board!')
    for(let i = 0; i < this.state.size[0]; i++) {
      for (let j = 0; j < this.state.size[1]; j++){
        let randomNum = Math.random()
        if(randomNum > .4){
          cellRow.push(
            <Cell key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>
          );
        } else {
          cellRow.push(
            <Cell key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>
          );
        }
      }
      newWorld.push(<div className="row" key={i}>{cellRow}</div>);
      cellRow = [];
    }

    return newWorld;
  }

  randomize() {
    console.log('random go!')
    if (!this.state.random){
      this.setState({
        random: true
      })
    }
  }

  romanize() {
    let num = this.state.universe.getGeneration()
    let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  render(){
    return (

        <div className="container">
          <div className="header">
            <div className="header-labels">

              <label>
                Rows:
                <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
              </label>

              <label>
                Columns:
                <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
              </label>

              <label>
                Change speed:
                <input className="input" type="text" value={this.state.speed} onChange={(e) => {this.changeSpeed(e)}} />
              </label>

              <label>
                Change square color:
                <input className="input" type="text" value={this.state.color} onChange={(e) => {this.changeColor(e)}} />
              </label>
            </div>

            <div className="headerButtons">
              <button onClick={this.startGame}>Start</button>
              <button onClick={this.stopGame}>Stop</button>
              <button onClick={this.resetGame}>Reset</button>
              {/* <button onClick={this.randomize}>Randomize</button> */}
            </div>

            
          </div>

          <div className="board">
            {this.renderBoard()}
            
          </div>
          <p className="gen">Generation: {this.romanize()}</p>
        </div>

    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div style={{backgroundColor: this.props.color}} onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "cellContainerLive" : "cellContainerDead"}></div>
    );
  }
}