import { observer } from 'mobx-react'

import { useStore } from '@/stores'
import { BaseText } from './base-text'
import { TaskItem } from './task-item'

export const TaskList = observer(() => {
    const { taskManager } = useStore()

    return (
        <div className="mt-6">
            {taskManager.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}

            <BaseText className="p-3">
                Completed ({taskManager.completedTasks.length})
            </BaseText>

            {taskManager.completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
})
