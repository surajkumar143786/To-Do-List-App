import ToDoItem from './ToDoItem'
import { useState } from 'react'

function ToDoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) {
    const [filter, setFilter] = useState('all') // all, active, completed
    const [sortBy, setSortBy] = useState('date') // date, priority, name

    // Filter todos based on selected filter
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    // Sort todos based on selected sort option
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(b.createdAt) - new Date(a.createdAt) // newest first
        }
        if (sortBy === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 }
            return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        if (sortBy === 'name') {
            return a.text.localeCompare(b.text)
        }
        return 0
    })

    // Calculate statistics
    const totalTasks = todos.length
    const completedTasks = todos.filter(todo => todo.completed).length
    const pendingTasks = totalTasks - completedTasks

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Controls Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
                        <p className="text-gray-600">
                            {sortedTodos.length} of {todos.length} tasks shown
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {/* Filter buttons */}
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            {['all', 'active', 'completed'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${filter === f
                                            ? 'bg-white text-gray-800 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* Sort dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-gray-100 border-0 py-2 pl-4 pr-10 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="date">Sort by: Date</option>
                                <option value="priority">Sort by: Priority</option>
                                <option value="name">Sort by: Name</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">{totalTasks}</div>
                        <div className="text-sm text-blue-600">Total</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">{completedTasks}</div>
                        <div className="text-sm text-green-600">Done</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-700">{pendingTasks}</div>
                        <div className="text-sm text-yellow-600">Pending</div>
                    </div>
                </div>
            </div>

            {/* Task List */}
            {sortedTodos.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">
                        {filter === 'completed' ? '🏆' : filter === 'active' ? '📝' : '🎉'}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {filter === 'completed'
                            ? 'No completed tasks yet!'
                            : filter === 'active'
                                ? 'No active tasks!'
                                : 'No tasks yet!'}
                    </h3>
                    <p className="text-gray-500">
                        {filter === 'completed'
                            ? 'Complete some tasks to see them here'
                            : 'Add your first task using the form above'}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {sortedTodos.map((todo) => (
                        <ToDoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggleTodo}
                            onDelete={onDeleteTodo}
                            onEdit={onEditTodo}
                        />
                    ))}
                </div>
            )}

            {/* Progress Bar */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round((completedTasks / totalTasks) * 100) || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-linear-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(completedTasks / totalTasks) * 100 || 0}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Keep going! You're making progress.
                </p>
            </div>
        </div>
    )
}

export default ToDoList