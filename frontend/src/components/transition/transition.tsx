import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const transition = <P extends {}>(OGComp: React.ComponentType<P>) => {
  return function TransitionWrapper(props: P) {
    const blackScreenRef = useRef<HTMLDivElement>(null);
    const pinkScreenRef = useRef<HTMLDivElement>(null);
    const [showComponent, setShowComponent] = useState(false);
    useGSAP(() => {
      const timeline = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });

      // Entry animation (from bottom and top respectively)
      timeline
        .fromTo(
          blackScreenRef.current,
          { scaleY: 0, transformOrigin: "bottom" },
          { scaleY: 1 }
        )
        .to(".comp",{ visibility:"visible"})

        .to(blackScreenRef.current, { duration: 1,background:"#B17457",scaleY: 0, transformOrigin: "top" })
      // Cleanup on unmount
      return () => {timeline.kill(); 


      };
    }, []);

    return (
      <>
                <div className='comp' style={{ visibility: "hidden" }}>
          <OGComp {...props} />
        </div>
        <div
          ref={blackScreenRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#FFAD60',
            zIndex:"2000",
            transformOrigin: 'bottom',
          }}
        > </div>

      </>
    );
  };
};

export default transition;
