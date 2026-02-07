import "./App.css"
import { Link } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import CharacterPortrait from "./components/CharacterPortrait/CharacterPortrait"
import portraitSales from "./assets/images/portrait_sales.png"
import portraitLeon from "./assets/images/portrait_leon.png"
import portraitSereno from "./assets/images/portrait_sereno.png"
import logo from "./assets/images/cap_verm_logo.png"
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
      <div className="logo">
        <img src={logo} alt="Leon" />
      </div>
      <div className="characters-row">
        <Link to="/leon"><CharacterPortrait imgPersonagem={ portraitLeon } /></Link>
        <Link to="/sales"><CharacterPortrait imgPersonagem={ portraitSales } /></Link>
        <Link to="/sereno"><CharacterPortrait imgPersonagem={ portraitSereno } /></Link>
      </div>
    </motion.div>
  )
}

export default App