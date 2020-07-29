import React, { useState, useRef, useCallback } from 'react'
import '../App.css'

function Game() {
    //set the row and column heigh
    const [rowLen, setRowLen] = useState(40)
    const [columnLen, setColumnLen] = useState(40)

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
            gridArr.push(Array.from(Array(columnLen), () => (Math.random() < 0.2 ? 1 : 0)))
        }
        return gridArr
    }

    //grid presets
    const pulsar = [
        [18,18],
        [19,18],
        [20,18],
        [18,20],
        [19,20],
        [20,20],
        [16,15],
        [16,16],
        [16,17],
        [16,21],
        [16,22],
        [16,23],
        [28,23],
        [28,21],
        [28,22],
        [28,17],
        [28,16],
        [28,15],
        [26,25],
        [25,25],
        [24,25],
        [26,20],
        [25,20],
        [24,20],
        [26,18],
        [25,18],
        [24,18],
        [26,13],
        [24,13],
        [25,13],
        [23,17],
        [23,16],
        [23,15],
        [23,21],
        [23,22],
        [23,23],
        [21,17],
        [21,16],
        [21,15],
        [21,21],
        [21,22],
        [21,23],
        [20,13],
        [19,13],
        [18,13],
        [20,25],
        [19,25],
        [18,25]
    ]

    const gliderGun = [
        [7,1],
        [8,1],
        [8,2],
        [7,2],
        [8,11],
        [7,11],
        [9,11],
        [10,12],
        [6,12],
        [5,13],
        [5,14],
        [11,13],
        [11,14],
        [10,16],
        [9,17],
        [8,17],
        [7,17],
        [6,17],
        [6,16],
        [8,15],
        [8,18],
        [7,21],
        [6,21],
        [5,21],
        [5,22],
        [6,22],
        [7,22],
        [4,23],
        [8,23],
        [8,25],
        [9,25],
        [4,25],
        [3,25],
        [5,35],
        [5,36],
        [6,35],
        [6,36]
    ]

    const blinker = [[18,20],[19,20],[20,20]]
    const toad = [[20,18],[20,19],[20,20],[19,19],[19,20],[19,21]]
    const glider = [[9,11],[9,13],[10,13],[10,12],[11,12]]
    const lwSpaceShip = [[10,11],[10,14],[11,15],[12,15],[13,15],[13,14],[13,13],[13,12],[12,11]]
    const mwSpaceShip = [[11,8],[10,10],[11,12],[12,13],[13,13],[14,13],[14,12],[14,11],[14,10],[14,9],[13,8]]

    const doubleShips = () =>{
        let newMw  = JSON.parse(JSON.stringify(lwSpaceShip))
        mwSpaceShip.forEach(([x,y]) => {
            let newx = x +12
            let newspace = [newx, y]
            newMw.push(newspace)
        })
    
        return newMw
    }

    //sets grid with a defined preset
    const preSetGrid = (preset) => {
        const gridArr = []
        for(let i = 0; i < rowLen; i++){
            gridArr.push(Array.from(Array(columnLen), () => 0))
        }

        preset.forEach(([x,y]) => {
            gridArr[x][y] = 1
        })
        
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
                console.log(x,y)
            }else if(grid[x][y] === 1){
                gridCopy[x][y] = 0
            }
        }
        setGrid(gridCopy)
    }
    

    //timeout function to run simulation
    const simulation = useCallback(() =>{
        //base case if running is set to false break out of loop
        if(!running.current){
            return
        }

        //set grid 
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

    //console.log(grid)

    return (
        <div>
            {/* grid */}
            <div style={{display: 'grid', gridTemplateColumns: `repeat(${columnLen}, 15px)`}}>
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
                <div>
                    <button onClick={() => setGrid(preSetGrid(blinker))}>
                        Blinker
                    </button>
                    <button onClick={() => setGrid(preSetGrid(toad))}>
                        Toad
                    </button>
                    <button onClick={() => setGrid(preSetGrid(pulsar))}>
                        Pulsar
                    </button>
                    <button onClick={() => setGrid(preSetGrid(glider))}>
                        Glider
                    </button>
                    <button onClick={() => setGrid(preSetGrid(lwSpaceShip))}>
                        Space Ship Sm
                    </button>
                    <button onClick={() => setGrid(preSetGrid(mwSpaceShip))}>
                        Space Ship Med
                    </button>
                    <button onClick={() => setGrid(preSetGrid(doubleShips()))}>
                        Double Ships
                    </button>
                    <button onClick={() => setGrid(preSetGrid(gliderGun))}>
                        Glider Gun
                    </button>
                </div>
                

            </div>
        </div>
        
    )
}

export default Game;
