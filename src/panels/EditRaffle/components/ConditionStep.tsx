import React from 'react';
import Select from '@components/Select/Select';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import styles from './ConditionStep.module.css';
import { ConditionStepProps } from '../types';
import InputNumbers from '@/components/InputNumbers/InputNumbers';
import { CONDITION_OPTIONS, TELEGRAM_CHANNEL_OPTIONS } from '../constants';

export const ConditionStep: React.FC<ConditionStepProps> = ({
  participationConditions,
  setParticipationConditions,
  requiredCommunities,
  setRequiredCommunities,
  partnersTags,
  setPartnersTags,
  isPartners,
  setIsPartners,
  numberWinners,
  setNumberWinners,
  blackListSel,
  setBlackListSel,
  conditionOptions,
  communityTagOptions,
  communityPartnersTags,
  blackListOptions,
  telegramChannel,
  setTelegramChannel,
}) => {
  const isTelegramSelected = participationConditions.includes('Подписка на Telegram-канал');
  return (
    <div className={styles.conditionContainer}>
      <div className={styles.formField1}>
        <Select
          title="Обязательные условия участия *"
            placeholder="Выберите условия"
            options={CONDITION_OPTIONS}
            onChange={val => setParticipationConditions(Array.isArray(val) ? val : [val])}
            value={participationConditions}
            multiple={true}
        />
      </div>

      {isTelegramSelected && (
        <div className={styles.formFieldTelegram}>
          <Select
            title="Выберите Telegram-канал"
            placeholder="Выберите или введите канал"
            options={TELEGRAM_CHANNEL_OPTIONS}
            value={telegramChannel}
            onChange={val => setTelegramChannel(Array.isArray(val) ? val : [val])}
            multiple={true}
            allowInput={true}
          />
        </div>
      )}

      <div className={styles.formField2}>
        <Select
          title="Введите теги обязательных сообществ *"
          placeholder="Выберите сообщества"
          options={communityTagOptions}
          onChange={val => setRequiredCommunities(Array.isArray(val) ? val : [val])}
          value={requiredCommunities}
          multiple={true}
          allowInput={true}
        />
      </div>

      <div className={styles.checkboxGroup}>

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
          onChange={val => setBlackListSel(Array.isArray(val) ? val : [val])}
          value={blackListSel}
          multiple={true}
          allowInput={true}
        />
      </div>
    </div>
  );
}; 