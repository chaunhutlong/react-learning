import React, {useState} from "react";

const message = [
    "Learn React",
    "Apply for jobs",
    "Invest your new income"
]

export default function App() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function handlePrev() {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    function handleNext() {
        if (step < 3) {
            setStep(step + 1);
        }
    }

    return (
        <React.Fragment>
            <button className="close" onClick={() => setIsOpen(!isOpen)}>{isOpen ? `Close` : `Open`}</button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={`number ${step >= 1 ? "active" : ""}`}>1</div>
                        <div className={`number ${step >= 2 ? "active" : ""}`}>2</div>
                        <div className={`number ${step >= 3 ? "active" : ""}`}>3</div>
                    </div>

                    <p className="message">Step {step}: {message[step - 1]}</p>

                    <div className="buttons">
                        <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={handlePrev}>Prev</button>
                        <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={handleNext}>Next</button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
