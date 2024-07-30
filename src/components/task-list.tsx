import { observer } from 'mobx-react'

import { useStore } from '@/stores'
import { BaseText } from './base-text'
import { TaskItem } from './task-item'

export const TaskList = observer(() => {
    const store = useStore()

    return (
        <div className="mt-6">
            {store.task.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
            <BaseText className="p-3">
                Completed ({store.task.completedTasks.length})
            </BaseText>
            {store.task.completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
})
