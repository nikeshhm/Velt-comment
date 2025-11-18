export type User = { id: string; name: string; email: string };
export type Comment = {
  id: string;
  jobId: string;
  authorId: string;
  body: string;
  createdAt: number;
  mentions?: string[];
  readBy?: string[];
  parentId?: string | null;
};
