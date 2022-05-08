import React from 'react'
import './Cell.css'

const Cell = ({ x, y, id }) => {


    const styles = {
        top:  (3/2*x + 150),
        left: (3/2*y + 150),
    }


    return (
        <div style={styles} className='cell'>
        </div>
    )
}

export default Cell