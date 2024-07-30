    /*-------------------Smmoth Scroll--------------*/

    function locomotive() {
      gsap.registerPlugin(ScrollTrigger);

      const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
      });

      locoScroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.querySelector("#main").style.transform
          ? "transform"
          : "fixed",
      });

      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
      ScrollTrigger.refresh();
    }

    locomotive();


    /*----------Canvas Image Sequnce-------------*/

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    });

    function files(index) {
      return `./${(index + 1).toString().padStart(4, "0")}.png`; // Adjusted file path and format
    }

    const frameCount = 40; // Total number of images from 0001.png to 0040.png

    const images = [];
    const imageSeq = { frame: 0 }; // Start from frame 0 for correct indexing

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = files(i);
      images.push(img);
    }

    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.25,
        trigger: "#page>canvas",
        start: "top top",
        end: "400% top",
        scroller: "#main",
      },
      onUpdate: render,
    });

    images[0].onload = render; // Trigger render once the first image is loaded

    function render() {
      scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
      var canvas = ctx.canvas;
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.max(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }

    ScrollTrigger.create({
      trigger: "#page>canvas",
      pin: true,
      scroller: "#main",
      start: "top top",
      end: "400% top",
    });

    // Pinning other sections as per your previous setup
    gsap.to("#page2", {
      scrollTrigger: {
        trigger: "#page2",
        start: "top top",
        end: "bottom top",
        pin: true,
        scroller: "#main",
      },
    });

    gsap.to("#page4", {
      scrollTrigger: {
        trigger: "#page4",
        start: "top top",
        end: "bottom top",
        pin: true,
        scroller: "#main",
      },
    });

    gsap.to("#page6", {
      scrollTrigger: {
        trigger: "#page6",
        start: "top top",
        end: "bottom top",
        pin: true,
        scroller: "#main",
        onEnter: () => {
          // Add any functionality you want when #page6 enters
        },
      },
    });



    /*  -----------Porfolio-------------------*/


    document.addEventListener('DOMContentLoaded', function() {
      // Automatically open the "ALL" tab on page load
      document.querySelector('.tablinks[onclick="openCity(event, \'ALL\')"]').click();
    });

    function openCity(evt, cityName) {
      var i, tabcontent, tablinks;

      // Hide all tab content
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Remove active class from all tab links
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the selected tab content
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }


    document.querySelector('#contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      e.target.elements.name.value = '';
      e.target.elements.email.value = '';
      e.target.elements.message.value = '';
    });


    window.addEventListener('load', function() {
      const preloader = document.getElementById('preloader');
      preloader.style.display = 'none';
  });


