declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                send: (channel: string, ...args: any[]) => void
                on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void
            },
        },
        api: {
            db: {
                query: (sql: string) => Promise<any>
            },
            quit: () => void
        }
    }
}

export {}