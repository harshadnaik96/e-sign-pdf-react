export type TUserItem = {
  _id: string;
  name: string;
  bio: string;
  profile: string;
  email: string;
  createdAt: string;
};

export interface IUserListResponse {
  data: { items: TUserItem[] };
}

export interface IUserResponse {
  data: { data: TUserItem };
}
