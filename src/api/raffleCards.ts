import httpClient from './httpClient';

export interface RaffleCard {
  raffleId: string;
  name: string;
  textRaffleState: string;
  winnersCount: number;
  mode: 'time' | 'members' | 'both';
  memberCount: string;
  timeLeft: string;
  progress: number;
  lastModified: string;
  modifiedBy: string;
  statusСommunity: 'connected' | 'notConfig' | 'error';
  statusNestedCard: 'green' | 'yellow' | 'red' | undefined;
  statusNestedText: string;
  nickname: string;
  membersCountNested: string;
  adminType: 'admin' | 'owner';
}

export const raffleCardsApi = {
  async getRaffleCards(): Promise<RaffleCard[]> {
    const response = await httpClient.get<{ raffles: RaffleCard[] }>('/api/v1/raffle-cards/');
    return response.raffles;
  }
};

export default raffleCardsApi; 