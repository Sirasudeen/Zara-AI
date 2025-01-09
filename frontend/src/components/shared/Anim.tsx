import { gsap } from "gsap";

// Menu Slide Animation
export const menuSlide = {
  initial: () => {
    gsap.set(".menu", { x: "calc(100% + 100px)" });
  },
  enter: () => {
    gsap.to(".menu", { x: "0", duration: 0.8, ease: [0.76, 0, 0.24, 1] });
  },
  exit: () => {
    gsap.to(".menu", { x: "calc(100% + 100px)", duration: 0.8, ease: [0.76, 0, 0.24, 1] });
  },
};

export const slide = {
  initial: (element: gsap.TweenTarget) => {
    gsap.set(element, { x: 80 });
  },
  enter: (element: gsap.TweenTarget, index: number) => {
    gsap.to(element, { x: 0, duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * index });
  },
  exit: (element: gsap.TweenTarget, index: number) => {
    gsap.to(element, { x: 80, duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * index });
  },
};

export const scale = {
  open: (element: gsap.TweenTarget) => {
    gsap.to(element, { scale: 1, duration: 0.3 });
  },
  closed: (element: gsap.TweenTarget) => {
    gsap.to(element, { scale: 0, duration: 0.4 });
  },
};
