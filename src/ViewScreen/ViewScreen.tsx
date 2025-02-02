import { useEffect, useState } from 'react'
import './ViewScreen.css'
import { evaluate } from 'mathjs'

function ViewScreen() {

    const [expression, setExpression ] = useState(' ')

    const [pastExpr, setPastExpr] = useState<JSX.Element[]>([])
    
    //TODO currently using js eval, but I want to create my own system
    useEffect(() => {
        const handleButtonClick = (event:any) => {
            switch (event.detail.type) {
                case ('numkey'):
                    console.log('numkey', event.detail.key)
                    setExpression((prev) => prev + event.detail.key)
                    break
                case ('operation'):
                    console.log('operation')
                    if (event.detail.key != '=') {
                        setExpression((prev) => prev + event.detail.key)
                    } else {
                        setExpression((prevExpr) => {
                            console.log('setexpr')
                            setPastExpr((prev) => [...prev, <PastExpression expr={prevExpr} res={evaluate(prevExpr)} key={prev.length} />])

                            return ' '
                        })
                    }
                    break
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

function PastExpression({expr, res}:{expr:string, res:string}) {
    return(
        <div className='past-expr-container'>
            <h3 className='past-expr-text'>{expr}</h3>
            <h3 className='past-expr-res'>{res}</h3>
        </div>
    )
}

export default ViewScreen
