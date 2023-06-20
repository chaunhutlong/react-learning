import React, {useState} from "react";

const message = [
    "Learn React and Redux",
    "Apply for jobs",
    "Invest your new income"
]

export default function AppF() {
    return (
        <div>
            <Steps/>
        </div>
    )
}

function Steps() {
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

                    <StepMessage step={step}> {message[step - 1]}</StepMessage>

                    <div className="buttons">
                        <Button onClick={handlePrev} textColor="#fff" bgColor="#7950f2"><span>👈</span>Previous</Button>
                        <Button onClick={handleNext} textColor="#fff" bgColor="#7950f2">Next<span>👉</span></Button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

function StepMessage({step, children}) {
    return (
        <div className="message">
            <h3>Step {step}</h3>
            {children}
        </div>
    )
}

function Button({textColor, bgColor, onClick, children}) {
    return (
        <button style={{backgroundColor: bgColor, color: textColor}} onClick={onClick}>{children}
        </button>
    )
}


