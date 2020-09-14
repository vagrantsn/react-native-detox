import React, { useState, useContext } from 'react'

const UserSessionState = React.createContext()
const UserSessionDispatch = React.createContext()

const UserSessionProvider = ({ children }) => {
  const [state, setState] = useState()

  return (
    <UserSessionState.Provider value={state}>
      <UserSessionDispatch.Provider value={setState}>
        {children}
      </UserSessionDispatch.Provider>
    </UserSessionState.Provider>
  )
}

const useUserSession = () => {
  const context = useContext(UserSessionState)

  return context
}

const useUserSessionDispatch = () => {
  const context = useContext(UserSessionDispatch)

  return context
}

export {
  UserSessionProvider,
  useUserSession,
  useUserSessionDispatch,
}
