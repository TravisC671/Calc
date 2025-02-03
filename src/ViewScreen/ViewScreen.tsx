import { useEffect, useState } from 'react'
import './ViewScreen.css'
import { evaluate } from 'mathjs'

const opMap:Record<string,string> = {
    add: "+",
    sub: "-",
    mult: "*",
    div: "/",
}


function ViewScreen() {

    const [expression, setExpression ] = useState(' ')

    const [pastExpr, setPastExpr] = useState<JSX.Element[]>([])
    
    //TODO currently using js eval, but I want to create my own system
    useEffect(() => {
        const handleButtonClick = (event:any) => {
            let keyID:string[] = event.detail.key.split('_')

            let type = keyID[0]
            let key = keyID[1]

            switch (type) {
                case ('num'):
                    console.log('numkey', event.detail.key)
                    setExpression((prev) => prev + key)
                    break
                case ('op'):
                    console.log('operation')
                    if (key != 'enter') {
                        setExpression((prev) => prev + opMap[key])
                    } else {
                        setExpression((prevExpr) => {
                            let res;
                            try {
                                res = evaluate(prevExpr)
                            } catch {
                                res = 'error'
                            }
                            setPastExpr((prev) => [...prev, <PastExpression expr={prevExpr} res={res} key={prev.length} />])

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
