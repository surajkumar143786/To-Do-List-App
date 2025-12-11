import ToDoItem from './ToDoItem'

function ToDoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) {
    // Calculate statistics
    const totalTasks = todos.length
    const completedTasks = todos.filter(todo => todo.completed).length
    const pendingTasks = totalTasks - completedTasks

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
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
                        <p className="text-gray-500">Add your first task using the form above</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todos.map((todo) => (
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