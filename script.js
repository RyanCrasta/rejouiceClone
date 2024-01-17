let currentY = 0;

function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    locoScroll.on('scroll', ({ limit, scroll }) => {

        document.querySelector("#redDropdown").style.animation = 'dropdown_anim_up 1s linear forwards'


        $('#page7-head').css({
            opacity: function() {
                currentY = scroll.y;
            return 1 - ((limit - 4576) - (scroll.y - 4576)) / (limit - 4576);
            }
        });

        $('#page7-mid').css({
            opacity: function() {
                currentY = scroll.y;
            return 1 - ((limit - 4576) - (scroll.y - 4576)) / (limit - 4576);
            }
        });
    })



    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    // CODEPEN CODE UPAR KA
}


function cursorEffect(cursorId, pageOneContent){
    // const pageOneContent = document.querySelector("#page1-content")

    pageOneContent.addEventListener("mousemove", function(e){
        gsap.to(cursorId, {
            x: pageOneContent.id == "page1-container" ? e.clientX - $(cursorId).height()/2 : e.clientX - $(cursorId).height(),
            y: pageOneContent.id == "page1-container" ? currentY + e.clientY - $(cursorId).height()/2 : e.clientY - $(cursorId).height()/2,
        })
    });

    pageOneContent.addEventListener("mouseenter", function() {
        gsap.to(cursorId, {
            scale: 1,
            opacity: 1
        })
    })

    pageOneContent.addEventListener("mouseleave", function() {
        gsap.to(cursorId, {
            scale: 0,
            opacity: 0
        })
    })
}

function intersectFnDropdown(){
    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // document.querySelector("#right").style.animation = 'rightToLeft 0.6s ease-out forwards'
            document.querySelector("#dropdown-twitter").style.animation = 'rightToLeft 0.6s ease-out forwards'
            document.querySelector("#dropdown-insta").style.animation = 'rightToLeft 0.8s ease-out forwards'
            document.querySelector("#dropdown-linkedin").style.animation = 'rightToLeft 1s ease-out forwards'
            document.querySelector("#left").style.animation = 'rightToLeftOne 0.5s ease-out forwards'


        }
        else{
            // document.querySelector("#right").style.animation = 'leftToRight 1s ease-out forwards'
            document.querySelector("#dropdown-twitter").style.animation = 'leftToRight 1s ease-out forwards'
            document.querySelector("#dropdown-insta").style.animation = 'leftToRight 0.8s ease-out forwards'
            document.querySelector("#dropdown-linkedin").style.animation = 'leftToRight 0.6s ease-out forwards'
            document.querySelector("#left").style.animation = 'leftToRightOne 1s ease-out forwards'

        }
    });
    });
    observer.observe(document.querySelector("#right"));
}

intersectFnDropdown();

function intersectFnFooter(){
    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelector("#page7-head").style.animation = 'footer_anim_down 4s linear forwards'
            document.querySelector("#page7-mid").style.animation = 'footer_anim_down 4s linear forwards'
        }
    });
    });
    observer.observe(document.querySelector("#page7-head"));
}

intersectFnFooter();


function intersectFnPageFive(){
    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelector("#page7-head").style.animation = 'footer_anim_up 4s linear forwards'
            document.querySelector("#page7-mid").style.animation = 'footer_anim_up 4s linear forwards'
        }
    });
    });
    observer.observe(document.querySelector("#page5"));
}

intersectFnPageFive();

function intersectFn(){
    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePageTwo();
        }else{
             $('.page2-hr').removeClass('start')

        }
    });
    });
    observer.observe(document.querySelector(".elem"));
}

function intersectFnPage4(){
    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // animatePageTwo();
             $('.page4-hr').addClass('start')

        }else{
             $('.page4-hr').removeClass('start')

        }
    });
    });
    observer.observe(document.querySelector("#page4-texts"));
}

intersectFnPage4();

function intersectFnFn(){

    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            animatePagePageTwo();
        }
    });
    });

    observer.observe(document.querySelector(".elemTwo"));


    const observerOne = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            animatePagePageTwoTwo();
        }
    });
    });

    observerOne.observe(document.querySelector("#page4-head"));
}

