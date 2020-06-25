import React from 'react';

export default class Rules extends React.Component {

    render(){
        return (
            <div className="rules">
                <p>The universe of the Game of Life is an infinite, two-dimensional grid of square cells, each of which is in one of two possible states, live or dead. Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent.</p>
                <p>1. Any live cell with two or three live neighbors survives.</p>
                <p>2. Any dead cell with three live neighbors becomes a live cell.</p>
                <p>3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.</p>
            </div>
            
        )
    }
}