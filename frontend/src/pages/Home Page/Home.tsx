import {
  Box,
  useMediaQuery,
} from '@mui/material';

import { Player } from '@lottiefiles/react-lottie-player';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Section1 from './Sections/Section1';
import Section2 from './Sections/Section2';
import Section3 from './Sections/Section3';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);



const Home = () => {
  const isBigScreen = useMediaQuery('(min-width:1800px)');

  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update()
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


  })





  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();
      const tl = gsap.timeline();
      gsap.set('body', {
        overflow: 'hidden',
      })
      matchMedia.add(('(min-width:870px)'), () => {
        gsap.set('.section-1', {
          clipPath: 'ellipse(63% 60% at 38% 44%)'
        })

        gsap.to('.section-1', {
          clipPath: 'ellipse(40% 52% at 35% 47%)',
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".section-1",
            start: 'center center',
            scrub: true,
            end: 'bottom center'
          }
        })

      })
      matchMedia.add(('(min-width:1600px)'), () => {

        gsap.set(".section-3", {
          clipPath: "ellipse(69% 72% at 37% 75%)"
        })
      })
      matchMedia.add(('(max-width:1600px)'), () => {
        gsap.set('.workBox', {
          flexDirection: "column", alignItems: "center",
          textAlign: "center"
        })
        gsap.set(".Step1", {
          paddingLeft: "0%"
        })
        gsap.fromTo(".Step1", {
          x: "100%",
          transform: "rotate(18deg)",
          opacity: "0"
        }, {

          x: "0%",
          transform: "none",
          opacity: "1",
          duration: 0.75,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
          scrollTrigger: {
            trigger: ".Step1",
            start: "top bottom",
            end: "bottom 70%",
            toggleActions: "play none none none"
          }
        })
        gsap.fromTo(".Step2", {
          x: "-100%",
          transform: "rotate(342deg)",
          opacity: "0"
        }, {

          x: "0%",
          transform: "none",
          opacity: "1",
          duration: 0.75,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
          scrollTrigger: {
            trigger: ".Step2",
            start: "top bottom",
            end: "bottom 70%",
            toggleActions: "play none none none"
          }
        })
        gsap.fromTo(".Step3", {
          x: "100%",
          transform: "rotate(18deg)",
          opacity: "0"
        }, {

          x: "0%",
          transform: "none",
          opacity: "1",
          duration: 0.75,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
          scrollTrigger: {
            trigger: ".Step3",
            start: "top bottom",
            end: "bottom 70%",
            toggleActions: "play none none none"
          }
        })

      })


      matchMedia.add(('(max-width:1800px)'), () => {
        gsap.set(".word", {
          opacity: "0",
          scale: 0

        })
        gsap.set(".introButton", {
          opacity: "0",
          scale: 0

        })
        tl.to("#intro", {
          text: "Hi, I'am Zara.",
          duration: 2,
          delay: 1
        })
        tl.to(
          '.word',
          {
            opacity: 1,
            scale: 1,
            ease: 'back.out(1.7)',
            stagger: 0.5,
            duration: 0.2,
          }
        );
        tl.to('.introButton', {
          scale: 1,
          opacity: "1",
          duration: 0.75,
          ease: "back.out(1.7)",

        }, ">");

        gsap.set(".intro", {
          x: "+=20vw",
          scale: 1.3,
          ease: 'power1.out'
        })


        gsap.fromTo('.section2-title', {
          y: "100%"
        }, {

          y: "0%",
          duration: 0.75,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
          scrollTrigger: {
            trigger: ".section2-title",
            start: "top 90%",
            end: "bottom 80%",
            toggleActions: "play none none none"
          }
        })



        gsap.fromTo('.Feature1  ', {
          width: "clamp(1rem,1rem + 30vw,35vw)",
          opacity: '0',
        }, {
          opacity: '100',

          transform: ' scale(1.4) rotate(344deg)',
          borderRadius: '10px',
          border: "2px solid #1E3E62",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".Feature1",
            start: 'top bottom',
            scrub: true,
            end: '+=400'
          }
        },)

        gsap.fromTo('.Feature2  ', {
          width: "clamp(1rem,1rem + 30vw,35vw)",

          opacity: '0',

        }, {
          opacity: '100',
          transform: ' scale(1.4) rotate(9deg)',
          borderRadius: '10px',
          border: "2px solid #1E3E62",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".Feature2",
            start: 'top bottom',
            scrub: true,
            end: '+=400'
          }
        })
        gsap.fromTo('.Feature3  ', {
          opacity: '0',
          width: "clamp(1rem,1rem + 30vw,35vw)",


        }, {
          opacity: '100',
          transform: ' scale(1.4) rotate(-6deg)',
          borderRadius: '10px',
          border: "2px solid #1E3E62",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".Feature3",
            start: 'top bottom',
            scrub: true,
            end: '+=400'
          }
        })
      })
      matchMedia.add(('(min-width:1800px)'), () => {

        gsap.set(".word", {
          // y: "100%",
          opacity: "0",
          scale: 0

        })
        gsap.set(".introButton", {
          // y: "100%",
          opacity: "0",
          scale: 0

        })
        tl.to("#intro", {
          text: "Hi, I'am Zara.",
          duration: 2,
          delay: 1
        })

        tl.to(
          '.word',
          {
            opacity: 1,
            scale: 1,
            ease: 'back.out(1.7)',
            stagger: 0.05,
            duration: 0.6,
          }
        );
        tl.to('.introButton', {
          scale: 1,
          opacity: "1",
          duration: 0.75,
          ease: "back.out(1.7)",

        }, ">");
        gsap.set('.introBot', {
          scale: 0

        })
        gsap.set(".intro", {
          x: "+=25vw",
          scale: 1.3,
          ease: 'power1.out'
        })


        tl.to('.intro', {
          x: "-=20vw",
          scale: 1,
          ease: 'power4.inOut',
          duration: 2,
        }, ">")
          .to('.introBot', {
            scale: 1,
            duration: 2,
            ease: "power1.inOut"
          }, "<")


        gsap.fromTo('.section2-title', {
          y: "100%"
        }, {

          y: "0%",
          duration: 0.75,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
          scrollTrigger: {
            trigger: ".section2-title",
            start: "top 90%",
            end: "bottom 80%",
            toggleActions: "play none none none"
          }
        })

        gsap.to('.section2-subtitle', {
          x: "-=120rem",
          opacity: "100",
          duration: 1,
          scrollTrigger: {
            trigger: ".section-2",
            start: 'top center',
            pin: true,
            end: '+=100'
          }
        })

        gsap.fromTo('.Feature1  ', {
          opacity: '0',
          scale: '0.6',
        }, {
          opacity: '100',
          transform: ' scale(1.3) rotate(344deg)',
          borderRadius: '10px',
          border: "2px solid #1E3E62",
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".Feature1",
            start: 'top bottom',
            scrub: true,
            end: '+=400'
          }
        },)

        gsap.fromTo('.Feature2  ', {
          opacity: '0',

        }, {
          opacity: '100',
          transform: ' scale(1.3) rotate(9deg)',
          borderRadius: '10px',
          border: "2px solid #1E3E62",
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".Feature2",
            start: 'top bottom',
            scrub: true,
            end: '+=400'
          }
        })
        gsap.fromTo('.Feature3  ', {
          opacity: '0',

        }, {
          opacity: '100',
          transform: ' scale(1.3) rotate(-6deg)',
          borderRadius: '10px',
          border: "2px solid #1E3E62",
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".Feature3",
            start: 'top bottom',
            scrub: true,
            end: '+=400'
          }
        })

      })








      gsap.fromTo('.How', {
        y: "100%"
      }, {

        y: "0%",
        duration: 0.75,
        ease: "cubic-bezier(0.33, 1, 0.68, 1)",
        scrollTrigger: {
          trigger: ".How",
          start: "top bottom",
          end: "bottom 80%",
          toggleActions: "play none none none"
        }
      })


      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-3",
          start: "center bottom",
          end: "bottom top",
          scrub: true
        }
      })

      tl2.to(".Step3", {
        y: 200
      }, 0)

      tl2.to(".Step2", {
        y: 150
      }, 0)
      tl2.to(".Step1", {
        y: 50
      }, 0)







    }, containerRef);






    return () => context.revert();
  }, []);



  return (
    <Box ref={containerRef} width="100%" sx={{ backgroundColor: '#FFAD60', overflow: 'hidden' }}>
      <Section1 />
      {isBigScreen && <Box
        className='introBot'

        sx={{
          position: 'absolute',
          zIndex: 40,
          bottom: "2.05rem",
          left: "66.7rem",
        }}
      >
        <Player

          autoplay
          loop
          src='home-robot.json'
          style={{ height: '800px', width: '800px' }}
        />
      </Box>}
      {isBigScreen && <Box
        className='introBot'
        sx={{
          position: "absolute",
          justifyContent: 'center',
          bottom: "2.05rem",
          left: "66.7rem",
          zIndex: 10
        }}
      >
        <Player

          autoplay
          loop
          src='home-robot2.json'
          style={{ height: '800px', width: '800px', marginTop: "12rem" }}
        />
      </Box>}

      <Section2 />

      <Section3 />
      {/* <Footer /> */}
    </Box>
  );
};

export default Home;
