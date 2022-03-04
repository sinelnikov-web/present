import React, {useEffect, useRef} from 'react';
import component from "./SelectWomen.module.scss"
import {NavLink} from "react-router-dom";

const SelectWomen = ({females, setSelectedFemale}) => {

    const onFemaleClick = (female) => {
        setSelectedFemale(female)
    }

    return (
        <div className={component['select-women']}>
            <div className="container">
                <div className={component["select-women__inner"]}>
                    <h1 className={component["select-women__title"]}>С международным женским днём.</h1>
                    <div className={component["select-women__images"]}>
                        {females?.map(female => {
                            return(
                                <div className={component["select-women__card"]} key={female.id}>
                                    <NavLink onClick={() => onFemaleClick(female)} to={'/wheel'}>
                                        <img className={component["select-women__card-image"]} src={female.image} alt=""/>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
                    <audio src="../assets/images/first-screen.mp3" autoPlay={true}/>
                </div>
            </div>
        </div>
    );
};

export default SelectWomen;