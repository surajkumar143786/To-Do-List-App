import { useState, useEffect } from 'react'
import Header from './Components/Header'
import ToDoList from './Components/ToDoList'
import AddTodoForm from './Components/AddTodoForm'
import { getSampleTodos, calculateStats } from './utils/todoHelpers'
import { loadTodosFromStorage, saveTodosToStorage, exportTodos, getStorageStats } from './utils/storage'

function App() {
    // Load initial todos from localStorage or use sample data
    const [todos, setTodos] = useState(() => {
        const savedTodos = loadTodosFromStorage()
        return savedTodos || getSampleTodos()
    })

    // Storage statistics
    const [storageStats, setStorageStats] = useState(getStorageStats())

    // Save todos to localStorage whenever they change
    useEffect(() => {
        saveTodosToStorage(todos)
        setStorageStats(getStorageStats())
    }, [todos])

    // Add new todo
    const addTodo = (todo) => {
        const newTodo = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            ...todo,
            createdAt: new Date().toISOString()
        }
        setTodos([newTodo, ...todos])
    }

    // Toggle todo completion
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    // Delete todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    // Edit todo text
    const editTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ))
    }

    // Clear all completed todos
    const clearCompleted = () => {
        if (window.confirm('Are you sure you want to delete all completed tasks?')) {
            setTodos(todos.filter(todo => !todo.completed))
        }
    }

    // Reset to sample data
    const resetToSample = () => {
        if (window.confirm('Reset to sample data? This will replace your current tasks.')) {
            setTodos(getSampleTodos())
        }
    }

    // Clear all todos
    const clearAllTodos = () => {
        if (window.confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
            setTodos([])
        }
    }

    // Handle file import
    const handleImport = (event) => {
        const file = event.target.files[0]
        if (!file) return

        import('./utils/storage').then(({ importTodos }) => {
            importTodos(file)
                .then(importedTodos => {
                    if (window.confirm(`Import ${importedTodos.length} tasks? This will replace your current tasks.`)) {
                        setTodos(importedTodos)
                        alert('Tasks imported successfully!')
                    }
                })
                .catch(error => {
                    alert('Import failed: ' + error.message)
                })
        })
    }

    const stats = calculateStats(todos)

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Header />

                {/* Dashboard with Controls */}
                <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                            <p className="text-gray-600">Track and manage your tasks</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={clearCompleted}
                                disabled={stats.completed === 0}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${stats.completed > 0
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Clear Completed ({stats.completed})
                            </button>

                            <button
                                onClick={() => exportTodos(todos)}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                            >
                                Export Tasks
                            </button>

                            <label className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors cursor-pointer">
                                Import Tasks
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Total Tasks</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Completion</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.completionPercentage}%</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">High Priority</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.byPriority.high}</p>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Storage</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {storageStats.hasData ? '✓' : '✗'}
                            </p>
                        </div>
                    </div>

                    {/* Reset Controls */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                <p>Data automatically saved to browser storage</p>
                                <p className="text-xs mt-1">
                                    {storageStats.hasData
                                        ? `${storageStats.itemCount} tasks stored (${storageStats.size} bytes)`
                                        : 'No data stored yet'}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={resetToSample}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                                >
                                    Reset to Sample
                                </button>
                                <button
                                    onClick={clearAllTodos}
                                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors text-sm"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="space-y-8">
                    <AddTodoForm onAddTodo={addTodo} />
                    <ToDoList
                        todos={todos}
                        onToggleTodo={toggleTodo}
                        onDeleteTodo={deleteTodo}
                        onEditTodo={editTodo}
                    />
                </main>

                <footer className="mt-12 text-center text-gray-600 text-sm">
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Click checkbox to toggle • Double click to edit
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Data persists in browser storage
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            Export/Import your tasks as JSON
                        </span>
                    </div>
                    <p>To-Do List App • Built with React & Tailwind CSS • Auto-saves to LocalStorage</p>
                </footer>
            </div>
        </div>
    )
}

export default App