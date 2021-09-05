//----------------------------------------------------
// NOTE: Legend of required object properties
//----------------------------------------------------
// width        : (NUMBER) width of rectangle in pixels
// height       : (NUMBER) height of rectangle in pixels
// "color"      : (STRING) hex color of our rectangle
// "parent"     : (ELEMENT) div/parent of where this rectangle will reside
//----------------------------------------------------
function Rectangle(obj) {
    this.parent = obj.parent;
    this.colorStr;
    this.onclickFunction;
    this.onmouseoverFunction;
    this.onmouseoutFunction;

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.overflow = "hidden";
    this.container.style.cursor = "pointer";
    this.width = obj.width;
    this.height = obj.height;
    this.color = obj.color;

    // Pointer Events
    if (obj.pointerEvents) {
        this.container.style.pointerEvents = obj.pointerEvents;
    }

    // Opacity
    if (obj.opacity) {
        this.container.style.opacity = obj.opacity;
    } else {
        this.container.style.opacity = 1;
    }

    // Adds rounded edges to our rectangle
    if (obj.borderRadius) {
        this.container.style.borderRadius = obj.borderRadius + "px";
        this.container.style.MozBorderRadius = obj.borderRadius + "px"; // Mozilla
        this.container.style.WebkitBorderRadius = obj.borderRadius + "px"; // WebKit
    }

    // Adds blend mode to rectangle
    if (obj.mixBlendMode) {
        this.container.style.mixBlendMode = this.container.style.webkitMixBlendMode = obj.blendMode;
    }
    ;

    // Append
    this.parent.appendChild(this.container);

    // Sets ID of container div
    if (obj.id) {
        this.id = obj.id;
    }

    // Mouse Events (if they exist in the object parameter)
    if (obj.onclick) {
        this.onclick = obj.onclick;
    }

    if (obj.onmouseover) {
        this.onmouseover = obj.onmouseover;
    }

    if (obj.onmouseout) {
        this.onmouseout = obj.onmouseout;
    }
}

