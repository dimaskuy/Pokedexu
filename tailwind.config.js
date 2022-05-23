module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        montserrat: ["Montserrat"],
        pixel: ["pixel"],
        connection: ["connection"],
      },
      animation: {
        scale: "scale 150ms ease-in-out",
        scaleReverse: "scale 150ms ease-in-out reverse",
        jump1: "jump 450ms ease-in-out",
        jump2: "jump2 500ms ease-in-out infinite",
      },
      keyframes: {
        scale: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        jump: {
          "0%": { transform: "translateY(-8px)" },
          "100%": { transform: "translateY(0px)" },
        },
        jump2: {
          "20%": {
            transform: "translateY(-6px)",
          },
          "40%": {
            transform: "translateY(0px)",
          },
          "60%": {
            transform: "translateY(-2px)",
          },
          "80%": {
            transform: "translateY(-0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
