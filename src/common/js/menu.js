import classie from 'src/common/js/classie.js'
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

export default class SVGDDMenu {
  constructor (el, options){
    this.el = el;
    if (options.name == 'menu_user') {
      this.usercenterInit();
    } else if (options.name == 'sidebar'){
      this.sidebarInit()
    }
    
  }

  usercenterInit(){
    this.shapeEl = this.el.querySelector( 'div.morph-shape_user' );

    var s = Snap( this.shapeEl.querySelector( 'svg' ) );
    this.pathEl = s.select( 'path' );
    this.paths = {
      reset : this.pathEl.attr( 'd' ),
      open : this.shapeEl.getAttribute( 'data-morph-open' )
    };

    this.isOpen = false;

    this.usercenterInitEvents();
  }

  usercenterInitEvents(){
    this.el.addEventListener( 'click', this.usercenterToggle.bind(this) );
      
    [].slice.call( this.el.querySelectorAll('a') ).forEach( function(el) {
      el.onclick = function() { return false; }
    } );
  }

  usercenterToggle(){
    var self = this;

    if( this.isOpen ) {
      classie.remove( self.el, 'menu--open_user' );
    }
    else {
      classie.add( self.el, 'menu--open_user' );
    }

    this.pathEl.stop().animate( { 'path' : this.paths.open }, 320, mina.easeinout, function() {
      self.pathEl.stop().animate( { 'path' : self.paths.reset }, 1000, mina.elastic );
    } );

    this.isOpen = !this.isOpen; 
  }

  sidebarInit(){
    this.trigger = this.el.querySelector( 'button.menu__handle' );
    this.shapeEl = this.el.querySelector( 'div.morph-shape' );

    var s = Snap( this.shapeEl.querySelector( 'svg' ) );
    this.pathEl = s.select( 'path' );
    this.paths = {
        reset : this.pathEl.attr( 'd' ),
        open : this.shapeEl.getAttribute( 'data-morph-open' ),
        close : this.shapeEl.getAttribute( 'data-morph-close' )
    };

    this.isOpen = false;

    this.sidebarInitEvents();
  }

  sidebarInitEvents(){
    this.trigger.addEventListener( 'click', this.sidebarToggle.bind(this) );
  }

  sidebarToggle(){
    var self = this;
    if( this.isOpen ) {
        classie.remove( self.el, 'menu--anim' );
        setTimeout( function() { classie.remove( self.el, 'menu--open' );   }, 250 );
    }
    else {
        classie.add( self.el, 'menu--anim' );
        setTimeout( function() { classie.add( self.el, 'menu--open' );  }, 250 );
    }
    this.isOpen = !this.isOpen;
  }

}