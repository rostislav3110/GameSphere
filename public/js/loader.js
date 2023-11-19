setTimeout(() =>{
    let preloader = document.getElementById('page-preloader');

    if(preloader && !preloader.classList.contains('done') ) {
        preloader.classList.add('done')
    }
}, 1000)