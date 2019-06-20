/**
 * Created by Administrator on 2017/9/7.
 */


var gulp = require('gulp');
var jshint = require("gulp-jshint"); //���JS
var uglify = require('gulp-uglify');  //����jsѹ��
var minifyCss = require('gulp-minify-css'); //ѹ����css
var htmlmini = require('gulp-minify-html'); //ѹ��html
var concat = require("gulp-concat");  //�ϲ��ļ�
var imagemin = require('gulp-imagemin');//ѹ��ͼƬ

gulp.task('compressJs',function(){
    gulp.src('./app/js/videoDetails.js')//��ȡ�ļ���ͬʱ���˵�.min.js�ļ�
        .pipe(uglify({
            compress: {
                drop_console: true //ȥ��console.log()
            }
        }))
        .pipe(gulp.dest('dist/js'));//����ļ�
});
gulp.task('compressCss',function(){
    gulp.src('./app/css/*.css')///Ҫѹ����css
        .pipe(minifyCss({
            advanced: false,//���ͣ�Boolean Ĭ�ϣ�true [�Ƿ����߼��Ż����ϲ�ѡ�����ȣ�]
            compatibility: 'ie7',//����ie7�����¼���д�� ���ͣ�String Ĭ�ϣ�''or'*' [���ü���ģʽ�� 'ie7'��IE7����ģʽ��'ie8'��IE8����ģʽ��'*'��IE9+����ģʽ]
            keepBreaks: false,//���ͣ�Boolean Ĭ�ϣ�false [�Ƿ�������]
            keepSpecialComments: '*'
            //������������ǰ׺ ������autoprefixer���ɵ������ǰ׺�������������������п��ܽ���ɾ����Ĳ���ǰ׺
        }))
        .pipe(gulp.dest('dist/css'));//����ļ�
});
gulp.task('copy',function(){
    gulp.src('./app/*.html')///Ҫ���Ƶ�html
        .pipe(gulp.dest('dist'));//����ļ�
});
gulp.task('htmlmini', function () {
    gulp.src('./app/register.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('dist'));
});
gulp.task('jsLint', function () {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter()); // ��������
});

gulp.task('concat', function () {
    gulp.src('js/*.js')  //Ҫ�ϲ����ļ�
        .pipe(concat('all.js'))  // �ϲ�ƥ�䵽��js�ļ�������Ϊ "all.js"
        .pipe(gulp.dest('dist4/js'));
});


gulp.task('testImagemin', function () {
    gulp.src('./app/images/year/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('SpringFestival/images/year'));
});

