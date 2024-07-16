export interface IFavoritePayload {
  idUser: number;
  idPlace?: number;
  fav_id?: number;
}

export interface IFavorite {
  place_id: number;
  place: string;
  fav_id: number;
}
