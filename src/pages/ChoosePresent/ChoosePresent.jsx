import React, {useEffect, useRef, useState} from 'react';
import component from "./ChoosePresent.module.scss";
import WheelOfFortune from "./data";
import {NavLink} from "react-router-dom";

const ChoosePresent = ({selectedFemale, males, handleMaleSelect, selectedMale, selectedMales}) => {
    const [isMaleSelected, setIsMaleSelected] = useState(false)
    const [startChoosingMale, setStartChoosingMale] = useState(false)
    const [wheel, setWheel] = useState(null)
    const [timer, setTimer] = useState(3)
    const [getPrize, setGetPrize] = useState(false)
    const wheelRef = useRef(null)
    const [isSpinning, setIsSpinning] = useState(false)

    useEffect(() => {
        if (startChoosingMale) {
            let timer = 30
            let interval = setInterval(() => {
                if (timer) {
                    timer--
                    handleMaleSelect(males[Math.floor(Math.random() * 8)], false)
                    if (timer % 10 === 0) {
                        setTimer(prev => prev - 1)
                    }
                } else {
                    setIsMaleSelected(true)
                    setStartChoosingMale(false)
                    let count = 0
                    let result = Math.floor(Math.random() * 8)
                    while (selectedMales.some(male => male.id === males[result].id) || count < 10) {
                        result = Math.floor(Math.random() * 8)
                        count++
                    }
                    handleMaleSelect(males[result], true)
                    clearInterval(interval)
                }
            }, 100)
        }
    }, [startChoosingMale])

    useEffect(() => {
        if (wheelRef.current) {
            setWheel(new WheelOfFortune(wheelRef.current, [
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]))
        }
    }, [wheelRef])

    const onClick = (e) => {
        setStartChoosingMale(true)
    }

    function spin() {
        setIsSpinning(true)
        wheel.spin(Math.floor(Math.random() * 8), () => {
            setGetPrize(true)
            setIsSpinning(false)
        })
    }

    console.log({isSpinning})

    return (
        <div className={component['choose-present']}>
            {isSpinning && <audio src={'../assets/images/wheel.mp3'}/>}
            {!isSpinning && <audio src={'../assets/images/second-screen.mp3'}/>}
            <div className="container">
                <div className={component["choose-present__inner"]}>
                    <h1 className={component["choose-present__title"]}>С международным женским днём.</h1>
                    <div className={component["choose-present__body"]}>
                        <div className={component["choose-present__male"]}>
                            <div className={component["choose-present__male-image"]}>
                                <img src={selectedMale.image} alt=""/>
                                {!isMaleSelected && <div className={component["choose-present__male-foreground"]}>
                                    <span>{timer}</span>
                                </div>}
                            </div>
                            <button disabled={isMaleSelected} onClick={onClick} className={component["choose-present__select-btn"]}>Выбрать</button>
                        </div>
                        <div className={component["choose-present__wheel"]}>
                            <div ref={wheelRef} className="wheel-of-fortune"></div>
                            <button disabled={getPrize || !isMaleSelected} onClick={spin} className={component["choose-present__select-btn"]}>Крутить</button>
                            {getPrize && <div className={component["choose-present__accept"]}>
                                <NavLink to={'/wheel/present'}>
                                    <button className={component["choose-present__select-btn"]}>Получить подарок</button>
                                </NavLink>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoosePresent;