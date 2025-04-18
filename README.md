# The OpenBadge Project
## Why
SVG badges are pretty awesome, but the current solutions (eg: [shield.io](http://shield.io), [fury.io](http://fury.io)) are somewhat heavy.

Sometimes you need to run custom functionality, sometimes the source data to generate lives behind firewalls, and sometimes hackers just want to hack.
 
The Open Badge project gives you a module that produces custom SVG badges, giving you full control over fonts, sizes, padding, colors, etc.
It's pretty lightweight, so you can include it as part of your projects. Pure SVG solution. Does not require canvas libraries to be installed on your system. 

Runnable Example usage in an express app: 
![](assets/example.png) 
 
```javascript
var app = require('express')(),
    openBadge = require('./');

/**
 * A simple badge using config defaults.
 * We only specify the text on the left and the text on the right
 */
app.get('/simple.svg', function (req, res) {
    openBadge({text: ['Accident Free', '20 Days']}, function (err, badgeSvg) {
        /* TODO: Check for err */
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

/**
 * Changing fonts:
 * Example: Comic Sans. Just because you can, doesn't mean you should...
 */
app.get('/font.svg', function (req, res) {
    openBadge({text: ['Favorite Font', 'Comic Sans'], font: {fontFace: 'fonts/comic-sans/comic-sans.ttf'}, radius:30}, function (err, badgeSvg) {
        /* TODO: Check for err */
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

/**
 * Changing Colors:
 * Individual control over both halves, the font and its dropshadow
 */
app.get('/colors.svg', function (req, res) {
    openBadge({text: ['Pretty', 'Colors!'], color:{left:"#ccc",right:"#cc99ff",font:"#333",shadow:"#fff"}, radius:20}, function (err, badgeSvg) {
        /* TODO: Check for err */
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

app.get('/defaults.svg', function (req, res) {

    // Note: This is an exaggerated configuration showing all the defaults
    // In reality you *DON'T* needs to set all of these, and can get away
    // with just specifying the `text` parameter.

    var badgeConfig = {
        badge: 'baseBadge',                 // baseBadge is the only one we have for now.
        text: ['Hello', 'World'],           // Array with the copy on either side of the badge
        color: {
            left: '#555',                   // Background color on the left
            right: '#4c1',                  // Background color on the right
            font: '#fff',                   // Badge font color
            shadow: '#010101'               // Text shadow color. (Defaults to 0.3 opacity)
        },
        font: {
            fontFace: 'fonts/Open_Sans/OpenSans-Bold.ttf', // Path to the font to use.
            fontSize: 11                    // Font size in pixels
        },
        paddingX: 6,                       // Horizontal padding (in pixels) around text
        paddingY: 6,                         // Vertical padding (in pixels) around text
        radius: 30                          // change badge radius
    };

    openBadge(badgeConfig, function (err, badgeSvg) {
        /* TODO: Check for err */
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

app.get('/', function (req, res) {
    res.send(
        '<html>' +
        '<head>' +
        '<style>' +
        '   img {vertical-align: top} ' +
        '   * {line-height: 25px}' +
        '</style>' +
        '</head>' +
        '<body style="font-family: monospace">' +
        'Default Confg: <img src="defaults.svg"/><br>' +
        'A Basic Badge: <img src="simple.svg"/><br>' +
        'Changed Fonts: <img src="font.svg"/><br>' +
        'Changed Color: <img src="colors.svg"/><br>' +
        '</body>' +
        '</html>'
    )
});

app.listen(1337, function (err) {
    console.log('Listening on http://localhost:1337/');
});
 ```