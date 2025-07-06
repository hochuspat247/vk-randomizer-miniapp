import React from 'react';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import styles from '../EditRaffle.module.css';
import { AddonsStepProps } from '../types';


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

      <div className={styles.checkboxList}>
        <CustomCheckbox
          label="Опубликовать пост с итогами"
          checked={publishResults}
          onChange={setPublishResults}
          showAdditionalIcon={false}
        />

        <CustomCheckbox
          label="Скрыть количество участников"
          checked={hideParticipantsCount}
          onChange={setHideParticipantsCount}
          showAdditionalIcon={false}
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
    </div>
  );
}; 