locoScroll();
intersectFn();
intersectFnFn();

function animatePagePageThree(){
    const splitLines = new SplitText(".border-bottom span", {
    type: "lines",
    linesClass: "line line++"
    });

    $(".border-bottom .line").wrap('<div class="line-wrapper">');

    gsap.from(splitLines.lines, {
        yPercent: 200,
        ease: "power4",
        stagger: 0.2,
        onComplete: splitRevert,
    });

    function splitRevert() {
        splitLines.revert();
    }
}

function intersectFnPage3(){

    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            animatePagePageThree();
        }
    });
    });

    observer.observe(document.querySelector("#page3-top"));
}

intersectFnPage3();

function animatePageTwo(){
    const splitLines = new SplitText(".elem span", {
        type: "lines",
        linesClass: "line line++"
    });

    $(".elem .line").wrap('<div class="line-wrapper">');

    $('.page2-hr').addClass('start')

    gsap.from(splitLines.lines, {
        yPercent: 200,
        ease: "power4",
        stagger: 0.2,
        onComplete: splitRevert,
        duration: 1.7

    });

    function splitRevert() {
        splitLines.revert();
    }


    const splitTlines = new SplitText("#page2-two span", {
        type: "lines",
        linesClass: "line line++"
    })

    $("#page2-two .line").wrap('<div class="line-wrapper">');


    gsap.from(splitTlines.lines, {
        yPercent: 200,
        ease: "power4",
        stagger: 0.2,
        onComplete: splitTRevert,
        duration: 1.7
    });

    function splitTRevert() {
        splitTlines.revert();
    }

    const splitTTlines = new SplitText("#page2-one span", {
        type: "lines",
        linesClass: "line line++"
    })

    $("#page2-one .line").wrap('<div class="line-wrapper">');


    gsap.from(splitTTlines.lines, {
        yPercent: 200,
        ease: "power4",
        stagger: 0.2,
        onComplete: splitTTRevert,
        duration: 1.7
    });

    function splitTTRevert() {
        splitTTlines.revert();
    }
}


function animatePagePageTwo(){
    const splitLines = new SplitText(".elemTwo span", {
        type: "lines",
        linesClass: "line line++"
    });

    $(".elemTwo .line").wrap('<div class="line-wrapper">');

    gsap.from(splitLines.lines, {
        yPercent: 200,
        ease: "power4",
        stagger: 0.2,
        onComplete: splitRevert,
    });

    function splitRevert() {
        splitLines.revert();
    }



}


function animatePagePageTwoTwo(){
    const splitTLines = new SplitText("#page4-head p span", {
        type: "lines",
        linesClass: "line line++"
    });

    $("#page4-texts p .line").wrap('<div class="line-wrapper">');

    gsap.from(splitTLines.lines, {
        yPercent: 200,
        ease: "power4",
        stagger: 0.2,
        onComplete: splitTRevert,
    });

    function splitTRevert() {
        splitTLines.revert();
    }
}


cursorEffect('#cursor', document.querySelector("#page1-container"));

cursorEffect('#cursorTwo', document.querySelector("#page4"));

