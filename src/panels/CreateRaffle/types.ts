export interface CreateRaffleProps {
  id: string;
}

export type CreateRaffleStep = 'General' | 'Condition' | 'DateTime' | 'Addons';

export interface FormData {
  community: string;
  giveawayName: string;
  prizeDescription: string;
  photos: File[];
  participationConditions: string[];
  requiredCommunities: string[];
  numberWinners: string;
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