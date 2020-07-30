import React from 'react'

const GridWindow = props => {

    const columnLen = props.columnLen
    const [grid, setGrid] = props.grid
    const cellColor = props.cellColor
    const deadColor = props.deadColor
    const gridColor = props.gridColor
    const isRunning = props.isRunning

    const userChanges = (x,y) =>{
        //use JSON parse and Stringify to create a deep copy of the grid
        let gridCopy = JSON.parse(JSON.stringify(grid))
        //if sim is not running allow changes to values
        if(!isRunning){
            if (grid[x][y] === 0){
                gridCopy[x][y] = 1
                //console.log(x,y)
            }else if(grid[x][y] === 1){
                gridCopy[x][y] = 0
            }
        }
        setGrid(gridCopy)
    }

    return (
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
        
        
    )
}

export default GridWindow;
