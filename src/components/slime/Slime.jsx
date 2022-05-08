import React from 'react'
import { useState } from 'react'
import { Sandbox } from '..'
import { useInterval } from '../../hooks';
import Cell from './cell/Cell';
import './Slime.css'

const Slime = () => {

    const [pixels, setPixels] = useState(100);
    const [nCell, setNCell] = useState(200);

    const [food, setFood] = useState(
        Array.from({ length: pixels },
            v => Array.from({ length: pixels }, v => 0))
    );

    const dl = 1;         // speed of the mold
    const sa = Math.PI / 7; // sensor angle
    const so = 10

    // range of x is -100 - 100
    // range of y is -100 - 100
    const [x, setX] = useState(Array.from({ length: nCell }).map(() => 0))
    const [y, setY] = useState(Array.from({ length: nCell }).map(() => 0))
    const [direction, setDirection] = useState(
        Array.from({ length: nCell })
            .map((v, idx) => (idx / nCell * Math.PI * 2)))


    const Cells = Array.from({ length: nCell },
        (item, index) =>
            <Cell
                key={index}
                id={index}
                x={x[index]}
                y={y[index]}
            />
    );


    useInterval(() => {

        const _x = x.map(i => i);
        const _y = y.map(i => i);
        const _d = direction.map(i => i);

        for (let c = 0; c < nCell; ++c) {

            let canMove = Math.random() > 0.2;

            if (canMove) {

                let dx = dl * Math.cos(_d[c]), dy = dl * Math.sin(_d[c]);

                if (_x[c] + dx > 100 || _x[c] + dx < -100)
                    dx = -dx
                if (_y[c] + dy > 100 || _y[c] + dy < -100)
                    dy = -dy

                let nd = Math.atan2(dy, dx);
                _x[c] += dx;
                _y[c] += dy;
                _d[c] = nd;

                let i = Math.max(Math.min(Math.floor((_x[c] + 100) / 2), 99), 0);
                let j = Math.max(Math.min(Math.floor((_y[c] + 100) / 2), 99), 0);

                food[i][j] += 0.01;
            }
            else {



                let f = [_d[c], _d[c] - sa, _d[c] + sa];

                f = f.map(v => {
                    let dx = so * Math.cos(v), dy = so * Math.sin(v);
                    let i = Math.max(Math.min(Math.floor((_x[c] + dx + 100) / 2), 99), 0);
                    let j = Math.max(Math.min(Math.floor((_y[c] + dy + 100) / 2), 99), 0);
                    return food[i][j];
                })

                if (f[0] > f[1] && f[0] > f[2]) {
                    continue;
                }
                else if (f[0] < f[1] && f[0] < f[2]) {
                    _d[c] += Math.floor(2 * Math.random()) * sa;
                }
                else if (f[1] < f[2]) {
                    _d[c] += sa;
                }
                else if (f[2] < f[1]) {
                    _d[c] -= sa;
                }
            }
        }


        setX(_x);
        setY(_y);
        setDirection(_d);
    }, 100);

    return (
        <Sandbox>
            <div className='filter'>

                {Cells}
            </div>
        </Sandbox>
    )
}

export default Slime