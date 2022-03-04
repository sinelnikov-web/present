import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import SelectWomen from "./pages/SelectWomen/SelectWomen";
import ChoosePresent from "./pages/ChoosePresent/ChoosePresent";
import PresentPage from "./pages/PresentPage/PresentPage";
import {useEffect, useState} from "react";
import {femalesArray, malesArray} from "./data";

function App() {

    const [males, setMales] = useState(malesArray)
    const [females, setFemales] = useState(femalesArray)
    const [selectedFemale, setSelectedFemale] = useState()
    const [selectedMales, setSelectedMales] = useState([])
    const [selectedMale, setSelectedMale] = useState(() => males[0])
    const [isAudioPlay, setIsAudioPlay] = useState(false)

    useEffect(() => {
        if (!males) {
            localStorage.setItem('males', JSON.stringify(malesArray))
            setMales(malesArray)
        }
        if (!females) {
            localStorage.setItem('females', JSON.stringify(femalesArray))
            setFemales(femalesArray)
        }
    }, [])

    const playAudio = () => {
        if (!isAudioPlay) {
            document.querySelector('audio').play()
            setIsAudioPlay(true)
        }
    }

    useEffect(() => {
        document.addEventListener('click', playAudio)

        return () => {
            document.removeEventListener('click', playAudio)
        }
    }, [])

    const handleMaleSelect = (male, stop) => {
        setSelectedMale(male)
        if (stop) {
            setSelectedMales(prev => [...prev, male])
        }
    }
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path={'/'} exact element={<SelectWomen females={females} setSelectedFemale={setSelectedFemale}/>}/>
                    <Route path={'/wheel'} exact element={<ChoosePresent selectedMales={selectedMales} selectedMale={selectedMale} handleMaleSelect={handleMaleSelect} males={males} selectedFemale={selectedFemale}/>}/>
                    <Route path={'/wheel/present'} exact element={<PresentPage selectedFemale={selectedFemale} selectedMale={selectedMale}/>}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
