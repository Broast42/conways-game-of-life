import React, { useState, useRef, useCallback } from 'react'
import { Route } from 'react-router-dom'
import SimUi from './SimUI'
import AdvancedUI from './AdvancedUI'
import GridWindow from './GridWindow'
import Header from './Header'
import About from './About'
import '../App.css'

function Game() {
    //set the row and column heigh
    const [rowLen, setRowLen] = useState(40)
    const [columnLen, setColumnLen] = useState(40)

    const [gen, setGen] = useState(0)

    //set simulation speed 1000 = 1 second
    const [simSpeed, setSimSpeed] = useState(500)
    const speed = useRef(simSpeed)
    speed.current = simSpeed

    //bg color
    const [deadColor, setDeadColor] = useState('#e6e6e6')
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

    //grid
    const [grid, setGrid] = useState(defaultGrid())
    
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
        setGen((gen) => gen += 1)
        //set time
        setTimeout(simulation, speed.current)
    },[columnLen, neighborAddress, rowLen])

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
        if (!isRunning){
           setGrid(() => gridCopy)
           setGen((gen) => gen += 1) 
        }
        
    }


    //console.log(grid)

    return (
        <div className="gameWindow">
            {/* grid */}
            <div className="gridWindow">
                <GridWindow
                    columnLen = {columnLen}
                    grid = {[grid,setGrid]}
                    cellColor = {cellColor}
                    deadColor = {deadColor}
                    gridColor = {gridColor}
                    isRunning = {isRunning}
                />
            </div>
           
            {/* UI */}
            <div className="ui">
                <Header/>
                <SimUi 
                    isRunning={[isRunning,setIsRunning]} 
                    running={running} 
                    simulation={simulation}
                    setGrid={setGrid}
                    defaultGrid={defaultGrid}
                    simSpeed={[simSpeed,setSimSpeed]}
                    gen={[gen, setGen]}
                    nextFrame={nextFrame}
                />
                <Route exact path="/" component={About} />
                <Route exact path="/aui" render={props =>
                    <AdvancedUI
                        setDeadColor={setDeadColor}
                        setGridColor={setGridColor}
                        setCellColor={setCellColor}
                        setGrid={setGrid}
                        setIsRunning={setIsRunning}
                        rowLen={rowLen}
                        columnLen={columnLen}
                        setGen={setGen}
                    />}
                />
            </div>
            
            
            
        </div>
        
    )
}

export default Game;
