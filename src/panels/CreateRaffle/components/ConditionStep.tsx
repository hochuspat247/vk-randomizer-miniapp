import React from 'react';
import Select from '@components/Select/Select';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import { CONDITION_OPTIONS, COMMUNITY_TAG_OPTIONS, BLACK_LIST, COMMUNITY_PARTNERS_OPTIONS, TELEGRAM_CHANNEL_OPTIONS } from '../constants';
import styles from './ConditionStep.module.css';
import { ConfigProvider } from '@vkontakte/vkui';
import InputNumber from '@/components/InputNumbers/InputNumbers';
import Input from '@components/Input/Input';

interface ConditionStepProps {
  participationConditions: string[];
  setParticipationConditions: (value: string[] | string) => void;
  requiredCommunities: string[];
  setRequiredCommunities: (value: string[] | string) => void;
  partnersTags: string[];
  setPartnersTags: (value: string[] | string) => void;
  isPartners: boolean;
  setIsPartners: (value: boolean) => void;
  numberWinners: string;
  setNumberWinners: (value: string) => void;
  blackListSel: string[];
  setBlackListSel: (value: string[] | string) => void;
  telegramChannel: string[];
  setTelegramChannel: (value: string[] | string) => void;
  communityTagOptions: string[];
  blackListOptions: string[];
}

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
  telegramChannel,
  setTelegramChannel,
  communityTagOptions,
  blackListOptions,
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

      <ConfigProvider colorScheme="dark"> 
        <div className={styles.checkboxGroup}>
          <CustomCheckbox
            label="У розыгрыша есть партнеры"
            checked={isPartners}
            onChange={setIsPartners}
            showAdditionalIcon={false}
          />
        </div>
      </ConfigProvider>

      {isPartners && (
        <Select
          title="Введите теги партнеров"
          placeholder="Выберите партнеров"
          options={COMMUNITY_PARTNERS_OPTIONS}
          onChange={val => setPartnersTags(Array.isArray(val) ? val : [val])}
          value={partnersTags}
          multiple={true}
          allowInput={true}
        />
      )}

      <InputNumber
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