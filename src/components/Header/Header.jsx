import { Link } from "react-router-dom"
import "./Header.css"
import arrow from "../../assets/images/arrow.png"
import elipse from "../../assets/images/Ellipse 1.svg"
import portraitBuzz from "../../assets/images/buzz.png"
import portraitFestor from "../../assets/images/festor.png"
import portraitRenna from "../../assets/images/renna.png"
import portraitTrex from "../../assets/images/trex.png"
import portraitZe from "../../assets/images/ze.png"
import headerImg from "../../assets/images/header.png"


export default function Header({ characterId, characterData }) {
    const portraits = {
        leon: portraitBuzz,
        sales: portraitFestor,
        sereno: portraitRenna,
    }

    return (
        <header>
            <div className="container-header">
                <div className="botao-header">
                    <Link to="/"><img src={arrow} /></Link>
                </div>
                <div className="header-character">
                    <h2 style={{ fontSize: '98px' }}>{characterId.toUpperCase()}</h2>
                </div>
                <div className="header-flavor">
                    <h3 style={{ fontSize: '48px' }}>{characterData.flavor.toUpperCase()}</h3>
                </div>
            </div>
            <div className="header-portrait">
                <img src={portraits[characterId]} alt={characterId} />
            </div>
        </header>
    )
}