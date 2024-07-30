import { createContext, useContext } from 'react'

import { Task } from './task'
import { Theme } from './theme'

const ctx = createContext({
    theme: new Theme(),
    task: new Task()
})

export const useStore = () => useContext(ctx)