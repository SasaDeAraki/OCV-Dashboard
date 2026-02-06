import "./App.css"
import { Link } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import CharacterPortrait from "./components/CharacterPortrait/CharacterPortrait"
import portraitBuzz from "./assets/images/buzz.png"
import portraitFestor from "./assets/images/festor.png"
import portraitRenna from "./assets/images/renna.png"
import portraitTrex from "./assets/images/trex.png"
import portraitZe from "./assets/images/ze.png"
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

function App() {
  return (
    <motion.div 
      className="characters-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <Link to="/leon"><CharacterPortrait imgPersonagem={ portraitBuzz } /></Link>
      <Link to="/sales"><CharacterPortrait imgPersonagem={ portraitFestor } /></Link>
      <Link to="/sereno"><CharacterPortrait imgPersonagem={ portraitRenna } /></Link>
    </motion.div>
  )
}

export default App