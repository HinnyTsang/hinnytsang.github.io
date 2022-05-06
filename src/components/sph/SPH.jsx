import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { Button, Ratio } from 'react-bootstrap'
import Particle from './particle/Particle';
import { calcAcceleration, calcDensity } from './physics';

import './SPH.css'


function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const SPH = ({ darkMode }) => {


    // for dark mode.
    var background = darkMode ? 'black' : 'white';
    const [delay, setDelay] = useState(10);
    const [isPlaying, setPlaying] = useState(true)
    const [zoom, setZoom] = useState(50)

    // hook for number of particles
    const [numOfParticle, setNumOfParticle] = useState(50);


    // paramters for simulation
    const [t, setT] = useState(0);
    let dt = 0.04
    let m = 2 / numOfParticle  // mass of each particles
    let h = 0.1      //  0.04/Math.sqrt(numOfParticle/1000)      // smoothing parameters
    let k = 0.1      // EOS constant
    let n = 1        // polytropic index
    let nu = 1       // viscosity factor
    let lambda = 1.5090246456120449 // potential

    // intial conditions
    const initialPosition = () => Array.from({ length: numOfParticle }, () => (Math.random() - 0.5) * 5);
    const initialVelocity = () => Array(numOfParticle).fill(0);

    // all particles parameters
    const [x, setX] = useState(initialPosition());
    const [y, setY] = useState(initialPosition());
    const [vx, setVx] = useState(initialVelocity());
    const [vy, setVy] = useState(initialVelocity());
    // const [vx, setVx] = useState(y.map(i => 10 * i));
    // const [vy, setVy] = useState(x.map(i => -10 * i));

    let [ax0, ay0] = calcAcceleration(x, y, vx, vy, m, h, k, n, nu, lambda)

    const [ax, setAx] = useState(ax0);
    const [ay, setAy] = useState(ay0);
    const [density, setDensity] = useState(calcDensity(x, y, m, h));



    // restart simulation

    const resetSPH = () => {

        if (isPlaying) {
            setT(0);
            setX(initialPosition());
            setY(initialPosition());
            setVx(initialVelocity());
            setVy(initialVelocity());
            let [ax0, ay0] = calcAcceleration(x, y, vx, vy, m, h, k, n, nu, lambda);
            setAx(ax0);
            setAy(ay0);
        }
        else {
            setPlaying(true);
        }

    }


    const energyInject = () => {
        setPlaying(false);
    }

    const zoomIn = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.deltaY > 0) {
            setZoom(prev => prev - 10)
        }
        else {
            setZoom(prev => prev + 10)
        }
    }

    const ref = React.createRef()
    // ref.current.addEventListener('wheel', e => e.preventDefault());

    // particles into components
    let Particles = Array.from({ length: numOfParticle },
        (item, index) =>
            <Particle
                key={index}
                id={index}
                x={x[index]}
                y={y[index]}
                density={density[index]}
                darkMode={darkMode}
                zoom={zoom} />
    );



    // main loop
    useInterval(() => {

        let _vx = vx.concat();
        let _vy = vy.concat();
        let _x = x.concat();
        let _y = y.concat();

        // update velocity
        _vx = _vx.map((val, index) => val + ax[index] * dt / 2)
        _vy = _vy.map((val, index) => val + ay[index] * dt / 2)

        // update position
        _x = _x.map((val, index) => val + _vx[index] * dt);
        _y = _y.map((val, index) => val + _vy[index] * dt);

        // update acceleration 
        const [_ax, _ay] = calcAcceleration(_x, _y, _vx, _vy, m, h, k, n, nu, lambda);
        setAx(_ax)
        setAy(_ay)

        // update velocity and position
        setX(_x)
        setY(_y)
        _vx = _vx.map((val, index) => val + _ax[index] * dt / 2)
        _vy = _vy.map((val, index) => val + _ay[index] * dt / 2)
        setVx(_vx)
        setVy(_vy)

        setT(prev => prev + dt);

        let density = calcDensity(_x, _y, m, h);
        setDensity(density.map(val => val / Math.max(...density)));
        setNumOfParticle(numOfParticle);

    }, isPlaying ? delay : null)



    return (

        <Ratio
            aspectRatio={'1x1'}
            bsPrefix={`canvas ${background}`}
            onWheel={(e) => zoomIn(e)}
            ref={ref}
        >
            <div className='w-100 canvas--container' >
                {Particles}
                <div className='w-100 canvas--items'>
                    <p className={`counter text-${darkMode ? 'light' : 'dark'}`}> t = {t.toFixed(2)}</p>
                    <div className={`canvas--panel`}>
                        <Button
                            variant={darkMode ? 'dark' : 'info'}
                            onClick={resetSPH}
                        >{isPlaying ? 'Restart' : 'Continue'}</Button>
                        {isPlaying && <Button
                            variant={darkMode ? 'dark' : 'info'}
                            onClick={energyInject}
                        >Pause</Button>}
                    </div>
                </div>
            </div>
        </Ratio>
    )
}

export default SPH