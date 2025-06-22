import React from 'react';
import Select from '@components/Select/Select';
import Input from '@components/Input/Input';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import { CONDITION_OPTIONS, COMMUNITY_TAG_OPTIONS, BLACK_LIST, COMMUNITY_PARTNERS_OPTIONS } from '../constants';
import styles from './ConditionStep.module.css';

interface ConditionStepProps {
  participationConditions: string[];
  setParticipationConditions: (value: string[]) => void;
  requiredCommunities: string[];
  setRequiredCommunities: (value: string[]) => void;
  partnersTags: string[];
  setPartnersTags: (value: string[]) => void;
  showInPartners: boolean;
  setShowInPartners: (value: boolean) => void;
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
}

export const ConditionStep: React.FC<ConditionStepProps> = ({
  participationConditions,
  setParticipationConditions,
  requiredCommunities,
  setRequiredCommunities,
  partnersTags,
  setPartnersTags,
  showInPartners,
  setShowInPartners,
  isPartners,
  setIsPartners,
  numberWinners,
  setNumberWinners,
  blackListSel,
  setBlackListSel,
  conditionOptions,
  communityTagOptions,
  communityPartnersTags,
  blackListOptions
}) => {
  return (
    <div className={styles.conditionContainer}>
      <div className={styles.formField1}>
        <Select
          title="Обязательные условия участия *"
          placeholder="Выберите условия"
          options={conditionOptions}
          onChange={setParticipationConditions}
          value={participationConditions}
          multiple={true}
        />
      </div>

      <div className={styles.formField2}>
        <Select
          title="Введите теги обязательных сообществ *"
          placeholder="Выберите сообщества"
          options={communityTagOptions}
          onChange={setRequiredCommunities}
          value={requiredCommunities}
          multiple={true}
          allowInput={true}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <CustomCheckbox
          label="Отображать в Партнерах"
          checked={showInPartners}
          onChange={setShowInPartners}
          showAdditionalIcon={true}
        />

        <CustomCheckbox
          label="У розыгрыша есть партнеры"
          checked={isPartners}
          onChange={setIsPartners}
          showAdditionalIcon={false}
        />
      </div>

      {isPartners && (
        <Select
          title="Введите теги партнеров"
          placeholder="Выберите партнеров"
          options={communityPartnersTags}
          onChange={setPartnersTags}
          value={partnersTags}
          multiple={true}
          allowInput={true}
        />
      )}

      <Input
        title="Количество победителей *"
        placeholder="Введите количество"
        type="input"
        value={numberWinners}
        onChange={(e) => setNumberWinners(e.target.value)}
      />

      <div className={styles.selectCont}>
        <Select
          title="Черный список участников"
          placeholder="Выберите или введите тег"
          options={blackListOptions}
          onChange={setBlackListSel}
          value={blackListSel}
          multiple={true}
          allowInput={true}
        />
      </div>
    </div>
  );
}; 