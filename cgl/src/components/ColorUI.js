import React from 'react'


const ColorUI = props => {

    const setCellColor = props.setCellColor
    const setDeadColor = props.setDeadColor
    const setGridColor = props.setGridColor
    
    return (
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
    
    )
}

export default ColorUI;
