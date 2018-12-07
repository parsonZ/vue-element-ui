module.exports = {
  init(options){
    let imgs = document.querySelectorAll('img[data-original-src]');
    let innerHeight = window.innerHeight;

    const load = () => {
      for (let i=0; i<imgs.length; i++) {
        if (imgs[i].getBoundingClientRect().top <= innerHeight && imgs[i].getAttribute('data-original-src') && !imgs[i].getAttribute('data-isload')) {
          imgs[i].setAttribute('data-isload', true);
          imgs[i].setAttribute('src', imgs[i].getAttribute('data-original-src'))
          imgs[i].classList.add('loaded')
        }
      }
    }

    load()

    document.querySelector('.scroll-wrap').addEventListener('scroll', function () {
      load()
    })
  }
}
