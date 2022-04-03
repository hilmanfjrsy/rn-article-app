import React, { createContext, useState, useEffect } from 'react'
import { getStorage } from '../Utils/GlobalFunc'

export const ContextProvider = createContext()

export default function BaseContext({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      let u = await getStorage('user')
      if (u) setUser(u)
    })()
  }, [])
  return (
    <ContextProvider.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ContextProvider.Provider>
  )

}