import React from 'react'

const About = () => {
  return (
    <div className="about">
        <div>
        <h2 className="blue">About The Game of Life</h2>
            <p>
                Conways Game of Life was created by John Conway in 1970. 
                Based on cellular automation, the Game Of Life is a simulation 
                with only a few simple rules that lead to complex and unexpected results. 
                Simply select a few cells on the grid to make them alive. 
                Press the play button and see how the cells come to life or disappear and die.
            </p>
        </div>
        <div className="rules">
            <h3 className="purple">The Rules:</h3>
            <p>A Cell has 8 neighbors</p>
            <p>An active cell is alive. Inactive cells are dead.</p>
            <p>Alive cells that have less than 2 or more than 3 alive neighbors die.</p>
            <p>Dead cells that have exactly 3 alive neighbors come to life</p>
        </div>
        <div>
            <p>
                For each frame of the simulation the rules are applied across the grid 
                killing or resurrecting cells with each pass. 
                The pattern can fade away leaving live cells known as still lives or 
                flashing patterns known as oscillators. Some paterns known as spaceships will mutate
                its pattern and given an infinite grid will continue on forever. 
                Other more advanced patterns can loop on forever spitting out spaceships.
                Examples of all of these can be found in the Advanced Options menu.  
            </p>
        </div>
    </div> 
  )
}

export default About