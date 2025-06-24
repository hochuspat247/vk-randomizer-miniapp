// Типы для сообществ

export interface CommunityCard {
  id: string;
  name: string;
  nickname: string;
  membersCount: string;
  raffleCount: string;
  adminType: 'owner' | 'admin';
  avatarUrl: string;
  status: 'green' | 'yellow' | 'red';
  buttonDesc: string;
  stateText: string;
}

export interface CreateCommunityCardRequest {
  id: string;
  name: string;
  nickname: string;
  membersCount: string;
  raffleCount: string;
  adminType: 'owner' | 'admin';
  avatarUrl: string;
  status: 'green' | 'yellow' | 'red';
  buttonDesc: string;
  stateText: string;
}

export interface UpdateCommunityCardRequest {
  name?: string;
  nickname?: string;
  membersCount?: string;
  raffleCount?: string;
  adminType?: 'owner' | 'admin';
  avatarUrl?: string;
  status?: 'green' | 'yellow' | 'red';
  buttonDesc?: string;
  stateText?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  detail: Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}
