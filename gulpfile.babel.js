import gulp from 'gulp'
import babel from 'gulp-babel'
import jade from 'gulp-jade'
import serve from 'gulp-serve'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'

const paths = {
  js: {
    main: './src/js/page-walker.babel.js',
    js: './page-walker.js'
  },
  jade: {
    src: './src/jade/*.jade'
  }
}

gulp.task('serve', serve({
  port: '3003',
  root: '.'
}))

gulp.task('babel', () => {
  gulp.src(paths.js.main)
    .pipe(babel())
    .pipe(rename('page-walker.js'))
    .pipe(gulp.dest('.'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('jade', () => {
  gulp.src(paths.jade.src)
    .pipe(jade({
      locals: {
        time: Date.now()
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('watch', () => {
  gulp.watch(paths.js.main, ['babel'])
  gulp.watch(paths.jade.src, ['jade'])
})

gulp.task('build', ['babel', 'jade'])

gulp.task('default', ['build', 'watch', 'serve'])
