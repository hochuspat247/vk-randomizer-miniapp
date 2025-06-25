// src/mocks/editRaffleMock.ts
import { FormData } from '@/panels/EditRaffle/types';
import persic from "@assets/images/persik.png"



export const editRaffleMock: FormData = {
  community: 'Мемы дня',
  giveawayName: 'Супер приз!',
  prizeDescription: 'Дарим айфон 15',
  photos: [],
  conditionOptions: ['лайк', 'Сделать репост записи', 'Оставить комментарий', 'Отметить друзей'],
  participationConditions: ['лайк', 'Сделать репост записи'],
  communityTagOptions: ['@mscw_runclub', '@m_culture', '@mscw_runclub', '@m_culture'],
  requiredCommunities: ['@mscw_runclub', '@m_culture'],
  numberWinners: '3',
  communityPartnersTags: ['@mscw_rb', '@m_cure', '@ms_runclub', '@m_cure'],
  blackListSel: ['@klecke', '@,ldel',],
  blackListOptions: ['@klecke', '@,ldel', '@l;vl', '@klecke', '@,ldel', '@l;vl'],
  startDateTime: new Date().toISOString(),
  endDateTime: new Date(Date.now() + 3600_000).toISOString(),
  publishResults: false,
  onlySubscribers: false,
  isPartners: true,
  hideParticipantsCount: false,
  excludeMe: false,
  excludeAdmins: false,
  partnersTags: ['@mscw_rb', '@m_cure',],
  memberMax: '',
  startDateLabel: '',
  endDateLabel: '',
  isSelectedStartTime: '',
  isSelectedEndTime: '',
  endByParticipants: false,
};
