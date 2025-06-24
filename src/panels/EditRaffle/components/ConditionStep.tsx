import React from 'react';
import Select from '@components/Select/Select';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import styles from './ConditionStep.module.css';
import { ConditionStepProps } from '../types';
import InputNumbers from '@/components/InputNumbers/InputNumbers';

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

      <InputNumbers
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