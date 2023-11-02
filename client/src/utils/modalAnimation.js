const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.05,
      type: "spring",
      damping: 100,
      stiffness: 400,
      mass: 10,
    }
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
  enlarged: {
    scale: 1.05, 
    transition: {
      duration: 0.05,
      type: "spring",
      damping: 100,
      stiffness: 500,
      mass: 1,
    }
  },
};

export default dropIn;