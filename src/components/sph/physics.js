// gaussian kernel
function calcKernel(dx, dy, h) {
  /**
   *    dx    : the NxN Array for x distance between i to j items
   *    dy    : the NxN Array for y distance between i to j items
   *    h     : the smoothing factor
   *    return: NxN array
   */

  const N = dx.length;
  const normalize = (1 / (h * Math.sqrt(2 * Math.PI))) ** 2;
  const weight = Array(N)
    .fill()
    .map(() => Array(N).fill(0));

  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      let r2 = dx[i][j] ** 2 + dy[i][j] ** 2;
      weight[i][j] = normalize * Math.exp(-r2 / (h ** 2 * 2));
    }
  }

  return weight;
}

function calcKernelGradient(dx, dy, h) {
  /**
   *    2D derivative of the Gaussian Kernel
   *
   *    dx    : the NxN Array for x distance between i to j items
   *    dy    : the NxN Array for y distance between i to j items
   *    h     : the smoothing factor
   *    return: NxN array
   */

  let N = dx.length;

  let wx = Array(N)
    .fill()
    .map(() => Array(N).fill(0));
  let wy = Array(N)
    .fill()
    .map(() => Array(N).fill(0));

  const normalize = (1 / (h * Math.sqrt(2 * Math.PI))) ** 2 * (-1 / h ** 2);

  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      let r2 = dx[i][j] ** 2 + dy[i][j] ** 2;

      // equation for 2d gaussian

      const gaussian = Math.exp(-r2 / (h ** 2 * 2));

      wx[i][j] = normalize * gaussian * dx[i][j];
      wy[i][j] = normalize * gaussian * dy[i][j];
    }
  }

  return [wx, wy];
}

function calcSeperations(x, y) {
  /**
   * Calculate the seperation between every particles.
   */
  const n = x.length;

  let dx = Array(n)
    .fill()
    .map(() => Array(n).fill(0));
  let dy = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      dx[i][j] = x[i] - x[j];
      dy[i][j] = y[i] - y[j];
    }
  }

  return [dx, dy];
}

function calcDensity(x, y, m, h) {
  /**
   * Calculate the density of the current particle field.
   */

  // calculate the seperation between points.
  const [dx, dy] = calcSeperations(x, y);

  // calculate the weighting after the Kernel smoothing.
  const r = calcKernel(dx, dy, h);

  // sum of weight for each particles.
  const density = r.map(arrayEach => m * arrayEach.reduce((sum, value) => sum + value));

  return density;
}

function calcPressure(density, k, n) {
  /**
   * Calculate the pressure given the density field and polytropic index.
   */
  const pressure = density.map(value => k * value ** (1 + 1 / n));

  return pressure;
}

function calcAcceleration(x, y, vx, vy, m, h, k, n, nu, lambda) {
  /**
   *
   * Calculate the acceleration for update.
   */

  const N = x.length;
  const density = calcDensity(x, y, m, h);
  const pressure = calcPressure(density, k, n);
  const [dx, dy] = calcSeperations(x, y);
  const [dwx, dwy] = calcKernelGradient(dx, dy, h);
  const ax = Array(N).fill(0);
  const ay = Array(N).fill(0);

  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      ax[i] -= m * (pressure[i] / density[i] ** 2 + pressure[j] / density[j] ** 2) * dwx[i][j];
      ay[i] -= m * (pressure[i] / density[i] ** 2 + pressure[j] / density[j] ** 2) * dwy[i][j];
    }
    ax[i] -= lambda * x[i] + nu * vx[i];
    ay[i] -= lambda * y[i] + nu * vy[i];
  }

  return [ax, ay];
}

export { calcAcceleration, calcDensity };
