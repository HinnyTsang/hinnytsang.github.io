import React from 'react'
import './Particle.css'

const Particle = ({x, y, density, id}) => {

    const styles = {
        top:  (50*x + 150), 
        left: (50*y + 150),
        opacity: density
    }

    return (
        <div
            className='particle'
            style={styles}
        >
        </div>
    )
}

export default Particle