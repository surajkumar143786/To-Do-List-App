// LocalStorage utilities for data persistence

const STORAGE_KEY = 'react-todo-app-todos'

// Save todos to localStorage
export const saveTodosToStorage = (todos) => {
    try {
        const serializedTodos = JSON.stringify(todos)
        localStorage.setItem(STORAGE_KEY, serializedTodos)
        return true
    } catch (error) {
        console.error('Error saving todos to localStorage:', error)
        return false
    }
}

// Load todos from localStorage
export const loadTodosFromStorage = () => {
    try {
        const serializedTodos = localStorage.getItem(STORAGE_KEY)
        if (serializedTodos === null) {
            return null
        }
        return JSON.parse(serializedTodos)
    } catch (error) {
        console.error('Error loading todos from localStorage:', error)
        return null
    }
}

// Clear todos from localStorage
export const clearTodosFromStorage = () => {
    try {
        localStorage.removeItem(STORAGE_KEY)
        return true
    } catch (error) {
        console.error('Error clearing todos from localStorage:', error)
        return false
    }
}

// Get storage statistics
export const getStorageStats = () => {
    try {
        const serializedTodos = localStorage.getItem(STORAGE_KEY)
        if (!serializedTodos) {
            return { hasData: false, size: 0, itemCount: 0 }
        }

        const todos = JSON.parse(serializedTodos)
        return {
            hasData: true,
            size: serializedTodos.length,
            itemCount: Array.isArray(todos) ? todos.length : 0,
            lastUpdated: new Date().toLocaleString()
        }
    } catch (error) {
        return { hasData: false, size: 0, itemCount: 0, error: error.message }
    }
}

// Export/Import functionality
export const exportTodos = (todos) => {
    const data = {
        todos,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `todos-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

export const importTodos = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result)

                // Validate imported data
                if (!data.todos || !Array.isArray(data.todos)) {
                    throw new Error('Invalid data format')
                }

                // Validate each todo
                const validTodos = data.todos.filter(todo =>
                    todo &&
                    typeof todo === 'object' &&
                    'id' in todo &&
                    'text' in todo &&
                    'completed' in todo
                )

                resolve(validTodos)
            } catch (error) {
                reject(new Error('Failed to parse file: ' + error.message))
            }
        }

        reader.onerror = () => {
            reject(new Error('Failed to read file'))
        }

        reader.readAsText(file)
    })
}