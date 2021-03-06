import React from 'react';
import { useState } from 'react';
import { useInterval } from '../../hooks';
import Cell from './cell/Cell';
import './Slime.css';

const Slime = () => {
  const pixels = 25;
  const nCell = 500;

  const [food, setFood] = useState(
    Array.from({ length: pixels }, v => Array.from({ length: pixels }, v => 0))
  );

  const h = pixels,
    w = pixels;
  const dl = 1.2; // speed of the mold
  const sa = (50 / 180) * Math.PI; // sensor angle
  const turnSpeed = (50 / 180) * Math.PI; // turn speed in rad per time;
  const so = 7; // search offset
  const deposit = 0.06; // pheromone deposit amount
  const decay = 0.7; // decay rate of the pheromone
  const searchRadius = 1; // radius for searching.

  // range of x is -100 - 100
  // range of y is -100 - 100
  const [direction, setDirection] = useState(
    Array.from({ length: nCell }).map((v, idx) => (idx / nCell) * Math.PI * 2)
  );
  const [x, setX] = useState(
    Array.from({ length: nCell }).map((v, i) => 2 * Math.cos(direction[i]))
  );
  const [y, setY] = useState(
    Array.from({ length: nCell }).map((v, i) => 2 * Math.sin(direction[i]))
  );

  const addFood = e => {
    var rect = e.target.getBoundingClientRect();

    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.

    let i = Math.max(Math.min(Math.floor((y / 300) * w), w - 1), 0);
    let j = Math.max(Math.min(Math.floor((x / 300) * w), h - 1), 0);

    setFood(prev => [...prev, (prev[i][j] = 100000000)]);
  };

  const TrailMap = Array.from({ length: pixels }, (v, i) =>
    Array.from({ length: pixels }, (v, j) => (
      <Cell
        key={i + pixels ** 2 * j}
        id={i + j}
        x={i - pixels / 2}
        y={j - pixels / 2}
        density={food[i][j] * 2}
        width={pixels}
      />
    ))
  );

  useInterval(() => {
    const _x = x.map(i => i);
    const _y = y.map(i => i);
    const _d = direction.map(i => i);
    const _food = food;

    for (let c = 0; c < nCell; ++c) {
      // food[1][1] = 1000

      let f = [_d[c], _d[c] - sa, _d[c] + sa];
      let randomSteerStrength = Math.random();

      // calculate the sensor value
      f = f.map((v, idx) => {
        let dx = so * Math.cos(v),
          dy = so * Math.sin(v);
        let i = Math.max(Math.min(Math.floor((_x[c] + dx + w) / 2), w - 1), 0);
        let j = Math.max(Math.min(Math.floor((_y[c] + dy + h) / 2), h - 1), 0);
        let sense = 0;

        for (let a = Math.max(0, i - searchRadius); a < Math.min(w, i + searchRadius); ++a) {
          for (let b = Math.max(0, j - searchRadius); b < Math.min(h, j + searchRadius); ++b) {
            sense += food[a][b] / (1 + ((i - a) ** 2 + (j - b) ** 2));
            // let them move away the boundary
            if (a === w - 1 || a === 0 || b === h - 1 || b === 0) sense -= 100;
          }
        }
        // console.log(idx, sense);
        return sense;
      });

      if (f[0] > f[1] && f[0] > f[2]) {
      } else if (f[0] < f[1] && f[0] < f[2]) {
        _d[c] += (randomSteerStrength - 0.5) * turnSpeed;
      } else if (f[1] < f[2]) {
        _d[c] += randomSteerStrength * turnSpeed;
      } else if (f[2] < f[1]) {
        _d[c] -= randomSteerStrength * turnSpeed;
      }

      let dx = dl * Math.cos(_d[c]),
        dy = dl * Math.sin(_d[c]);

      // periodic boundary condition.
      if (_x[c] + dx > w) {
        _x[c] = -w + (_x[c] + dx - w);
      }
      if (_x[c] + dx < -w) {
        _x[c] = w - _x[c] + dx + w;
      }
      if (_y[c] + dy > w) {
        _y[c] = -w + (_y[c] + dx - w);
      }
      if (_y[c] + dy < -w) {
        _y[c] = w + _y[c] + dx + w;
      }

      let nd = Math.atan2(dy, dx);
      _x[c] += dx;
      _y[c] += dy;
      _d[c] = nd;

      let i = Math.max(Math.min(Math.floor((_x[c] + w) / 2), w - 1), 0);
      let j = Math.max(Math.min(Math.floor((_y[c] + w) / 2), h - 1), 0);

      _food[i][j] += deposit;
    }
    for (let i = 0; i < w; ++i) {
      for (let j = 0; j < h; ++j) {
        _food[i][j] *= decay;
      }
    }
    setX(_x);
    setY(_y);
    setDirection(_d);
    setFood(_food);
  }, 100);

  return (
    <>
      <div className="cover" onClick={addFood}></div>
      <div className="filter">{TrailMap}</div>
    </>
  );
};

export default Slime;
