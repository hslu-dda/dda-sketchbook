/*
p5.easing.js Version 0.5.0
Robert Penners Easing in p5 style
Made by lovely people at Data Design + Art, @HSLU Luzern Switzerland

See https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
to get started with some basics to write P5js libraries
*/

console.log(
  "👋 Happy Coding with p5.easing! Made with ❤️ by data & design ethusiast at Data Design+Art, HSLU Luzern Switzerland"
);

/**
 * Returns the p5 instance from the window or the global p5 instance.
 * @returns {p5} The p5 instance.
 */
function _getP5Instance() {
  return window._p5Instance || p5.instance;
}
/**
 * Adds custom easing functions to the p5 prototype.
 *
 * @param {number} startTime - The start time for the easing animation.
 * @param {number} duration - The duration of the easing animation.
 * @param {number} startValue - The starting value of the animation.
 * @param {number} endValue - The ending value of the animation.
 * @param {string} easingFunctionName - The name of the easing function to use.
 * @returns {number} The eased value at the current time.
 */
p5.prototype.ease = function (
  startTime,
  duration,
  startValue,
  endValue,
  easingFunctionName
) {
  const p = _getP5Instance();

  // If the animation hasn't started yet, return the start value
  if (startTime > p.millis()) return startValue; // Get the easing function based on the provided name
  const easingFunction = EasingFunctions[easingFunctionName]; // Calculate elapsed time and percentage completion
  const elapsedTime = p.millis() - startTime;
  const percent = Math.min(elapsedTime / duration, 1);

  // If the easing function is valid, apply it and return the result
  if (typeof easingFunction === "function") {
    return easingFunction(percent, startValue, endValue - startValue, 1);
  } else {
    // Log an error for an invalid easing function name
    console.error(`Invalid easing function name: ${easingFunctionName}`);
    return NaN;
  }
};

p5.prototype.calculateSteps = (milliseconds, frameRate = 60) => {
  const seconds = milliseconds / 1000;
  const frames = seconds * frameRate;
  return Math.ceil(frames);
};

p5.prototype.easeByFrameSteps = function (
  startFrame,
  durationFrames,
  startValue,
  endValue,
  easingFunctionName
) {
  const p = _getP5Instance();

  // If the animation hasn't started yet, return the start value
  if (startFrame > p.frameCount) return startValue;

  // Get the easing function based on the provided name
  const easingFunction = EasingFunctions[easingFunctionName];

  // Calculate frame difference and percentage completion
  const frameDifference = p.frameCount - startFrame;
  const percent = Math.min(frameDifference / durationFrames, 1);

  // If the easing function is valid, apply it and return the result
  if (typeof easingFunction === "function") {
    return easingFunction(percent, startValue, endValue - startValue, 1);
  } else {
    // Log an error for an invalid easing function name
    console.error(`Invalid easing function name: ${easingFunctionName}`);
    return NaN;
  }
};

p5.prototype.easeBySteps = function (
  currentStep,
  startStep,
  numSteps,
  startValue,
  endValue,
  easingFunctionName
) {
  // If the animation hasn't started yet, return the start value
  if (startStep > currentStep) return startValue;

  // Get the easing function based on the provided name
  const easingFunction = EasingFunctions[easingFunctionName];

  // Calculate frame difference and percentage completion
  const stepDifferense = currentStep - startStep;
  const percent = Math.min(stepDifferense / numSteps, 1);

  // If the easing function is valid, apply it and return the result
  if (typeof easingFunction === "function") {
    return easingFunction(percent, startValue, endValue - startValue, 1);
  } else {
    // Log an error for an invalid easing function name
    console.error(`Invalid easing function name: ${easingFunctionName}`);
    return NaN;
  }
};

/**
 * Returns an array of available easing function names.
 * @returns {string[]} Array of easing function names.
 */
p5.prototype.getEasingFunctionNames = () => {
  return Object.keys(EasingFunctions);
};

/**
 * Collection of Robert Penners easing functions.
 */
const EasingFunctions = {
  /*
t: Represents the elapsed time.
b: Represents the starting value.
c: Represents the change in value.
d: Represents the duration.
*/
  easeLinear(t, b, c, d) {
    return (c * t) / d + b;
  },

  easeInSine(t, b, c, d) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },

  easeInQuad(t, b, c, d) {
    t /= d;
    return c * t * t + b;
  },

  easeInCubic(t, b, c, d) {
    t /= d;
    return c * t * t * t + b;
  },
  easeInQuartic(t, b, c, d) {
    t /= d;
    return c * t * t * t * t + b;
  },
  easeInQuintic(t, b, c, d) {
    t /= d;
    return c * t * t * t * t * t + b;
  },

  easeInElastic(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    let s;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    );
  },

  easeOutSine(t, b, c, d) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },

  easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  },
  easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
  easeOutQuartic(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  },
  easeOutQuintic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
  },

  easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },

  easeOutElastic(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    let s;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    );
  },
  easeInOutSine(t, b, c, d) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  },

  easeInOutSine(t, b, c, d) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  },

  easeInOutQuartic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  },

  easeInOutQuintic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t * t * t + 2) + b;
  },

  easeInOutElastic(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d / 2) === 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    let s;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    if (t < 1) {
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      );
    }
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
      c +
      b
    );
  },
};
