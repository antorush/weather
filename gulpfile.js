const {src, dest, watch, parallel, series}=require('gulp'); 


const scss=require('gulp-sass')(require('sass'));
const concat=require('gulp-concat');
const unglify=require('gulp-uglify-es').default;
const browserSync=require('browser-sync').create();
const autoPrefixer=require('gulp-autoprefixer');
const clean=require('gulp-clean');
const avif=require('gulp-avif');
const webp=require('gulp-webp');
const imagemin=require('gulp-imagemin');
const newer=require('gulp-newer');
const svgSprite=require('gulp-svg-sprite');
const fonter=require('gulp-fonter');
const ttf2woff2=require('gulp-ttf2woff2');
const include=require('gulp-include');


function pages(){
    return src('app/pages/*.html')
    .pipe(include({
        includePaths: ['app/components','app/components2']
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function componentPages(){
    return src(['app/components/*.html', 'app/components2/*.html'])
    .pipe(include({
        includePaths: ['app/components','app/components2']
    }))
    .pipe(dest('app/components-out/'))
}



function fonts(){
    return src('app/fonts/src/*.*')
        .pipe(fonter({
            formats:['woff', 'ttf']
        }))
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
}


function styles(){
    return src ('app/scss/style.scss')
        .pipe(autoPrefixer({overrideBrowserlist:['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle:'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}
function images(){
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
        .pipe(newer('app/images/dist'))
        .pipe(avif({quality: 50}))

        .pipe(src('app/images/src/*.*'))
        .pipe(newer('app/images/dist'))
        .pipe(webp())

        .pipe(src('app/images/src/*.*'))
        .pipe(newer('app/images/dist'))
        .pipe(imagemin())
        .pipe(dest('app/images/dist'))
}

function sprite(){
    return src('app/images/*.svg')
    .pipe(svgSprite({
        mode:{
            stack:{
                sprite: '../sprite.svg',
                example:true
            }
        }
    }))
    .pipe(dest('app/images'))
}

function scripts(){
    return src (['node_modules/swiper/swiper-bundle.js','node_modules/aos/dist/aos.js','app/js/aos.js','app/js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(unglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function watching(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/style.scss'], styles)
    watch(['app/images/src'], images)
    watch(['app/js/main.js'], scripts)
    watch(['app/components/*','app/components2/*', 'app/pages/*'], pages)
    watch(['app/*.html']).on('change', browserSync.reload) 
}

function building(){
    return src (['app/css/style.min.css',
    'app/images/*.*',
    '!app/images/*.svg',
    'app/images/sprite.svg',
    'app/fonts/*.*',
    'app/js/main.min.js',
    'app/**/*.html'], {base: 'app'})
    .pipe(dest('dist'))
}

function cleanDist(){
    return src('dist')
    .pipe(clean());

}


exports.styles=styles;
exports.images=images;
exports.scripts=scripts;
exports.watching=watching;
exports.building=building;
exports.sprite=sprite;
exports.fonts=fonts;
exports.pages=pages;
exports.componentPages=componentPages;

exports.build=series(cleanDist, building);
exports.default=parallel(styles, scripts,images, pages,componentPages,watching);