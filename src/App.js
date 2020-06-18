import React, { Component } from 'react';
import Universe from './components/Universe.js';

import './App.css';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      universe: new Universe(),
      size: [25,25],
      gameRunning: false
    }

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.storeCell = this.storeCell.bind(this);
  }
  
  runGame() {
    this.setState({
      universe: this.state.universe.addGeneration()
    })
  }

  handleRowChange(e) {
    if(!this.state.gameRunning){
      let actualSize = this.state.size;

      if(e.target.value < 25){
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

      if(e.target.value < 25){
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
        this.intervalRef = setInterval(()=> this.runGame(), 1000);
      })
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

  storeCell(position){
    if(!this.state.gameRunning){
      this.setState({
        universe: this.state.universe.storeCell(position)
      })
    }
  }

  renderBoard() {
    let newWorld = [];
    let cellRow = [];

    for(let i = 0; i < this.state.size[0]; i++) {
      for (let j = 0; j < this.state.size[1]; j++){
        if(this.state.universe.isCellAlive(i + " , " + j)){
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

  render(){
    return (

        <div className="worldContainer">
          <div className="headerContainer">
            <div className="headerInnerContainer">

              <label className="label">
                Rows:
                <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
              </label>

              <label className="label">
                Columns:
                <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
              </label>

            </div>

            <div className="headerButtons">
              <button className="submit" onClick={this.startGame}>Start</button>
              <button className="submit" onClick={this.stopGame}>Stop</button>
            </div>

            Generation: {this.state.universe.getGeneration()}
          </div>

          <div className="boardContainer">
            {this.renderBoard()}
          </div>

        </div>

    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "cellContainerLive" : "cellContainerDead"}></div>
    );
  }
}