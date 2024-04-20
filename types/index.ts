export interface BookProps {
  id: string;
  title: string;
  author: string;
  description: string;
  readTime: number;
  image: string | null;
  pdf: string | null;
  rating: number;
  userId: string;
}

export interface BookFormProps {
  image: File | null;
  title: string;
  author: string;
  readTime: string;
  description: string;
  pdf: File | null;
}

export interface AccountProps {
  user: {
    id: string;
    email: string;
    username: string | null;
    name: string;
    bio: string;
    image: string | null;
  };
  btnTitle: string;
}

export interface BookDataProps {
  title: string;
  author: string;
  description: string;
  readTime: number;
  image: string;
  pdf: string;
  userId: string;
}

export interface updateParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
  email: string;
}
