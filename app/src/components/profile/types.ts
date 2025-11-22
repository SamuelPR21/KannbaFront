export type StatusKey = "backlog" | "todo" | "doing" | "done";

export interface ProjectItem {
  proyectId: number;
  proyectName: string;
  categoryName: string;
  role: string;
}

export interface TaskPersonal {
  id: number;
  name: string;
  description: string;
  userId: number;
  stateId: number;
}
