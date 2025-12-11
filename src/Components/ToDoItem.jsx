import { useState } from 'react'

function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)

    const handleToggle = () => {
        onToggle(todo.id)
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(todo.id)
        }
    }

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        if (editText.trim() && editText !== todo.text) {
            onEdit(todo.id, editText.trim())
        }
        setIsEditing(false)
    }

    const handleCancelEdit = () => {
        setEditText(todo.text)
        setIsEditing(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleCancelEdit()
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            handleEditSubmit(e)
        }
    }

    // Priority styling
    const getPriorityStyle = () => {
        switch (todo.priority) {
            case 'high':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-700',
                    dot: 'bg-red-500',
                    label: 'High'
                }
            case 'medium':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-700',
                    dot: 'bg-yellow-500',
                    label: 'Medium'
                }
            case 'low':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-700',
                    dot: 'bg-green-500',
                    label: 'Low'
                }
            default:
                return {
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    text: 'text-gray-700',
                    dot: 'bg-gray-500',
                    label: 'Normal'
                }
        }
    }

    const priorityStyle = getPriorityStyle()

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div
            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${todo.completed
                    ? 'bg-gray-50 border-gray-300 opacity-75'
                    : `${priorityStyle.bg} ${priorityStyle.border}`
                }`}
        >
            {/* Left side: Checkbox and Content */}
            <div className="flex items-center space-x-4 flex-1">
                {/* Checkbox */}
                <button
                    onClick={handleToggle}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                            ? 'bg-green-500 border-green-500 hover:bg-green-600'
                            : 'border-gray-300 hover:border-green-400 hover:bg-gray-100'
                        }`}
                    title={todo.completed ? "Mark as pending" : "Mark as completed"}
                    aria-label={todo.completed ? "Mark task as incomplete" : "Mark task as complete"}
                >
                    {todo.completed && (
                        <span className="text-white text-sm font-bold">✓</span>
                    )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <form onSubmit={handleEditSubmit} className="space-y-2">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                autoFocus
                            />
                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div
                            className="cursor-pointer"
                            onDoubleClick={handleEditClick}
                        >
                            <div className="flex items-center flex-wrap gap-2 mb-1">
                                <span className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                    {todo.text}
                                </span>
                                {!todo.completed && (
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityStyle.text} ${priorityStyle.bg}`}>
                                        <div className={`w-2 h-2 rounded-full mr-1 ${priorityStyle.dot}`}></div>
                                        {priorityStyle.label}
                                    </span>
                                )}
                                {todo.completed && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        ✅ Completed
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <span className="flex items-center mr-3">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(todo.createdAt)}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="ml-3">
                                    {todo.completed ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right side: Actions */}
            {!isEditing && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEditClick}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit task"
                        aria-label="Edit task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>

                    <button
                        onClick={handleDelete}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete task"
                        aria-label="Delete task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ToDoItem