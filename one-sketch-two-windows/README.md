# Draw P5.js sketch over two windows

In case you want to stretch a P5.js sketch over two screens, this is a simple method for drawing a single sketch across two separate windows that you can then open in fullscreen on two different monitors/projectors.

sketch.js is your main sketch, that has the size of your two screens combined. e.g. 1920x1080 + 1020x1080 => 1920x2160
You do all your drawing in here.

sketch2.js opens sketch.js as a child window and then draws only the second half of the sketch.

by accessing /index2.html in your browser and allowing popups, both windows will open as new tabs, which you can drag out into two separate windows.
