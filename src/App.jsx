import { useState, useEffect } from 'react'
import Header from './Components/Header'
import ToDoList from './Components/ToDoList'
import AddTodoForm from './Components/AddTodoForm'
import Notification from './Components/Notification'
import HelpModal from './Components/HelpModal'
import { getSampleTodos, calculateStats } from './utils/todoHelpers'
import { loadTodosFromStorage, saveTodosToStorage, exportTodos } from './utils/storage'

function App() {
    // Load initial todos from localStorage or use sample data
    const [todos, setTodos] = useState(() => {
        const savedTodos = loadTodosFromStorage()
        return savedTodos || getSampleTodos()
    })

    // Notification state
    const [notification, setNotification] = useState(null)

    // Show notification helper
    const showNotification = (message, type = 'info') => {
        setNotification({ message, type })
    }

    // Save todos to localStorage whenever they change
    useEffect(() => {
        saveTodosToStorage(todos)
    }, [todos])

    // Add new todo with notification
    const addTodo = (todo) => {
        const newTodo = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            ...todo,
            createdAt: new Date().toISOString()
        }
        setTodos([newTodo, ...todos])
        showNotification(`Task "${todo.text}" added successfully!`, 'success')
    }

    // Toggle todo completion with notification
    const toggleTodo = (id) => {
        const todo = todos.find(t => t.id === id)
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
        showNotification(
            `Task marked as ${todo.completed ? 'pending' : 'completed'}!`,
            todo.completed ? 'warning' : 'success'
        )
    }

    // Delete todo with notification
    const deleteTodo = (id) => {
        const todo = todos.find(t => t.id === id)
        if (window.confirm(`Delete task: "${todo.text}"?`)) {
            setTodos(todos.filter(todo => todo.id !== id))
            showNotification(`Task "${todo.text}" deleted!`, 'error')
        }
    }

    // Edit todo text with notification
    const editTodo = (id, newText) => {
        const oldTodo = todos.find(t => t.id === id)
        if (oldTodo.text !== newText) {
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            ))
            showNotification('Task updated successfully!', 'info')
        }
    }

    // Clear all completed todos with notification
    const clearCompleted = () => {
        const completedCount = todos.filter(todo => todo.completed).length
        if (completedCount === 0) return

        if (window.confirm(`Clear ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            setTodos(todos.filter(todo => !todo.completed))
            showNotification(`Cleared ${completedCount} completed task${completedCount > 1 ? 's' : ''}!`, 'warning')
        }
    }

    // Reset to sample data with notification
    const resetToSample = () => {
        if (window.confirm('Reset to sample data? This will replace your current tasks.')) {
            setTodos(getSampleTodos())
            showNotification('Reset to sample data!', 'info')
        }
    }

    // Clear all todos with notification
    const clearAllTodos = () => {
        if (window.confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
            setTodos([])
            showNotification('All tasks cleared!', 'error')
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
                        showNotification(`Imported ${importedTodos.length} tasks successfully!`, 'success')
                    }
                })
                .catch(error => {
                    showNotification(`Import failed: ${error.message}`, 'error')
                })
        })
        event.target.value = null // Reset file input
    }

    // Handle export
    const handleExport = () => {
        exportTodos(todos)
        showNotification('Tasks exported successfully! Check your downloads.', 'info')
    }

    const stats = calculateStats(todos)

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                <Header />

                {/* Dashboard with Controls */}
                <div className="mb-8 bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 fade-in">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                            <p className="text-gray-600">Track and manage your tasks</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={clearCompleted}
                                disabled={stats.completed === 0}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${stats.completed > 0
                                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Clear Completed ({stats.completed})
                            </button>

                            <button
                                onClick={handleExport}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Export Tasks
                            </button>

                            <label className="px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer">
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

                    {/* Statistics Grid with animation */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 slide-up">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                            <p className="text-sm text-blue-600">Total Tasks</p>
                            <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                            <p className="text-sm text-green-600">Completed</p>
                            <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                            <p className="text-sm text-yellow-600">Pending</p>
                            <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                            <p className="text-sm text-purple-600">Completion</p>
                            <p className="text-2xl font-bold text-purple-800">{stats.completionPercentage}%</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                            <p className="text-sm text-red-600">High Priority</p>
                            <p className="text-2xl font-bold text-red-800">{stats.byPriority.high}</p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                            <p className="text-sm text-indigo-600">Storage</p>
                            <p className="text-2xl font-bold text-indigo-800">✓</p>
                        </div>
                    </div>

                    {/* Reset Controls */}
                    <div className="mt-6 pt-6 border-t border-gray-200/50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="text-sm text-gray-600">
                                <p className="font-medium">💾 Auto-save enabled</p>
                                <p className="text-xs mt-1 opacity-75">
                                    Your tasks are automatically saved to browser storage
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={resetToSample}
                                    className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                                >
                                    Reset to Sample
                                </button>
                                <button
                                    onClick={clearAllTodos}
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
                                >
                                    Clear All Tasks
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
                        <span className="flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2"></div>
                            Click checkbox to toggle
                        </span>
                        <span className="flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2"></div>
                            Double click to edit
                        </span>
                        <span className="flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                            <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-2"></div>
                            Export/Import your tasks
                        </span>
                    </div>
                    <p className="text-gray-700 font-medium">
                        📝 To-Do List App • Built with React & Tailwind CSS
                    </p>
                </footer>
            </div>

            {/* Notification */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={3000}
                    onClose={() => setNotification(null)}
                />
            )}

            {/* Help Modal */}
            <HelpModal />
        </div>
    )
}

export default App