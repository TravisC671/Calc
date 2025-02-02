import { useEffect } from 'react'
import './ViewScreen.css'

function ViewScreen() {

    useEffect(() => {
        const handleButtonClick = (event:any) => {

            console.log('Button CLicked', event.detail.key)
        }

        window.addEventListener('CustomKeyPress', handleButtonClick)

        return () => {
            window.removeEventListener('CustomKeyPress', handleButtonClick)
        }
    }, [])

    return (
        <div className="screen-container">

        </div>
    )
}

export default ViewScreen
