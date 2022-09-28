import  {useContext,useReducer,createContext} from 'react'
import { cartInitialState } from './Cartinitialstate'
import { cartReducer } from './Cartreducer'
import { UserInitialState } from './Userinitialstate'
import { UserReducer } from './Usereducer'

const AppContext = createContext()


const AppProvider = ({children}) => {

    // user actions

    const isUserLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem("usertoken"))
        if(token){
            const userFromDB = JSON.parse(localStorage.getItem("user"))
            userDispatch({type:"SET_USER", payload:{userFromDB}})
        }
    }

    // cart useReducer
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState)

    // user useReducer
    const [userState, userDispatch] = useReducer(UserReducer, UserInitialState)

    return(
        <AppContext.Provider value={{...cartState, cartDispatch, ...userState, userDispatch, isUserLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}