function videoToImg(){
    document.getElementById('card-one-img').addEventListener("mouseenter",function(){
     document.getElementById('card-one-img').style.opacity = "0"
     document.getElementById('card-one-img').style.transition = "opacity 0.3s ease-out"
     document.getElementById('card-one-video').style.zIndex = "1";

     document.getElementById('card-one-video').style.opacity = "1"
     document.getElementById('card-one-video').style.position = "absolute";
     document.getElementById('card-one-video').style.left = "0";
     document.getElementById('card-one-video').style.transition = "opacity 0.3s ease-in";
    })

    document.getElementById('card-one-video').addEventListener("mouseleave",function(){
     document.getElementById('card-one-img').style.opacity = "1"
     document.getElementById('card-one-video').style.opacity = "0"
     document.getElementById('card-one-video').style.position = "absolute";
     document.getElementById('card-one-video').style.zIndex = "-1";

    })

    document.getElementById('card-two-img').addEventListener("mouseenter",function(){
     document.getElementById('card-two-img').style.opacity = "0"
     document.getElementById('card-two-img').style.transition = "opacity 0.3s ease-out"
     document.getElementById('card-two-video').style.zIndex = "1";

     document.getElementById('card-two-video').style.opacity = "1"
     document.getElementById('card-two-video').style.position = "absolute";
     document.getElementById('card-two-video').style.left = "0";
     document.getElementById('card-two-video').style.transition = "opacity 0.3s ease-in";
    })

    document.getElementById('card-two-video').addEventListener("mouseleave",function(){
     document.getElementById('card-two-img').style.opacity = "1"
     document.getElementById('card-two-video').style.opacity = "0"
     document.getElementById('card-two-video').style.position = "absolute";
     document.getElementById('card-two-video').style.zIndex = "-1";

    })

    document.getElementById('card-three-img').addEventListener("mouseenter",function(){
     document.getElementById('card-three-img').style.opacity = "0"
     document.getElementById('card-three-img').style.transition = "opacity 0.3s ease-out"
     document.getElementById('card-three-video').style.zIndex = "1";

     document.getElementById('card-three-video').style.opacity = "1"
     document.getElementById('card-three-video').style.position = "absolute";
     document.getElementById('card-three-video').style.left = "0";
     document.getElementById('card-three-video').style.transition = "opacity 0.3s ease-in";
    })

    document.getElementById('card-three-video').addEventListener("mouseleave",function(){
     document.getElementById('card-three-img').style.opacity = "1"
     document.getElementById('card-three-video').style.opacity = "0"
     document.getElementById('card-three-video').style.position = "absolute";
     document.getElementById('card-three-video').style.zIndex = "-1";

    })
}

videoToImg();


var tl = new TimelineLite();

tl.to("#white-line-one", 0, {x:-300})
document.querySelector(".border-bottom").addEventListener("mouseenter",  () => {
  tl.to("#white-line-one", 0, {x: -300})

  tl.to("#white-line-one", 0.3, {x:800, ease:Power2.easeOut})
});

document.querySelector(".border-bottom").addEventListener("mouseout",  () => {
  tl.to("#white-line-one", 0, {x: -300})

  tl.to("#white-line-one", 0.3, {x:800, ease:Quad.easeOut})
});


function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

function checkAnimation() {
    var $elem = $('.bar .outer');

    // If the animation has already been started
    if ($elem.hasClass('start')){
        return
    }
    // Start the animation
    $elem.addClass('start');
}

function intersectFnTwo(){
    var $elem = $('.bar .outer');

    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            $elem.removeClass('reset')
            checkAnimation();
        }else{
            $elem.removeClass('start')

            $elem.addClass('reset');

        }
    });
    });

    observer.observe(document.querySelector(".bar"));
}

intersectFnTwo();

function checkAnimationFive() {
    var $elem = $('.animate_number');

    // If the animation has already been started
    if ($elem.hasClass('start')){
        return
    }

    // Start the animation
    $elem.addClass('start');
}

function intersectFnFive(){
    var $elem = $('.animate_number');

    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            $elem.removeClass('reset')
            checkAnimationFive();
        }else{
            $elem.removeClass('start')
            $elem.addClass('reset');
        }
    });
    });

    observer.observe(document.querySelector(".seat-number"));
}

intersectFnFive();


    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
var tll = gsap.timeline();

var tll1 = gsap.timeline();
var tll2 = gsap.timeline();


  tll1.from("#main-heading span", {
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    delay: 5
  })



setTimeout(() => {
    $('#loader').addClass("show")
    $("#loader").addClass("hidden")
}, 3000);

function intersectFnThree(){
    var $elem = $('#footer-heading');

    const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            tll1.from("#footer-heading span", {
                y: -150,
                opacity: 0,
                stagger: 0.09,
                duration: 1,
            })
        }
    });
    });

    observer.observe(document.querySelector("#footer-heading"));
}

intersectFnThree();

function sideByTexts(){
    const splitLines = new SplitText("#loader p", {
        type: "lines",
        linesClass: "line line++"
    });

    tll.from(".loaderh3", {
        x: 40,
        opacity: 0,
        duration: 3,
        stagger: 0.1
    })

    tll.to(".loaderh3", {
        x: -40,
        opacity: 0,
        duration: 3,
        stagger: 0.1
    })
}

