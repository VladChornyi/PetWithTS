export type TToken = null | string;
export type TRefreshToken = null | string;
export type TSid= null|string
export type TIsLoggedIn = boolean
export type TIsFetchingCurrentUser = boolean;

export interface IUser {
    id: null | string,
    email: null|string
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
      newSid:TSid;
}