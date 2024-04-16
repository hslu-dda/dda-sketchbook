# Grainy Background with Easing Animations

This project creates a grainy background with p5.js and utilizes custom easing functions for the grain distribution.

## Description

The script generates a grainy gradient effect. This effect is achieved by filling the canvas with small rectangles whose color transitions from black to white based on a non-linear thresholding technique. Instead of a linear threshold, an easing function from the p5easing library is used to control the threshold. This "eased thresholding" approach allows for a smoother and more dynamic transition between black and white, providing nuanced control over the appearance of the gradient.

## Dependencies

- Obviously [p5.js](https://p5js.org/): JavaScript library for creative coding.
- [dda p5.easing](https://github.com/hslu-dda/p5easing): a library implementing Robert Penner's easing equations
