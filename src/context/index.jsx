import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {ToastContainer, toast} from 'react-toastify'
const MyContext = React.createContext()

const defaultState = {
    result: '',
    players: [],
    stage: 1
}

class MyProvider extends Component {

    state = defaultState;

    addPlayers = (name) => {
        this.setState(prevState => ({...prevState,
            players: [
                ...prevState.players,
                {name: name, id: uuidv4()}
            ]
        }))
    }

    removePlayers = (id) => {
        let newArray = this.state.players;
        newArray = newArray.filter(player => player.id !== id);
        this.setState({players: newArray});
    }

    nextHandler = () => {
        const { players } = this.state;

        if(players.length < 2){

            toast.error('You need more than one player',{
                position: toast.POSITION.TOP_LEFT,
                autoClose:2000
            });
        } else {
            this.setState({
                stage:2
            },()=>{
                setTimeout(()=>{
                    this.generateLooser()
                },2000)
            })
        }
    }

    generateLooser = () => {
        const {players} = this.state;
        this.setState({
            result: players[Math.floor(Math.random()*players.length)].name
        })
    }

    resetGame = () => {
        this.setState(defaultState)
    }

    render() {
        return (
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    addPlayer: this.addPlayers,
                    removePlayer: this.removePlayers,
                    next: this.nextHandler,
                    generateLooser: this.generateLooser,
                    resetGame: this.resetGame
                }}>
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer />
            </>

        )

    }
}

export {MyContext, MyProvider}