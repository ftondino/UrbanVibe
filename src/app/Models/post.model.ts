export interface Post {
  user_id: number;
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}

export interface Comment {
  post_id: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
