var generators = require('yeoman-generator');
var path = require('path');


function setUpCopy(generator, folder) {
    folder = folder || '';
    return function copy(filename, context) {
        if (generator._.isArray(filename)) {
            filename.forEach(function (filename) {
                copy(filename, context);
            });
        } else {
            generator.fs.copyTpl(
                generator.templatePath(filename),
                generator.destinationPath(path.join(folder, filename)),
                context
            );
        }
    };
}

module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);

        var oldAppName = this.appname;
        this.argument('appname', {type: String, required: false});
        if (this.appname === undefined) {
            this.appname = oldAppName;
            this.askForAppName = true;
        }
        this.appname = this._.camelize(this.appname);
    },

    prompting: function () {
        if (this.askForAppName) {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            }, function (answers) {
                this.log(answers.name);
                done();
            }.bind(this));
        }
    },
    writing: function () {
        var copy = setUpCopy(this, this.appname);
        copy([
            'index.html',
            'gulpfile.js',
            'package.json',
            'js/index.js'
        ], {
            appname: this.appname
        });
    },
    install: function () {
        process.chdir(this.appname);
        this.npmInstall();
    }
});