// Setters and getters
Rectangle.prototype = {
    get width() {
        return parseInt(this.container.offsetWidth);
    },
    set width(n) {
        var testValue = "0" + n;
        this.container.style.width = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get height() {
        return parseInt(this.container.offsetHeight);
    },
    set height(n) {
        var testValue = "0" + n;
        this.container.style.height = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get color() {
        return this.colorStr;
    },
    set color(s) {
        this.colorStr = s;
        this.container.style.backgroundColor = this.colorStr;
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        this.container.style.left = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        this.container.style.top = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get opacity() {
        return parseInt(this.container.style.opacity);
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    set rotation(n) {
        this.container.style.transform = this.container.style.webkitTransform = this.container.style.MozTransform = this.container.style.oTransform = this.container.style.msTransform = "rotate(" + n + "deg)";

    },
    set visibility(s) {
        this.container.style.visibility = s;
    },
    get div() {
        return this.container;
    },
    set onclick(f) {
        this.onclickFunction = f;
        this.container.onclick = f;
    },
    set onmouseover(f) {
        this.onmouseoverFunction = f;
        this.container.onmouseover = f;
    },
    set onmouseout(f) {
        this.onmouseoutFunction = f;
        this.container.onmouseout = f;
    },
    set id(s) {
        this.container.id = s;
    },
    get id() {
        return this.container.id;
    }
}

Rectangle.prototype.disableClick = function () {
    this.container.onclick = null;
}

Rectangle.prototype.enableClick = function () {
    this.container.onclick = this.onclickFunction;
}

Rectangle.prototype.disableMouseOver = function () {
    this.container.onmouseover = null;
}

Rectangle.prototype.enableMouseOver = function () {
    this.container.onmouseover = this.onmouseoverFunction;
}

//----------------------------------------------------
// NOTE: Legend of required object properties
//----------------------------------------------------
// src      : (STRING) the URL of where our image resides
// parent     : (ELEMENT) div/parent of where this image holder will reside
//----------------------------------------------------
function ImageHolder(obj) {
    this.obj = obj;
    this.parent = obj.parent;
    this.isLoaded = false;
    this.isError = false;

    this.rotationNum = 0;

    this.onclickFunction;
    this.onmouseoverFunction;
    this.onmouseoutFunction;

    this.img;
    this.imageWidth;
    this.imageHeight;
    this.isBackground = (obj.isBackground) ? obj.isBackground : false;

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.overflow = "hidden";
    this.container.style.cursor = "pointer";
    this.container.style.verticalAlign = "top";
    this.container.style.opacity = 1;

    // If draggable
    if (obj.draggable) {
        this.container.setAttribute("draggable", obj.draggable);
    }

    // Pointer Events
    if (obj.pointerEvents) {
        this.container.style.pointerEvents = obj.pointerEvents;
    }

    // Adds rounded edges to our image
    if (obj.borderRadius) {
        this.container.style.borderRadius = obj.borderRadius + "px";
        this.container.style.MozBorderRadius = obj.borderRadius + "px"; // Mozilla
        this.container.style.WebkitBorderRadius = obj.borderRadius + "px"; // WebKit
    }

    // Add glow
    if (obj.glow) {
        this.container.style.boxShadow = obj.glow /*"5px 5px 5px #000000"*/;
        this.container.style.webkitBoxShadow = obj.glow /*"5px 5px 5px #000000"*/;
        this.container.style.mozBoxShadow = obj.glow /*"5px 5px 5px #000000"*/;
        this.container.style.msBoxShadow = obj.glow /*"5px 5px 5px #000000"*/;
    }

    // Adds Border
    if (obj.borderTop) {
        this.container.style.borderTop = obj.borderTop;
    }
    if (obj.borderBottom) {
        this.container.style.borderBottom = obj.borderBottom;
    }
    if (obj.borderLeft) {
        this.container.style.borderLeft = obj.borderLeft;
    }
    if (obj.borderRight) {
        this.container.style.borderRight = obj.borderRight;
    }

    // Adds blend filters if needed
    if (obj.blendMode) {
        this.container.style.mixBlendMode = this.container.style.webkitMixBlendMode = obj.blendMode;
    }
    ;

    // Event Listener dispatcher in case you want to listen if this has loaded
    this.evt = document.createEvent("Event");
    this.evt.initEvent("onimageload", true, false);

    // Event Listener dispatcher in case you want to listen if this has loaded
    this.errorEvt = document.createEvent("Event");
    this.errorEvt.initEvent("onimageerror", true, false);

    // Append
    this.parent.appendChild(this.container);

    // Sets ID of container div
    if (obj.id) {
        this.id = obj.id;
    }

    // Mouse Events (if they exist in the object parameter of the ImageHolder object)
    if (obj.onclick) {
        this.onclick = obj.onclick;
    }

    if (obj.onmouseover) {
        this.onmouseover = obj.onmouseover;
    }

    if (obj.onmouseout) {
        this.onmouseout = obj.onmouseout;
    }

    // if the image is a string path
    if (typeof obj.src === "string") {
        // Loads in our image
        this.img = new Image();
        this.img.src = obj.src;
    }
    // if image is an image object
    else {
        //console.log(obj.src);
        this.img = obj.src;
    }

    // Image onLoad Event
    this.img.onload = this.imageLoadSuccess();

    // Image Error Event
    this.img.onerror = this.imageLoadError();
}

// Setters and getters
ImageHolder.prototype = {
    get width() {
        return parseInt(this.container.offsetWidth);
    },
    set width(n) {
        var testValue = "0" + n;

        this.container.style.width = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get height() {
        return parseInt(this.container.offsetHeight);
    },
    set height(n) {
        var testValue = "0" + n;
        this.container.style.height = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        if (testValue.substr(testValue.length - 2) == "px") {
            this.container.style.left = n;
        } else if (testValue.substr(testValue.length - 1) == "%") {
            this.container.style.left = n;
        } else {
            this.container.style.left = n + "px";
        }
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        if (testValue.substr(testValue.length - 2) == "px") {
            this.container.style.top = n;
        } else if (testValue.substr(testValue.length - 1) == "%") {
            this.container.style.top = n;
        } else {
            this.container.style.top = n + "px";
        }
    },
    get opacity() {
        return this.container.style.opacity;
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    get rotation() {
        return this.rotationNum;
    },
    set rotation(n) {
        this.rotationNum = n;
        this.container.style.transform = this.container.style.webkitTransform = this.container.style.MozTransform = this.container.style.oTransform = this.container.style.msTransform = "rotate(" + this.rotationNum + "deg)";
    },
    get visibility() {
        return this.container.style.visibility;
    },
    set visibility(s) {
        this.container.style.visibility = s;
    },
    get div() {
        return this.container;
    },
    set zIndex(n) {
        this.container.style.zIndex = n;
    },
    set selectable(s) {
        this.container.style["-khtml-user-select"] = this.container.style["-webkit-user-select"] = this.container.style["-o-user-select"] = this.container.style["-ms-user-select"] = this.container.style["user-select"] = s;
        this.container.style["-moz-user-select"] = "-moz-" + s;

        this.img.style["-khtml-user-select"] = this.img.style["-webkit-user-select"] = this.img.style["-o-user-select"] = this.img.style["-ms-user-select"] = this.img.style["user-select"] = s;
        this.img.style["-moz-user-select"] = "-moz-" + s;
        this.img.style["user-drag"] = this.img.style["-webkit-user-drag"] = "none";
    },
    set draggable(b) {
        if (b) {
            this.container.setAttribute("draggable", "true");
        } else if (!b) {
            this.container.setAttribute("draggable", "false");
        } else {
            this.container.setAttribute("draggable", "auto");
        }
    },
    set onclick(f) {
        this.onclickFunction = f;
        this.container.onclick = f;
    },
    set onmouseover(f) {
        this.onmouseoverFunction = f;
        this.container.onmouseover = f;
    },
    set onmouseout(f) {
        this.onmouseoutFunction = f;
        this.container.onmouseout = f;
    },
    set id(s) {
        this.container.id = s;
    },
    get id() {
        return this.container.id;
    }
}

ImageHolder.prototype.preloader = function (root) {
    if (root.img.contentDocument !== null || root.img.contentDocument !== undefined) {
        clearInterval(root.preloadInterval);
        root.imageLoadSuccess()
        //console.log(root.img.contentDocument);
    }
}

ImageHolder.prototype.imageLoadSuccess = function () {
    if (!this.isBackground) {
        this.clonedImg = this.img.cloneNode(true);

        this.clonedImg.style.width = "100%";
        this.clonedImg.style.height = "100%";

        this.container.appendChild(this.img.cloneNode(true));
    } else if (this.isBackground) {
        this.container.style.backgroundImage = "url('" + this.obj.src + "')";
    }

    this.renderCheckInterval = setInterval((function (root) {
        return function () {
            if (root.container.style.width == "0px" || root.container.style.height == "0px") {
                root.container.style.width = root.img.width + "px";
                root.container.style.height = root.img.height + "px";

                root.imageWidth = root.img.width;
                root.imageHeight = root.img.height;
            } else if (root.container.style.width != "0px" && root.container.style.height != "0px") {
                // clears render checker interval
                clearInterval(root.renderCheckInterval);

                // These lines indicate of the image has loaded or not.  Used for preloading purposes
                root.isLoaded = true;
                root.container.dispatchEvent(root.evt);

                // This property is used if you want to resize the images automatically
                if (root.obj.resizeDimensions) {
                    root.resizeImage(root.obj.resizeDimensions);
                }
            }
        }
    })(this), 1);
}

ImageHolder.prototype.imageLoadError = function () {
    this.isError = true;
    this.container.dispatchEvent(this.errorEvt);
}

ImageHolder.prototype.disableClick = function () {
    this.container.onclick = null;
}

ImageHolder.prototype.enableClick = function () {
    this.container.onclick = this.onclickFunction;
}

ImageHolder.prototype.disableMouseOver = function () {
    this.container.onmouseover = null;
}

ImageHolder.prototype.enableMouseOver = function () {
    this.container.onmouseover = this.onmouseoverFunction;
}

ImageHolder.prototype.resizeImage = function (obj) {
    var percentage;

    if (obj.width < obj.height) {
        percentage = obj.width / this.imageWidth;
    } else if (obj.height < obj.width) {
        //console.log(obj.height)
        percentage = obj.height / this.imageHeight;
    } else if (obj.width == obj.height) {
        percentage = obj.width / this.imageWidth;
    }

    this.width = this.imageWidth * percentage;
    this.height = this.imageHeight * percentage;
}

//----------------------------------------------------
// NOTE: Legend of required object properties
//----------------------------------------------------
// text          : (STRING) what we want our text to say
// fontFamily    : (STRING) the font we want to use in our text field
// color         : (STRING) the hex color of our font
// fontSize      : (NUMBER) the size of our font
// lineHeight    : (NUMBER) the line height of our text in pixels
// letterSpacing : (NUMBER) the letter spacing of our text in pixels
// align         : (STRING) the alignment of our text.  Can be set to 'left', 'center', and 'right'
// "parent"      : (ELEMENT) div/parent of where this text field will reside
//----------------------------------------------------
function TextField(obj) {
    this.obj = obj;
    this.parent = obj.parent;
    this.color1 = obj.color1;
    this.color2 = obj.color2;
    this.direction = "vertical";
    this.colorStr;

    this.onclickFunction;
    this.onmouseoverFunction;
    this.onmouseoutFunction;

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    //this.container.style.overflow        = "hidden";
    this.container.style.cursor = "pointer";
    this.container.style.wordWrap = "normal";
    this.container.style.display = "table";
    this.container.style.verticalAlign = "top";
    this.container.style.opacity = 1;

    // Event Listener dispatcher in case you want to listen if this has loaded
    this.evt = document.createEvent("Event");
    this.evt.initEvent("textResized", true, false);

    // Pointer Events
    if (obj.pointerEvents) {
        this.container.style.pointerEvents = obj.pointerEvents;
    }

    // Handles White Space
    if (obj.whiteSpace) {
        this.container.style.whiteSpace = obj.whiteSpace;
    }

    // Handles Font Weight
    if (obj.fontWeight) {
        this.container.style.fontWeight = obj.fontWeight;
    }

    // Cases for width & height
    if (obj.width) {
        this.container.style.width = obj.width + "px"
    } else {
        this.container.style.width = "auto";
    }

    if (obj.height) {
        this.container.style.height = obj.height + "px"
    } else {
        this.container.style.height = "auto";
    }

    if (obj.textShadow) {
        this.container.style.textShadow = obj.textShadow.hShadow + "px " + obj.textShadow.vShadow + "px " + obj.textShadow.blurRadius + "px " + obj.textShadow.color;
    }

    // Append
    this.parent.appendChild(this.container);

    // Sets ID of container div
    if (obj.id) {
        this.id = obj.id;
    }

    // Mouse Events (if they exist in the object parameter of the ImageHolder object)
    if (obj.onclick) {
        this.onclick = obj.onclick;
    }

    if (obj.onmouseover) {
        this.onmouseover = obj.onmouseover;
    }

    if (obj.onmouseout) {
        this.onmouseout = obj.onmouseout;
    }

    // Sets our properties
    this.align = obj.align;
    this.fontFamily = obj.fontFamily;
    this.text = obj.text;
    this.fontSize = obj.fontSize;
    this.letterSpacing = obj.letterSpacing;
    this.lineHeight = obj.lineHeight;

    if (obj.resize) {
        this.resizeDimensions = obj.resize;
        this.opacity = 0;

        setTimeout((function (root) {
            return function () {
                //root.opacity = 0;
            }
        })(this), 200);
        setTimeout((function (root) {
            return function () {
                if (root.width > root.obj.resize.width || root.height > root.obj.resize.height) {
                    root.resize();
                } else {
                    root.opacity = 1;
                }
            }
        })(this), 800);
    } else if (!obj.resizeDimensions) {
        //this.opacity = 1;
    }

    // For single colors
    if (obj.color) {
        this.fontColor = obj.color;
    }

    if (!obj.isMouseChildren) {
        setTimeout((function (root) {
            return function () {
                root.hitArea = new Rectangle({
                    width: parseInt(root.container.offsetWidth),
                    height: parseInt(root.container.offsetHeight),
                    color: "#000000",
                    parent: root.container
                });
                root.hitArea.opacity = 0;
            }
        })(this), 1200);
    }

    // For gradients
    if (obj.color1 && obj.color2) {
        // These vars will get the correct gradient syntax base on the user's browser
        this.gradientPrefix = this.getCssValuePrefix('backgroundImage', 'linear-gradient(left, #fff, #fff)');
        this.gradientOrientation = this.getGradientOrientation(this.gradientPrefix);

        // Creates our gradient
        this.createGradientText();
    }

}

// Setters and getters
TextField.prototype = {
    get text() {
        return this.container.innerHTML;
    },
    set text(s) {
        this.container.innerHTML = s;
    },
    set fontFamily(s) {
        this.container.style.fontFamily = s;
    },
    set fontSize(n) {
        var testValue = "0" + n;
        this.container.style.fontSize = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get fontSize() {
        return parseInt(this.container.style.fontSize);
    },
    get fontColor() {
        return this.colorStr;
    },
    set fontColor(s) {
        this.colorStr = s;
        this.container.style.color = this.colorStr;
    },
    get red() {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorStr);
        return parseInt(result[1], 16);
    },
    set red(n) {
        var hexValue = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorStr);
        var value = n;

        hex = function (c) {
            var value = c.toString(16);
            return value.length == 1 ? "0" + value : value;
        }

        if (value <= 0) {
            value = 0;
        } else if (value >= 255) {
            value = 255;
        }

        var r = Math.round(value);
        var g = parseInt(hexValue[2], 16);
        var b = parseInt(hexValue[3], 16);

        this.fontColor = this.colorStr = ("#" + hex(r) + hex(g) + hex(b)).toUpperCase();
    },
    get green() {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorStr);

        return parseInt(result[2], 16);
    },
    set green(n) {
        var hexValue = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorStr);
        var value = n;

        hex = function (c) {
            var value = c.toString(16);
            return value.length == 1 ? "0" + value : value;
        }

        if (value <= 0) {
            value = 0;
        } else if (value >= 255) {
            value = 255;
        }

        var r = parseInt(hexValue[1], 16);
        var g = Math.round(parseInt(value));
        var b = parseInt(hexValue[3], 16);

        this.fontColor = this.colorStr = ("#" + hex(r) + hex(g) + hex(b)).toUpperCase();
    },
    get blue() {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorStr);

        return parseInt(result[3], 16);
    },
    set blue(n) {
        var hexValue = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorStr);
        var value = n;

        hex = function (c) {
            var value = c.toString(16);
            return value.length == 1 ? "0" + value : value;
        }

        if (value <= 0) {
            value = 0;
        } else if (value >= 255) {
            value = 255;
        }

        var r = parseInt(hexValue[1], 16);
        var g = parseInt(hexValue[2], 16);
        var b = Math.round(parseInt(value));

        this.fontColor = this.colorStr = ("#" + hex(r) + hex(g) + hex(b)).toUpperCase();
    },
    set align(s) {
        this.container.style.textAlign = s;
    },
    get width() {
        return parseInt(this.container.offsetWidth);
    },
    set width(n) {
        var testValue = "0" + n;
        this.container.style.width = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get height() {
        return parseInt(this.container.offsetHeight);
    },
    set height(n) {
        var testValue = "0" + n;
        this.container.style.height = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        if (testValue.substr(testValue.length - 2) == "px") {
            this.container.style.left = n;
        } else if (testValue.substr(testValue.length - 1) == "%") {
            this.container.style.left = n;
        } else {
            this.container.style.left = n + "px";
        }
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        if (testValue.substr(testValue.length - 2) == "px") {
            this.container.style.top = n;
        } else if (testValue.substr(testValue.length - 1) == "%") {
            this.container.style.top = n;
        } else {
            this.container.style.top = n + "px";
        }
    },
    get opacity() {
        return parseInt(this.container.style.opacity);
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    set lineHeight(n) {
        var testValue = "0" + n;
        this.container.style.lineHeight = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get lineHeight() {
        return parseInt(this.container.style.lineHeight);
    },
    set letterSpacing(n) {
        var testValue = "0" + n;
        this.container.style.letterSpacing = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get letterSpacing() {
        return parseInt(this.container.style.letterSpacing);
    },
    set rotation(n) {
        this.container.style.transform = this.container.style.webkitTransform = this.container.style.MozTransform = this.container.style.oTransform = this.container.style.msTransform = "rotate(" + n + "deg)";

    },
    get visibility() {
        return this.container.style.visibility;
    },
    set visibility(s) {
        this.container.style.visibility = s;
    },
    get div() {
        return this.container;
    },
    get id() {
        return this.container.id;
    },
    set id(s) {
        this.container.id = s;
    },
    set onclick(f) {
        this.onclickFunction = f;
        this.container.onclick = f;
    },
    set onmouseover(f) {
        this.onmouseoverFunction = f;
        this.container.onmouseover = f;
    },
    set onmouseout(f) {
        this.onmouseoutFunction = f;
        this.container.onmouseout = f;
    },
    set pointerEvents(s) {
        this.container.style.pointerEvents = s;
    }
}

TextField.prototype.disableClick = function () {
    this.container.onclick = null;
}

TextField.prototype.enableClick = function () {
    this.container.onclick = this.onclickFunction;
}

TextField.prototype.disableMouseOver = function () {
    this.container.onmouseover = null;
}

TextField.prototype.enableMouseOver = function () {
    this.container.onmouseover = this.onmouseoverFunction;
}

// Detect which browser prefix to use for the specified CSS value
// (e.g., background-image: -moz-linear-gradient(...);
//        background-image:   -o-linear-gradient(...); etc).
TextField.prototype.getCssValuePrefix = function (name, value) {
    var prefixes = ['', '-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {
        // Attempt to set the style
        dom.style[name] = prefixes[i] + value;

        // Detect if the style was successfully set
        if (dom.style[name]) {
            return prefixes[i];
        }
        dom.style[name] = '';   // Reset the style
    }
}

// Based on different browsers, this function will generate the right gradient syntax
// for horizontal and vertical gradients
TextField.prototype.getGradientOrientation = function (str) {
    if (this.direction == 'vertical') {
        switch (str) {
            case '':
                return 'to bottom';
                break;
            case '-o-':
                return 'top';
                break;
            case '-ms-':
                return 'top';
                break;
            case '-moz-':
                return 'top';
                break;
            case '-webkit-':
                return 'top';
                break;
        }
    } else if (this.direction == 'horizontal') {
        switch (str) {
            case '':
                return 'to right';
                break;
            case '-o-':
                return 'left';
                break;
            case '-ms-':
                return 'left';
                break;
            case '-moz-':
                return 'left';
                break;
            case '-webkit-':
                return 'left';
                break;
        }
    }
}

// This function will apply the gradient to our background
TextField.prototype.createGradientText = function () {
    if (this.gradientPrefix != "-moz-") {
        this.container.style.backgroundImage = this.gradientPrefix + "linear-gradient(" + this.gradientOrientation + ", " + this.color1 + ", " + this.color2 + ")";
        this.container.style[this.gradientPrefix + "background-clip"] = "text";
        this.container.style[this.gradientPrefix + "text-fill-color"] = "transparent";
    } else {
        this.fontColor = this.color1;
    }
    //this.container.style[this.gradientPrefix + "mask-image"] = this.gradientPrefix + "linear-gradient("+ this.gradientOrientation + ", " + this.color1 + ", " + this.color2 + ")";
}

TextField.prototype.resize = function () {
    while (this.height > this.resizeDimensions.height || this.width > this.resizeDimensions.width) {
        this.fontSize -= 1;
        this.lineHeight -= 1;

        if (this.height <= this.resizeDimensions.height && this.width <= this.resizeDimensions.width) {
            setTimeout((function (root) {
                return function () {
                    root.opacity = 1;
                    root.container.dispatchEvent(root.evt);
                    root.isResized = true;
                }
            })(this), 250);
        }

        //root.text = root.obj.text;
        /*console.log("ACTUAL WIDTH: "+this.width+" | RESIZE WIDTH"+this.resizeDimensions.width);
        console.log("ACTUAL HEIGHT: "+this.height+" | RESIZE HEIGHT"+this.resizeDimensions.height);
        console.log("-------------------------------------------------");*/
    }
}

//----------------------------------------------------
// NOTE: Legend of required object properties
//----------------------------------------------------
// src      : (STRING) the URL of where our image resides
// parent     : (ELEMENT) div/parent of where this image holder will reside
//----------------------------------------------------
function PriceCharacter(obj) {
    this.obj = obj;
    this.parent = obj.parent;

    this.isLoaded = false;
    this.preloadItemsArr = [];

    // Loading event
    this.evt = document.createEvent("Event");
    this.evt.initEvent("priceCharacterLoaded", true, false);

    this.digitFrameArr = [];

    this.calculatedWidth;

    // Transition function
    this.transitionFunction = function () {
    };

    // If the character will be going through some kind of transition animation
    this.isTransitionBool = this.obj.isTransition;

    // The duration of the transition animation
    this.duration = this.obj.duration;

    this.isInitVisibile = this.obj.isInitVisible;

    // The character or glyph
    this.character = this.obj.character.toString();

    // Is this the last character animating
    this.isLastCharacterBool = this.obj.isLastCharacter;

    // Event Listener dispatcher in case you want to listen if this has loaded
    this.animationEvt = document.createEvent("Event");
    this.animationEvt.initEvent("onAnimationComplete", true, false);

    this.shiftDollarSignEvt = document.createEvent("Event");
    this.shiftDollarSignEvt.initEvent("onDollarSignShift", true, false);

    this.shiftCentSignEvt = document.createEvent("Event");
    this.shiftCentSignEvt.initEvent("onCentSignShift", true, false);

    this.shiftDollarCharacterEvt = document.createEvent("Event");
    this.shiftDollarCharacterEvt.initEvent("onDollarCharacterShift", true, false);

    this.shiftCentCharacterEvt = document.createEvent("Event");
    this.shiftCentCharacterEvt.initEvent("onCentCharacterShift", true, false);

    this.lastCharacterEvt = document.createEvent("Event");
    this.lastCharacterEvt.initEvent("onLastCharacter", true, false);

    // Character Array
    this.characterTypeArr = [{
        type: "symbol", width: 18, height: 55,
        characters: [{glyph: "$", frame: 1},
            {glyph: "N/A_$", frame: 1},
            {glyph: "¢", frame: 2},
            {glyph: "N/A_¢", frame: 2},
        ]
    },
        {
            type: "dollar", width: 30, height: 55,
            characters: [{glyph: "9", previousGlyph: "0", frame: 10},
                {glyph: "8", previousGlyph: "9", frame: 9},
                {glyph: "7", previousGlyph: "8", frame: 8},
                {glyph: "6", previousGlyph: "7", frame: 7},
                {glyph: "5", previousGlyph: "6", frame: 6},
                {glyph: "4", previousGlyph: "5", frame: 5},
                {glyph: "3", previousGlyph: "4", frame: 4},
                {glyph: "2", previousGlyph: "3", frame: 3},
                {glyph: "1", previousGlyph: "2", frame: 2},
                {glyph: "0", previousGlyph: "1", frame: 1},
                {glyph: "N/A", previousGlyph: "0"}
            ]
        },
        {
            type: "cent", width: 17, height: 55,
            characters: [{glyph: "9", previousGlyph: "0", frame: 10},
                {glyph: "8", previousGlyph: "9", frame: 9},
                {glyph: "7", previousGlyph: "8", frame: 8},
                {glyph: "6", previousGlyph: "7", frame: 7},
                {glyph: "5", previousGlyph: "6", frame: 6},
                {glyph: "4", previousGlyph: "5", frame: 5},
                {glyph: "3", previousGlyph: "4", frame: 4},
                {glyph: "2", previousGlyph: "3", frame: 3},
                {glyph: "1", previousGlyph: "2", frame: 2},
                {glyph: "0", previousGlyph: "1", frame: 1},
                {glyph: "N/A", previousGlyph: "0"}
            ]
        }
    ];

    this.getFrame = function (obj) {
        for (var i = 0; i < this.characterTypeArr.length; i++) {
            if (obj.type == this.characterTypeArr[i].type) {
                for (var j = 0; j < this.characterTypeArr[i].characters.length; j++) {
                    if (obj.character == this.characterTypeArr[i].characters[j].glyph) {
                        return this.characterTypeArr[i].characters[j].frame;
                        break;
                    }
                }
            }
        }
    }

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.overflow = "visible";
    for (var i = 0; i < this.characterTypeArr.length; i++) {
        if (this.obj.type == this.characterTypeArr[i].type) {
            this.characterObj = this.characterTypeArr[i];
            this.calculatedWidth = this.characterTypeArr[i].width;
            this.container.style.width = this.characterTypeArr[i].width + "px";
            this.container.style.height = this.characterTypeArr[i].height + "px";
        }
    }
    this.container.style.verticalAlign = "top";
    this.container.style.opacity = (this.isInitVisibile) ? 1 : 0;
    if (obj.id) {
        this.container.id = obj.id;
    }
    this.parent.appendChild(this.container);

    // Next Number - Top
    this.nextNumberTopDiv = document.createElement("div");
    this.nextNumberTopDiv.style.position = "absolute";
    this.nextNumberTopDiv.style.overflow = "hidden";
    this.nextNumberTopDiv.style.verticalAlign = "top";
    this.nextNumberTopDiv.style.backgroundColor = myFT.instantAds.backgroundColor;
    this.nextNumberTopDiv.style.opacity = 1;
    this.nextNumberTopDiv.style.left = "0px";
    this.nextNumberTopDiv.style.top = "0px";
    this.nextNumberTopDiv.style.width = this.characterObj.width + "px";
    this.nextNumberTopDiv.style.height = (this.characterObj.height / 2) + "px";

    // Previous Number - Bottom
    this.prevNumberBottomDiv = document.createElement("div");
    this.prevNumberBottomDiv.style.position = "absolute";
    this.prevNumberBottomDiv.style.overflow = "hidden";
    this.prevNumberBottomDiv.style.verticalAlign = "top";
    this.prevNumberBottomDiv.style.backgroundColor = myFT.instantAds.backgroundColor;
    this.prevNumberBottomDiv.style.opacity = 1;
    this.prevNumberBottomDiv.style.left = "0px";
    this.prevNumberBottomDiv.style.top = (this.characterObj.height / 2) + "px";
    this.prevNumberBottomDiv.style.width = this.characterObj.width + "px";
    this.prevNumberBottomDiv.style.height = (this.characterObj.height / 2) + "px";

    // Previous Number - Top
    this.prevNumberTopDiv = document.createElement("div");
    this.prevNumberTopDiv.style.position = "absolute";
    this.prevNumberTopDiv.style.overflow = "hidden";
    this.prevNumberTopDiv.style.verticalAlign = "top";
    this.prevNumberTopDiv.style.backgroundColor = myFT.instantAds.backgroundColor;
    this.prevNumberTopDiv.style.opacity = 1;
    this.prevNumberTopDiv.style.left = "0px";
    this.prevNumberTopDiv.style.top = "0px";
    this.prevNumberTopDiv.style.width = this.characterObj.width + "px";
    this.prevNumberTopDiv.style.height = (this.characterObj.height / 2) + "px";
    TweenMax.set(this.prevNumberTopDiv, {transformOrigin: "left top"});

    // Next Number - Bottom
    this.nextNumberBottomDiv = document.createElement("div");
    this.nextNumberBottomDiv.style.position = "absolute";
    this.nextNumberBottomDiv.style.overflow = "hidden";
    this.nextNumberBottomDiv.style.verticalAlign = "top";
    this.nextNumberBottomDiv.style.backgroundColor = myFT.instantAds.backgroundColor;
    this.nextNumberBottomDiv.style.opacity = 1;
    this.nextNumberBottomDiv.style.left = "0px";
    this.nextNumberBottomDiv.style.top = (this.characterObj.height / 2) + "px";
    this.nextNumberBottomDiv.style.width = this.characterObj.width + "px";
    this.nextNumberBottomDiv.style.height = (this.characterObj.height / 2) + "px";
    this.nextNumberBottomDiv.style.opacity = 0;
    TweenMax.set(this.nextNumberBottomDiv, {rotationX: 90, transformOrigin: "left top"});

    // Appends all necessary number divs
    this.appendNumbers = function () {
        // Next Number - Top
        this.container.appendChild(this.nextNumberTopDiv);

        // Previous Number - Bottom
        this.container.appendChild(this.prevNumberBottomDiv);

        // Previous Number - Top
        this.container.appendChild(this.prevNumberTopDiv);

        // Next Number - Bottom
        this.container.appendChild(this.nextNumberBottomDiv);
    }

    // Adds Shadows and highlights if necessary
    this.appendShadowsAndHighlights = function () {
        // Next Number - Top - Shadow
        this.nextNumberTopShadow = new Rectangle({
            color: "#000000",
            width: this.characterObj.width,
            height: (this.characterObj.height / 2),
            parent: this.nextNumberTopDiv
        });
        this.nextNumberTopShadow.left = 0;
        this.nextNumberTopShadow.top = 0;
        this.nextNumberTopShadow.opacity = 0.5;

        // Previous Number - Bottom - Shadow
        this.prevNumberBottomShadow = new Rectangle({
            color: "#000000",
            width: this.characterObj.width,
            height: (this.characterObj.height / 2),
            parent: this.prevNumberBottomDiv
        });
        this.prevNumberBottomShadow.left = 0;
        this.prevNumberBottomShadow.top = 0;
        this.prevNumberBottomShadow.opacity = 0;

        // Previous Number - Top - Shadow
        this.prevNumberTopShadow = new Rectangle({
            color: "#000000",
            width: this.characterObj.width,
            height: (this.characterObj.height / 2),
            parent: this.prevNumberTopDiv
        });
        this.prevNumberTopShadow.left = 0;
        this.prevNumberTopShadow.top = 0;
        this.prevNumberTopShadow.opacity = 0;

        // Next Number - Bottom - Shine
        this.nextNumberBottomShine = new Rectangle({
            color: "#FFFFFF",
            width: this.characterObj.width,
            height: (this.characterObj.height / 2),
            parent: this.nextNumberBottomDiv
        });
        this.nextNumberBottomShine.left = 0;
        this.nextNumberBottomShine.top = 0;
        this.nextNumberBottomShine.opacity = 0.5;
    }

    this.begin = function () {
        if (this.character == "N/A_$" || this.character == "N/A") {
            // Transition of width if there are no characters
            this.container.style.overflow = "hidden";
            TweenLite.to(this.container, 0.1, {
                width: 0, ease: Quad.easeInOut, delay: 0,
                onStart: (function (root) {
                    return function () {
                        if (root.character == "N/A_$") {
                            //console.log("DOLLAR SIGN SHIFT");
                            root.container.dispatchEvent(root.shiftDollarSignEvt);
                        }

                        if (root.character == "N/A_¢") {
                            // console.log("CENT SIGN SHIFT");
                            root.container.dispatchEvent(root.shiftCentSignEvt);
                        }

                        if (root.obj.type == "dollar") {
                            if (root.character == "N/A") {
                                //console.log("DOLLAR CHARACTER SHIFT");
                                root.container.dispatchEvent(root.shiftDollarCharacterEvt);
                            }
                        }

                        if (root.obj.type == "cent") {
                            if (root.character == "N/A") {
                                //console.log("CENT CHARACTER SHIFT");
                                root.container.dispatchEvent(root.shiftDollarCharacterEvt);
                            }
                        }
                    }
                })(this)
            });
        } else {
            TweenMax.to(this.prevNumberTopDiv, this.duration / 2, {
                rotationX: -90, transformOrigin: "left bottom", ease: Linear.easeNone, delay: 0,
                onStart: (function (root) {
                    return function () {
                        TweenLite.to(root.nextNumberTopShadow.div, root.duration / 2, {
                            opacity: 0,
                            ease: Linear.easeNone
                        });
                        TweenLite.to(root.prevNumberTopShadow.div, root.duration / 2, {
                            opacity: 0.5,
                            ease: Linear.easeNone
                        });
                    }
                })(this),
                onComplete: (function (root) {
                    return function () {
                        root.prevNumberTopDiv.style.opacity = 0;
                        root.end();
                    }
                })(this)
            });
        }
    }

    this.end = function () {
        TweenMax.to(this.nextNumberBottomDiv, this.duration / 2, {
            rotationX: 0, transformOrigin: "left top", ease: Linear.easeNone, delay: 0,
            onStart: (function (root) {
                return function () {
                    root.nextNumberBottomDiv.style.opacity = 1;
                    TweenLite.to(root.nextNumberBottomShine.div, root.duration / 2, {
                        opacity: 0,
                        ease: Linear.easeNone
                    });
                    TweenLite.to(root.prevNumberBottomShadow.div, root.duration / 2, {
                        opacity: 0.5,
                        ease: Linear.easeNone
                    });
                }
            })(this),
            onComplete: (function (root) {
                return function () {
                    // console.log("THIS HAS ENDED");
                    if (root.isLastCharacterBool) {
                        root.container.dispatchEvent(root.lastCharacterEvt);
                    } else {
                        root.container.style.opacity = 0;

                    }
                    root.container.dispatchEvent(root.animationEvt);
                }
            })(this)
        });
    }

    // Sets up our divs for our numbers
    switch (this.obj.type) {
        case "symbol":
            for (var i = 0; i < this.characterObj.characters.length; i++) {
                if (this.character == this.characterObj.characters[i].glyph) {
                    // if transition does not exist
                    if (!this.isTransitionBool) {
                        if (this.character == "$" || this.character == "¢") {
                            // Next Number - Top - Image
                            this.numberImg = document.createElement("div");
                            this.numberImg.className = (this.character == "$") ? "price_dollarSign" : "price_centSign";
                            this.numberImg.innerHTML = this.character;
                            this.numberImg.style.top = "0px";
                            this.numberImg.style.left = (this.character == "$") ? "0px" : "1px";
                            this.container.appendChild(this.numberImg);
                        }

                        // Last character of character column
                        this.container.dispatchEvent(this.lastCharacterEvt);
                    }
                    // if transition exists
                    else {
                        // Appends all necessary number divs
                        this.appendNumbers();

                        // Loads in appropriate images
                        if (this.character == "$" || this.character == "¢") {
                            // Next Number - Top - Image
                            this.nextNumberTopImg = document.createElement("div");
                            this.nextNumberTopImg.className = (this.character == "$") ? "price_dollarSign" : "price_centSign";
                            this.nextNumberTopImg.innerHTML = this.character;
                            this.nextNumberTopImg.style.top = "0px";
                            this.nextNumberTopImg.style.left = (this.character == "$") ? "0px" : "1px";
                            ;
                            this.nextNumberTopDiv.appendChild(this.nextNumberTopImg);
                            // console.log("CHARACTER: " + this.character);
                            // console.log("CLASS NAME: " + this.nextNumberTopImg.className);
                            // console.log(this.nextNumberTopImg);
                            // console.log(this.nextNumberTopDiv);
                            // console.log("----------------------------------------------");

                            // Next Number - Bottom - Image
                            this.nextNumberBottomImg = document.createElement("div");
                            this.nextNumberBottomImg.className = (this.character == "$") ? "price_dollarSign" : "price_centSign";
                            this.nextNumberBottomImg.innerHTML = this.character;
                            this.nextNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.nextNumberBottomImg.style.left = (this.character == "$") ? "0px" : "1px";
                            ;
                            this.nextNumberBottomDiv.appendChild(this.nextNumberBottomImg);
                            // console.log("CHARACTER" + this.character);
                            // console.log("CLASS NAME" + this.nextNumberBottomImg.className);
                            // console.log(this.nextNumberBottomImg);
                            // console.log(this.nextNumberBottomImg);
                            // console.log("----------------------------------------------");

                        } else if (this.character == "N/A_$" || this.character == "N/A_¢") {
                            // Previous Number - Bottom - Image
                            this.prevNumberBottomImg = document.createElement("div");
                            this.prevNumberBottomImg.className = (this.character == "N/A_$") ? "price_dollarSign" : "price_centSign";
                            this.prevNumberBottomImg.innerHTML = (this.character == "N/A_$") ? "$" : "¢";
                            this.prevNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.prevNumberBottomImg.style.left = (this.character == "N/A_$") ? "0px" : "1px";
                            ;
                            this.prevNumberBottomDiv.appendChild(this.prevNumberBottomImg);
                            // console.log("CHARACTER" + this.character);
                            // console.log("CLASS NAME" + this.prevNumberBottomImg.className);
                            // console.log(this.prevNumberBottomImg);
                            // console.log(this.prevNumberBottomDiv);
                            // console.log("----------------------------------------------");

                            // Previous Number - Top - Image
                            this.prevNumberTopImg = document.createElement("div");
                            this.prevNumberTopImg.className = (this.character == "N/A_$") ? "price_dollarSign" : "price_centSign";
                            this.prevNumberTopImg.innerHTML = (this.character == "N/A_$") ? "$" : "¢";
                            this.prevNumberTopImg.style.top = "0px";
                            this.prevNumberTopImg.style.left = (this.character == "N/A_$") ? "0px" : "1px";
                            ;
                            this.prevNumberTopDiv.appendChild(this.prevNumberTopImg);
                            // console.log("CHARACTER" + this.character);
                            // console.log("CLASS NAME" + this.prevNumberTopImg.className);
                            // console.log(this.prevNumberTopImg);
                            // console.log(this.prevNumberTopDiv);
                            // console.log("----------------------------------------------");
                        }

                        // Appends Shadows and highlights
                        this.appendShadowsAndHighlights();

                        // Transition Function
                        this.transitionFunction = function () {
                            this.begin();
                        }
                    }
                    break;
                }
            }
            break;
        case "dollar":
            for (var i = 0; i < this.characterObj.characters.length; i++) {
                if (this.character == this.characterObj.characters[i].glyph) {
                    // if transition does not exist
                    if (!this.isTransitionBool) {
                        if (this.character != "N/A") {
                            // Next Number - Top - Image
                            this.numberImg = document.createElement("div");
                            this.numberImg.className = "price_dollars";
                            this.numberImg.innerHTML = this.character;
                            this.numberImg.style.top = "0px";
                            this.numberImg.style.left = "0px";
                            this.container.appendChild(this.numberImg);
                        }

                        // Last character of character column
                        this.container.dispatchEvent(this.lastCharacterEvt);
                    }
                    // if transition exists
                    else {
                        // Appends all necessary number divs
                        this.appendNumbers();

                        // Loads in appropriate images
                        if (this.character != "N/A") {
                            // Next Number - Top - Image
                            this.nextNumberTopImg = document.createElement("div");
                            this.nextNumberTopImg.className = "price_dollars";
                            this.nextNumberTopImg.innerHTML = this.character;
                            this.nextNumberTopImg.style.top = "0px";
                            this.nextNumberTopImg.style.left = "0px";
                            this.nextNumberTopDiv.appendChild(this.nextNumberTopImg);

                            // Next Number - Bottom - Image
                            this.nextNumberBottomImg = document.createElement("div");
                            this.nextNumberBottomImg.className = "price_dollars";
                            this.nextNumberBottomImg.innerHTML = this.character;
                            this.nextNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.nextNumberBottomImg.style.left = "0px";
                            this.nextNumberBottomDiv.appendChild(this.nextNumberBottomImg);

                            // Previous Number - Bottom - Image
                            this.prevNumberBottomImg = document.createElement("div");
                            this.prevNumberBottomImg.className = "price_dollars";
                            this.prevNumberBottomImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.prevNumberBottomImg.style.left = "0px";
                            this.prevNumberBottomDiv.appendChild(this.prevNumberBottomImg);

                            // Previous Number - Top - Image
                            this.prevNumberTopImg = document.createElement("div");
                            this.prevNumberTopImg.className = "price_dollars";
                            this.prevNumberTopImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberTopImg.style.top = "0px";
                            this.prevNumberTopImg.style.left = "0px";
                            this.prevNumberTopDiv.appendChild(this.prevNumberTopImg);

                        } else if (this.character == "N/A") {
                            // Previous Number - Bottom - Image
                            this.prevNumberBottomImg = document.createElement("div");
                            this.prevNumberBottomImg.className = "price_dollars";
                            this.prevNumberBottomImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.prevNumberBottomImg.style.left = "0px";
                            this.prevNumberBottomDiv.appendChild(this.prevNumberBottomImg);

                            // Previous Number - Top - Image
                            this.prevNumberTopImg = document.createElement("div");
                            this.prevNumberTopImg.className = "price_dollars";
                            this.prevNumberTopImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberTopImg.style.top = "0px";
                            this.prevNumberTopImg.style.left = "0px";
                            this.prevNumberTopDiv.appendChild(this.prevNumberTopImg);
                        }

                        // Appends Shadows and highlights
                        this.appendShadowsAndHighlights();

                        // Transition Function
                        this.transitionFunction = function () {
                            this.begin();
                        }
                    }
                    break;
                }
            }
            break;
        case "cent":
            for (var i = 0; i < this.characterObj.characters.length; i++) {
                if (this.character == this.characterObj.characters[i].glyph) {
                    // if transition does not exist
                    if (!this.isTransitionBool) {
                        if (this.character != "N/A") {
                            // Next Number - Top - Image
                            this.numberImg = document.createElement("div");
                            this.numberImg.className = "price_cents";
                            this.numberImg.innerHTML = this.character;
                            this.numberImg.style.top = "0px";
                            this.numberImg.style.left = "0px";
                            this.container.appendChild(this.numberImg);
                        }

                        // Last character of character column
                        this.container.dispatchEvent(this.lastCharacterEvt);
                    }
                    // if transition exists
                    else {
                        // Appends all necessary number divs
                        this.appendNumbers();

                        // Loads in appropriate images
                        if (this.character != "N/A") {
                            // Next Number - Top - Image
                            this.nextNumberTopImg = document.createElement("div");
                            this.nextNumberTopImg.className = "price_cents";
                            this.nextNumberTopImg.innerHTML = this.character;
                            this.nextNumberTopImg.style.top = "0px";
                            this.nextNumberTopImg.style.left = "0px";
                            this.nextNumberTopDiv.appendChild(this.nextNumberTopImg);

                            // Next Number - Bottom - Image
                            this.nextNumberBottomImg = document.createElement("div");
                            this.nextNumberBottomImg.className = "price_cents";
                            this.nextNumberBottomImg.innerHTML = this.character;
                            this.nextNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.nextNumberBottomImg.style.left = "0px";
                            this.nextNumberBottomDiv.appendChild(this.nextNumberBottomImg);

                            // Previous Number - Bottom - Image
                            this.prevNumberBottomImg = document.createElement("div");
                            this.prevNumberBottomImg.className = "price_cents";
                            this.prevNumberBottomImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.prevNumberBottomImg.style.left = "0px";
                            this.prevNumberBottomDiv.appendChild(this.prevNumberBottomImg);

                            // Previous Number - Top - Image
                            this.prevNumberTopImg = document.createElement("div");
                            this.prevNumberTopImg.className = "price_cents";
                            this.prevNumberTopImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberTopImg.style.top = "0px";
                            this.prevNumberTopImg.style.left = "0px";
                            this.prevNumberTopDiv.appendChild(this.prevNumberTopImg);

                        } else if (this.character == "N/A") {
                            // Previous Number - Bottom - Image
                            this.prevNumberBottomImg = document.createElement("div");
                            this.prevNumberBottomImg.className = "price_cents";
                            this.prevNumberBottomImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberBottomImg.style.top = (0 - (this.characterObj.height / 2)) + "px";
                            this.prevNumberBottomImg.style.left = "0px";
                            this.prevNumberBottomDiv.appendChild(this.prevNumberBottomImg);

                            // Previous Number - Top - Image
                            this.prevNumberTopImg = document.createElement("div");
                            this.prevNumberTopImg.className = "price_cents";
                            this.prevNumberTopImg.innerHTML = this.characterObj.characters[i].previousGlyph;
                            this.prevNumberTopImg.style.top = "0px";
                            this.prevNumberTopImg.style.left = "0px";
                            this.prevNumberTopDiv.appendChild(this.prevNumberTopImg);
                        }

                        // Appends Shadows and highlights
                        this.appendShadowsAndHighlights();

                        // Transition Function
                        this.transitionFunction = function () {
                            this.begin();
                        }
                    }
                    break;
                }
            }
            break;
        default:
    }
    ;

    // Preloads our images
    this.preloadInterval = setInterval(this.preloader, 1, this);
}

// Setters and getters
PriceCharacter.prototype = {
    get width() {
        return parseInt(this.container.offsetWidth);
    },
    get height() {
        return parseInt(this.container.offsetHeight);
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        this.container.style.left = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        this.container.style.top = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get opacity() {
        return this.container.style.opacity;
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    get visibility() {
        return this.container.style.visibility;
    },
    set visibility(s) {
        this.container.style.visibility = s;
    },
    get div() {
        return this.container;
    },
    set id(s) {
        this.container.id = s;
    },
    get id() {
        return this.container.id;
    }
}

// This makes sure that all our images are loaded
PriceCharacter.prototype.preloader = function (root) {
    if (root.preloadItemsArr.length > 0) {
        for (var i = 0; i < root.preloadItemsArr.length; i++) {
            if (!root.preloadItemsArr[i].isLoaded) {
                // console.log(root.preloadItemsArr[i])
                break;
            } else {
                if (i == root.preloadItemsArr.length - 1) {
                    // Indicates of our carousel has loaded or not
                    root.isLoaded = true;
                    root.container.dispatchEvent(root.evt);

                    // sets numerals (frames) for our spritesheets
                    for (var j = 0; j < root.digitFrameArr.length; j++) {
                        root.digitFrameArr[j].object.frame = root.digitFrameArr[j].frame;
                    }

                    clearInterval(root.preloadInterval);
                }
            }
        }
    } else {
        root.isLoaded = true;
        root.container.dispatchEvent(root.evt);
    }

}

PriceCharacter.prototype.startTransition = function (d) {
    // Begins Transition
    setTimeout((function (root) {
        root.container.style.opacity = 1;
        root.transitionFunction();
    })(this), d * 1000);
}

//----------------------------------------------------
// NOTE: Legend of required object properties
//----------------------------------------------------
// src      : (STRING) the URL of where our image resides
// parent     : (ELEMENT) div/parent of where this image holder will reside
//----------------------------------------------------
function Price(obj) {
    this.obj = obj;
    this.parent = obj.parent;

    this.isLoaded = false;
    this.preloadItemsArr = [];

    // Loading event
    this.evt = document.createEvent("Event");
    this.evt.initEvent("priceCharacterLoaded", true, false);

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.overflow = "visible";
    this.container.style.verticalAlign = "top";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.opacity = 1;
    if (obj.id) {
        this.container.id = obj.id;
    }

    this.dollarSignWidth = 0;
    this.dollarDigitsWidth = 0;
    this.centDigitsWidth = 0;
    this.centSignWidth = 0;

    this.duration = obj.duration;

    // This div will contain all our assets
    this.priceContainer = document.createElement("div");
    this.priceContainer.style.position = "absolute";
    this.priceContainer.style.overflow = "hidden";
    this.priceContainer.style.verticalAlign = "top";
    this.priceContainer.style.opacity = 1;
    this.priceContainer.style.left = "0px";
    this.priceContainer.style.top = "0px";
    this.priceContainer.style.width = "auto";
    this.priceContainer.style.height = "55px";
    this.container.appendChild(this.priceContainer);

    this.transitionFunction = function (d) {
        setTimeout((function (root) {
            return function () {
                // Dollars
                if ((root.obj.previousPrice.dollars != "" && root.obj.previousPrice.dollars != "N/A" && root.obj.previousPrice.dollars != "0") && (root.obj.currentPrice.dollars != "" && root.obj.currentPrice.dollars != "N/A" && root.obj.currentPrice.dollars != "0")) {
                    for (var i = 0; i < root.obj.previousPrice.dollars.length; i++) {
                        if (root["dollarDigitArr" + i][1] !== undefined) {
                            root["dollarDigitArr" + i][1].startTransition(0);
                        }
                    }
                } else if ((root.obj.previousPrice.dollars != "" && root.obj.previousPrice.dollars != "N/A" && root.obj.previousPrice.dollars != "0") && (root.obj.currentPrice.dollars == "" || root.obj.currentPrice.dollars == "N/A" || root.obj.currentPrice.dollars == "0")) {
                    for (var i = 0; i < root.obj.previousPrice.dollars.length; i++) {
                        if (root["dollarDigitArr" + i][1] !== undefined) {
                            root["dollarDigitArr" + i][1].startTransition(0);
                        }
                    }
                }

                // Cents
                if (root.obj.previousPrice.cents != root.obj.currentPrice.cents) {
                    for (var j = 0; j < root.obj.previousPrice.cents.length; j++) {
                        if (root["centDigitArr" + j][1] !== undefined) {
                            root["centDigitArr" + j][1].startTransition(0);
                        }
                    }
                }

                // Header
                if (((root.obj.previousPrice.dollars != root.obj.currentPrice.dollars) || (root.obj.previousPrice.cents != root.obj.currentPrice.cents)) || ((root.obj.previousPrice.dollars != root.obj.currentPrice.dollars) && (root.obj.previousPrice.cents != root.obj.currentPrice.cents))) {
                    TweenMax.to(root.header, 1.5, {height: 5, ease: Elastic.easeOut.config(1, 0.2), delay: 0});
                    TweenMax.to(root.priceContainer, 1.5, {top: 5, ease: Elastic.easeOut.config(1, 0.2), delay: 0});
                    TweenMax.to(root.headerImage.div, 1.5, {
                        width: 28,
                        height: 24,
                        transformOrigin: "50% 50%",
                        ease: Elastic.easeOut.config(1, 0.2),
                        delay: 0
                    });
                }

            }
        })(this), d * 1000);
    };

    this.dollarShiftCounter = 0;

    this.repositionCharacters = function () {
        if (this.dollarSign) {
            this.dollarSign.left = 0;
        }

        if (this.dollarDigitsContainer) {
            TweenMax.to(this.dollarDigitsContainer, 0.1, {left: this.dollarSignWidth, overwrite: "all"});
        }

        if (this.centDigitsContainer) {
            TweenMax.to(this.centDigitsContainer, 0.1, {
                left: this.dollarSignWidth + this.dollarDigitsWidth,
                overwrite: "all"
            });
        }

        if (this.centSign) {
            TweenMax.to(this.centSign, 0.1, {
                left: this.dollarSignWidth + this.dollarDigitsWidth + this.centDigitsWidth,
                overwrite: "all"
            });
        }

        if (this.soldByTxt) {
            TweenMax.to(this.soldByTxt, 0.1, {
                opacity: 1,
                left: this.dollarSignWidth + this.dollarDigitsWidth,
                overwrite: "all"
            });
        }

        if (this.header) {
            TweenMax.to(this.header, 0.1, {
                width: this.dollarSignWidth + this.dollarDigitsWidth + this.centDigitsWidth + this.centSignWidth,
                overwrite: "all"
            });
        }

        if (this.headerImage) {
            TweenMax.to(this.headerImage.div, 0.1, {
                left: (this.dollarSignWidth + this.dollarDigitsWidth + this.centDigitsWidth + this.centSignWidth) - 14,
                overwrite: "none"
            });
        }

        if (this.priceContainer) {
            TweenMax.to(this.priceContainer, 0.1, {
                width: this.dollarSignWidth + this.dollarDigitsWidth + this.centDigitsWidth + this.centSignWidth,
                overwrite: "all"
            });
        }

        // console.log(this.centSignWidth)
        // console.log(this.dollarSignWidth)
    }

    this.parent.appendChild(this.container);

    this.setupDollarDigits = function () {
        // Dollar Characters
        this.dollarDigitsContainer = document.createElement("div");
        this.dollarDigitsContainer.style.position = "absolute";
        this.dollarDigitsContainer.style.overflow = "visible";
        this.dollarDigitsContainer.style.verticalAlign = "top";
        this.dollarDigitsContainer.style.opacity = 1;
        this.dollarDigitsContainer.style.left = this.dollarSignWidth + "px";
        this.dollarDigitsContainer.style.top = "0px";
        this.dollarDigitsContainer.style.width = "auto";
        this.dollarDigitsContainer.style.height = "auto";
        this.priceContainer.appendChild(this.dollarDigitsContainer);

        // Creates dollar digit containers
        for (var i = 0; i < obj.previousPrice.dollars.length; i++) {
            this["dollarColumn" + i] = document.createElement("div");
            this["dollarColumn" + i].style.position = "absolute";
            this["dollarColumn" + i].style.overflow = "visible";
            this["dollarColumn" + i].style.verticalAlign = "top";
            this["dollarColumn" + i].style.opacity = 1;
            this["dollarColumn" + i].style.top = "0px";
            this["dollarColumn" + i].style.left = (i * 30) + "px";
            this["dollarColumn" + i].style.width = "30px";
            this["dollarColumn" + i].style.height = "55px";
            this.dollarDigitsWidth += 30;
            this.dollarDigitsContainer.appendChild(this["dollarColumn" + i]);

            // Creates array of dollardigits in each column
            this["dollarDigitArr" + i] = [];

            // If previous and current price are the same
            if (obj.previousPrice.dollars == obj.currentPrice.dollars) {
                this["dollarDigitArr" + i].push(new PriceCharacter({
                    type: "dollar",
                    character: obj.currentPrice.dollars.slice(i, i + 1),
                    isInitVisible: true,
                    isTransition: false,
                    isLastCharacter: true,
                    duration: this.durationPerCharacter,
                    parent: this["dollarColumn" + i]
                }));
                this.preloadItemsArr.push(this["dollarDigitArr" + i][this["dollarDigitArr" + i].length - 1]);
                this["dollarDigitArr" + i][0].left = 0;
                this["dollarDigitArr" + i][0].top = 0;
            }
            // If previous dollar value is a number and previous and current dollar values are not equal to each other
            else if (!isNaN(obj.previousPrice.dollars) && (obj.previousPrice.dollars != obj.currentPrice.dollars)) {
                // If previous & current dollar valuea are numbers and previous dollar length is greater than current dollar length
                if (!isNaN(obj.previousPrice.dollars) && !isNaN(obj.currentPrice.dollars) && (obj.previousPrice.dollars.length >= obj.currentPrice.dollars.length)) {
                    this.dollarLengthDifference = obj.previousPrice.dollars.length - obj.currentPrice.dollars.length;
                    this.newCurrentDollarString = "";

                    if (obj.previousPrice.dollars.length > obj.currentPrice.dollars.length) {
                        for (var j = 0; j < this.dollarLengthDifference; j++) {
                            // Adds Extra 0s in the dollar value
                            this.newCurrentDollarString += "0";
                            if (j >= this.dollarLengthDifference - 1) {
                                this.newCurrentDollarString += obj.currentPrice.dollars;
                            }
                        }
                    } else if (obj.previousPrice.dollars.length == obj.currentPrice.dollars.length) {
                        this.newCurrentDollarString += this.obj.currentPrice.dollars;
                    }

                    this.beginDigit = obj.previousPrice.dollars.slice(i, i + 1);
                    this.endDigit = this.newCurrentDollarString.slice(i, i + 1);


                    // console.log("[DOLLAR COLUMN "+i+": DIGIT"+(i+1)+"]");
                    // console.log("BEGIN NUMBER: "+obj.previousPrice.dollars);
                    // console.log("END NUMBER: "+this.newCurrentDollarString);
                    /*console.log(this.beginDigit);
					console.log(this.endDigit);*/

                    // if begin and end digits are both numbers
                    if (!isNaN(this.beginDigit) && !isNaN(this.endDigit)) {
                        if (Number(this.beginDigit) > Number(this.endDigit)) {
                            this.loopControl = (Number(this.beginDigit) - Number(this.endDigit)) + 1;
                            this.digitTracker = Number(this.beginDigit);
                        } else if (Number(this.beginDigit) < Number(this.endDigit)) {
                            this.loopControl = (Number("1" + this.beginDigit) - Number(this.endDigit)) + 1;
                            this.digitTracker = Number(this.beginDigit) + 10;
                        } else if (Number(this.beginDigit) == Number(this.endDigit)) {
                            this.loopControl = 1;
                            this.digitTracker = Number(this.beginDigit);
                        }

                        for (var j = 0; j < this.loopControl; j++) {
                            this.characterString = (this.digitTracker - j).toString();
                            // console.log(this.characterString.slice(this.characterString.length-1, this.characterString.length));

                            // Controls duration
                            if (i < this.dollarLengthDifference && (this.characterString.slice(this.characterString.length - 1, this.characterString.length) == "0")) {
                                this.durationPerCharacter = this.duration / (this.loopControl + 1);
                            } else {
                                this.durationPerCharacter = this.duration / this.loopControl;
                            }

                            this.tempLastChar = ((j >= this.loopControl - 1) && (i >= this.dollarLengthDifference) && (parseInt(this.newCurrentDollarString) != 0));

                            this["dollarDigitArr" + i].push(new PriceCharacter({
                                type: "dollar",
                                character: this.characterString.slice(this.characterString.length - 1, this.characterString.length),
                                isInitVisible: (j == 0),
                                isTransition: (j != 0),
                                isLastCharacter: this.tempLastChar,
                                duration: this.durationPerCharacter,
                                parent: this["dollarColumn" + i]
                            }));
                            this.preloadItemsArr.push(this["dollarDigitArr" + i][this["dollarDigitArr" + i].length - 1]);
                            // console.log("IS LAST? "+this.tempLastChar);
                            this["dollarDigitArr" + i][j].left = 0;
                            this["dollarDigitArr" + i][j].top = 0;

                            if (((i < this.dollarLengthDifference) && (this.characterString.slice(this.characterString.length - 1, this.characterString.length) == "0")) || ((!this.tempLastChar) && (j >= this.loopControl - 1) && (this.characterString.slice(this.characterString.length - 1, this.characterString.length) == "0"))) {
                                // console.log("N/A");
                                this["dollarDigitArr" + i].push(new PriceCharacter({
                                    type: "dollar",
                                    character: "N/A",
                                    isTransition: true,
                                    isLastCharacter: true,
                                    duration: this.durationPerCharacter,
                                    parent: this["dollarColumn" + i]
                                }));
                                this.preloadItemsArr.push(this["dollarDigitArr" + i][this["dollarDigitArr" + i].length - 1]);
                                this["dollarDigitArr" + i][j].left = 0;
                                this["dollarDigitArr" + i][j].top = 0;
                            }
                        }

                        for (var j = 0; j < this["dollarDigitArr" + i].length; j++) {
                            this["dollarDigitArr" + i][j].div.addEventListener("onAnimationComplete", (function (root, columnNum, letterNum) {
                                return function () {
                                    if (letterNum + 1 < root["dollarDigitArr" + columnNum].length) {
                                        root["dollarDigitArr" + columnNum][letterNum + 1].startTransition(0);
                                    }
                                }
                            })(this, i, j));


                            this["dollarDigitArr" + i][j].div.addEventListener("onDollarCharacterShift", (function (root, columnNum, letterNum) {
                                return function () {
                                    root.dollarShiftCounter++;

                                    if (root.dollarShiftCounter == root.obj.previousPrice.dollars.length) {
                                        root.dollarSign.startTransition(0);
                                    }

                                    root.dollarDigitsWidth -= 30;


                                    for (var l = 0; l < root.obj.previousPrice.dollars.length; l++) {

                                        if (l != columnNum) {
                                            root["dollarColumn" + l + "Left"] = parseInt(root["dollarColumn" + l].style.left);
                                            root["dollarColumn" + l + "Left"] -= 31;
                                            //root["dollarColumn"+l].style.left =  (parseInt(root["dollarColumn"+l].style.left) - 31) + "px";
                                            //console.log(root["dollarColumn"+l]);
                                            TweenMax.to(root["dollarColumn" + l], 0.1, {
                                                left: root["dollarColumn" + l + "Left"],
                                                ease: Quad.easeInOut,
                                                delay: 0,
                                                overwrite: "all"
                                            })

                                        }


                                        // this["dollarDigitArr"+i]
                                    }

                                    root.repositionCharacters();
                                }
                            })(this, i, j));

                        }

                        // console.log("-------------------------");
                        //(i<this.dollarLengthDifference) ? "N/A" :
                    }
                }
            }
        }
    }

    this.setupCentDigits = function () {
        // console.log("CENTS SHOULD BE SET UP");
        // Dollar Characters
        this.centDigitsContainer = document.createElement("div");
        this.centDigitsContainer.style.position = "absolute";
        this.centDigitsContainer.style.overflow = "visible";
        this.centDigitsContainer.style.verticalAlign = "top";
        this.centDigitsContainer.style.opacity = 1;
        this.centDigitsContainer.style.left = (this.dollarSignWidth + this.dollarDigitsWidth) + "px";
        this.centDigitsContainer.style.top = "0px";
        this.centDigitsContainer.style.width = "auto";
        this.centDigitsContainer.style.height = "auto";
        this.priceContainer.appendChild(this.centDigitsContainer);

        // Creates dollar digit containers
        for (var i = 0; i < obj.previousPrice.cents.length; i++) {
            this["centColumn" + i] = document.createElement("div");
            this["centColumn" + i].style.position = "absolute";
            this["centColumn" + i].style.overflow = "visible";
            this["centColumn" + i].style.verticalAlign = "top";
            this["centColumn" + i].style.opacity = 1;
            this["centColumn" + i].style.top = "0px";
            this["centColumn" + i].style.left = (i * 17) + "px";
            this["centColumn" + i].style.width = "17px";
            this["centColumn" + i].style.height = "55px";
            this.centDigitsWidth += 17;
            this.centDigitsContainer.appendChild(this["centColumn" + i]);

            // Creates array of dollardigits in each column
            this["centDigitArr" + i] = [];

            // If previous and current price are the same
            if (obj.previousPrice.cents == obj.currentPrice.cents) {
                this["centDigitArr" + i].push(new PriceCharacter({
                    type: "cent",
                    character: obj.currentPrice.cents.slice(i, i + 1),
                    isInitVisible: true,
                    isTransition: false,
                    isLastCharacter: true,
                    duration: this.durationPerCharacter,
                    parent: this["centColumn" + i]
                }));
                this.preloadItemsArr.push(this["centDigitArr" + i][this["centDigitArr" + i].length - 1]);
                this["centDigitArr" + i][0].left = 0;
                this["centDigitArr" + i][0].top = 0;
            }
            // If previous and current cents values are not equal to each other
            else if (obj.previousPrice.cents != obj.currentPrice.cents) {
                this.beginDigit = this.obj.previousPrice.cents.slice(i, i + 1);
                this.endDigit = this.obj.currentPrice.cents.slice(i, i + 1);

                // console.log("[CENT COLUMN "+i+": DIGIT"+(i+1)+"]");
                // console.log("BEGIN NUMBER: "+obj.previousPrice.cents);
                // console.log("END NUMBER: "+obj.currentPrice.cents);
                // console.log(this.beginDigit);
                // console.log(this.endDigit);

                if (Number(this.beginDigit) > Number(this.endDigit)) {
                    this.loopControl = (Number(this.beginDigit) - Number(this.endDigit)) + 1;
                    this.digitTracker = Number(this.beginDigit);
                } else if (Number(this.beginDigit) < Number(this.endDigit)) {
                    this.loopControl = (Number("1" + this.beginDigit) - Number(this.endDigit)) + 1;
                    this.digitTracker = Number(this.beginDigit) + 10;
                } else if (Number(this.beginDigit) == Number(this.endDigit)) {
                    this.loopControl = 1;
                    this.digitTracker = Number(this.beginDigit);
                }

                for (var j = 0; j < this.loopControl; j++) {
                    this.characterString = (this.digitTracker - j).toString();
                    // console.log(this.characterString.slice(this.characterString.length-1, this.characterString.length));
                    // console.log(j == 0);

                    // Controls duration
                    this.durationPerCharacter = this.duration / this.loopControl;

                    this["centDigitArr" + i].push(new PriceCharacter({
                        type: "cent",
                        character: this.characterString.slice(this.characterString.length - 1, this.characterString.length),
                        isInitVisible: (j == 0),
                        isTransition: (j != 0),
                        isLastCharacter: (j == this.loopControl - 1) ? true : false,
                        duration: this.durationPerCharacter,
                        parent: this["centColumn" + i]
                    }));
                    this.preloadItemsArr.push(this["centDigitArr" + i][this["centDigitArr" + i].length - 1]);
                    // console.log("IS LAST? "+this.tempLastChar);
                    this["centDigitArr" + i][j].left = 0;
                    this["centDigitArr" + i][j].top = 0;
                }

                for (var j = 0; j < this["centDigitArr" + i].length; j++) {
                    this["centDigitArr" + i][j].div.addEventListener("onAnimationComplete", (function (root, columnNum, letterNum) {
                        return function () {
                            if (letterNum + 1 < root["centDigitArr" + columnNum].length) {
                                root["centDigitArr" + columnNum][letterNum + 1].startTransition(0);
                            }
                        }
                    })(this, i, j));
                }

                // console.log("-------------------------");
                //(i<this.dollarLengthDifference) ? "N/A" :
            }
        }
    }

    /*---------------------*/
    // DOLLAR SIGN
    /*---------------------*/
    // If dollar sign exists in previous and current price
    if ((obj.previousPrice.dollars != "" && obj.previousPrice.dollars != "N/A" && obj.previousPrice.dollars != "0") && (obj.currentPrice.dollars != "" && obj.currentPrice.dollars != "N/A" && obj.currentPrice.dollars != "0")) {
        // Dollar sign
        this.dollarSign = new PriceCharacter({
            type: "symbol",
            character: "$",
            isInitVisible: true,
            isTransition: false,
            isLastCharacter: true,
            duration: 0.2,
            parent: this.priceContainer
        });
        this.preloadItemsArr.push(this.dollarSign);
        this.dollarSignWidth = this.dollarSign.calculatedWidth;

        // Dollar Characters
        this.setupDollarDigits();
    }
    // else if dollar sign exists in previous price but not the current price
    else if ((obj.previousPrice.dollars != "" && obj.previousPrice.dollars != "N/A" && obj.previousPrice.dollars != "0") && (obj.currentPrice.dollars == "" || obj.currentPrice.dollars == "N/A" || obj.currentPrice.dollars == "0")) {
        this.dollarSign = new PriceCharacter({
            type: "symbol",
            character: "N/A_$",
            isInitVisible: true,
            isTransition: true,
            isLastCharacter: true,
            duration: 0.2,
            parent: this.priceContainer
        });
        this.preloadItemsArr.push(this.dollarSign);
        this.dollarSignWidth = this.dollarSign.calculatedWidth;

        // Dollar Characters
        this.setupDollarDigits();
    }

    /*---------------------*/
    // CENT SIGN
    /*---------------------*/
    // If there's no dollar sign
    if ((obj.previousPrice.dollars == "" || obj.previousPrice.dollars == "N/A" || obj.previousPrice.dollars == "0") && (obj.currentPrice.dollars == "" || obj.currentPrice.dollars == "N/A" || obj.currentPrice.dollars == "0")) {
        this.centSign = new PriceCharacter({
            type: "symbol",
            character: "¢",
            isInitVisible: true,
            isTransition: false,
            isLastCharacter: true,
            duration: 0.2,
            parent: this.priceContainer
        });
        this.preloadItemsArr.push(this.centSign);
        this.centSignWidth = this.centSign.calculatedWidth;

    } else if ((obj.previousPrice.dollars != "" && obj.previousPrice.dollars != "N/A" && obj.previousPrice.dollars != "0") && (obj.currentPrice.dollars == "" || obj.currentPrice.dollars == "N/A" || obj.currentPrice.dollars == "0")) {
        this.centSign = new PriceCharacter({
            type: "symbol",
            character: "¢",
            isInitVisible: false,
            isTransition: true,
            isLastCharacter: true,
            duration: 0.2,
            parent: this.priceContainer
        });
        this.preloadItemsArr.push(this.centSign);

        if (this.dollarSign) {
            this.dollarSign.div.addEventListener("onDollarSignShift", (function (root) {
                return function () {
                    // console.log("DOLLAR SIGN SHIFT");
                    root.dollarSignWidth -= root.dollarSign.calculatedWidth;
                    root.centSign.startTransition(0);
                    root.centSignWidth += root.centSign.calculatedWidth;
                    root.repositionCharacters();
                }
            })(this));
        }
    }

    // Cent Characters
    this.setupCentDigits();

    /*---------------------*/
    // SOLD BY TEXT
    /*---------------------*/
    if (obj.soldByText != "N/A" && obj.soldByText != "") {
        this.soldByTxt = new TextField({
            width: this.centDigitsWidth,
            fontFamily: "MyriadProBold",
            text: obj.soldByText,
            fontSize: 11,
            color: "#000000",
            align: "center",
            letterSpacing: 0,
            lineHeight: 0,
            parent: this.priceContainer
        });
        this.soldByTxt.top = 45;
        this.soldByTxt.opacity = 0;
    }

    /*---------------------*/
    // HEADER
    /*---------------------*/
    this.header = new Rectangle({
        width: 0,
        height: 0,
        color: "#FC0F36",
        parent: this.container,
    });
    this.header.left = 0;

    /*---------------------*/
    // HEADER ROLLBACK IMAGE
    /*---------------------*/
    this.headerImage = new ImageHolder({
        src: this.obj.headerImageSrc,
        parent: this.container
    });
    this.preloadItemsArr.push(this.headerImage);
    this.headerImage.top = -8;

    // Correctly ositions all elements
    this.repositionCharacters();

    // Append
    this.parent.appendChild(this.container);

    // Preloads our images
    this.preloadInterval = setInterval(this.preloader, 1, this);
}

// Setters and getters
Price.prototype = {
    get width() {
        return parseInt(this.table.offsetWidth);
    },
    get height() {
        return parseInt(this.table.offsetHeight);
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        this.container.style.left = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        this.container.style.top = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get opacity() {
        return this.container.style.opacity;
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    get visibility() {
        return this.container.style.visibility;
    },
    set visibility(s) {
        this.container.style.visibility = s;
    },
    get div() {
        return this.container;
    },
    set id(s) {
        this.container.id = s;
    },
    get id() {
        return this.container.id;
    }
}

// This makes sure that all our images are loaded
Price.prototype.preloader = function (root) {
    for (var i = 0; i < root.preloadItemsArr.length; i++) {
        if (!root.preloadItemsArr[i].isLoaded) {
            //console.log(root.preloadItemsArr[i])
            break;
        } else {
            if (i == root.preloadItemsArr.length - 1) {
                // Indicates of our carousel has loaded or not
                root.isLoaded = true;
                root.container.dispatchEvent(root.evt);
                root.headerImage.div.style.width = "0px";
                root.headerImage.div.style.height = "0px";
                //TweenMax.set(root.headerImage.div, {width:0, height:0, transformOrigin:"50% 50%"});
                //console.log(root.headerImage.div);
                clearInterval(root.preloadInterval);
            }
        }
    }
}

Price.prototype.startTransition = function (d) {
    this.transitionFunction(d);
}

//----------------------------------------------------
// NOTE: Legend of required object properties
//----------------------------------------------------
//
//----------------------------------------------------
function AnimationFrame(obj) {
    this.obj = obj;
    this.parent = obj.parent;
    this.itemsArr = [];
    this.preloadItemsArr = [];
    this.isLoaded = false;

    this.tempFunctionsArr = [];
    this.functionsArr = [];

    this.onclickFunction;
    this.onmouseoverFunction;
    this.onmouseoutFunction;

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.cursor = "pointer";
    this.container.style.width = obj.width + "px";
    this.container.style.height = obj.height + "px";
    this.container.style.opacity = 1;
    this.container.style.visibility = "hidden";

    // Sets onclick of items
    if (this.obj.onclick) {
        this.onclick = this.obj.onclick;
    }

    // Append
    this.parent.appendChild(this.container);

    // Event Listener dispatcher in case you want to listen if this has loaded
    this.evt = document.createEvent("Event");
    this.evt.initEvent("frameloaded", true, false);

    // This sets up our elements
    for (var i = 0; i < obj.items.length; i++) {
        // Creating temporary object so that we can add
        // one more property called "parent"
        var tempObj = obj.items[i].object;
        tempObj.parent = this.container;

        // creates our items
        if (obj.items[i].object.varName) {
            // Gives item a variable name if it exists
            this[obj.items[i].object.varName] = new window[obj.items[i].object.objType](tempObj);
            this.itemsArr.push(this[obj.items[i].object.varName]);
        } else {
            // Dynamically creates our objects and stores it in an array called "this.itemsArr"
            this.itemsArr.push(new window[obj.items[i].object.objType](tempObj));
        }

        // sets initial properties of objects
        if (this.obj.items[i].animation !== undefined) {
            if (this.obj.items[i].animation[0].begin.left !== undefined && this.obj.items[i].animation[0].begin.left != null) {
                this.itemsArr[i].left = this.obj.items[i].animation[0].begin.left;
            }
            if (this.obj.items[i].animation[0].begin.top !== undefined && this.obj.items[i].animation[0].begin.top != null) {
                this.itemsArr[i].top = this.obj.items[i].animation[0].begin.top;
            }
            if (this.obj.items[i].animation[0].begin.width !== undefined && this.obj.items[i].animation[0].begin.width != null) {
                this.itemsArr[i].width = this.obj.items[i].animation[0].begin.width;
            }
            if (this.obj.items[i].animation[0].begin.height !== undefined && this.obj.items[i].animation[0].begin.height != null) {
                this.itemsArr[i].height = this.obj.items[i].animation[0].begin.left;
            }
            if (this.obj.items[i].animation[0].begin.opacity !== undefined && this.obj.items[i].animation[0].begin.opacity != null) {
                this.itemsArr[i].opacity = this.obj.items[i].animation[0].begin.opacity;
            }

            // this loop will be used to determine our dynamically named animation functions
            for (var j = 0; j < this.obj.items[i].animation.length; j++) {
                this.tempFunctionsArr.push(this.obj.items[i].animation[j].frameName);
            }
        } else {
            if (this.obj.items[i].left !== undefined && this.obj.items[i].left != null) {
                this.itemsArr[i].left = this.obj.items[i].left;
            }
            if (this.obj.items[i].top !== undefined && this.obj.items[i].top != null) {
                this.itemsArr[i].top = this.obj.items[i].top;
            }
            if (this.obj.items[i].width !== undefined && this.obj.items[i].width != null) {
                this.itemsArr[i].width = this.obj.items[i].width;
            }
            if (this.obj.items[i].height !== undefined && this.obj.items[i].height != null) {
                this.itemsArr[i].height = this.obj.items[i].height;
            }
            if (this.obj.items[i].opacity !== undefined && this.obj.items[i].opacity != null) {
                this.itemsArr[i].opacity = this.obj.items[i].opacity;
            }
        }

        this.itemsArr[i].visibility = this.obj.items[i].visibility;

        // If this item is marked as a preload item, it adds it to the preload
        // array.  This array is used to preload all marked items.
        if (this.obj.items[i].preload) {
            this.preloadItemsArr.push(this.itemsArr[i]);
        }
    }

    // In case you want to use an oninit function.  Function
    // fires when AnimationFrame object is instantiated
    if (this.obj.oninit) {
        this.obj.oninit();
    }

    // This function will sort out duplicate functions
    this.functionsArr = AdUtils.removeDuplicateArrayItems(this.tempFunctionsArr);

    // This creates our dynamically named functions
    this.createAnimationFunctions();

    // Preloads our images
    this.preloadInterval = setInterval(this.preloader, 1, this);
}

// Setters and getters
AnimationFrame.prototype = {
    get width() {
        return parseInt(this.container.offsetWidth);
    },
    set width(n) {
        var testValue = "0" + n;
        this.container.style.width = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get height() {
        return parseInt(this.container.offsetHeight);
    },
    set height(n) {
        var testValue = "0" + n;
        this.container.style.height = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        this.container.style.left = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        this.container.style.top = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get opacity() {
        return this.container.style.opacity;
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    get visibility() {
        return this.container.style.visibility;
    },
    set visibility(s) {
        this.container.style.visibility = s;
    },
    get div() {
        return this.container;
    },
    set zIndex(n) {
        this.container.style.zIndex = n;
    },
    set onclick(f) {
        this.onclickFunction = f;
        this.container.onclick = f;
    },
    set onmouseover(f) {
        this.onmouseoverFunction = f;
        this.container.onmouseover = f;
    },
    set onmouseout(f) {
        this.onmouseoutFunction = f;
        this.container.onmouseout = f;
    },
    set id(s) {
        this.container.id = s;
    },
    get id() {
        return this.container.id;
    }
}

// This makes sure that all our images are loaded
AnimationFrame.prototype.preloader = function (root) {
    for (i = 0; i < root.preloadItemsArr.length; i++) {
        if (!root.preloadItemsArr[i].isLoaded) {
            //console.log(root.preloadItemsArr[i]);
            //console.log(root.preloadItemsArr[i].div.id)
            break;
        } else {
            if (i >= root.preloadItemsArr.length - 1) {
                root.isLoaded = true;
                root.container.dispatchEvent(root.evt);
                clearInterval(root.preloadInterval);
            }
        }
    }
}

AnimationFrame.prototype.createAnimationFunctions = function () {
    // object recorded as not to lose scope
    var root = this;

    // This creates our dynamically named functions
    for (var k = 0; k < this.functionsArr.length; k++) {
        AnimationFrame.prototype[this.functionsArr[k]] = function (frameName, d) {
            // Animation
            for (var i = 0; i < root.itemsArr.length; i++) {
                if (root.obj.items[i].animation !== undefined) {
                    for (var j = 0; j < root.obj.items[i].animation.length; j++) {
                        if (root.obj.items[i].animation[j].frameName == frameName) {
                            setTimeout((function (objBase, itemslcv, animationlcv) {
                                return function () {
                                    var tempTweenObj = {};

                                    // Initial position
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].begin.left != undefined && objBase.obj.items[itemslcv].animation[animationlcv].begin.left != null) {
                                        objBase.itemsArr[itemslcv].left = objBase.obj.items[itemslcv].animation[animationlcv].begin.left;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].begin.top != undefined && objBase.obj.items[itemslcv].animation[animationlcv].begin.top != null) {
                                        objBase.itemsArr[itemslcv].top = objBase.obj.items[itemslcv].animation[animationlcv].begin.top;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].begin.width != undefined && objBase.obj.items[itemslcv].animation[animationlcv].begin.width != null) {
                                        objBase.itemsArr[itemslcv].width = objBase.obj.items[itemslcv].animation[animationlcv].begin.width;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].begin.height != undefined && objBase.obj.items[itemslcv].animation[animationlcv].begin.height != null) {
                                        objBase.itemsArr[itemslcv].height = objBase.obj.items[itemslcv].animation[animationlcv].begin.height;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].begin.opacity != undefined && objBase.obj.items[itemslcv].animation[animationlcv].begin.opacity != null) {
                                        objBase.itemsArr[itemslcv].opacity = objBase.obj.items[itemslcv].animation[animationlcv].begin.opacity;
                                    }

                                    // Animation
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].end.left != undefined && objBase.obj.items[itemslcv].animation[animationlcv].end.left != null) {
                                        tempTweenObj.left = objBase.obj.items[itemslcv].animation[animationlcv].end.left;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].end.top != undefined && objBase.obj.items[itemslcv].animation[animationlcv].end.top != null) {
                                        tempTweenObj.top = objBase.obj.items[itemslcv].animation[animationlcv].end.top;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].end.width != undefined && objBase.obj.items[itemslcv].animation[animationlcv].end.width != null) {
                                        tempTweenObj.width = objBase.obj.items[itemslcv].animation[animationlcv].end.width;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].end.height != undefined && objBase.obj.items[itemslcv].animation[animationlcv].end.height != null) {
                                        tempTweenObj.height = objBase.obj.items[itemslcv].animation[animationlcv].end.height;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].end.opacity != undefined && objBase.obj.items[itemslcv].animation[animationlcv].end.opacity != null) {
                                        tempTweenObj.opacity = objBase.obj.items[itemslcv].animation[animationlcv].end.opacity;
                                    }
                                    if (objBase.obj.items[itemslcv].animation[animationlcv].end.bezier != undefined && objBase.obj.items[itemslcv].animation[animationlcv].end.bezier != null) {
                                        tempTweenObj.bezier = objBase.obj.items[itemslcv].animation[animationlcv].end.bezier;
                                    }

                                    // if(this.obj.items[i].animation[0].bezier !== undefined       && this.obj.items[i].animation[0].begin.opacity != null){      this.itemsArr[i].opacity       = this.obj.items[i].animation[0].begin.opacity;}
                                    tempTweenObj.ease = (objBase.obj.items[itemslcv].animation[animationlcv].ease != undefined && objBase.obj.items[itemslcv].animation[animationlcv].ease != null) ? objBase.obj.items[itemslcv].animation[animationlcv].ease : Linear.easeNone;
                                    tempTweenObj.delay = objBase.obj.items[itemslcv].animation[animationlcv].delay
                                    TweenMax.to(objBase.itemsArr[itemslcv], objBase.obj.items[itemslcv].animation[animationlcv].duration, tempTweenObj);
                                }
                            })(this, i, j), d * 1000);
                        }
                    }
                }
            }
        }
    }
}

