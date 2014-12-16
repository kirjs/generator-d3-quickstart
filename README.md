# generator-d3-quickstart
This is a [Yeoman](http://yeoman.io) generator for the [d3.js](http://d3.js).
It has the minimum skeleton necessary to start with d3.js

This generator includes:

* index.html - with svg
* js/index.js - for the code 
* css/style.css - for styling
* gulpfile.js - currently only has browser-sync
* package.json - d3 is installed via npm

## Getting Started

### Installing Yeoman?

This generator required yeoman, it can be installed from npm:

```
$ npm install -g yo
```

### Yeoman Generators

To install generator-d3-quickstart from npm, run:

```
$ npm install -g generator-d3-quickstart
```

### Generating an empty d3 project
Navigate into a folder where you want your presentation

```
$ yo d3-quickstart project-name
```


### Running
This generator uses gulp and browser-sync. If you do not have gulp installed, you may have to run `npm install -g gulp`.

In order to run live preview with browser-sync, just run: 
```
$ gulp
```

## License

MIT
