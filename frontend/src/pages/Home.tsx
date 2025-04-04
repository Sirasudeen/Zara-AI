import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  Link,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Feature from '../components/Feature';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Magnet from '../blocks/Animations/Magnet/Magnet'


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);



const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isBigScreen = useMediaQuery('(min-width:1800px)');

  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Adjust smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update()
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


  })
  useEffect(() => {
    if (pathRef.current) {
      let totalLength = pathRef.current.getTotalLength();
      setPathLength(totalLength);
      console.log("Total path length:", totalLength);
    }
  }, []);






  useGSAP(() => {
    gsap.to('path', {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: ".section-2",
        scrub: true,
        start: "top top+100",
        end: 'bottom bottom',

      }
    })
  }, null);



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
        gsap.set(".introSub", {
          y: "100%",
          opacity: "0"

        })
        tl.to("#intro", {
          text: "Hi, I'am Zara.",
          duration: 2,
          delay: 1
        })
        tl.to('.introSub', {
          y: "0%",
          opacity: "1",
          duration: 0.75,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
          stagger: {
            each: "0.1"
          }
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

        gsap.set(".introSub", {
          y: "100%",
          opacity: "0"

        })
        tl.to("#intro", {
          text: "Hi, I'am Zara.",
          duration: 2,
          delay: 1
        })
        tl.to('.introSub', {
          y: "0%",
          opacity: "1",
          duration: 0.75,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
          stagger: {
            each: "0.5"
          }
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
      <Box
        sx={{
          minHeight: '100vh',
        }}
      >
        <Box
          className="section-1"

          sx={{
            display: 'flex',
            width: '100%',
            position: "absolute",
            gap: '30rem',
            minHeight: '100vh',
            zIndex: 30,
            background: 'url("bg.jpg")'
          }}

        >
          <Box
            className='intro'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isBigScreen ? 'left' : 'center',
              textAlign: isBigScreen ? 'left' : 'center',
              justifyContent: 'center',
              paddingLeft: isSmallScreen ? "0.5rem" : "1rem"
            }}
          >
            <Typography
              id='intro'
              sx={{ fontWeight: 650, color: '#1E3E62', fontSize: 'clamp(2rem,1rem + min(5vh,4vw),4.5rem)', fontFamily: "Hey Comic" }}
            >

            </Typography>
            <Typography
              className='introSub'
              sx={{
                fontSize: 'clamp(0.5rem,1rem + min(3.5vh,1.1vw),2rem)',
                color: '#3E5879',
                maxWidth: 'clamp(1.5rem,1.5rem + 45vw,35rem)',
                marginTop: '1rem',
              }}
            >
              Guiding you through academics and helping you stay stress-free, every
              step of the way.
            </Typography>
            <Magnet disabled={false} magnetStrength={80}>
              <Button
                className='introSub'
                onClick={() => navigate('/signup')}
                sx={{
                  backgroundColor: '#FFAD60',
                  color: '#fff',
                  padding: { xs: '10px 20px', md: '12px 24px' },
                  fontSize: 'clamp(1rem,1rem + min(3vh,1vw),1.4rem)',
                  marginTop: '2rem',
                  borderRadius: '10px',
                  textTransform: 'none',
                  width: "fit-content",
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': { backgroundColor: '#FFD09B' },
                }}
              >
                Get Started
              </Button>
            </Magnet>



          </Box>


        </Box>
      </Box>
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

      <Box className="section-2" sx={{ padding: { xs: '2rem', md: '4rem', minHeight: '200vh' }, backgroundColor: '#FFAD60' }}>
        <Box
          sx={{ display: "flex", overflow: "hidden", minWidth: "100vw" }}>
          <Typography
            className='section2-title'
            sx={{ ml: "2%", fontSize: "clamp(2rem,min(15vw,25vh),15rem)", fontWeight: 700, color: '#1E3E62', }}
          >
            FEATURES

          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap="5rem"
          justifyContent="center"
        >

          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="2rem" marginTop="2rem">


          </Box>
        </Box>

        {isBigScreen ? (<Grid left={'10rem'} position={'absolute'} container spacing={8}>

          <Grid left={'7rem'} top={'14.5rem'} position={'absolute'} item xs={12} md={4}>
            <Magnet disabled={false} magnetStrength={20}>

              <Feature ClassName="Feature Feature1" Title='Academic Support' Description='Get personalized help with studies to keep you on track and achieve your goals.' />
            </Magnet>

          </Grid>

          <Grid position={'absolute'} left="56rem" top={"49rem"} item xs={12} md={4}>
            <Magnet disabled={false} magnetStrength={20}>

              <Feature ClassName="Feature Feature2" Title='Motivational Guidance' Description='Stay stress-free with humor-filled and motivational responses tailored to your needs.' />
            </Magnet>
          </Grid>

          <Grid position={'absolute'} left="-3rem" top={"77rem"} item xs={12} md={4}>
            <Magnet disabled={false} magnetStrength={20}>

              <Feature ClassName="Feature Feature3" Title='Stress Relief Tips' Description='Practical advice to handle stress effectively and maintain a balanced lifestyle.' />
            </Magnet>

          </Grid>
        </Grid>) :
          (
            <Box
              sx={{ display: "flex", mt: "10vh", flexDirection: "column", alignItems: "center", gap: "clamp(1rem,1rem + 90vh,20rem)" }}
            >
              <Box sx={{ padding: "clamp(2rem,10vh,3rem)" }}>
                <Magnet disabled={false} magnetStrength={20}>

                  <Feature ClassName="Feature Feature1" Title='Academic Support' Description='Get personalized help with studies to keep you on track and achieve your goals.' />
                </Magnet>
              </Box>

              <Box sx={{ padding: "clamp(2rem,10vh,3rem)" }}>
                <Magnet disabled={false} magnetStrength={20}>

                  <Feature ClassName="Feature Feature2" Title='Motivational Guidance' Description='Stay stress-free with humor-filled and motivational responses tailored to your needs.' />
                </Magnet>
              </Box>

              <Box sx={{ padding: "clamp(2rem,10vh,3rem)" }}>
                <Magnet disabled={false} magnetStrength={20}>

                  <Feature ClassName="Feature Feature3" Title='Stress Relief Tips' Description='Practical advice to handle stress effectively and maintain a balanced lifestyle.' />
                </Magnet>
              </Box>
            </Box>

          )}
        <Box
          position="absolute"
          zIndex="-1"
          sx={{
            left: 840,
            top: 590,
            scale: "5",
            color: "#1E3E62"
          }}
        >
          {isBigScreen && <svg width="20vw" height="70vh" viewBox="0 0 1410 1147" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1410" height="1147" fill="none" />

            <path strokeDasharray={pathLength} strokeDashoffset={pathLength} ref={pathRef} d="M582.146 83.7217L621.666 54.6654C683.016 9.55954 764.657 3.20498 832.247 38.2746L865.755 55.6604C891.196 68.8605 912.924 88.2244 928.955 111.983V111.983C971.285 174.72 1049.73 202.306 1122.01 179.876L1133.76 176.228V176.228C1198.59 155.261 1267.36 194.853 1281.77 261.449L1282.5 264.835C1286.75 284.455 1285.48 304.867 1278.83 323.809L1277.32 328.107C1256.75 386.739 1189.88 414.595 1133.76 387.914V387.914L1105.45 372.749C1040.65 338.041 962.032 341.678 900.714 382.219L854.331 412.885L836.573 424.912C777.989 464.588 702.801 470.358 638.85 440.084L620.955 431.613L530.018 392.15C495.444 377.146 457.335 372.217 420.082 377.93L390.141 382.522C366.883 386.089 344.436 393.732 323.834 405.1L122.18 516.371C111.52 522.253 101.905 529.856 93.7233 538.873L75.4029 559.064C36.8838 601.515 48.0013 668.785 98.1309 696.586V696.586C122.672 710.196 152.198 711.423 177.785 699.897L231.117 675.87C287.099 650.65 351.564 652.542 405.971 681.004L437.97 697.743C463.747 711.227 492.155 718.926 521.212 720.302L539.749 721.18C603.676 724.208 665.191 696.46 705.232 646.534L768.51 567.636C790.662 540.016 820.576 519.659 854.399 509.19V509.19C929.473 485.95 1010.89 514.902 1054.43 580.323L1112.52 667.585C1126.55 688.67 1144.46 706.897 1165.3 721.297L1233.02 768.095C1256.18 784.105 1268.95 811.335 1266.45 839.384V839.384C1261.48 895.041 1201.44 927.684 1152.03 901.588L1106.33 877.45C1082.56 864.899 1055.09 861.263 1028.88 867.2L1000.72 873.578C952.77 884.437 902.479 876.353 860.349 851.014L743.999 781.033C693.203 750.481 627.294 766.257 595.836 816.499L592.632 821.616C586.288 831.748 582.249 843.151 580.8 855.016L576.118 893.356C570.828 936.679 521.467 958.943 485.49 934.233L476.139 927.81C437.668 901.386 386.235 933.729 393.382 979.85V979.85C399.425 1018.85 444.306 1037.95 476.597 1015.26L516.381 987.322C526.678 980.089 539.481 977.374 551.827 979.804V979.804C576.399 984.642 592.62 1008.26 588.398 1032.94V1032.94C585.154 1051.91 570.509 1066.93 551.626 1070.62L540.938 1072.7C529.856 1074.86 518.395 1073.95 507.79 1070.08L492.5 1064.5L400.183 1016.78C383.149 1007.97 364.938 1001.66 346.109 998.04L339.051 996.683C311.056 991.299 282.2 992.4 254.696 999.901L245.73 1002.35C224.84 1008.04 205.485 1018.33 189.076 1032.46L183.97 1036.85C155.102 1061.71 138.5 1097.91 138.5 1136V1136"
              stroke="#1E3E62" strokeWidth="3" />

          </svg>}
        </Box>
      </Box>

      <Box
        className="section-3"
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: '#FFFAF4',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <Typography
            className='How'
            sx={{ fontWeight: 700, color: '#1E3E62', mt: "15vh", ml: "clamp(0.2rem,0.1rem + 0.7vw,10vw)", marginBottom: '2rem', fontSize: "clamp(2rem,1rem + min(25vh,8vw),15rem)", width: "50vw" }}
          >
            HOW IT WORKS
          </Typography>
        </Box>
        <Box
          className="workBox"
          sx={{
            display: "flex",
            gap: "4rem",
            mt: "4rem",
            textAlign: "left",
          }}>
          <Box
            className="Step1"
            data-speed="1"
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "5%"
            }}
          >
            <Player
              autoplay
              loop
              src='ask-question.json'
              style={{ height: 'clamp(100px,100px + 30vw,350px)', width: 'clamp(100px,100px + 30vw,350px)' }}
            />
            <Typography variant="h6" sx={{ padding: "2%", fontWeight: 600, color: '#1E3E62', fontSize: "clamp(1.5rem,1rem + 1vw,2.5rem)" }}>
              Ask a Question
            </Typography>
            <Typography sx={{
              padding: "2%", color: '#555', fontFamily: "Poppins",
              fontWeight: "500", fontSize: "clamp(0.7rem,0.7rem + 2vw,1.3rem)"
            }}>
              Submit your queries to Zara-AI and let the chatbot work its magic.
            </Typography>
          </Box>
          {useMediaQuery("(min-width:1600px)") &&
            <Box marginTop={30}>
              <svg className='Step2' width="100" height="100" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_304_265)">
                  <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M7.57805 46.9883C68.0713 34.4739 114.729 75.8571 140.656 127.351C141.103 128.235 142.183 128.594 143.067 128.147C143.951 127.7 144.31 126.619 143.863 125.736C117.213 72.7981 69.0363 30.6078 6.84848 43.4738C5.87925 43.6723 5.25595 44.6224 5.45597 45.5959C5.65445 46.5651 6.60457 47.1883 7.57805 46.9883Z" fill="#9AA6B2" />
                  <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M141.774 125.577C139.153 123.821 135.888 121.581 135.511 121.337C125.27 114.742 114.555 110.088 102.789 106.839C101.835 106.574 100.844 107.137 100.579 108.092C100.314 109.047 100.877 110.037 101.832 110.302C113.242 113.449 123.635 117.96 133.568 124.359C134.147 124.731 141.483 129.771 143.043 130.679C143.681 131.054 144.158 131.068 144.271 131.061C144.873 131.044 145.256 130.785 145.51 130.528C145.794 130.237 146.146 129.641 146.11 128.748C146.069 127.813 145.509 125.904 145.407 125.411C143.884 117.967 141.535 109.791 140.902 101.8C140.298 94.1801 141.257 86.7195 146.292 80.3255C146.906 79.5477 146.769 78.4163 145.991 77.8026C145.213 77.1889 144.082 77.3257 143.468 78.1036C137.84 85.2533 136.647 93.5663 137.321 102.082C137.951 110.025 140.222 118.147 141.774 125.577Z" fill="#9AA6B2" />
                </g>
                <defs>
                  <clipPath id="clip0_304_265">
                    <rect width="130" height="130" fill="white" transform="translate(45.1514 167.311) rotate(-110)" />
                  </clipPath>
                </defs>
              </svg>
            </Box>
          }

          <Box
            data-speed="0.8"
            className="Step2"

            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Player
              autoplay
              loop
              src='Personalized-help.json'
              style={{ height: 'clamp(100px,100px + 30vw,350px)', width: 'clamp(100px,100px + 30vw,350px)' }}
            />
            <Typography sx={{ padding: "2%", mt: 0, fontWeight: 600, color: '#1E3E62', fontSize: "clamp(1.5rem,1rem + 1vw,2.5rem)" }}>
              Get Personalized Help
            </Typography>
            <Typography sx={{
              padding: "2%", color: '#555', width: "100%", fontFamily: "Poppins",
              fontWeight: "500", fontSize: "clamp(0.7rem,0.7rem + 2vw,1.3rem)"
            }}>
              Zara-AI retrieves relevant information and crafts helpful responses.
            </Typography>
          </Box>
          {useMediaQuery("(min-width:1600px)") &&
            <Box marginTop={30}>

              <svg className='Step3' width="100" height="100" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_304_265)">
                  <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M7.57805 46.9883C68.0713 34.4739 114.729 75.8571 140.656 127.351C141.103 128.235 142.183 128.594 143.067 128.147C143.951 127.7 144.31 126.619 143.863 125.736C117.213 72.7981 69.0363 30.6078 6.84848 43.4738C5.87925 43.6723 5.25595 44.6224 5.45597 45.5959C5.65445 46.5651 6.60457 47.1883 7.57805 46.9883Z" fill="#9AA6B2" />
                  <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M141.774 125.577C139.153 123.821 135.888 121.581 135.511 121.337C125.27 114.742 114.555 110.088 102.789 106.839C101.835 106.574 100.844 107.137 100.579 108.092C100.314 109.047 100.877 110.037 101.832 110.302C113.242 113.449 123.635 117.96 133.568 124.359C134.147 124.731 141.483 129.771 143.043 130.679C143.681 131.054 144.158 131.068 144.271 131.061C144.873 131.044 145.256 130.785 145.51 130.528C145.794 130.237 146.146 129.641 146.11 128.748C146.069 127.813 145.509 125.904 145.407 125.411C143.884 117.967 141.535 109.791 140.902 101.8C140.298 94.1801 141.257 86.7195 146.292 80.3255C146.906 79.5477 146.769 78.4163 145.991 77.8026C145.213 77.1889 144.082 77.3257 143.468 78.1036C137.84 85.2533 136.647 93.5663 137.321 102.082C137.951 110.025 140.222 118.147 141.774 125.577Z" fill="#9AA6B2" />
                </g>
                <defs>
                  <clipPath id="clip0_304_265">
                    <rect width="130" height="130" fill="white" transform="translate(45.1514 167.311) rotate(-110)" />
                  </clipPath>
                </defs>
              </svg>
            </Box>
          }

          <Box
            className="Step3"
            data-speed="0.6"
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "20rem"
            }}
          >
            <Player
              autoplay
              loop

              src='goal.json'
              style={{ height: 'clamp(100px,100px + 30vw,350px)', width: 'clamp(100px,100px + 30vw,350px)' }}
            />
            <Typography variant="h6" sx={{ padding: "2%", fontWeight: 600, color: '#1E3E62', fontSize: "clamp(1.5rem,1rem + 1vw,2.5rem)" }}>
              Achieve Your Goals
            </Typography>
            <Typography sx={{
              padding: "2%", color: '#555', fontFamily: "Poppins",
              fontWeight: "500", fontSize: "clamp(0.7rem,0.7rem + 2vw,1.3rem)"
            }}>
              Use the tailored guidance to stay on track and reach your academic milestones.
            </Typography>
          </Box>
        </Box>
      </Box>




      <Box
        component="footer"
        sx={{
          color: "#333",
          py: 4,
          px: 2,
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 4, sm: 2 },
          }}
        >


          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              ml: 2
            }}
          >
            <Typography sx={{
              fontSize: "clamp(0.3rem,1rem + 3vw,3rem)",
              color: "#1E3E62"
            }}>
              Quick Links
            </Typography>
            <Link href="/" underline="hover" color="inherit" sx={{
              fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500"
            }}>
              Home
            </Link>
            <Link href="/about" underline="hover" color="inherit" sx={{
              fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500"
            }}>
              About
            </Link>
            <Link href="/contact" underline="hover" color="inherit" sx={{
              fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500"
            }}>
              Contact
            </Link>

          </Box>
          <Box sx={{ maxWidth: "30rem" }}>
            <Typography sx={{
              fontSize: "clamp(0.3rem,1rem + 3vw,3rem)",
              color: "#1E3E62",
              mb: "2rem"
            }}>
              About Us
            </Typography>
            <Typography sx={{
              fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500", color: "#333"
            }}>
              We are a team dedicated to creating seamless user experiences. Stay
              tuned for exciting updates!
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              gap: 2,
            }}
          >
            <Typography sx={{
              fontSize: "clamp(0.3rem,1rem + 3vw,3rem)",
              color: "#1E3E62",
              mb: "2rem"
            }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="https://facebook.com" target="_blank" rel="noopener">
                <img
                  src="https://img.icons8.com/color/48/facebook-circled--v1.png"
                  alt="Facebook"
                  width="50"
                />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener">
                <img
                  src="https://img.icons8.com/color/48/twitter-circled.png"
                  alt="Twitter"
                  width="50"
                />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener">
                <img
                  src="https://img.icons8.com/color/48/instagram-new.png"
                  alt="Instagram"
                  width="50"
                />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener">
                <img
                  src="https://img.icons8.com/color/48/linkedin-circled--v1.png"
                  alt="LinkedIn"
                  width="50"
                />
              </Link>
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)" }}>
            &copy; {new Date().getFullYear()} Zara AI. All rights
            reserved.
          </Typography>
        </Box>
      </Box>


    </Box>
  );
};

export default Home;
