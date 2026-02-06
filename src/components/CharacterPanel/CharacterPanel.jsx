import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, get, set, onValue } from "firebase/database";
import "./CharacterPanel.css"
import StructureIcon from "../../assets/images/Structure.png"
import StressIcon from "../../assets/images/Stress.png"
import EditIcon from "../../assets/images/edit.png"
import Gauss1 from "../../assets/images/gauss-1.png"
import Gauss2 from "../../assets/images/gauss-2.png"
import { AnimatePresence, motion } from 'framer-motion'

export default function CharacterPanel({ characterId }) {
    const [stats, setStats] = useState({
        current_hp: 0,
        current_san: 0,
        current_pe: 0,
        max_hp: 0,
        max_san: 0,
        max_pe: 0
    });

    const [editingField, setEditingField] = useState(null); // 'hp', 'san', 'pe'
    const [editValues, setEditValues] = useState({ current: 0, max: 0 });

    const fieldMap = {
        hp: { current: 'current_hp', max: 'max_hp' },
        san: { current: 'current_san', max: 'max_san' },
        pe: { current: 'current_pe', max: 'max_pe' },
    };

    const fieldLabels = {
        hp: 'HP',
        san: 'Sanidade',
        pe: 'PE'
    };

    const openEditModal = (field) => {
        setEditingField(field);
        const { current, max } = fieldMap[field];
        setEditValues({
            current: stats[current],
            max: stats[max]
        });
    };

    const handleSaveEdit = () => {
        const { current, max } = fieldMap[editingField];
        const updatedStats = {
            ...stats,
            [current]: editValues.current,
            [max]: editValues.max
        };
        updateStats(updatedStats);
        setEditingField(null);
    };


    // Carregar dados dos personagens
    useEffect(() => {
        const statsRef = ref(db, `characters/${characterId}`);
        const unsubscribe = onValue(statsRef, (snapshot) => {
            if (snapshot.exists()) {
                setStats(snapshot.val());
            }
        });

        return () => unsubscribe();
    }, [characterId]);

    const updateStats = (newStats) => {
        setStats(newStats);
        set(ref(db, `characters/${characterId}`), newStats)
    };

    const changeHP = (delta) => {
        let newHP = stats.current_hp + delta;

        if (newHP < 0) {
            newHP = 0;
        } else if (newHP > stats.max_hp) {
            newHP = stats.max_hp;
        }

        updateStats({ ...stats, current_hp: newHP })
    };

    const changeSan = (delta) => {
        let newSan = stats.current_san + delta;

        if (newSan < 0) {
            newSan = 0;
        } else if (newSan > stats.max_san) {
            newSan = stats.max_san;
        }

        updateStats({ ...stats, current_san: newSan })
    };

    const changePE = (delta) => {
        let newPE = stats.current_pe + delta;

        if (newPE < 0) {
            newPE = 0;
        } else if (newPE > stats.max_pe) {
            newPE = stats.max_pe;
        }

        updateStats({ ...stats, current_pe: newPE })
    };

    const hpPercent = stats.max_hp > 0 ? (stats.current_hp / stats.max_hp) * 100 : 0;
    const sanPercent = stats.max_san > 0 ? (stats.current_san / stats.max_san) * 100 : 0;

    return (
        <div className="container-geral">
            <div className="character-panel">
                <div className="hp-structure-container">
                    <div className="hp-container">
                        <img src={StructureIcon} />
                        <div>
                            <div className="hp-controls">
                                <span>HP:</span>
                                <div>
                                    <button onClick={() => changeHP(-5)}>-5</button>
                                    <button onClick={() => changeHP(-1)}>-</button>
                                    <span>{stats.current_hp}/{stats.max_hp}</span>
                                    <button onClick={() => changeHP(1)}>+</button>
                                    <button onClick={() => changeHP(5)}>+5</button>
                                </div>
                            </div>
                            <div className="hp-bar-wrapper">
                                <div className="hp-bar" style={{ width: `${hpPercent}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="edit-button" onClick={() => openEditModal('hp')}>
                        <img src={EditIcon} />
                    </div>
                </div>

                <div className="hp-structure-container">
                    <div className="hp-container">
                        <img src={StressIcon} />
                        <div>
                            <div className="hp-controls">
                                <span>Sanidade:</span>
                                <div className="button-heat">
                                    <button onClick={() => changeSan(-5)}>-5</button>
                                    <button onClick={() => changeSan(-1)}>-</button>
                                    <span>{stats.current_san}/{stats.max_san}</span>
                                    <button onClick={() => changeSan(1)}>+</button>
                                    <button onClick={() => changeSan(5)}>+5</button>
                                </div>
                            </div>
                            <div className="hp-bar-wrapper">
                                <div className="heat-bar" style={{ width: `${sanPercent}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="edit-button" onClick={() => openEditModal('san')}>
                        <img src={EditIcon} />
                    </div>
                </div>

                <div className="hp-structure-container" style={{ marginRight: "auto" }}>
                    <div className="hp-container">
                        <img src={StressIcon} />
                        <div>
                            <div className="hp-controls">
                                <span>PE:</span>
                                <div className="button-heat">
                                    <button onClick={() => changePE(-5)}>-5</button>
                                    <button onClick={() => changePE(-1)}>-</button>
                                    <span>{stats.current_pe}/{stats.max_pe}</span>
                                    <button onClick={() => changePE(1)}>+</button>
                                    <button onClick={() => changePE(5)}>+5</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="edit-button" onClick={() => openEditModal('pe')}>
                        <img src={EditIcon} />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {editingField && (
                    <div
                        className="modal-overlay"
                        onClick={() => setEditingField(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 999,
                        }}
                    >
                        <div
                            className="modal"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            }}
                        >
                            <h3>Editar {fieldLabels[editingField]}</h3>
                            <label>
                                Atual:
                                <input
                                    type="number"
                                    value={editValues.current}
                                    onChange={(e) =>
                                        setEditValues({ ...editValues, current: Number(e.target.value) })
                                    }
                                />
                            </label>
                            <label>
                                Máximo:
                                <input
                                    type="number"
                                    value={editValues.max}
                                    onChange={(e) =>
                                        setEditValues({ ...editValues, max: Number(e.target.value) })
                                    }
                                />
                            </label>
                            <div className="modal-buttons">
                                <button onClick={() => setEditingField(null)}>Cancelar</button>
                                <button onClick={handleSaveEdit}>Salvar</button>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}