sideByTexts();

function sideByTextsDropdown(){
    const splitLines = new SplitText("#dropdownFooter #right", {
        type: "lines",
        linesClass: "line line++"
    });

    tll.from(".dropdown-logo", {
        x: 10,
        opacity: 0,
        duration: 0.1,
        stagger: 0.1
    })


}



var styleElem = document.head.appendChild(document.createElement("style"));

document.querySelector("#closeMenu").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#closeMenu:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#closeMenu").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#closeMenu:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#openMenu").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#openMenu:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#openMenu").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#openMenu:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#dropdown-twitter").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#dropdown-twitter:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#dropdown-twitter").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#dropdown-twitter:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#dropdown-insta").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#dropdown-insta:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#dropdown-insta").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#dropdown-insta:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#dropdown-linkedin").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#dropdown-linkedin:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#dropdown-linkedin").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#dropdown-linkedin:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})


document.querySelector("#bahar-work").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#bahar-work:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#bahar-work").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#bahar-work:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#bahar-service").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#bahar-service:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#bahar-service").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#bahar-service:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#bahar-about").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#bahar-about:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#bahar-about").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#bahar-about:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#bahar-contact").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#bahar-contact:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#bahar-contact").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#bahar-contact:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #000; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#footer-home").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-home:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-home").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-home:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})


document.querySelector("#footer-work").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-work:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-work").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-work:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#footer-about").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-about:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-about").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-about:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#footer-services").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-services:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-services").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-services:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#footer-contact").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-contact:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-contact").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-contact:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#footer-twitter").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-twitter:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-twitter").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-twitter:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#footer-insta").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-insta:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-insta").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-insta:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

document.querySelector("#footer-linkedin").addEventListener("mouseenter", function(){
    styleElem.innerHTML = "#footer-linkedin:hover:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim 1s linear forwards; }";
})

 document.querySelector("#footer-linkedin").addEventListener("mouseleave", function(){
    styleElem.innerHTML = "#footer-linkedin:before { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; border-bottom: solid 2px #fff; animation: border_anim_rev 1s linear forwards; }";
})

let hh = 1;

function clickHome() {
    document.querySelector("#header-home").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-home").style.visibility = "visible";
    document.querySelector("#dummy-home").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-home").style.opacity = "1";

        // document.querySelector("#header-home").style.opacity = "0";
}

document.querySelector("#bahar-ghar").addEventListener("click", clickHome)
document.querySelector("#bahar-ghar").addEventListener("mouseenter", clickHome)


document.querySelector("#bahar-ghar").addEventListener("mouseleave", function(){
    document.querySelector("#header-home").style.transform = "translateY(0%)";
    document.querySelector("#dummy-home").style.visibility = "hidden";
    document.querySelector("#dummy-home").style.transform = "translateY(0%)";
    document.querySelector("#dummy-home").style.opacity = "0";
})

document.querySelector("#bahar-work").addEventListener("mouseenter", function(){
        document.querySelector("#header-work").style.transform = "translateY(-100%)";
        document.querySelector("#dummy-work").style.visibility = "visible";
        document.querySelector("#dummy-work").style.transform = "translateY(-100%)";
        document.querySelector("#dummy-work").style.opacity = "1";
        document.querySelector("#header-work").style.opacity = "0";

})

document.querySelector("#bahar-work").addEventListener("mouseleave", function(e){
    document.querySelector("#header-work").style.transform = "translateY(0%)";
    document.querySelector("#dummy-work").style.visibility = "hidden";
    document.querySelector("#dummy-work").style.transform = "translateY(0%)";
    document.querySelector("#dummy-work").style.opacity = "0";
    document.querySelector("#header-work").style.opacity = "1";
})


document.querySelector("#bahar-service").addEventListener("mouseenter", function(){
    document.querySelector("#header-service").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-service").style.visibility = "visible";
    document.querySelector("#dummy-service").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-service").style.opacity = "1";
    document.querySelector("#header-service").style.opacity = "0";
})

