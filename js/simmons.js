(($, window, document) => {
  const simmons = {
    init() {
      this.header();
      this.section1();
      this.footer();
    },
    header() {
      const menu = document.getElementsByClassName('menu-box')[0]
      const closeButton = document.getElementsByClassName('closeButton')[0]
      const side = document.getElementsByClassName('side')[0]

      menu.addEventListener('click',()=>{
        side.style.display='block';
      })

      closeButton.addEventListener('click',()=>{
        side.style.display = 'none';
      })
    },
    section1() {
      let cnt = 0;
      let setId = 0;
      //1.메인슬라이드함수
      mainSlide = () => {
        $('.slide-wrap')
          .stop()
          .animate({ left: `${-100 * cnt}%` }, 2000, 'easeInOutExpo', () => {
            if (cnt > 12) cnt = 0;
            if (cnt < 0) cnt = 12;
            $('.slide-wrap')
              .stop()
              .animate({ left: `${-100 * cnt}%` }, 0);
          });
        page();
      };
      //2. 다음슬라이드함수
      nextCount = () => {
        cnt++;
        mainSlide();
      };
      prevCount = () => {
        cnt--;
        mainSlide();
      };
      //3. autoTimer 함수
      autoCounter = () => {
        setId = setInterval(nextCount, 4000);
      };
      autoCounter();

      $('.chevron-right-btn').on({
        mouseenter() {
          clearInterval(setId);
        },
        mouseleave() {
          autoCounter();
        },
        click() {
          if (!$('.slide-wrap').is(':animated')) {
            nextCount();
          }
        },
      });
      $('.chevron-left-btn').on({
        mouseenter() {
          clearInterval(setId);
        },
        mouseleave() {
          autoCounter();
        },
        click() {
          if (!$('.slide-wrap').is(':animated')) {
            prevCount();
          }
        },
      });

      let touchStart = 0;
      let touchEnd = 0;
      let mouseDown = false;
      let dragStart = 0;
      let dragEnd = 0;
      let winWidth = $(window).innerWidth();

      $('#section1').on({
        mousedown(e) {
          winWidth = $(window).innerWidth();
          clearInterval(setId);
          mouseDown = true;
          touchStart = e.clientX;
          dragStart = e.clientX - $('.slide-wrap').offset().left - winWidth;
        },
        mouseup(e) {
          touchEnd = e.clientX;
          if (touchStart - touchEnd > 0) {
            if (!$('.slide-wrap').is(':animated')) {
              nextCount();
            }
          }
          if (touchStart - touchEnd < 0) {
            if (!$('.slide-wrap').is(':animated')) {
              prevCount();
            }
          }
          mouseDown = false;
        },
        mousemove(e) {
          if (mouseDown !== true) return;
          dragEnd = e.clientX;
          $('.slide-wrap').css({ left: dragEnd - dragStart });
        },
      });

      $('#section1').on({
        touchstart(e) {
          winWidth = $(window).innerWidth();
          clearInterval(setId);
          mouseDown = true;
          console.log(e);
          touchStart = e.originalEvent.changedTouches[0].clientX;
          dragStart =
            e.originalEvent.changedTouches[0].clientX -
            $('.slide-wrap').offset().left -
            winWidth;
        },
        touchend(e) {
          touchEnd = e.originalEvent.changedTouches[0].clientX;
          if (touchStart - touchEnd > 0) {
            if (!$('.slide-wrap').is(':animated')) {
              nextCount();
            }
          }
          if (touchStart - touchEnd < 0) {
            if (!$('.slide-wrap').is(':animated')) {
              prevCount();
            }
          }
          mouseDown = false;
        },
        touchmove(e) {
          if (mouseDown !== true) return;
          dragEnd = e.originalEvent.changedTouches[0].clientX;

          $('.slide-wrap').css({ left: dragEnd - dragStart });
        },
      });

      page = () => {
        $('.page-btn').removeClass('on');
        $('.page-btn')
          .eq(cnt > 12 ? 0 : cnt)
          .addClass('on');
      };
      $('.page-btn').each(function (idx) {
        $(this).on({
          click(e) {
            e.preventDefault();
            cnt = idx;
            mainSlide();
            autoCounter();
          },
        });
      });

      // 토글 방식
      // 스탑버튼
      let t= 0;
      $('.stop-btn').on({
        click() {
          if(t===0){
            t=1;
            clearInterval(setId);
            $(this).hide();
            $('.play-btn').show();
          }
        },
      });
      // 플레이버튼
      $('.play-btn').on({
        click(){
          if(t===1){
            t=0;
            autoCounter();
            $(this).hide();
            $('.stop-btn').show();
          }
        }
      })

      const scrollBtnUp = document.getElementById('scrollBtnUp');
      const scrollBtnDown = document.getElementById('scrollBtnDown');
      
      scrollBtnUp.addEventListener('click',()=>{
        window.scrollBy({
          top:850,
          behavior:'smooth'
        });
      });
      scrollBtnDown.addEventListener('click',()=>{
        window.scrollBy({
          top:-850,
          behavior:'smooth'
        });
      });
    },
    footer() {},
  };
  simmons.init();
})(jQuery, window, document);
