import './Keyboard.css'
import Jkeys from './lib/keys.json'

function Keyboard() {
    let cols = [0, 1, 2, 3, 4]
    return (
        <div className="keyboard-container">
            <div className="macro-container">
                {cols.map((value, index) => (
                    <MacroBtn colId={value} key={index} />
                ))}
            </div>
            <KeyButtons />
        </div>
    )
}

export default Keyboard


function MacroBtn({ colId }: { colId: number }) {
    const handleClick = () => {
        const customKeyPressEvent = new CustomEvent('CustomKeyPress', {
            detail: {key: 'macro'+colId}
        })

        window.dispatchEvent(customKeyPressEvent)
    }
    return (
        <button className="macro-btn" onClick={handleClick}>

        </button>
    )
}

function KeyButtons() {
    let allKeyButtons: JSX.Element[] = []

    Jkeys.keys.forEach((item, index) => {
        switch (item.type) {
            case 'secondary':
                allKeyButtons.push(<SecondaryBtn key={index} />)
                break;
            case 'alpha':
                allKeyButtons.push(<AlphaBtn key={index} />)
                break;
            case 'function':
                allKeyButtons.push(<FunctionBtn text={item.text} secondary={item.secondary} alpha={item.alpha} hidden={false} key={index} />)
                break;
            case 'arrow':
                allKeyButtons.push(<ArrowBtns key={index} />)
                break;
            case 'operation':
                allKeyButtons.push(<OperationKeys text={item.text!} secondary={item.secondary!} alpha={item.alpha!} key={index} />)
                break;
            case 'numKeys':
                allKeyButtons.push(<NumKeyContainer key={index} />)
                break
        }
    })

    return (
        <div className='key-buttons'>
            {allKeyButtons}
        </div>
    )
}

function FunctionBtn({ text = "Default", secondary = "2nd", alpha = "A", hidden = true }) {

    const handleClick = () => {
        const customKeyPressEvent = new CustomEvent('CustomKeyPress', {
            detail: {key: text}
        })

        window.dispatchEvent(customKeyPressEvent)
    }
    
    const el = (!hidden) ? (
        <button className='function-btn' onClick={handleClick}>
            <div className='function-text-container'>
                <h3 className='function-text-sm alpha'>{alpha}</h3>
                <h3 className='function-text-sm secondary'>{secondary}</h3>
            </div>
            <h1 className='function-btn-text'>{text}</h1>
        </button>) : (<button className='function-btn' onClick={handleClick}></button>);


    return (
        <>
            {el}
        </>
    )
}

function AlphaBtn() {
    const handleClick = () => {
        const customKeyPressEvent = new CustomEvent('CustomKeyPress', {
            detail: {key: 'Alpha'}
        })

        window.dispatchEvent(customKeyPressEvent)
    }

    return (
        <button className='alpha-btn' onClick={handleClick}>
            <h1 className='alpha-text'>Alpha</h1>
        </button>
    )
}

function SecondaryBtn() {

    const handleClick = () => {
        const customKeyPressEvent = new CustomEvent('CustomKeyPress', {
            detail: {key: '2nd'}
        })

        window.dispatchEvent(customKeyPressEvent)
    }

    return (
        <button className='secondary-btn' onClick={handleClick}>
            <h1 className='secondary-text'>2nd</h1>
        </button>
    )
}

function ArrowBtns() {
    return (
        <div className='arrow-container'>

        </div>
    )
}

type OperationKeysDef = { text: string, secondary: string, alpha: string }
function OperationKeys({ text, secondary, alpha }: OperationKeysDef) {
    const handleClick = () => {
        const customKeyPressEvent = new CustomEvent('CustomKeyPress', {
            detail: {key: text}
        })

        window.dispatchEvent(customKeyPressEvent)
    }
    return (
        <button className='function-btn operation-btn' onClick={handleClick}>
            <div className='function-text-container'>
                <h3 className='function-text-sm alpha'>{alpha}</h3>
                <h3 className='function-text-sm secondary'>{secondary}</h3>
            </div>
            <h1 className='function-btn-text'>{text}</h1>
        </button>
    )
}

function NumKeyContainer() {
    let keys:JSX.Element[] = []

    Jkeys.numKeys.forEach((item, index) => {
        keys.push(<NumKey text={item.text} key={index}/>)
    })


    return (
        <div className='numkey-btn-container'>
            {keys}
        </div>
    )
}

function NumKey({text}:{text:string}) {

    const handleClick = () => {
        const customKeyPressEvent = new CustomEvent('CustomKeyPress', {
            detail: {key: text}
        })

        window.dispatchEvent(customKeyPressEvent)
    }

    return (
        <button className='numkey-btn' onClick={handleClick}>{text}</button>
    )
}