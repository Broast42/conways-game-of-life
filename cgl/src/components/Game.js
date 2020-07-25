import React, { useState, useRef, useCallback } from 'react'
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
    const running = useRef(isRunning)
    running.current = isRunning

    //individual neighbor indexes
    const neighborAddress = [[0,-1],[-1, -1],[1, -1],[-1, 0],[1, 0],[0, 1],[-1, 1],[1,1]]

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
    
    const userChanges = (x,y) =>{
        //use JSON parse and Stringify to create a deep copy of the grid
        let gridCopy = JSON.parse(JSON.stringify(grid))
        //if sim is not running allow changes to values
        if(!isRunning){
            if (grid[x][y] === 0){
                gridCopy[x][y] = 1
            }else if(grid[x][y] === 1){
                gridCopy[x][y] = 0
            }
        }
        setGrid(gridCopy)
    }
    
    //function to find next frame/grid applying the game of life rules
    //can use this to run simulation or create a function that will find the nth iteritation
    const nextFrame = () => {
        //deep copy of grid
        let gridCopy = JSON.parse(JSON.stringify(grid))

        //loop through each cell and add the values of its neighbors together = total neighnbors
        for(let i = 0; i < rowLen; i++){
            for(let j = 0; j < columnLen; j++){
                let neighbors = 0
                //find the cordinates of each neighbor
                neighborAddress.forEach(([x,y]) => {
                    const neighborX = i + x
                    const neighborY = j + y
                    //if were are going to wrap to other side this is where we would 
                        //check the coradinates above and adjust to other side if they 
                        //hit boundries 
                    
                    //check boundries if we dont reach the boundries add neighbors value to neighbor
                    if(neighborX >= 0 && neighborX < rowLen && neighborY >= 0 && neighborY < columnLen){
                        neighbors += grid[neighborX][neighborY]
                    }
                })
                //if neighbors is less than 2 or greater than 3 update gridCopy[i][j] to 0
                //else if grid[i][j] is equal to 0  and neighbors is 3 update gridCopy[i][j] to 1
                if(neighbors < 2 || neighbors > 3){
                    gridCopy[i][j] = 0
                }else if(grid[i][j] === 0 && neighbors === 3){
                    gridCopy[i][j] = 1
                }
                
            }
        }
        //return gridCopy
        return gridCopy

    }

    //timeout function to run simulation
    const simulation = useCallback(() =>{
        //base case if running is set to false break out of loop
        if(!running.current){
            return
        }

        //set grid with nextFrame
        //setGrid(nextFrame())
        setGrid((g) => {
            let gridCopy = JSON.parse(JSON.stringify(g))

            //loop through each cell and add the values of its neighbors together = total neighnbors
            for(let i = 0; i < rowLen; i++){
                for(let j = 0; j < columnLen; j++){
                    let neighbors = 0
                    //find the cordinates of each neighbor
                    neighborAddress.forEach(([x,y]) => {
                        const neighborX = i + x
                        const neighborY = j + y
                        //if were are going to wrap to other side this is where we would 
                            //check the coradinates above and adjust to other side if they 
                            //hit boundries 
                        
                        //check boundries if we dont reach the boundries add neighbors value to neighbor
                        if(neighborX >= 0 && neighborX < rowLen && neighborY >= 0 && neighborY < columnLen){
                            neighbors += g[neighborX][neighborY]
                        }
                    })
                    //if neighbors is less than 2 or greater than 3 update gridCopy[i][j] to 0
                    //else if grid[i][j] is equal to 0  and neighbors is 3 update gridCopy[i][j] to 1
                    if(neighbors < 2 || neighbors > 3){
                        gridCopy[i][j] = 0
                    }else if(g[i][j] === 0 && neighbors === 3){
                        gridCopy[i][j] = 1
                    }
                    
                }
            }
            //return gridCopy
            return gridCopy
        })

        //set time
        setTimeout(simulation, simSpeed)
    },[simSpeed, columnLen, neighborAddress, rowLen, grid])

    //functions to start and stop sim
    const startSim = () => {
        setIsRunning(!isRunning)
        if(!isRunning){
            running.current = true
            simulation() 
        }
          
    }

    const stopSim = () => {
        setIsRunning(false)
        
    }


    //console.log(grid)

    return (
        <div>
            {/* grid */}
            <div style={{display: 'grid', gridTemplateColumns: `repeat(${columnLen}, 17px)`}}>
                {grid.map((r, i) => (
                    r.map((c, j) => (
                        <div key ={`${i}${j}`} className={`cell ${grid[i][j] === 1 ? 'selectedCell' : 'notSelected'}`}
                            onClick={() => userChanges(i,j)}
                        >

                        </div>
                    ))
                ))}
            </div> 
            {/* UI */}
            <div>
                {!isRunning ? 
                    <button onClick={(e) => {startSim()}}>
                        Start
                    </button>    
                :
                    // <button>
                    <button onClick={(e) => {stopSim()}}>
                        Stop
                    </button>
                }
            </div>
        </div>
        
    )
}

export default Game;
