// Типы для розыгрышей

export interface RaffleCard {
  raffleId: string;
  name: string;
  textRaffleState: string;
  winnersCount: number;
  mode: 'both' | 'time' | 'members';
  memberCount?: string;
  timeLeft?: string;
  progress: number;
  lastModified: string;
  modifiedBy: string;
  statusСommunity: 'error' | 'connected' | 'notConfig';
  statusNestedCard: 'green' | 'yellow' | 'red';
  statusNestedText: string;
  nickname: string;
  membersCountNested: string;
  adminType: 'owner' | 'admin';
  imageSrc?: string;
  channelAvatarSrc?: string;
  channelName?: string;
  description?: string;
  endTime?: string;
  communityId?: string;
}

export interface CreateRaffleRequest {
  raffleId: string;
  name: string;
  textRaffleState: string;
  winnersCount: number;
  mode: 'both' | 'time' | 'members';
  memberCount?: string;
  timeLeft?: string;
  progress: number;
  lastModified: string;
  modifiedBy: string;
  statusСommunity: 'error' | 'connected' | 'notConfig';
  statusNestedCard: 'green' | 'yellow' | 'red';
  statusNestedText: string;
  nickname: string;
  membersCountNested: string;
  adminType: 'owner' | 'admin';
}

export interface UpdateRaffleRequest {
  name?: string;
  textRaffleState?: string;
  winnersCount?: number;
  mode?: 'both' | 'time' | 'members';
  memberCount?: string;
  timeLeft?: string;
  progress?: number;
  lastModified?: string;
  modifiedBy?: string;
  statusСommunity?: 'error' | 'connected' | 'notConfig';
  statusNestedCard?: 'green' | 'yellow' | 'red';
  statusNestedText?: string;
  nickname?: string;
  membersCountNested?: string;
  adminType?: 'owner' | 'admin';
}
