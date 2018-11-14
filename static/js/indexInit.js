        (function() {
            var headline = document.querySelector('.trigger-headline'),
                trigger = document.querySelector('.btn--trigger'),
                segmenter = new Segmenter(document.querySelector('.segmenter'), {
                    pieces: 9, //分块数量
                    shadowsAnimation: {
                        opacity: 1,
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutCubic',
                        delay: 0,
                        opacity: 1,
                        translateZ: 1,
                    },
                    positions: [ // 分块集合
                        {top: 30, left: 5, width: 40, height: 80},
                        {top: 50, left: 25, width: 30, height: 30},
                        {top: 5, left: 75, width: 40, height: 20},
                        {top: 30, left: 45, width: 40, height: 20},
                        {top: 45, left: 15, width: 50, height: 40},
                        {top: 10, left: 40, width: 10, height: 20},
                        {top: 20, left: 50, width: 30, height: 70},
                        {top: 0, left: 10, width: 50, height: 60},
                        {top: 70, left: 40, width: 30, height: 30}
                    ],
                    parallax: true,
                    parallaxMovement: {min: 10, max: 30},
                    onReady: function() {
                        segmenter.animate();
                    }
                });
            })()