# The OpenBadge Project
## Why
SVG badges are pretty awesome, but the current providers (eg: [shield.io](http://shield.io), [fury.io](http://fury.io)) are somewhat limited.

Sometimes you need to run custom functionality, sometimes the source data to generate lives behind firewalls, and sometimes hackers just want to hack.
 
The Open Badge project gives you a module that produces custom SVG badges, giving you full control over fonts, sizes, padding, colors, etc.

Example usage: 
 
```javascript

var app = require('express')(),
    openBadge = require('openbadge');
 
 app.get('/time.svg', function (req, res) {
     openBadge({text: ['Accident Free', '20 days']}, function (err, badgeSvg) {
         if (err) {
             console.error(err);
             res.status(500);
             return res.end();
         }
         res.set('Content-Type', 'image/svg+xml');
         res.send(badgeSvg);  
 });
 
 app.listen(1337, function (err) {
     console.log('Listening on http://localhost:1337/');
 });
 ```