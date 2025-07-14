import { CommunityCard } from '@/types/community';

export interface CreateRaffleProps {
  id: string;
}

export type CreateRaffleStep = 'General' | 'Condition' | 'DateTime' | 'Addons';

export interface FormData {
  community: string;
  giveawayName: string;
  prizeDescription: string;
  photos: string[]; // теперь массив url
  conditionOptions: string[];
  communityTagOptions: string[];
  participationConditions: string[];
  requiredCommunities: string[];
  communityPartnersTags: string[];
  numberWinners: string;
  blackListOptions: string[];
  blackListSel: string[];
  startDateTime: string;
  endDateTime: string;
  endByParticipants: boolean;
  publishResults: boolean;
  onlySubscribers: boolean;
  isPartners: boolean;
  hideParticipantsCount: boolean;
  excludeMe: boolean;
  excludeAdmins: boolean;
  partnersTags: string[];
  memberMax: string,
  isSelectedStartTime: string;
  isSelectedEndTime: string;
  startDateLabel: string;
  endDateLabel: string;
  telegramChannel: string[];
  setTelegramChannel: (value: string[]) => void;
} 

export interface AddonsStepProps {
  publishResults: boolean;
  setPublishResults: (value: boolean) => void;
  hideParticipantsCount: boolean;
  setHideParticipantsCount: (value: boolean) => void;
  onlySubscribers: boolean;
  setOnlySubscribers: (value: boolean) => void;
  excludeMe: boolean;
  setExcludeMe: (value: boolean) => void;
  excludeAdmins: boolean;
  setExcludeAdmins: (value: boolean) => void;
}

export interface ConditionStepProps {
  participationConditions: string[];
  setParticipationConditions: (value: string[]) => void;
  requiredCommunities: string[];
  setRequiredCommunities: (value: string[]) => void;
  partnersTags: string[];
  setPartnersTags: (value: string[]) => void;
  isPartners: boolean;
  setIsPartners: (value: boolean) => void;
  numberWinners: string;
  setNumberWinners: (value: string) => void;
  blackListSel: string[];
  setBlackListSel: (value: string[]) => void;
  conditionOptions: string[];
  communityTagOptions: string[];
  communityPartnersTags: string[];
  blackListOptions: string[];
  telegramChannel: string[];
  setTelegramChannel: (value: string[]) => void;
}

export interface DateTimeStepProps {
  endByParticipants: boolean ;
  setEndByParticipants: (v: boolean) => void;
  startDateTime: string;
  setStartDateTime: (v: string) => void;
  endDateTime: string;
  setEndDateTime: (v: string) => void;
  memberMax: string;
  setMemberMax: (v: string) => void;

  isSelectedStartTime: string;
  setIsSelectedStartTime: (v: string) => void;
  isSelectedEndTime: string;
  setIsSelectedEndTime: (v: string) => void;

  startDateLabel: string;
  setStartDateLabel: (v: string) => void;

  endDateLabel: string;
  setEndDateLabel: (v: string) => void;
}

export interface GeneralStepProps {
  community: string;
  setCommunity: (value: string) => void;
  giveawayName: string;
  setGiveawayName: (value: string) => void;
  prizeDescription: string;
  setPrizeDescription: (value: string) => void;
  photos: string[]; // теперь массив url
  onPhotosChange: (photos: File[]) => void;
  communityDisabled?: boolean;
  additionalCommunityData?: CommunityCard | null; // Добавляем дополнительные данные сообщества
}