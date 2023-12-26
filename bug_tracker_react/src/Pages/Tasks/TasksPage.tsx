import { SERVER_URL } from "../../Stores/Global/globals";
import { TaskPriority, type TaskPriorityType, type TaskType, TaskStatus, type TaskStatusType, ProfileType } from "../../Types/types";
import { useQuery } from "react-query";


const CACHE_TIME = 1000 * 60 * 2; // 2 minutes

async function fetchTasksPromise() {
    const accessToken = localStorage.getItem("access");
    console.log(accessToken);
    const response = await fetch(SERVER_URL + "tasks/",{method: "GET", headers: {"Authorization": `Bearer ${accessToken}`}});
    if (!response.ok)
        throw new Error(response.status.toString());
    const data = await response.json();
    return data;
}

async function fetchRelatedUsersPromise(){
    const accessToken = localStorage.getItem("access");
    const response = await fetch(SERVER_URL + "related-users/", {method: "GET", headers: {"Authorization": `Bearer ${accessToken}`}})
    if (!response.ok)
        throw new Error(response.status.toString());
    const data = await response.json();
    console.log(data);
    return data;
}

const TasksPage = () => {
    const { data: tasks, isLoading: isLoadingTasks } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => fetchTasksPromise(),
        // staleTime: Infinity,
        // cacheTime: CACHE_TIME,
    });

    const {data: relatedUsers, isLoading: isLoadingRelatedUsers} = useQuery({
        queryKey: ["users"],
        queryFn: () => fetchRelatedUsersPromise(),
        cacheTime: CACHE_TIME,
    });

    return (
        <div>
            <h1 className="bg-red-500">Tasks</h1>
            <div>
                {isLoadingTasks? (
                    <p>loading...</p>
                ) : (
                    <section>
                        <article>
                            {isLoadingRelatedUsers? <p>loading...</p>: <TaskCreateForm />}
                        </article>
                        <TasksRenderingList tasks={tasks as TaskType[]} />
                    </section>
                )}
            </div>
        </div>
    );
};

const TaskCreateForm = () => {
    const {data: relatedUsers, isLoading: isLoadingRelatedUsers} = useQuery({
        queryKey: ["users"],
        queryFn: () => fetchRelatedUsersPromise(),
        cacheTime: CACHE_TIME,
    });
    function generateOption(value: string | number, name: string) {
        return (
            <option value={value} key={value}>
                {name}
            </option>
        );
    }

    // TODO: can't generate array of strings from TaskPriorityType
    return (
        <form>
            <div>
                <label htmlFor="task-title">Title</label>
                <input type="text" id="task-title" name="title" />
            </div>
            <div>
                <label htmlFor="task-description">Description</label>
                <textarea name="description" id="task-description" cols={30} rows={10}></textarea>
            </div>
            <div>
                <label htmlFor="task-priority">Priority</label>
                <select id="task-priority" name="priority">
                    {TaskPriority.map((priority) => generateOption(priority, priority))}
                </select>
            </div>
            <div>
                <label htmlFor="task-status">Status</label>
                <select id="task-status" name="status">
                    {TaskStatus.map((taskStatus) => generateOption(taskStatus[0], taskStatus[1]))}
                </select>
            </div>
            <div>
                <label htmlFor="task-assigned-to">Assigned to</label>
                <select name="assigned_to" id="task-assigned-to" disabled={isLoadingRelatedUsers}>
                    {relatedUsers.map((user:ProfileType) => generateOption((user.id as number).toString(), user.username))}
                </select>
            </div>
            <button type="submit">Create Task</button>
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
                            {task.comments?.length === 0 ? (
                                <article>
                                    <textarea placeholder="Add new comment"></textarea>
                                    <button>Send</button>
                                </article>
                            ) : (
                                task.comments?.map((comment) => (
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
