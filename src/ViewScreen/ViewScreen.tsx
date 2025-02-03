import { useEffect, useState } from 'react'
import './ViewScreen.css'
import { evaluate } from 'mathjs'
import { sciKeys, calcState } from './lib/keys'

function ViewScreen() {

    const [expression, setExpression] = useState(' ')

    const [pastExpr, setPastExpr] = useState<JSX.Element[]>([])

    //TODO currently using js eval, but I want to create my own system
    useEffect(() => {
        const handleButtonClick = (event: any) => {

            if (event.detail.key == "op_enter") {
                setExpression((prevExpr) => {
                    let res;
                    try {
                        res = evaluate(prevExpr)
                    } catch {
                        res = 'error'
                    }
                    setPastExpr((prev) => [...prev, <PastExpression expr={prevExpr} res={res} key={prev.length} />])

                    return ''
                })
            } else {
                setExpression((prev) => {

                    let state: calcState = {
                        input: prev,
                        alpha: false,
                        second: false
                    }
                    return sciKeys[event.detail.key].onPress(state)
                })
                
            }
        }

        window.addEventListener('CustomKeyPress', handleButtonClick)

        return () => {
            window.removeEventListener('CustomKeyPress', handleButtonClick)
        }
    }, [])



    return (
        <div className="screen-container">
            <h1 className='screen-input'>{expression}</h1>
            <div className='past-contianer'>{pastExpr}</div>
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
