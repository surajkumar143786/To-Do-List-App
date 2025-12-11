import { useState } from 'react'

function AddTodoForm({ onAddTodo }) {
    const [newTodo, setNewTodo] = useState('')
    const [priority, setPriority] = useState('medium')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newTodo.trim()) {
            onAddTodo({
                text: newTodo.trim(),
                priority: priority,
                completed: false
            })
            setNewTodo('')
            setPriority('medium')
        }
    }

    const priorities = [
        { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-500' },
        { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-500' },
        { value: 'high', label: 'High', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' }
    ]

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">➕</span> Add New Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="todoInput" className="block text-sm font-medium text-gray-700 mb-2">
                        Task Description
                    </label>
                    <div className="relative">
                        <input
                            id="todoInput"
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="What do you need to do today?"
                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                            autoComplete="off"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <span className="text-gray-400">📝</span>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Be specific about your task for better tracking
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {priorities.map((p) => (
                            <button
                                key={p.value}
                                type="button"
                                onClick={() => setPriority(p.value)}
                                className={`flex items-center justify-center p-3 rounded-lg border transition-all ${priority === p.value
                                        ? `${p.color} border-current ring-2 ring-offset-2 ring-opacity-50`
                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-2 ${p.dotColor}`}></div>
                                    <span className="font-medium">{p.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={!newTodo.trim()}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${newTodo.trim()
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Task
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setNewTodo('')
                            setPriority('medium')
                        }}
                        className="py-3 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                </div>

                <div className="text-sm text-gray-600 pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <span className="mr-2">💡</span>
                        <p>Tip: Add tasks with clear deadlines and priorities for better organization</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddTodoForm