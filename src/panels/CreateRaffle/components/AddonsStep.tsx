import React from 'react';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import styles from '../CreateRaffle.web.module.css';
import { ConfigProvider } from '@vkontakte/vkui';

interface AddonsStepProps {
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

export const AddonsStep: React.FC<AddonsStepProps> = ({
  publishResults,
  setPublishResults,
  hideParticipantsCount,
  setHideParticipantsCount,
  onlySubscribers,
  setOnlySubscribers,
  excludeMe,
  setExcludeMe,
  excludeAdmins,
  setExcludeAdmins,
}) => {
  return (
    <div className={styles.addonsContainer}>
      <span className={styles.addonsTitle}>Дополнительно</span>
      <ConfigProvider colorScheme="dark">
        <div className={styles.checkboxList}>
          <CustomCheckbox
            label="Опубликовать пост с итогами"
            checked={publishResults}
            onChange={setPublishResults}
            showAdditionalIcon={true}
          />

          <CustomCheckbox
            label="Скрыть количество участников"
            checked={hideParticipantsCount}
            onChange={setHideParticipantsCount}
            showAdditionalIcon={true}
          />

          <CustomCheckbox
            label="Учитывать только подписчиков"
            checked={onlySubscribers}
            onChange={setOnlySubscribers}
            showAdditionalIcon={true}
          />

          <CustomCheckbox
            label="Не учитывать в розыгрыше меня"
            checked={excludeMe}
            onChange={setExcludeMe}
            showAdditionalIcon={false}
          />

          <CustomCheckbox
            label="Не учитывать в розыгрыше администрацию сообщества"
            checked={excludeAdmins}
            onChange={setExcludeAdmins}
            showAdditionalIcon={false}
          />
        </div>
      </ConfigProvider>
    </div>
  );
}; 