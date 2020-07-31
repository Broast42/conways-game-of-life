import React from 'react'


const ColorUI = props => {

    const setCellColor = props.setCellColor
    const setDeadColor = props.setDeadColor
    const setGridColor = props.setGridColor

    return (
        <div className="colorWindow">
            <div className="colorCenter">
                <div className="colorBoxes">
                    <div className="colorLable">Cell Color (Alive)</div>
                    <input type="color" id="cellColor" defaultValue="#000000"
                        onChange={(e) => setCellColor(e.target.value)}
                    /> 
                </div>
                <div className="colorBoxes">
                    <div className="colorLable">Cell Color (Dead)</div>
                    <input type="color" id="deadColor" defaultValue="#e6e6e6"
                        onChange={(e) => setDeadColor(e.target.value)}
                    /> 
                </div>
                <div className="colorBoxes">
                    <div className="colorLable">Grid Line Color</div>
                    <input type="color" id="gridColor" defaultValue="#000000"
                        onChange={(e) => setGridColor(e.target.value)}
                    />
                </div>
            </div>
            
        </div>
    
    )
}

export default ColorUI;
