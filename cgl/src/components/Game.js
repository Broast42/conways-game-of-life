import React, { useState, useRef, useCallback } from 'react'
import '../App.css'

function Game() {
    //set the row and column heigh
    const [rowLen, setRowLen] = useState(25)
    const [columnLen, setColumnLen] = useState(25)

    //temp row and column values to be set by user
    // const [tempRow, setTempRow] = useState(25)
    // const [tempCol, setTempCol] = useState(25)

    //set simulation speed 1000 = 1 second
    const [simSpeed, setSimSpeed] = useState(500)
    const speed = useRef(simSpeed)
    speed.current = simSpeed

    //bg color
    const [deadColor, setDeadColor] = useState('#ffffff')
    //cell color 
    const [cellColor, setCellColor] = useState("#000000")
    //grid color
    const [gridColor, setGridColor] = useState("#000000")

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

    //random grid
    const randomGrid = () => {
        const gridArr = []
        for(let i = 0; i < rowLen; i++){
            gridArr.push(Array.from(Array(columnLen), () => (Math.random() < 0.4 ? 1 : 0)))
        }
        return gridArr
    }

    //grid
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
    //can use this as a helper to create a function that will find the nth iteritation
    //same as within the simulation code
    const nextFrame = () => {
       
        let gridCopy = JSON.parse(JSON.stringify(grid))
        for(let i = 0; i < rowLen; i++){
            for(let j = 0; j < columnLen; j++){
                let neighbors = 0
                neighborAddress.forEach(([x,y]) => {
                    const neighborX = i + x
                    const neighborY = j + y

                    if(neighborX >= 0 && neighborX < rowLen && neighborY >= 0 && neighborY < columnLen){
                        neighbors += grid[neighborX][neighborY]
                    }
                })
                
                if(neighbors < 2 || neighbors > 3){
                    gridCopy[i][j] = 0
                }else if(grid[i][j] === 0 && neighbors === 3){
                    gridCopy[i][j] = 1
                }
                
            }
        }

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
        setTimeout(simulation, speed.current)
    },[columnLen, neighborAddress, rowLen])

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

    //clear the grid
    const clearGrid = () => {
        //set isRunning to false in case the sim is running
        setIsRunning(false)
        //set grit with default grid
        setGrid(defaultGrid())
    }

    //set random grid
    const setRandomGrid = () => {
        setIsRunning(false)
        setGrid(randomGrid())
    }

    //handleSpeed
    const handleSpeed = e => {
        setSimSpeed(e.target.value)
    }

    // const handleSize = e => {
    //     if (e.target.name === "width"){
    //         setTempCol(e.target.value)
    //     }else if(e.target.name === "height"){
    //         setTempRow(e.target.value)
    //     }
        
    // }

    // const changeSize = () => {
    //     setColumnLen(tempCol)
    //     setRowLen(tempRow)
    //     setGrid(() => defaultGrid())
    // }


    //console.log(grid)

    return (
        <div>
            {/* grid */}
            <div style={{display: 'grid', gridTemplateColumns: `repeat(${columnLen}, 17px)`}}>
                {grid.map((r, i) => (
                    r.map((c, j) => (
                        <div key ={`${i}${j}`} 
                            
                            className="cell"
                            style={{backgroundColor: grid[i][j]=== 1 ? cellColor : deadColor , border: `1px solid ${gridColor}`}}
                            
                            onClick={() => userChanges(i,j)}
                        >

                        </div>
                    ))
                ))}
            </div> 
            {/* UI */}
            <div>
                {!isRunning ? 
                    <button onClick={() => {startSim()}}>
                        Play
                    </button>    
                :
                    // <button>
                    <button onClick={() => {stopSim()}}>
                        Pause
                    </button>
                }
                <button onClick={() => {clearGrid()}}>
                    Clear
                </button>
                <button onClick={() => {setRandomGrid()}}>
                    Random
                </button>
                <input 
                    type="range" 
                    id="speed" 
                    min="100" 
                    max="1000" 
                    defaultValue="500"
                    onChange={(e)=>{handleSpeed(e)}}
                />
            </div>
            <div>
                {/* <form onSubmit={(e) =>{ e.preventDefault(); changeSize()}}>
                    <p>Width</p>
                    <input 
                        type="range" 
                        id="grid"
                        name="width" 
                        min="25" 
                        max="50" 
                        defaultValue="25"
                        onChange={(e)=>{handleSize(e)}}
                    />
                    <span>{tempCol}</span>
                    <p>Height</p>
                    <input 
                        type="range" 
                        id="grid"
                        name="height" 
                        min="25" 
                        max="50" 
                        defaultValue="25"
                        onChange={(e)=>{handleSize(e)}}
                    />
                    <span>{tempRow}</span>
                    <div>
                        <button type="submit">
                            Set Grid Size
                        </button>  
                    </div>
                </form> */}
                <div>
                    <input type="color" id="cellColor" defaultValue="#000000"
                        onChange={(e) => setCellColor(e.target.value)}
                    />
                    <input type="color" id="deadColor" defaultValue="#ffffff"
                        onChange={(e) => setDeadColor(e.target.value)}
                    />
                   <input type="color" id="gridColor" defaultValue="#000000"
                        onChange={(e) => setGridColor(e.target.value)}
                    />

                </div>
                

            </div>
        </div>
        
    )
}

export default Game;
