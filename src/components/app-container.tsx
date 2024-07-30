import { observer } from 'mobx-react'
import { useEffect } from 'react'

import Logo from '@/logo.svg'
import { useStore } from '@/stores'
import { TaskInput } from './task-input'
import { TaskList } from './task-list'
import { ThemeToggle } from './theme-toggle'

export const AppContainer = observer(() => {
    const { theme } = useStore()

    useEffect(() => {
        document.body.setAttribute('data-mode', theme.themeMode)
    }, [theme.themeMode])

    return (
        <div className="max-w-screen-md mx-auto p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={Logo} alt="logo"/>
                    <div className="text-xl text-primary">Todo</div>
                </div>
                <ThemeToggle />
            </div>
            <TaskInput />
            <TaskList />
        </div>
    )
})
