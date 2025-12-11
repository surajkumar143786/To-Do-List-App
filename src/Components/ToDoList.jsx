import ToDoItem from './ToDoItem'

function ToDoList({ todos }) {
    // Calculate statistics
    const totalTasks = todos.length
    const completedTasks = todos.filter(todo => todo.completed).length
    const pendingTasks = totalTasks - completedTasks

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Statistics Section */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <span className="text-blue-600 font-bold">📊</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Tasks</p>
                            <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <span className="text-green-600 font-bold">✅</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-gray-800">{completedTasks}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                    <div className="flex items-center">
                        <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                            <span className="text-yellow-600 font-bold">⏳</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-800">{pendingTasks}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task List Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
                    <span className="text-gray-500 text-sm">
                        {completedTasks} of {totalTasks} completed
                    </span>
                </div>

                {todos.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet!</h3>
                        <p className="text-gray-500">Add your first task using the form below</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todos.map((todo) => (
                            <ToDoItem
                                key={todo.id}
                                todo={todo}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round((completedTasks / totalTasks) * 100) || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${(completedTasks / totalTasks) * 100 || 0}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList