import React from 'react'
import './Particle.css'

const Particle = ({x, y, density, id, darkMode}) => {

    const styles = {
        top:  (50*x + 150), 
        left: (50*y + 150),
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