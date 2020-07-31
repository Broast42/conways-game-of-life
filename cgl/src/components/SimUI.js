import React from 'react'


const SimUI = props => {
 
    const [isRunning, setIsRunning] = props.isRunning
    const running = props.running
    const simulation = props.simulation
    const setGrid = props.setGrid
    const defaultGrid = props.defaultGrid
    const [simSpeed, setSimSpeed] = props.simSpeed

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
            <div className="simUI">
                {!isRunning ? 
                    <button className="playBtn" onClick={() => {startSim()}}>
                        Play
                    </button>    
                :
                    <button className="pauseBtn" onClick={() => {stopSim()}}>
                        Pause
                    </button>
                }
                <button onClick={() => {clearGrid()}} className={!isRunning ? 'stopBtn' : 'clearBtn'}>
                    {!isRunning ? 'Clear' : 'Stop'}
                </button>
                <span>Speed</span>
                <input
                    className="speedBar" 
                    type="range" 
                    id="speed" 
                    min="100" 
                    max="1000" 
                    defaultValue="500"
                    onChange={(e)=>{handleSpeed(e)}}
                />
                <span className="speedNum">{simSpeed/1000}s</span>       
            </div>
            <div className="generation">
                <span>Generation</span> {props.gen}
            </div>
        </div>
    )
}

export default SimUI
