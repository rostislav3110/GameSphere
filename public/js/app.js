document.body.onload = () => {
    setTimeout(() =>{
        let preloader = document.getElementById('page-preloader');
        if(!preloader.classList.contains('done') ) {
            preloader.classList.add('done')
        }
    }, 1000)
}

// import './games.json'
const CardRef = document.querySelector(".js-card");
// const markup = CardRef(Card);
console.log(CardRef);
// CardRef.insertAdjacentHTML("beforeend", markup);