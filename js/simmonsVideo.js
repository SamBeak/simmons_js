(($, window, document, undefined)=>{
    const simmonsObj={
        init(){
            this.mainMethod();
        },
        mainMethod(){
            let winW = $(window).innerWidth();
            let winH = $(window).innerHeight();
            let vidW = $('.slide3 video').innerWidth();
            let vidH = $('.slide3 video').innerHeight();
            let marT = (winH-vidH)/2;
            let marL = (winW-vidW)/2;
            let setId = 0;

            setId = setInterval(resizeVideo, 100);

            function resizeVideo(){
                const $video = $('.slide3 video');
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();
                vidW = $('.slide3 video').innerWidth();
                vidH = $('.slide3 video').innerHeight();
                marT = (winH-vidH)/2;
                marL = (winW-vidW)/2;

                if( winW > vidW){
                    $video.css({width: winW, height: 'auto'});
                }
                if( winH > vidH){
                    $video.css({width: 'auto', height: winH});
                }
                $video.css({marginTop: marT, marginLeft: marL});
            }

            $(window).resize(function(){
                clearInterval(setId);
                resizeVideo();
            });
        }
    }
    simmonsObj.init();

})(jQuery, window, document);