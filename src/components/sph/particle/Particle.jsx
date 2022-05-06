import React from 'react'
import './Particle.css'

const Particle = ({x, y, density, id, darkMode, zoom}) => {

    const styles = {
        top:  (zoom*x + 150), 
        left: (zoom*y + 150),
        opacity: density
    }

    // console.log('calling');

    const Point = () =>
        <div
            className={`particle particle-${darkMode ? 'dark' : 'light'}`}
            style={styles}
        >
        </div>

    return (
        <Point />
    )
}

export default Particle