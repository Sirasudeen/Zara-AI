import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Ace your academics with Zara 🤖",
        1000,

        "Your customized RAG application 💻",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "4rem",
        fontWeight:'400',
        color: "#7E60BF",
        display: "inline-block",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
