var textFitSettings = {
    // if true, textFit will align vertically using css tables
    alignVert: false,
    // if true, textFit will set text-align: center
    alignHoriz: false,
    // if true, textFit will not set white-space: no-wrap
    multiLine: false,
    // disable to turn off automatic multi-line sensing
    detectMultiLine: true,
    minFontSize: 40,
    maxFontSize: 90,
    // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
    reProcess: true,
    // if true, textFit will fit text to element width, regardless of text height
    widthOnly: true
};

var initTextFit = function() {
    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");

    window.addEventListener("optimizedResize", function() {
        textFitDom(textFitSettings);
    });
};

var textFitDom = function(settings) {
    textFit(document.querySelector('[data-text-fit]'), settings);
};

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initTextFit();
        textFitDom(textFitSettings);
    }
}, 10);