AnimationFrame.prototype.animate = function (obj) {
    this[obj.frameName](obj.frameName, obj.delay);
}

function SpriteSheet(obj) {
    this.obj = obj;
    this.parent = obj.parent;
    this.currentFrame = 1;
    this.totalFrames = obj.totalFrames;
    this.isLoaded = false;
    this.isReady = false;

    this.rowMultiplierNum = 0;
    this.columnMultiplierNum = 0;

    // priority can be 'row' or 'column'
    this.priority = obj.priority;

    this.imageWidth = obj.imageWidth;
    this.imageHeight = obj.imageHeight;

    // This interval will be used to play our images in sequence
    this.animation_itvl;

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.cursor = "pointer";
    this.container.style.overflow = "hidden";
    this.container.style.opacity = 1;

    this.spriteFrameArr = window["spriteFrame" + new Date()] = [];
    //console.log(this.spriteFrameArr);

    // Append
    this.parent.appendChild(this.container);
    this.width = obj.width;
    this.height = obj.height;

    // Event Listener dispatcher in case you want to listen if this has loaded
    this.evt = document.createEvent("Event");
    this.evt.initEvent("spriteSheetLoaded", true, false);

    // Event Listener dispatcher when this is ready to use
    this.readyEvt = document.createEvent("Event");
    this.readyEvt.initEvent("onReady", true, false);

    if (obj.events) {
        for (var i = 0; i < obj.events.length; i++) {
            this[obj.events[i].eventName + "_evt"] = document.createEvent("Event");
            this[obj.events[i].eventName + "_evt"].initEvent(obj.events[i].eventName, true, false)
        }
    }

    // This sets up our sprite sheet image
    this.spriteSheetImage = new ImageHolder({
        src: obj.src,
        parent: this.container
    });
    this.spriteSheetImage.left = 0;
    this.spriteSheetImage.top = 0;

    this.generateFrameArray();

    // Preloads our images
    this.preloadInterval = setInterval(this.preloader, 1, this);
}

