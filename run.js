var app = require('express')(),
    openBadge = require('./');  

// Simple badge with default configuration
app.get('/simple.svg', function (req, res) {
    openBadge({text: ['Accident Free', '20 Days'], sharpness: 20}, function (err, badgeSvg) { // Pass sharpness here
        if (err) {
            console.error('Error generating badge:', err);
            return res.status(500).send('Error generating badge');
        }
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

// Changing fonts (Comic Sans)
app.get('/font.svg', function (req, res) {
    openBadge({text: ['Favorite Font', 'Comic Sans'], font: {fontFace: 'fonts/Open_Sans/OpenSans-Bold.ttf'}, sharpness: 20}, function (err, badgeSvg) { // Pass sharpness here
        if (err) {
            console.error('Error generating badge:', err);
            return res.status(500).send('Error generating badge');
        }
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

// Changing colors (Left and Right background colors, font color, and shadow)
app.get('/colors.svg', function (req, res) {
    openBadge({text: ['Pretty', 'Colors!'], color:{left:"#ccc", right:"#cc99ff", font:"#333", shadow:"#fff"}, sharpness: 40}, function (err, badgeSvg) { // Pass sharpness here
        if (err) {
            console.error('Error generating badge:', err);
            return res.status(500).send('Error generating badge');
        }
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

// Default badge with exaggerated configuration showing all the options
app.get('/defaults.svg', function (req, res) {
    var badgeConfig = {
        badge: 'baseBadge',  // Use the default badge template (you can customize if more templates are available)
        text: ['Hello', 'World'],  // Badge text
        color: {
            left: '#555',  // Left background color
            right: '#4c1',  // Right background color
            font: '#fff',  // Font color
            shadow: '#010101'  // Text shadow color
        },
        font: {
            fontFace: 'fonts/Open_Sans/OpenSans-Bold.ttf',  // Path to the font file
            fontSize: 12  // Font size in pixels
        },
        paddingX: 6,  // Horizontal padding
        paddingY: 6,  // Vertical padding
        sharpness: 50  // Pass sharpness here as well
    };

    openBadge(badgeConfig, function (err, badgeSvg) {
        if (err) {
            console.error('Error generating badge:', err);
            return res.status(500).send('Error generating badge');
        }
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

// Root route to display all the badges
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
        'Default Config: <img src="defaults.svg"/><br>' +
        'A Basic Badge: <img src="simple.svg"/><br>' +
        'Changed Fonts: <img src="font.svg"/><br>' +
        'Changed Color: <img src="colors.svg"/><br>' +
        '</body>' +
        '</html>'
    );
});

// Start the server and listen on port 1337
app.listen(1337, function (err) {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Listening on http://localhost:1337/');
    }
});
