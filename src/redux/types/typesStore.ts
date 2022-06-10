import { ISprint } from "../sprints/sprints-slice";

export type TToken = null | string;
export type TRefreshToken = null | string;
export type TSid= null|string
export type TIsLoggedIn = boolean
export type TIsFetchingCurrentUser = boolean;
export type TId = null | string;
export type TTitle = undefined | string;


export interface IUser {
    id: null | string,
    email:null | string
}

export interface ICredentials{
    email?: string,
    password: null | string
}



export interface IAuthInitialState{
    user: IUser,
    token: TToken,
    refreshToken: TRefreshToken,
    sid: TSid,
    isLoggedIn: TIsLoggedIn,
    isFetchingCurrentUser: TIsFetchingCurrentUser
}

export interface IRefreshToken{
    newAccessToken: TToken;
    newRefreshToken:TRefreshToken;
    newSid: TSid;
}

export interface IProjectState{
    _id?: string;
    id: string;
    title: string;
    description: string;
    members: string[];
    sprints: ISprint[];
    __v?: number;
}

export interface IUpdateProjectTitleData {
  id: string;
  title: {title:string};
}