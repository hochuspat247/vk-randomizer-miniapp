import React from 'react';
import Select from '@components/Select/Select';
import Input from '@components/Input/Input';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import { CONDITION_OPTIONS, COMMUNITY_TAG_OPTIONS, BLACK_LIST, COMMUNITY_PARTNERS_OPTIONS } from '../constants';
import styles from './ConditionStep.module.css';
import { ConfigProvider } from '@vkontakte/vkui';

interface ConditionStepProps {
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
}) => {
  return (
    <div className={styles.conditionContainer}>
      <div className={styles.formField1}>
        <Select
          title="Обязательные условия участия *"
          placeholder="Выберите условия"
          options={CONDITION_OPTIONS}
          onChange={setParticipationConditions}
          value={participationConditions}
          multiple={true}
        />
      </div>

      <div className={styles.formField2}>
        <Select
          title="Введите теги обязательных сообществ *"
          placeholder="Выберите сообщества"
          options={COMMUNITY_TAG_OPTIONS}
          onChange={setRequiredCommunities}
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
          options={BLACK_LIST}
          onChange={setBlackListSel}
          value={blackListSel}
          multiple={true}
          allowInput={true}
        />
      </div>
    </div>
  );
}; 