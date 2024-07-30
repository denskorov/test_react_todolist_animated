import { useEffect, useRef, useState } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md'

import { TaskInterface } from '@/interfaces'
import { useStore } from '@/stores'
import { BaseText } from './base-text'

interface Props {
    task: TaskInterface
}

const DISAPPEAR_CLASS = 'scale-75 -mb-[calc(48px+12px)] opacity-0 z-0'
const DISAPEAR_DELAY = 120

export const TaskItem = (props: Props) => {
    const { taskManager } = useStore()

    const [isDone, setIsDone] = useState(props.task.isDone)
    const [isDisappear, setIsDisappear] = useState(true)

    const taskRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLDivElement>(null)

    const toggleDone = () => {
        const transitionCallback = () => {
            setTimeout(() => {
                disappear(() => {
                    taskManager.toggleDone(props.task.id)
                })
            }, DISAPEAR_DELAY)

            labelRef.current?.removeEventListener(
                'transitionend',
                transitionCallback,
                false
            )
        }

        labelRef.current?.addEventListener(
            'transitionend',
            transitionCallback,
            false
        )

        setIsDone(!isDone)
    }

    const disappear = (callback: Function) => {
        const transitionCallback = () => {
            callback()

            taskRef.current?.removeEventListener(
                'transitionend',
                transitionCallback,
                false
            )
        }

        taskRef.current?.addEventListener(
            'transitionend',
            transitionCallback,
            false
        )

        setIsDisappear(true)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsDisappear(false)
        }, DISAPEAR_DELAY)
    }, [])

    return (
        <div
            ref={taskRef}
            className={`
                relative
                ease-in-out
                duration-300
                ${isDisappear ? DISAPPEAR_CLASS : 'z-10'}
            `}
        >
            <div
                className="
                    flex
                    items-center
                    px-3
                    h-[48px]
                    my-[12px]
                    bg-component
                    dark:bg-component-dark
                    rounded-lg
                    gap-3
                    shadow-lg
                "
            >
                <button onClick={() => toggleDone()}>
                    {!isDone ? (
                        <BaseText>
                            <MdCheckBoxOutlineBlank />
                        </BaseText>
                    ) : (
                        <MdCheckBox className="text-primary"></MdCheckBox>
                    )}
                </button>

                <div
                    className="flex-1 truncate cursor-pointer"
                    onClick={() => taskManager.edit(props.task)}
                >
                    <BaseText
                        innerref={labelRef}
                        className={`
                            px-3
                            truncate
                            inline
                            relative
                            after:content-['']
                            after:absolute
                            after:left-0
                            after:h-[2px]
                            after:top-[calc(50%+2px)]
                            after:bg-primary
                            after:ease-in-out
                            after:duration-300
                            after:transition-width
                            ${isDone ? 'after:w-full' : 'after:w-0'}
                        `}
                    >
                        {props.task.title}
                    </BaseText>
                </div>

                <button
                    className="text-danger"
                    onClick={() => disappear(() => taskManager.remove(props.task.id))}
                >
                    <MdDelete />
                </button>
            </div>
        </div>
    )
}
