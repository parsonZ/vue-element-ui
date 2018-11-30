module.exports = {
  init(el, options){
    let imgs = el.getElementsByTagName('img');
    let innerHeight = window.innerHeight;

    document.querySelector('.scroll-wrap').addEventListener('scroll', function () {
      for (let i=0; i<imgs.length; i++) {
        if (imgs[i].getBoundingClientRect().top <= innerHeight && imgs[i].getAttribute('data-original-src') && !imgs[i].getAttribute('data-isload')) {
          imgs[i].setAttribute('data-isload', true);
          imgs[i].setAttribute('src', imgs[i].getAttribute('data-original-src'))
          imgs[i].classList.add('loaded')
        }
      }
    })
  }
}
