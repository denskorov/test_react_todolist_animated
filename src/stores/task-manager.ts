import { action, computed, makeAutoObservable, observable } from 'mobx'

import { TaskInterface } from '@/interfaces'

const STORAGE_KEY = '@tasks'

export class TaskManager {
    constructor() {
        this.fetchs()
        makeAutoObservable(this)
    }

    @observable
    protected _tasks: TaskInterface[] = []

    @computed
    get tasks() {
        return this._tasks.filter((task) => !task.isDone)
            .sort((a, b) => b.updatedAt - a.updatedAt)
    }

    @observable
    protected _taskEdit?: TaskInterface

    @computed
    get taskEdit() {
        return this._taskEdit
    }

    @computed
    get completedTasks() {
        return this._tasks.filter((task) => task.isDone)
            .sort((a, b) => b.updatedAt - a.updatedAt)
    }

    @action
    edit(task: TaskInterface) {
        this._taskEdit = task
    }

    @action
    add(title: string) {
        this._tasks.push({
            title,
            id: this.generateId(),
            isDone: false,
            updatedAt: new Date().getTime()
        })

        this.sync()
    }

    @action
    update(id: TaskInterface['id'], title: string) {
        this.find(id, (task, i) => {
            this._tasks[i] = {
                ...task,
                title
            }

            this._taskEdit = undefined
            this.sync()
        })
    }

    @action
    remove(id: TaskInterface['id']) {
        this.find(id, (_, i) => {
            this._tasks.splice(i, 1)
            this.sync()
        })
    }

    @action
    toggleDone(id: TaskInterface['id']) {
        this.find(id, (task, i) => {
            this._tasks[i] = {
                ...task,
                isDone: !task.isDone,
                // update when completed only, show task show in first
                updatedAt: !task.isDone ? new Date().getTime() : task.updatedAt
            }

            this.sync()
        })
    }

    protected fetchs() {
        this._tasks = JSON.parse(localStorage[STORAGE_KEY] || '[]')
    }

    protected sync() {
        localStorage[STORAGE_KEY] = JSON.stringify(this._tasks)
    }

    protected generateId(): number {
        let rand = Math.random()

        while (this._tasks.find(task => task.id === rand)) {
            rand = Math.random()
        }

        return rand
    }

    protected find(id: TaskInterface['id'], callback: (task: TaskInterface, index: number) => void) {
        const index = this._tasks.findIndex((task) => task.id === id)

        if (index !== -1) {
            callback(this._tasks[index], index)
        }
    }
}