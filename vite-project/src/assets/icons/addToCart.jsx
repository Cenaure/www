import { motion } from "framer-motion"

const AddToCartIcon = ({ clicked, isAnimating }) => {
  const transition = { pathLength: { type: "spring", duration: 0.4, bounce: 0 } };

  return (
    <>
      {clicked || isAnimating ? (
        <motion.svg style={{position: 'absolute', width: '80%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: isAnimating ? 1 : 1}}
          animate={{ opacity: isAnimating ? 0 : 1}}
          transition={{opacity: {duration: 0.5}}}
        >
          <motion.g id="SVGRepo_bgCarrier" stroke-width="0"></motion.g>
          <motion.g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></motion.g>
          <motion.g id="SVGRepo_iconCarrier"> 
          <motion.path 
          fill="transparent"
          strokeWidth="1.5"
          stroke="#0F1729"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={transition}
          d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6" strokeLinecap="round" />
          </motion.g>
        </motion.svg>
      ) : null}
      {(!clicked || isAnimating) ? (
        <motion.svg style={{position: 'absolute', width: '80%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} 
          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          initial={{ opacity: isAnimating ? 0 : 1}}
          animate={{ opacity: isAnimating ? 1 : 1}}
          transition={{opacity: {delay: 0.3, duration: 0.5, type: "ease"}}}
        >
          <motion.path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      ) : null}
    </>
  );
};

export default AddToCartIcon;