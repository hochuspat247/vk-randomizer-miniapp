import httpClient from './httpClient';

export type RaffleCarouselCardStatus =
  | 'active'
  | 'pending'
  | 'draft'
  | 'results'
  | 'deleted'
  | 'resultsWhite'
  | 'completed';

export interface RaffleCarouselCard {
  raffleId: string;
  name: string;
  status: RaffleCarouselCardStatus;
  stateText: string;
  members: string;
  endDate: string;
  updatedAt: string;
}

export const raffleCarouselCardsApi = {
  async getRaffleCarouselCards(): Promise<RaffleCarouselCard[]> {
    const response = await httpClient.get<{ raffles: RaffleCarouselCard[] }>('/api/v1/raffle-carousel-cards/');
    return response.raffles;
  }
};

export default raffleCarouselCardsApi; 