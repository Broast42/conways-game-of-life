import React, { useState } from 'react'
import '../App.css'

function Game() {
    //set the row and column heigh
    const [rowLen, setRowLen] = useState(25)
    const [columnLen, setColumnLen] = useState(25)

    //set simulation speed 1000 = 1 second
    const [simSpeed, setSimSpeed] = useState(1000)

    //bg color -stretch
    //cell color -stretch

    //state to check if sim is running
    const [isRunning, setIsRunning] = useState(false)

    //individual neighbor indexes
    const neighborAddress = [[0,-1],[-1, -1],[1, -1],[1, -1],[1, 0],[0, 1],[-1, 1],[1,1]]

    //default grid array
    const defaultGrid = () => {
        const gridArr = []
        //for each item in the row push an array the size of the column length with 0 values
        for (let i = 0; i < rowLen; i++){
            gridArr.push(Array.from(Array(columnLen), () => 0))
        }
        return gridArr
    }

    const [grid, setGrid] = useState(defaultGrid())
    console.log(grid)

    return (
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${columnLen}, 17px)`}}>
            {grid.map((r, i) => (
                r.map((c, j) => (
                    <div key ={`${i}${j}`} className="cell">

                    </div>
                ))
            ))}
        </div>
    )
}

export default Game;
