import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import Particle from './particle/Particle';
import { calcAcceleration, calcDensity } from './physics';
import { useInterval } from '../../hooks';
import { Sandbox } from '..';
import { gamma } from 'mathjs'

import './SPH.css'



const SPH = () => {


    // calcualte the mean of the array
    const arrayMean = (arr) => arr.reduce((a, b) => a + b) / arr.length;

    const [delay, setDelay] = useState(10);
    const [isPlaying, setPlaying] = useState(true)

    // hook for number of particles
    const [numOfParticle, setNumOfParticle] = useState(30);


    // paramters for simulation
    const [t, setT] = useState(0);
    let dt = 0.04
    let M = 1        // mass of the whole star.
    let m = M / numOfParticle  // mass of each particles
    let h = 0.1      // smoothing parameters
    let k = 0.1      // EOS constant
    let n = 1        // polytropic index
    let R = 1        // radius of the toy star
    let nu = 1       // viscosity factor
    let lambda = 2 * k * (1 + n) * Math.PI ** (-3 / (2 * n)) * (M * gamma(5 / 2 + n) / R ** 2 / gamma(1 + n)) ** (1 / n) / R  // potential

    // intial conditions
    const initialPosition = () => Array.from({ length: numOfParticle }, () => (Math.random() - 0.5) * 5);
    const initialVelocity = () => {
        const v = Array.from({ length: numOfParticle }, () => (Math.random() - 0.5));
        const meanV = arrayMean(v);
        // ensure the net velocity is zero, (mometum is not conserved.)
        return (v.map(val => val - meanV));
    };

    // all particles parameters
    const [x, setX] = useState(initialPosition());
    const [y, setY] = useState(initialPosition());
    const [vx, setVx] = useState(initialVelocity());
    const [vy, setVy] = useState(initialVelocity());

    // initial setting for density and acceleration.
    const [ax0, ay0] = calcAcceleration(x, y, vx, vy, m, h, k, n, nu, lambda)
    const [ax, setAx] = useState(ax0);
    const [ay, setAy] = useState(ay0);
    const [density, setDensity] = useState(calcDensity(x, y, m, h));

    // particles into components
    const Particles = Array.from({ length: numOfParticle },
        (item, index) =>
            <Particle
                key={index}
                id={index}
                x={x[index]}
                y={y[index]}
                density={density[index]}
            />
    );

    // main simulation loop
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

    // restart the setting.
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

    // inject energy to the particles
    const energyInject = () => {
        /**
         * Momentum is not conserved.
         */

        const dvx = initialVelocity();
        const dvy = initialVelocity();

        setVx(prev => prev.map((val, idx) => val + 5 * dvx[idx]));
        setVy(prev => prev.map((val, idx) => val + 5 * dvy[idx]));
    }


    return (

        <Sandbox>
            {Particles}
            <div className='w-100 canvas--items'>
                <p className='counter'> t = {t.toFixed(2)}</p>
                <div className={`canvas--panel`}>
                    <Button onClick={resetSPH}>
                        {isPlaying ? 'Restart' : 'Continue'}
                    </Button>
                    {isPlaying &&
                        <Button onClick={() => setPlaying(false)} >
                            Pause
                        </Button>
                    }
                    <Button onClick={energyInject} >
                        Boost
                    </Button>
                </div>
            </div>
        </Sandbox>
    )
}

export default SPH