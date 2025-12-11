import { useState } from 'react'
import Header from './Components/Header'
import ToDoList from './Components/ToDoList'
import AddTodoForm from './Components/AddTodoForm'

function App() {
    // Initial to-do items with more details
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'Learn React Components',
            completed: true,
            priority: 'high',
            createdAt: new Date('2024-01-10').toISOString()
        },
        {
            id: 2,
            text: 'Build To-Do List App',
            completed: false,
            priority: 'high',
            createdAt: new Date('2024-01-11').toISOString()
        },
        {
            id: 3,
            text: 'Style with Tailwind CSS',
            completed: false,
            priority: 'medium',
            createdAt: new Date('2024-01-11').toISOString()
        },
        {
            id: 4,
            text: 'Test application functionality',
            completed: false,
            priority: 'medium',
            createdAt: new Date('2024-01-12').toISOString()
        },
        {
            id: 5,
            text: 'Deploy to GitHub',
            completed: false,
            priority: 'low',
            createdAt: new Date('2024-01-12').toISOString()
        }
    ])

    // Add new todo
    const addTodo = (todo) => {
        const newTodo = {
            id: Date.now(),
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
        setTodos(todos.filter(todo => !todo.completed))
    }

    // Get stats
    const getStats = () => {
        const total = todos.length
        const completed = todos.filter(todo => todo.completed).length
        const pending = total - completed
        const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

        return { total, completed, pending, completionPercentage }
    }

    const stats = getStats()

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Header />

                <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                            <p className="text-gray-600">Track your productivity</p>
                        </div>
                        <div className="mt-4 md:mt-0">
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
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Total Tasks</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.completed}</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Completion</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.completionPercentage}%</p>
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
                            Click checkbox to toggle
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Double click to edit
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            Click delete icon to remove
                        </span>
                    </div>
                    <p>To-Do List App • Built with React & Tailwind CSS</p>
                </footer>
            </div>
        </div>
    )
}

export default App