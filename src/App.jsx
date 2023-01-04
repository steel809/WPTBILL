import {useContext} from 'react';
import Stage1 from './components/Stage_1.jsx';
import Stage2 from './components/Stage_2.jsx';
import './style/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import {MyContext} from './context/index.jsx';

export default function App() {

    const context = useContext(MyContext)

    return (
        <>
            <div className="wrapper">
                <div className="center-wrapper">
                    <h1>Who pays the bill?</h1>
                    {context.state.stage === 1 ? <Stage1 /> : <Stage2 />}
                </div>
            </div>
        </>
    )
}