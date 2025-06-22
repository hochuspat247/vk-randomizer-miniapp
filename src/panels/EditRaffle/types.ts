export interface CreateRaffleProps {
  id: string;
}

export type CreateRaffleStep = 'General' | 'Condition' | 'DateTime' | 'Addons';

export interface FormData {
  community: string;
  communityOptions: string[];
  giveawayName: string;
  prizeDescription: string;
  photos: File[];
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
  showInPartners: boolean;
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
} 