// Setters and getters
SpriteSheet.prototype = {
    get width() {
        return parseInt(this.container.offsetWidth);
    },
    set width(n) {
        var testValue = "0" + n;
        this.container.style.width = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get height() {
        return parseInt(this.container.offsetHeight);
    },
    set height(n) {
        var testValue = "0" + n;
        this.container.style.height = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        this.container.style.left = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        this.container.style.top = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get opacity() {
        return this.container.style.opacity;
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    set rotation(n) {
        this.container.style.transform = this.container.style.webkitTransform = this.container.style.MozTransform = this.container.style.oTransform = this.container.style.msTransform = "rotate(" + n + "deg)";

    },
    get visibility() {
        return this.container.style.visibility;
    },
    set visibility(s) {
        this.container.style.visibility = s;
        this.images[this.currentFrame - 1].visibility = s;
    },
    set frame(n) {
        this.setFrame(n)
    },
    get frame() {
        return this.currentFrame;
    },
    get div() {
        return this.container;
    },
    set zIndex(n) {
        this.container.style.zIndex = n;
    },
    set onclick(f) {
        this.container.onclick = f;
    }
}

// This makes sure that all our images are loaded
SpriteSheet.prototype.preloader = function (root) {
    //console.log(root.obj.src + ": " + root.spriteSheetImage.isLoaded);
    // console.log("-------------------------------------------------");
    if (root.spriteSheetImage.isLoaded && root.isReady) {
        root.frame = 1;
        root.isLoaded = true;
        root.container.dispatchEvent(root.evt);
        clearInterval(root.preloadInterval);
        //console.log(root.container);
    }
}

// Determines which images are hidden/visible in our image sequence animation
SpriteSheet.prototype.animateSequence = function (root) {
    // console.log("SHOULD PLAY");
    root.frame++;
    //console.log(root.frame);

    if (root.frame >= root.totalFrames) {
        //console.log("END");
        clearInterval(root.animation_itvl);
    }
}

SpriteSheet.prototype.generateFrameArray = function () {
    this.testRowMultiplierNum = 0;
    this.testColumnMultiplierNum = 0;
    this.testFrame = 1;

    // Generates frame array
    this.spriteFrameArr.push({frame: this.testFrame, top: 0, left: 0});

    this.generate_itvl = setInterval((function (root) {
        return function () {
            root.testFrame++;

            if (root.priority == "row") {
                if ((root.testRowMultiplierNum * root.height) >= root.imageHeight - root.height) {
                    root.testRowMultiplierNum = 0;
                    root.testColumnMultiplierNum++;
                } else if ((root.testRowMultiplierNum * root.height) < root.imageHeight - root.height) {
                    root.testRowMultiplierNum++;
                }

            } else if (root.priority == "column") {
                if ((root.testColumnMultiplierNum * root.width) >= root.imageWidth - (root.width * 2)) {
                    root.testColumnMultiplierNum = 0;
                    root.testRowMultiplierNum++;
                } else if ((root.testColumnMultiplierNum * root.width) < root.imageWidth - (root.width * 2)) {
                    root.testColumnMultiplierNum++;
                }
            }

            /*console.log("FRAME: "+root.testFrame);
			console.log("LEFT: "+(-1*(root.width * root.testColumnMultiplierNum)));
			console.log("TOP: "+(-1*(root.testRowMultiplierNum * root.height)));
			console.log("----------------------------------------------");*/

            root.spriteFrameArr.push({
                frame: root.testFrame,
                left: -1 * (root.width * root.testColumnMultiplierNum),
                top: -1 * (root.testRowMultiplierNum * root.height)
            });

            if (root.testFrame >= root.totalFrames) {
                clearInterval(root.generate_itvl);
                root.isReady = true;
                root.container.dispatchEvent(root.readyEvt);
                //console.log(root.spriteFrameArr)
            }
        }
    })(this), 1)
}

SpriteSheet.prototype.setFrame = function (frame) {
    for (var i = 0; i < this.spriteFrameArr.length; i++) {
        /*console.log("FRAME: "+this.spriteFrameArr[i].frame);
		console.log("LEFT: "+this.spriteFrameArr[i].left);
		console.log("TOP: "+this.spriteFrameArr[i].top);
		console.log("---------------------------------------");*/
        if (frame == this.spriteFrameArr[i].frame) {
            this.currentFrame = frame;
            //console.log(this.spriteFrameArr[i].frame);
            this.spriteSheetImage.left = this.spriteFrameArr[i].left;
            this.spriteSheetImage.top = this.spriteFrameArr[i].top;

            if (this.obj.events) {
                for (var j = 0; j < this.obj.events.length; j++) {
                    if (frame == this.obj.events[j].frame) {
                        this.container.dispatchEvent(this[this.obj.events[j].eventName + "_evt"]);
                    }
                }
            }


            //console.log(this.frameArr[i]);
            //console.log(root.frameArr[i].top);

            //console.log(this.spriteSheetImage.div);
        }
    }
}

// Animates our image sequence
SpriteSheet.prototype.play = function (obj) {
    animate = (function (root, speed) {
        return function () {

            root.animation_itvl = setInterval(root.animateSequence, speed, root);
        }
    })(this, obj.speed);

    setTimeout(animate, obj.delay * 1000);
}

// Pauses our image sequence
SpriteSheet.prototype.pause = function (obj) {
    setTimeout((function (root) {
        return function () {
            clearInterval(root.animation_itvl);
        }
    })(this), obj.delay * 1000);
}

//----------------------------------------------------
// NOTE: Legend of required object properties
//----------------------------------------------------
//
//----------------------------------------------------
function Carousel(obj) {
    this.obj = obj;
    this.parent = obj.parent;
    this.feedArr = obj.feedArray;
    this.itemsArr = [];
    this.isLoaded = false;
    this.clickFunction = obj.onclick;
    this.isMotion = false;

    this.previousItem;
    this.currentItem = 0;

    this.imageWidthNum = obj.productImage.width;
    this.imageHeightNum = obj.productImage.height;

    // Loading event
    this.evt = document.createEvent("Event");
    this.evt.initEvent("carouselLoaded", true, false);

    this.isIntroInitiateBool = false;

    // This div will contain all our assets
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.overflow = "hidden";
    this.container.style.cursor = "pointer";
    this.width = obj.width;
    this.height = obj.height;

    // give carousel an ID
    if (obj.id) {
        this.container.id = obj.id;
    }

    // Append
    this.parent.appendChild(this.container);

    // Sets up our carousel items
    for (var i = 0; i < obj.feedArray.length; i++) {
        // Text Strings
        this.headlineStr = (obj.feedArray[i].name.indexOf(",") == -1) ? obj.feedArray[i].name : obj.feedArray[i].name.slice(0, obj.feedArray[i].name.indexOf(","));
        this.subheadStr = (obj.feedArray[i].name.indexOf(",") == -1) ? " " : obj.feedArray[i].name.slice(obj.feedArray[i].name.indexOf(",") + 1, obj.feedArray[i].name.length);

        // Replaces last space of string to nbsp; to avoid one word windows
        // Conditionals check to see if there are spaces in our strings
        if (this.headlineStr.indexOf(" ") != -1) {
            this.headlineStr = this.headlineStr.slice(0, this.headlineStr.lastIndexOf(" ")) + "&nbsp" + this.headlineStr.slice(this.headlineStr.lastIndexOf(" ") + 1, this.headlineStr.length);
        }
        if (this.subheadStr.indexOf(" ") != -1) {
            this.subheadStr = this.subheadStr.slice(0, this.subheadStr.lastIndexOf(" ")) + "&nbsp" + this.subheadStr.slice(this.subheadStr.lastIndexOf(" ") + 1, this.subheadStr.length);
        }

        this["carouselPanel" + (i + 1)] = new AnimationFrame({
            // Dimensions
            width: obj.width,
            height: obj.height,

            // JS objects I would like to add into the frame and
            // their respective properties
            items: [
                // [ ---------- RECTANGLE ---------- ]
                {
                    object: {
                        objType: "Rectangle",
                        varName: "carousel_clickArea" + (i + 1),
                        id: "carousel_clickArea" + (i + 1),
                        width: obj.width,
                        height: obj.height,
                        color: "#FFFFFF"
                    },
                    left: 0,
                    top: 0,
                    opacity: 0,
                    visibility: "visible",
                    preload: false
                },
                // [ ---------- PRODUCT IMAGE ---------- ]
                {
                    object: {
                        objType: "ImageHolder",
                        varName: "carousel_productImage" + (i + 1),
                        id: "carousel_productImage" + (i + 1),
                        src: obj.feedArray[i].imageurl /*+ "&wid=" + this.imageWidthNum + "&hei=" + this.imageHeightNum*/
                    },
                    left: obj.productImage.left,
                    top: obj.productImage.top,
                    visibility: "visible",
                    preload: true
                },

                // [ ---------- HEADLINE TEXT---------- ]
                {
                    object: {
                        objType: "TextField",
                        varName: "carousel_headlineText" + (i + 1),
                        id: "carousel_headlineText" + (i + 1),
                        text: this.headlineStr,
                        fontSize: obj.headerText.fontSize,
                        width: obj.width - (obj.headerText.left * 2),
                        fontFamily: "MyriadProBold",
                        color: myFT.instantAds.carouselFrame_headline_text_color,
                        align: "left",
                        letterSpacing: 0,
                        lineHeight: obj.headerText.fontSize + 2,
                    },
                    left: obj.headerText.left,
                    top: obj.headerText.top,
                    visibility: "visible",
                    preload: false
                },

                // [ ---------- SUBHEAD TEXT---------- ]
                {
                    object: {
                        objType: "TextField",
                        varName: "carousel_subheadText" + (i + 1),
                        id: "carousel_subheadText" + (i + 1),
                        text: this.subheadStr,
                        fontSize: obj.headerText.fontSize,
                        width: obj.width - (obj.headerText.left * 2),
                        fontFamily: "MyriadProRegular",
                        color: myFT.instantAds.carouselFrame_headline_text_color,
                        align: "left",
                        letterSpacing: 0,
                        lineHeight: obj.headerText.fontSize + 2,
                    },
                    left: obj.headerText.left,
                    top: 0,
                    visibility: "visible",
                    preload: false
                },

                // [ ---------- PRICE OBJECT ---------- ]
                {
                    object: {
                        objType: "Price",
                        varName: "carousel_price" + (i + 1),
                        id: "carousel_price" + (i + 1),
                        previousPrice: {
                            dollars: obj.feedArray[i].waspricedollars,
                            cents: obj.feedArray[i].waspricecents
                        },
                        currentPrice: {
                            dollars: obj.feedArray[i].nowpricedollars,
                            cents: obj.feedArray[i].nowpricecents
                        },
                        headerImageSrc: obj.price.headerImageSrc,
                        soldByText: obj.feedArray[i].soldby,
                        duration: 0.8,
                    },
                    left: obj.price.left,
                    visibility: "visible",
                    preload: true
                },
            ],

            // oninit Function
            oninit: (function (root, index) {
                return function () {
                    setTimeout((function (myroot, myindex) {
                        return function () {
                            myroot["carouselPanel" + myindex]["carousel_subheadText" + myindex].top = root["carouselPanel" + myindex]["carousel_headlineText" + myindex].top + myroot["carouselPanel" + myindex]["carousel_headlineText" + myindex].height;
                            myroot["carouselPanel" + myindex]["carousel_price" + myindex].top = (root["carouselPanel" + myindex]["carousel_subheadText" + myindex].top + myroot["carouselPanel" + myindex]["carousel_subheadText" + myindex].height + 10);
                        }
                    })(root, index), 2000);
                }
            })(this, i + 1),

            // Animation frame parent
            parent: this.container
        })

        // pushes carousel panels inside array
        this.itemsArr.push({item: this["carouselPanel" + (i + 1)], isAnimated: false});

        // aligns carousel items
        this.itemsArr[i].item.top = 0;
        this.itemsArr[i].item.left = obj.width * i;
    }

    // arrow navigations
    this.leftArrowImage = new ImageHolder({
        id: "nav_leftArrow",
        src: obj.navigation.leftArrowImage.src,
        parent: body
    });
    this.leftArrowImage.left = obj.navigation.leftArrowImage.left;
    this.leftArrowImage.top = obj.navigation.leftArrowImage.top;
    this.leftArrowImage.opacity = 0;
    this.leftArrowImage.div.style.pointerEvents = "none";

    this.rightArrowImage = new ImageHolder({
        id: "nav_rightArrow",
        src: obj.navigation.rightArrowImage.src,
        parent: body
    });
    this.rightArrowImage.left = obj.navigation.rightArrowImage.left;
    this.rightArrowImage.top = obj.navigation.rightArrowImage.top;
    this.rightArrowImage.opacity = 0;
    this.rightArrowImage.div.style.pointerEvents = "none";

    this.leftArrowImage.onclick = (function (root) {
        return function () {
            root.previous();
        }
    })(this);

    this.rightArrowImage.onclick = (function (root) {
        return function () {
            root.next();
        }
    })(this);

    // Dot Navigation
    this.dotNavContainer = document.createElement("div");
    this.dotNavContainer.style.position = "absolute";
    this.dotNavContainer.style.overflow = "hidden";
    this.dotNavContainer.style.width = (obj.feedArray.length * 14) + "px";
    this.dotNavContainer.style.height = "14px";
    this.dotNavContainer.style.left = ((this.obj.width / 2) - ((14 * obj.feedArray.length) / 2)) + "px";
    this.dotNavContainer.style.top = "188px";
    this.dotNavContainer.style.pointerEvents = "none";
    this.dotNavContainer.style.opacity = 0;
    body.appendChild(this.dotNavContainer);

    for (var i = 0; i < obj.feedArray.length; i++) {
        this["dotNav" + i] = document.createElement("div");
        this["dotNav" + i].style.position = "absolute";
        this["dotNav" + i].style.overflow = "hidden";
        this["dotNav" + i].style.cursor = "pointer";
        this["dotNav" + i].style.width = this["dotNav" + i].style.height = "14px";

        this.dotNavContainer.appendChild(this["dotNav" + i]);
        this["dotNav" + i].style.left = (i * 14) + "px";

        this["dotInactive" + i] = new ImageHolder({
            src: this.obj.navigation.inactiveDotImage.src,
            parent: this["dotNav" + i]
        });

        this["dotActive" + i] = new ImageHolder({
            src: this.obj.navigation.activeDotImage.src,
            parent: this["dotNav" + i]
        });

        if (i == 0) {
            this["dotActive" + i].visibility = "visible";
            this["dotInactive" + i].visibility = "hidden";
        } else {
            this["dotActive" + i].visibility = "hidden";
            this["dotInactive" + i].visibility = "visible";
        }

        this["dotNav" + i].onclick = (function (root, lcv) {
            return function () {
                root.goto(lcv);
            }
        })(this, i);
    }

    // Sets initial URL string and Product string for clickTag
    url_str = this.obj.feedArray[this.currentItem].url;
    productName_str = this.obj.feedArray[this.currentItem].name;

    // Preloads our images
    this.preloadInterval = setInterval(this.preloader, 1, this);
}

// Setters and getters
Carousel.prototype = {
    get width() {
        return parseInt(this.container.offsetWidth);
    },
    set width(n) {
        var testValue = "0" + n;
        this.container.style.width = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get height() {
        return parseInt(this.container.offsetHeight);
    },
    set height(n) {
        var testValue = "0" + n;
        this.container.style.height = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get left() {
        return parseInt(this.container.offsetLeft);
    },
    set left(n) {
        var testValue = "0" + n;
        this.container.style.left = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get top() {
        return parseInt(this.container.offsetTop);
    },
    set top(n) {
        var testValue = "0" + n;
        this.container.style.top = (testValue.substr(testValue.length - 2) != "px") ? n + "px" : n;
    },
    get opacity() {
        return this.container.style.opacity;
    },
    set opacity(n) {
        this.container.style.opacity = n;
    },
    get visibility() {
        return this.container.style.visibility;
    },
    set visibility(s) {
        this.container.style.visibility = s;
    },
    get div() {
        return this.container;
    },
    set zIndex(n) {
        this.container.style.zIndex = n;
    },
    set onclick(f) {
        this.container.onclick = f;
    }
}

// This makes sure that all our images are loaded
Carousel.prototype.preloader = function (root) {
    for (var i = 0; i < root.itemsArr.length; i++) {
        if (!root.itemsArr[i].item.isLoaded) {
            //console.log(root.itemsArr[i]);
            break;
        } else {
            if (i == root.itemsArr.length - 1) {
                // Indicates of our carousel has loaded or not
                root.isLoaded = true;
                root.container.dispatchEvent(root.evt);
                clearInterval(root.preloadInterval);
            }
        }
    }
}

Carousel.prototype.dotHandler = function () {
    for (var i = 0; i < this.obj.feedArray.length; i++) {
        if (i == this.currentItem) {
            this["dotActive" + i].visibility = "visible";
            this["dotInactive" + i].visibility = "hidden";
            //this["dotNav"+i].disableClick();
        } else {
            this["dotActive" + i].visibility = "hidden";
            this["dotInactive" + i].visibility = "visible";
            // this["dotNav"+i].enableClick();
        }
    }
}

Carousel.prototype.correctIndex = function (n) {
    var newIndexNum = n;

    if (newIndexNum < 0) {
        newIndexNum = this.itemsArr.length - 1;
    } else if (newIndexNum >= this.itemsArr.length) {
        newIndexNum = 0;
    }

    return newIndexNum;
}

Carousel.prototype.previous = function () {
    this.disableNavigation();

    this.previousItem = this.currentItem;
    this.currentItem = this.correctIndex(this.currentItem - 1);

    url_str = this.obj.feedArray[this.currentItem].url;
    productName_str = this.obj.feedArray[this.currentItem].name;
    //console.log(productName_str);

    this.dotHandler();

    this.itemsArr[this.previousItem].item.left = 0;
    TweenLite.to(this.itemsArr[this.previousItem].item, 0.5, {
        left: this.width,
        ease: Quad.easeInOut,
        overwrite: 0
    });

    this.itemsArr[this.currentItem].item.left = -this.width;
    TweenLite.to(this.itemsArr[this.currentItem].item, 0.5, {
        left: 0,
        ease: Quad.easeInOut,
        overwrite: 0,
        delay: 0
    });

    if (!this.itemsArr[this.currentItem].isAnimated) {
        this.itemsArr[this.currentItem].isAnimated = true;
        //this.itemsArr[this.currentItem].item.animate({frameName:"intro", delay:0.5});
    }
}

Carousel.prototype.next = function () {
    this.disableNavigation();

    this.previousItem = this.currentItem;
    this.currentItem = this.correctIndex(this.currentItem + 1);

    url_str = this.obj.feedArray[this.currentItem].url;
    productName_str = this.obj.feedArray[this.currentItem].name;
    //console.log(productName_str);

    this.dotHandler();

    this.itemsArr[this.previousItem].item.left = 0;
    TweenLite.to(this.itemsArr[this.previousItem].item, 0.5, {
        left: -this.width,
        ease: Quad.easeInOut,
        overwrite: 0
    });

    this.itemsArr[this.currentItem].item.left = this.width;
    TweenLite.to(this.itemsArr[this.currentItem].item, 0.5, {
        left: 0,
        ease: Quad.easeInOut,
        overwrite: 0,
        delay: 0
    });

    if (!this.itemsArr[this.currentItem].isAnimated) {
        this.itemsArr[this.currentItem].isAnimated = true;
        //this.itemsArr[this.currentItem].item.animate({frameName:"intro", delay:0.5});
    }
}

Carousel.prototype.goto = function (n) {
    this.disableNavigation();

    this.previousItem = this.currentItem;
    this.currentItem = n;

    url_str = this.obj.feedArray[this.currentItem].url;
    productName_str = this.obj.feedArray[this.currentItem].name;
    //console.log(productName_str);

    this.dotHandler();

    this.itemsArr[this.previousItem].item.left = 0;
    if (this.previousItem < this.currentItem) {
        TweenLite.to(this.itemsArr[this.previousItem].item, 0.5, {
            left: -this.width,
            ease: Quad.easeInOut,
            overwrite: 0
        });

        this.itemsArr[this.currentItem].item.left = this.width;
        TweenLite.to(this.itemsArr[this.currentItem].item, 0.5, {
            left: 0,
            ease: Quad.easeInOut,
            overwrite: 0,
            delay: 0
        });
    } else if (this.previousItem > this.currentItem) {
        TweenLite.to(this.itemsArr[this.previousItem].item, 0.5, {
            left: this.width,
            ease: Quad.easeInOut,
            overwrite: 0
        });

        this.itemsArr[this.currentItem].item.left = -this.width;
        TweenLite.to(this.itemsArr[this.currentItem].item, 0.5, {
            left: 0,
            ease: Quad.easeInOut,
            overwrite: 0,
            delay: 0
        });
    }

    if (!this.itemsArr[this.currentItem].isAnimated) {
        this.itemsArr[this.currentItem].isAnimated = true;
        //this.itemsArr[this.currentItem].item.animate({frameName:"intro", delay:0.5});
    }
}

Carousel.prototype.initiateFirstItemAnimation = function (d) {
    this.itemsArr[0].isAnimated = true;
    //this.itemsArr[0].item.animate({frameName:"intro", delay:d})
}

Carousel.prototype.enableNavigation = function (d) {
    TweenLite.to(this.leftArrowImage, 0.5, {
        onStart: (function (root) {
            return function () {
                root.leftArrowImage.div.style.pointerEvents = "auto";
            }
        })(this),
        opacity: 1,
        delay: d
    });
    TweenLite.to(this.rightArrowImage, 0.5, {
        onStart: (function (root) {
            return function () {
                root.rightArrowImage.div.style.pointerEvents = "auto";
            }
        })(this),
        opacity: 1,
        delay: d
    });

    for (var i = 0; i < this.obj.feedArray.length; i++) {
        this["dotNav" + i].style.pointerEvents = "auto";
        TweenLite.to(this.dotNavContainer, 0.5, {
            onStart: (function (root) {
                return function () {
                    root.dotNavContainer.style.pointerEvents = "auto";
                }
            })(this),
            opacity: 1,
            delay: d
        });
    }

    this.swipeLeftFunction = (function (root) {
        return function (e) {
            return function (e, root) {
                root.next();
            }
        }
    })(this);

    this.swipeRightFunction = (function (root) {
        return function (e) {
            return function (e, root) {
                root.previous();
            }
        }
    })(this);

    this.container.addEventListener('swipeLeft', this.swipeLeftFunction);
    this.container.addEventListener('swipeRight', this.swipeRightFunction);
}

Carousel.prototype.disableNavigation = function () {
    this.isMotion = true;
    //this.leftArrowImage.div.style.pointerEvents = this.rightArrowImage.div.style.pointerEvents = "none";
    this.leftArrowImage.onclick = this.rightArrowImage.onclick = "";
    for (var i = 0; i < this.obj.feedArray.length; i++) {
        this["dotNav" + i].pointerEvents = "none";
    }

    setTimeout((function (root) {
        return function () {
            root.isMotion = false;
            root.leftArrowImage.div.style.pointerEvents = root.rightArrowImage.div.style.pointerEvents = "auto";
            root.leftArrowImage.onclick = (function (root) {
                return function () {
                    root.previous();
                }
            })(root);

            root.rightArrowImage.onclick = (function (root) {
                return function () {
                    root.next();
                }
            })(root);

            root.dotHandler();
        }
    })(this), 500);
}

//------------------------------------------*/
// AD UTILS
/*------------------------------------------*/
// Useful functions that come in handy for our ad
var AdUtils = {
    // Creates an object from a string.  Each property is delimitted by a '|' and property names and values
    // are separated by a ':' (ie. "isVisible:true|width:300|height:250|thickness:1|color:#C0C0C0")
    createObject: function (s) {
        var obj = {};
        var arr = s.split("|");

        // Loop separates our property names from property values (delimitted by ':'), and creates our objects.
        for (var i = 0; i < arr.length; i++) {
            var name = arr[i].slice(0, arr[i].indexOf(":"));
            var value = arr[i].slice(arr[i].indexOf(":") + 1, arr[i].length);

            // This line determines whether the value is a string or actual numerical
            // value, and changes it accordingly.
            obj[name] = (isNaN(value)) ? String(value) : Number(value);

            // Creates an array/object from a string if the value truly represents an array/object
            if (isNaN(obj[name])) {
                // Array conditional
                if (obj[name].substring(0, 1) == "[" && obj[name].substring(obj[name].length - 1, obj[name].length) == "]") {
                    obj[name] = eval(obj[name]);
                }
                // Object conditional
                else if (obj[name].substring(0, 1) == "{" && obj[name].substring(obj[name].length - 1, obj[name].length) == "}") {
                    obj[name] = eval("(" + obj[name] + ")");
                }
            }

            // converts our string to booleans if required
            switch (obj[name]) {
                case "true":
                    obj[name] = true;
                    break;
                case "false":
                    obj[name] = false;
                    break;
            }
        }
        return obj;
    },

    // Find and replacer used mostly for Flashtalking macros, but can be used for anything really
    findAndReplace: function (obj) {
        var returnString = obj.string;
        var listArr = obj.list;

        for (var i = 0; i < listArr.length; i++) {
            returnString = returnString.replace(listArr[i].find, listArr[i].replace);
        }

        return returnString
    },

    // removes duplicate items from array
    removeDuplicateArrayItems: function (a) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for (var i = 0; i < a.length; i++) {
            var item = a[i];
            if (seen[item] !== 1) {
                seen[item] = 1;
                out[j++] = item;
            }
        }
        return out;
    },

    // This give any string a character limit
    characterLimiter: function (obj) {
        var string = obj.string;

        if (string.length > obj.characterLimit) {
            // Limits the characters of our string
            string = string.substring(0, obj.characterLimit);

            // Adds suffix string if necessary
            if (obj.suffix) {
                string += obj.suffix;
            }
        }

        return string;
    },

    // Modifies clickTag so that it can pass custom strings for tracking (ft_custom)
    // and then also executes clickTag
    // ------------------------------------
    // 1st parameter: clickTag number
    // 2nd parameter: clickTag dynamic url (if there's no dynamic url, you can leave it as "")
    // 3rd parameter: string you want to track
    clickTagModifier: function (clickTagNumber, urlString, trackingString) {
        modifyClickTagsAndTracking(clickTagNumber, trackingString);
        myFT.clickTag(clickTagNumber, urlString.toLowerCase()); //@FT-JM Added .toLowerCase() due to Feed becoming fully uppercase and dynamic clickTags requiring 'http'

        function modifyClickTagsAndTracking(clickTagNumber, trackingString) {
            var ftCustomValue = trackingString;

            myFTClickTags = myFT.get('clicks');

            if (myFTClickTags["clickTag" + clickTagNumber].indexOf("ft_custom=") < 0) {
                myFTClickTags["clickTag" + clickTagNumber] = insertParam(myFTClickTags["clickTag" + clickTagNumber], {
                    param: 'ft_custom',
                    value: ''
                })
            }

            myFTClickTags["clickTag" + clickTagNumber] = replaceClickTag(myFTClickTags["clickTag" + clickTagNumber], trackingString);
        }

        function insertParam(str, insert) {
            if (typeof str === "string") {
                str = str.replace("/?", "/?" + insert.param + "=" + insert.value + "&");
            }

            return str;
        };

        // insert ft_custom
        function replaceClickTag(url, ftCustomValue) {
            var ftCustomCheck = new RegExp("(ft_custom=)(.*?)(&|$)", "i");
            if (url == undefined) {
                return url;
            }
            if (ftCustomCheck.test(url)) {
                return url.replace(ftCustomCheck, "$1__" + ftCustomValue + "$3");
            } else {
                return url;
            }
        }
    },

    platformDetector: {
        // This detects what browser the user is using
        browser: function () {
            var browser_str = "";
            var isOpera = false;

            // detects if browser is opera
            if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
                isOpera = true;
                browser_str = "Opera";
            }

            // detects if browser is firefox
            else if (typeof InstallTrigger !== 'undefined') {
                browser_str = "Firefox";
            }

            // detects if browser is safari
            else if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
                return "Safari";
                return browser_str;
            }

            // detects if browser is chrome
            else if (!!window.chrome && !isOpera) {
                browser_str = "Chrome";
            }

            // detects if browser is IE 6 - 11
            else if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
                // determines versions of IE using feature detection
                if (window.ActiveXObject === undefined) {
                    browser_str = "Unknown IE version";
                } else if (!document.querySelector) {
                    browser_str = "IE 7";
                } else if (!document.addEventListener) {
                    browser_str = "IE 8";
                } else if (!window.atob) {
                    browser_str = "IE 9";
                } else if (!document.__proto__) {
                    browser_str = "IE 10";
                } else {
                    browser_str = "IE 11";
                }
            }

            // detects Microsoft Edge
            else if (navigator.appVersion.indexOf('Edge') > -1) {
                browser_str = "Edge";
            } else {
                browser_str = "Unknown";
            }

            return browser_str
        },
        // This detects what OS the user is on
        os: function () {
            var OSName;
            if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) {
                OSName = "Windows 10";
            } else if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) {
                OSName = "Windows 8.1";
            } else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) {
                OSName = "Windows 8";
            } else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
                OSName = "Windows 7";
            } else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) {
                OSName = "Windows Vista";
            } else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) {
                OSName = "Windows XP";
            } else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) {
                OSName = "Windows 2000";
            } else if (window.navigator.userAgent.indexOf("Mac") != -1) {
                OSName = "Mac/iOS";
            } else if (window.navigator.userAgent.indexOf("X11") != -1) {
                OSName = "UNIX";
            } else if (window.navigator.userAgent.indexOf("Linux") != -1) {
                OSName = "Linux";
            } else {
                OSName = "unknown OS";
            }
            return OSName;
        }
    }
}
