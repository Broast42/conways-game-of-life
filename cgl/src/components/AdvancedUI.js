import React from 'react'
import ColorUI from './ColorUI'
import PreSetsUI from './PreSetsUI'

const AdvancedUI = props => {
  
    return (
        <div>
           <ColorUI 
                setDeadColor={props.setDeadColor}
                setGridColor={props.setGridColor}
                setCellColor={props.setCellColor}
            />
            <PreSetsUI 
                setGrid={props.setGrid}
                setIsRunning={props.setIsRunning}
                rowLen={props.rowLen}
                columnLen={props.columnLen}
            />  
        </div>
    )
}

export default AdvancedUI