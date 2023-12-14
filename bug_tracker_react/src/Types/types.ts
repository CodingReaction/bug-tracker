export type TaskStatusType =
    | "not-started"
    | "assigned"
    | "in-progress"
    | "stopped"
    | "canceled"
    | "finished";

export const TaskPriority = ["low", "medium", "high", "inmediate"] as const;
export type TaskPriorityType = typeof TaskPriority[number];

export type TagType = {
    id: number;
    name: string;
};

export type CommentType = {
    id: number;
    author: number;
    content: string;
};

export type TaskType = {
    id: number;
    title: string;
    tags: TagType[];
    description: string;
    priority: TaskPriorityType;
    created_date: string;
    due_date: string;
    organization: number;
    author: number;
    assigned_to: number;
    status: TaskStatusType;
    comments: CommentType[];
};
