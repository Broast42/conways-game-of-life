import React from 'react'


const PreSetsUI = props => {

    const setGrid = props.setGrid
    const setIsRunning = props.setIsRunning
    const rowLen = props.rowLen
    const columnLen = props.columnLen

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

    //random grid
    const randomGrid = () => {
        const gridArr = []
        for(let i = 0; i < rowLen; i++){
            gridArr.push(Array.from(Array(columnLen), () => (Math.random() < 0.2 ? 1 : 0)))
        }
        return gridArr
    }

    const setRandomGrid = () => {
        setIsRunning(false)
        setGrid(randomGrid())
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

    const doubleShips = () =>{
        let newMw  = JSON.parse(JSON.stringify(lwSpaceShip))
        mwSpaceShip.forEach(([x,y]) => {
            let newx = x +12
            let newspace = [newx, y]
            newMw.push(newspace)
        })
    
        return newMw
    }

    return (
        <div>
            <button onClick={() => {setRandomGrid()}}>
                Random
            </button>
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
  )
}

export default PreSetsUI;
