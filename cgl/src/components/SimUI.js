import React from 'react'


const SimUI = props => {
 
    const [isRunning, setIsRunning] = props.isRunning
    const running = props.running
    const simulation = props.simulation
    const setGrid = props.setGrid
    const defaultGrid = props.defaultGrid
    const setSimSpeed = props.setSimSpeed

    //functions to start stop and clear sim
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

    const clearGrid = () => {
        //set isRunning to false in case the sim is running
        setIsRunning(false)
        //set grit with default grid
        setGrid(defaultGrid())
    }

    //handleSpeed
    const handleSpeed = e => {
        setSimSpeed(e.target.value)
    }

    return (
    
        <div>
            {!isRunning ? 
                <button onClick={() => {startSim()}}>
                    Play
                </button>    
            :
                <button onClick={() => {stopSim()}}>
                    Pause
                </button>
            }
            <button onClick={() => {clearGrid()}}>
                Clear
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
    
    )
}

export default SimUI
