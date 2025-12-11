import { useState } from 'react'

function ToDoItem({ todo }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        if (editText.trim()) {
            // Edit logic will be added in next commit
            setIsEditing(false)
        }
    }

    const handleCancelEdit = () => {
        setEditText(todo.text)
        setIsEditing(false)
    }

    return (
        <div
            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${todo.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                }`}
        >
            {/* Left side: Checkbox and Text */}
            <div className="flex items-center space-x-4 flex-1">
                <button
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                    title={todo.completed ? "Mark as pending" : "Mark as completed"}
                >
                    {todo.completed && (
                        <span className="text-white text-sm">✓</span>
                    )}
                </button>

                {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="flex-1">
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <div className="mt-2 space-x-2">
                            <button
                                type="submit"
                                className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                        onDoubleClick={handleEditClick}
                    >
                        <span className="font-medium">{todo.text}</span>
                        {todo.completed && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Completed
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Right side: Actions */}
            {!isEditing && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEditClick}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>

                    <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete task"
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