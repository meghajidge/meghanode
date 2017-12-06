var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('style', function(){
    console.log('Starting style task');

    return gulp.src('public/script/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist1'))
});

gulp.task('Image', function(){
    console.log('Starting Image task');
});

gulp.task('Video', function(){
    console.log('Starting video task');
});

gulp.task('default', function(){
    console.log('Starting image task');
});

gulp.task('watch', function(){
    
})