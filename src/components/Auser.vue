<template>
  <section class="pricing-section bg-10">
     <div class="pricing pricing--rabten">
        <div class="pricing__item" v-for="item in new Array(3)">
            <div class="icon icon--home"><i class="fa fa-fw fa-home"></i></div>
            <h3 class="pricing__title">Individuals</h3>
                <div class="pricing__price">
                    <span class="pricing__anim pricing__anim--1">
                      9
                    </span>
                </div>
                <ul class="pricing__feature-list">
                    <li class="pricing__feature">1 GB of space</li>
                    <li class="pricing__feature">Support at $25/hour</li>
                    <li class="pricing__feature">Small social media package</li>
                </ul>
                <button class="pricing__action">Choose plan</button>
           	</div>
       	</div>
    </section>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    },
  }
</script>
<style scoped lang="less">
  .pricing-section {
  	min-height: 100vh;
  	display: flex;
    align-items: center;
    justify-content: center;

  	.pricing {
  	  display: flex;
  		flex-wrap: wrap;
  		justify-content: center;
  	}

  	.pricing--rabten{
  		.pricing__item {
  			position: relative;
  			display: flex;
  			flex-direction: column;
  			align-items: stretch;
  			text-align: center;
  			padding: 2em 4em;
  			color: #fff;

  			.pricing__title {
  			  font-size: 2em;
  			  margin-top: 0;
  			 }

  			.icon {
  			  font-size: 2.5em;
  			  color: #8b909d;
  			  transition: color 0.3s;
  			}

  			.pricing__price {
			  	font-size: 3em;
			  	font-weight: bold;
			  	overflow: hidden;
			  }

			  .pricing__anim {
			  	display: inline-block;
			  	position: relative;
			  }
			  .pricing__feature-list {
			  	font-size: 1.3em;
			  	margin: 0;
			  	padding: 0.25em 0 2.5em;
			  	list-style: none;
			  	text-align: center;
			  	color: #8b909d;
			  }

			  .pricing__action {
			  	font-weight: bold;
			  	color: #fff;
			  	padding: .5em 2em;
    			font-size: 1.5em;
			  	background: #E03E3E;
			  	transition: background-color 0.3s;
			  	border: none;
			  	outline: none;
			  }
  		}

  		.pricing__item:nth-child(2) {
		  	border-right: 1px solid rgba(139, 144, 157, 0.18);
		  	border-left: 1px solid rgba(139, 144, 157, 0.18);
		  }
  	}
  }

  .pricing--rabten .pricing__item:hover .pricing__anim {
  	animation: moveUp 0.4s forwards;
  	animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  }

  @keyframes moveUp {
  	50% {transform: translate3d(0,-100%,0); }
  	51% { opacity: 0;transform: translate3d(0,-100%,0); }
  	52% { opacity: 1; transform: translate3d(0,100%,0); }
  	100% { transform: translate3d(0,0,0); }
  }

  @media screen and (max-width: 60em) {
  	.pricing-section{
  		padding: 0;
  	}
  }

</style>

