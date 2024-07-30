import { createContext, useContext } from 'react'

import { TaskManager } from '@stores/task-manager'
import { Theme } from './theme'

const ctx = createContext({
    theme: new Theme(),
    taskManager: new TaskManager()
})

export const useStore = () => useContext(ctx)