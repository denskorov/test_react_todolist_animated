import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import { useStore } from '@/stores'

export const TaskInput = observer(() => {
    const { taskManager } = useStore()

    const [title, setTitle] = useState(taskManager.taskEdit?.title)

    const inputRef = useRef<HTMLInputElement>(null)

    const submit = () => {
        if (title) {
            if (taskManager.taskEdit) {
                taskManager.update(taskManager.taskEdit.id, title)
            } else {
                taskManager.add(title)
            }

            setTitle('')
        }
    }

    useEffect(() => {
        if (taskManager.taskEdit) {
            setTitle(taskManager.taskEdit?.title)
            inputRef.current?.focus()
        }
    }, [taskManager.taskEdit])

    return (
        <div
            className="
                p-3
                bg-component
                dark:bg-component-dark
                text-dark
                dark:text-light
                flex
                items-center
                shadow-lg
                rounded-lg
                mt-7
            "
        >
            <input
                value={title}
                onInput={(e) => setTitle(e.currentTarget.value)}
                onKeyDown={(e) => (e.key === 'Enter' ? submit() : '')}
                type="text"
                placeholder="+ add new task"
                className="bg-transparent outline-0 flex-1 px-3"
            />

            <button
                onClick={() => submit()}
                className="bg-primary px-3 py-1.5 text-sm text-light rounded-lg"
            >
                {taskManager.taskEdit ? 'update' : 'add'}
            </button>
        </div>
    )
})
