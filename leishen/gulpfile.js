//进入文件夹 cd 

// 初始化 cnpm init

// cnpm i gulp@3.9.1 -D

//插件下载到本地  cnpm i gulp-sass gulp-minify-css gulp-rename gulp-connect -D
const gulp = require('gulp');
gulp.task('copy-html',function(){
    return gulp.src('html/*.html')
    .pipe(gulp.dest('dist/html'))
    .pipe(connect.reload());
})

gulp.task('images',function(){
    return gulp.src('images/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload())
})

gulp.task('scripts',function(){
    return gulp.src('js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
})

gulp.task('data',function(){
    return gulp.src('data/*.json')
    .pipe(gulp.dest('dist/json'))
    .pipe(connect.reload())
})

const sass = require('gulp-sass')
const minifyCss = require('gulp-minify-css')
const rename = require('gulp-rename');
gulp.task('sass',function(){
    return gulp.src('stylesheet/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCss())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());

})
gulp.task('good-sass',function(){
    return gulp.src('stylesheet/good.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCss())
    .pipe(rename('good.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());

})

//让多次事件一次执行

gulp.task('build',['copy-html','images','data','scripts','sass','good-sass'],function(){
    console.log('项目建立完成');
})



// 实现事件监听
gulp.task('watch',function(){
    gulp.watch('html/*.html',['copy-html']);
    gulp.watch('images/*.{jpg,png}',['images']);
    gulp.watch('data/*.json',['data']);
    gulp.watch('stylesheet/index.scss',['sass']);
    gulp.watch('stylesheet/good.scss',['good-sass']);
    gulp.watch('js/*.js',['scripts']);
})

// 新建一个服务器
const connect = require('gulp-connect');
gulp.task('server',function(){
    connect.server({
        root:'dist',
        port:2418,
        livereload:true
    })
})

gulp.task('default',['watch','server']);