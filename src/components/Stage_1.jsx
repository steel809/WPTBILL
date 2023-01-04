import {Button, Form, Alert} from 'react-bootstrap';
import {useState, useContext, useRef} from 'react'
import {MyContext} from '../context/index.jsx';

const Stage1 = () => {

    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, ''])

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value)

        if (validate) {
            setError([false, '']);
            context.addPlayer(value)
            textInput.current.value = '';
        }
    }

    const validateInput = (value) => {

        if (value === '') {
            setError([true, "Sorry to need add something"])
            return false;
        }
        if (value.length <= 2) {
            setError([true, "Sorry zu wenige Buchstaben"])
            return false
        }
        return true;
    }

    return (

        <>
            <Form onSubmit={handleSubmit} className="mt-4" >
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Add player to this shit"
                        name="player"
                        ref={textInput}
                    />
                </Form.Group>

                {
                    error[0] ? <Alert>{error[1]}</Alert> : null
                }
                <Button variant="primary" type="submit" className="miami">
                    Add Player
                </Button>

                {
                    context.state.players && context.state.players.length > 0 ?
                        <>
                            <hr/>
                            <div>
                                <ul className="list-group">
                                    {
                                        context.state.players.map((player) => {
                                            return (
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action" key={player.id}>
                                                {player.name}
                                                <span
                                                    className='badge badge-danger'
                                                    onClick={()=> context.removePlayer(player.id)}
                                                >
                                                    X
                                                </span>
                                            </li>
                                        )})
                                    }
                                </ul>
                                <div className="action_button" onClick={()=> context.next()}>
                                    Next
                                </div>
                            </div>
                        </>
                        : null
                }
            </Form>
        </>
    )
}

export default Stage1;