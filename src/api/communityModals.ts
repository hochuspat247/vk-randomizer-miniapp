import httpClient from './httpClient';

export interface CommunityModal {
  id: string;
  type: 'select' | 'permission' | 'success';
  placeholder?: string;
  options?: string[];
  communityName?: string;
  communityAvatar?: string;
  subscribers?: { name: string; avatar: string }[];
}

export const communityModalsApi = {
  async getModals(): Promise<CommunityModal[]> {
    const response = await httpClient.get<{ modals: CommunityModal[] }>('/api/v1/community-modals/');
    return response.modals;
  }
};

export default communityModalsApi; 