document.querySelector("#bahar-service").addEventListener("mouseleave", function(){
    document.querySelector("#header-service").style.transform = "translateY(0%)";
    document.querySelector("#dummy-service").style.visibility = "hidden";
    document.querySelector("#dummy-service").style.transform = "translateY(0%)";
    document.querySelector("#dummy-service").style.opacity = "0";
    document.querySelector("#header-service").style.opacity = "1";
})


document.querySelector("#bahar-about").addEventListener("mouseenter", function(){
    document.querySelector("#header-about").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-about").style.visibility = "visible";
    document.querySelector("#dummy-about").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-about").style.opacity = "1";
    document.querySelector("#header-about").style.opacity = "0";
})

document.querySelector("#bahar-about").addEventListener("mouseleave", function(){
    document.querySelector("#header-about").style.transform = "translateY(0%)";
    document.querySelector("#dummy-about").style.visibility = "hidden";
    document.querySelector("#dummy-about").style.transform = "translateY(0%)";
    document.querySelector("#dummy-about").style.opacity = "0";
    document.querySelector("#header-about").style.opacity = "1";
})


document.querySelector("#bahar-contact").addEventListener("mouseenter", function(){
    document.querySelector("#header-contact").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-contact").style.visibility = "visible";
    document.querySelector("#dummy-contact").style.transform = "translateY(-100%)";
    document.querySelector("#dummy-contact").style.opacity = "1";
    document.querySelector("#header-contact").style.opacity = "0";
})

document.querySelector("#bahar-contact").addEventListener("mouseleave", function(){
    document.querySelector("#header-contact").style.transform = "translateY(0%)";
    document.querySelector("#dummy-contact").style.visibility = "hidden";
    document.querySelector("#dummy-contact").style.transform = "translateY(0%)";
    document.querySelector("#dummy-contact").style.opacity = "0";
    document.querySelector("#header-contact").style.opacity = "1";
})

document.querySelector("#header-button").addEventListener("mouseenter", function(){
    document.querySelector("#show-btn span").style.transform = "translateY(-200%)";
    document.querySelector("#show-btn span").style.opacity = "0";
    document.querySelector("#down-show-btn").style.visibility = "visible";
    document.querySelector("#down-show-btn").style.transform = "translateY(-100%)";
    document.querySelector("#down-show-btn").style.opacity = "1";


})

document.querySelector("#header-button").addEventListener("mouseleave", function(){
    document.querySelector("#show-btn span").style.transform = "translateY(0%)";
    document.querySelector("#show-btn span").style.opacity = "1";
    document.querySelector("#down-show-btn").style.visibility = "hidden";
    document.querySelector("#down-show-btn").style.transform = "translateY(0%)";
    document.querySelector("#down-show-btn").style.opacity = "0";
})

document.querySelector("#openMenu").addEventListener("click", function(e){
    $('.page1-hr').removeClass('end')
    document.querySelector("#redDropdown").style.display = 'block'
    $('.page1-hr').addClass('start')

    document.querySelector("#redDropdown").style.animation = 'dropdown_anim 1s linear forwards'

})

document.querySelector("#closeMenu").addEventListener("click", function(e){
    $('.page1-hr').removeClass('start')

    $('.page1-hr').addClass('end')

    document.querySelector("#redDropdown").style.animation = 'dropdown_anim_up 1s linear forwards'
})


// function circle() {
//     document.getElementById("bigCircle").setAttribute('r', "30" );
// }

// circle();


// CIRCLE SIZE CHANGING

function myFunction(x) {
  if (x.matches) { // If media query matches
     document.getElementById("bigCircle").setAttribute('r', "45" );

     document.getElementById("smallCircle").setAttribute('cy', "5" );

  }else{
     document.getElementById("bigCircle").setAttribute('r', "49" );

     document.getElementById("smallCircle").setAttribute('cy', "1" );

  }
}

function myFn1(x){
  if (x.matches) { // If media query matches
     document.getElementById("bigCircle").setAttribute('r', "40" );

     document.getElementById("smallCircle").setAttribute('cy', "10" );

  }else{
     document.getElementById("bigCircle").setAttribute('r', "45" );

     document.getElementById("smallCircle").setAttribute('cy', "5" );

  }
}

