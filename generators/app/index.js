var generators = require('yeoman-generator');


function setUpCopy(generator) {
    return function copy(filename, context) {
        console.log(context)
        if (generator._.isArray(filename)) {
            filename.forEach(function( filename ){
                copy( filename, context );
            });
        } else {
            generator.fs.copyTpl(
                generator.templatePath(filename),
                generator.destinationPath(filename),
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
    app: function () {
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
    installDeps: function(){
        this.npmInstall();
    }
});
