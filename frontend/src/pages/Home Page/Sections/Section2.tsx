import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Magnet from '../../../blocks/Animations/Magnet/Magnet'
import Feature from '../../../components/Feature'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {

    const isBigScreen = useMediaQuery('(min-width:1800px)');
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement | null>(null);

    useEffect(() => {
        if (pathRef.current) {
            const totalLength = pathRef.current.getTotalLength();
            setPathLength(totalLength);
            console.log("Total path length:", totalLength);
        }
    }, []);
    useGSAP(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();

            gsap.set(pathRef.current, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });

            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: ".section-2",
                    scrub: 1,
                    start: "top top+100",
                    end: "bottom bottom",
                },
            });
        }
    }, []);



    return (
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
    )
}

export default Section2