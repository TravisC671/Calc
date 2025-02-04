import { useEffect, useRef, useState } from 'react'
import './ViewScreen.css'
import { evaluate } from 'mathjs'
import { sciKeys, calcState } from './lib/keys'

function ViewScreen() {

    const [expression, setExpression] = useState(' ')


    const pastExprRef = useRef<JSX.Element[]>([])


    //TODO currently using js eval, but I want to create my own system
    useEffect(() => {
        const handleButtonClick = (event: any) => {

            setExpression(prevExpr => {
                if (event.detail.key == "op_enter") {
                    let res;
                    try {
                        res = evaluate(prevExpr,)
                    } catch {
                        res = 'error'
                    }

                    pastExprRef.current.push(<PastExpression expr={prevExpr} res={res} key={pastExprRef.current.length} />);

                    return ''
                }
                else {

                    let state: calcState = {
                        input: prevExpr,
                        alpha: false,
                        second: false
                    }

                    let result;

                    try {
                        result = sciKeys[event.detail.key].onPress(state)
                    } catch {
                        console.error(`${event.detail.key} not defined`)
                        result = prevExpr
                    }

                    return result
                }
            })

        }

        window.addEventListener('CustomKeyPress', handleButtonClick)

        return () => {
        window.removeEventListener('CustomKeyPress', handleButtonClick)
    }
}, [])



return (
    <div className="screen-container">
        <h1 className='screen-input'>{expression}</h1>
        <div className='past-contianer'>{pastExprRef.current}</div>
    </div>
)
}

function PastExpression({ expr, res }: { expr: string, res: string }) {
    return (
        <div className='past-expr-container'>
            <h3 className='past-expr-text'>{expr}</h3>
            <h3 className='past-expr-res'>{res}</h3>
        </div>
    )
}

export default ViewScreen
