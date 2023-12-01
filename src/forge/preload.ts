// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    db: {
        query: async (sql: string) => {
            try {
                const db = await ipcRenderer.invoke('db-query', sql)
                return db
            } catch (error) {
                console.error(error)
                return null
            }
        }
    },
    quit: () => {
        ipcRenderer.invoke('quit-app')
    }
})