import React from 'react';
import component from "./PresentPage.module.scss";
import {NavLink} from "react-router-dom";
import {presentNames} from "../../data";

const PresentPage = ({selectedFemale, selectedMale}) => {
    return (
        <div className={component['select-women']}>
            <audio src={`../assets/images/${selectedMale.present.toLowerCase()}.mp3`}/>
            <NavLink className={'back-link'} to={'/'}>Назад</NavLink>
            <div className="container">
                <div className={component["select-women__inner"]}>
                    <h1 className={component["select-women__title"]}>С международным женским днём.</h1>
                    <div className={component["select-women__images"]}>
                        <div className={component["select-women__image"]}>
                            <img src={selectedFemale.image} alt=""/>
                            <div className={component["select-women__description"]}>
                                <p>
                                    {presentNames[selectedMale.present]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresentPage;