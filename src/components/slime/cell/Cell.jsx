import React from 'react'
import './Cell.css'

const Cell = ({ x, y, width, density, id }) => {


    const styles = {
        width: `${300 / width}px`,
        height: `${300 / width}px`,
        top: (300 / width * x + 150),
        left: (300 / width * y + 150),
        opacity: density
    }




    return (
        <div style={styles} className='cell'>
        </div>
    )
}

export default Cell