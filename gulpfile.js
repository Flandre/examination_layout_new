const gulp = require('gulp')
const less = require('gulp-less')
const watch = require('gulp-watch')

gulp.task('less', function(){
  console.log(`build time: ${new Date()}`)
  gulp.src('*/*.less')
    .pipe(less())
    .pipe(gulp.dest('./'));
})


gulp.task('watch', function(){
  gulp.watch('./**/**/*', ['less']);
});

gulp.task('default', ['less'], function() {

});