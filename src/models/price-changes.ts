import { PlayerModel } from "./player.model";

export interface PriceChange {
  priceUps: PlayerModel[];
  priceDowns: PlayerModel[];
}