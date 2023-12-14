import { TaskPriority, type TaskPriorityType, type TaskType } from "../../Types/types";
import { useQuery } from "react-query";

import MOCK_TASKS from "../../Stores/MockData/mockTaks.json";

const CACHE_TIME = 1000 * 60 * 2; // 2 minutes
function fetchTasksPromise() {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(MOCK_TASKS);
        }, 1000);
    });
}

const TasksPage = () => {
    const { data: tasks, isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => await fetchTasksPromise(),
        staleTime: Infinity,
        cacheTime: CACHE_TIME,
    });

    return (
        <div>
            <h1>Tasks</h1>
            <div>
                {isLoading ? (
                    <p>loading...</p>
                ) : (
                    <section>
                        <article>
                            <TaskCreateForm />
                        </article>
                        <TasksRenderingList tasks={tasks as TaskType[]} />
                    </section>
                )}
            </div>
        </div>
    );
};

const TaskCreateForm = () => {
    function generateOption(priority: TaskPriorityType) {
        return (
            <option value={priority} key={priority}>
                {priority}
            </option>
        );
    }

    // TODO: can't generate array of strings from TaskPriorityType
    return (
        <form>
            <label htmlFor="task-title">Title</label>
            <input type="text" id="task-title" name="title" />
            <label htmlFor="task-priority">Priority</label>
            <select id="task-priority" name="priority">
                {TaskPriority.map((priority) => generateOption(priority))}
            </select>
            <button type="submit"></button>
        </form>
    );
};

const TasksRenderingList = ({ tasks }: { tasks: TaskType[] }) => {
    return (
        <>
            {(tasks as TaskType[]).map((task, _) => {
                return (
                    <article key={task.id}>
                        <h2>{task.title}</h2>
                        <div>
                            <span>{task.priority}</span>
                            {task.tags.map((tag) => (
                                <span key={tag.id}>{tag.name}</span>
                            ))}
                        </div>
                        <div>{task.description}</div>
                        <section>
                            {task.comments.length === 0 ? (
                                <article>
                                    <textarea placeholder="Add new comment"></textarea>
                                    <button>Send</button>
                                </article>
                            ) : (
                                task.comments.map((comment) => (
                                    <article key={comment.id}>
                                        <p>{comment.content}</p>
                                        <p>{comment.author}</p>
                                    </article>
                                ))
                            )}
                        </section>
                    </article>
                );
            })}
        </>
    );
};

export default TasksPage;