function myFn2(x){
  if (x.matches) { // If media query matches
     document.getElementById("bigCircle").setAttribute('r', "35" );
     document.getElementById("smallCircle").setAttribute('cy', "15" );

  }else{
     document.getElementById("bigCircle").setAttribute('r', "40" );
     document.getElementById("smallCircle").setAttribute('cy', "10" );

  }
}

function myFn3(x){
  if (x.matches) { // If media query matches
     document.getElementById("bigCircle").setAttribute('r', "30" );
     document.getElementById("smallCircle").setAttribute('cy', "20" );

  }else{
     document.getElementById("bigCircle").setAttribute('r', "35" );
     document.getElementById("smallCircle").setAttribute('cy', "15" );

  }
}


function myFn4(x){
  if (x.matches) { // If media query matches
     document.getElementById("bigCircle").setAttribute('r', "25" );
     document.getElementById("smallCircle").setAttribute('cy', "25" );

  }else{
     document.getElementById("bigCircle").setAttribute('r', "30" );
     document.getElementById("smallCircle").setAttribute('cy', "20" );

  }
}

function myFn5(x){
  if (x.matches) { // If media query matches
     document.getElementById("bigCircle").setAttribute('r', "23" );
     document.getElementById("smallCircle").setAttribute('cy', "27" );

  }else{
     document.getElementById("bigCircle").setAttribute('r', "49" );
     document.getElementById("smallCircle").setAttribute('cy', "1" );

  }
}


// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 1038px)")
let x1 = window.matchMedia("(max-width: 784px)")
let x2 = window.matchMedia("(max-width: 624px)")
let x3 = window.matchMedia("(max-width: 548px)")
let x4 = window.matchMedia("(max-width: 454px)")
let x5 = window.matchMedia("(max-width: 376px)")

// Call listener function at run time
myFunction(x);
myFn1(x1);
myFn2(x2);
myFn3(x3);
myFn4(x4);
myFn5(x5);


// Attach listener function on state changes
x.addEventListener("change", function() {
  myFunction(x);
});

x1.addEventListener("change", function() {
  myFn1(x1);
});

x2.addEventListener("change", function() {
  myFn2(x2);
});

x3.addEventListener("change", function() {
  myFn3(x3);
});

x4.addEventListener("change", function() {
  myFn4(x4);
});

x5.addEventListener("change", function() {
  myFn5(x5);
});


document.querySelector("#header-button").addEventListener("mouseenter", () => {
    document.querySelector("#hide-btn").style.animation = "btn_anim 0.5s linear forwards";
    // document.querySelector("#hide-btn").style.zIndex = "20";
})



document.querySelector("#header-button").addEventListener("mouseleave", () => {
    document.querySelector("#hide-btn").style.animation = "btn_anim_rev 0.5s linear forwards";
    // document.querySelector("#hide-btn").style.zIndex = "20";
})

function blackModalShow(){
    document.querySelector("#black-takeit").style.visibility = "visible";
    document.querySelector("#black-takeit").style.animation = "black_modal_anim 0.5s linear forwards";
}

function showVideo() {
    $("#videoIframe").attr("src","https://player.vimeo.com/video/736431927?app_id=122963?loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1");

    document.querySelector("#video-controller").style.visibility = "visible";
    document.querySelector("#video-controller").style.animation = "black_modal_anim 0.5s linear forwards";
}

document.querySelector("#take-it-btn").addEventListener("click", blackModalShow)

document.querySelector("#cursorTwo").addEventListener("click", blackModalShow)

document.querySelector("#play-reel").addEventListener("click", showVideo)



document.querySelector("#black-circle").addEventListener("click", () => {
    document.querySelector("#black-takeit").style.animation = "black_modal_anim_rev 0.5s linear forwards";
})

document.querySelector("#video-off").addEventListener("click", () => {
    $("#videoIframe").attr("src","");
    document.querySelector("#video-controller").style.animation = "black_modal_anim_rev 0.5s linear forwards";
})
