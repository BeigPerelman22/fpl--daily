export interface PlayerModel  {
  id: number,
  name: string,
  teamId: number,
  teamName: string,
  newPrice: number,
  photoId: string,
  positionType: number,
  news: string,
  ownedBy: number,
  commentary?: string
}