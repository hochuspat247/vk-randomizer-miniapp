import React from 'react';
import { FormItem, Input, CustomSelect, FormLayoutGroup } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import PhotoUpload from '@components/PhotoUpload/PhotoUpload';
import { COMMUNITY_OPTIONS } from '../constants';
import styles from './GeneralStep.module.css';

interface GeneralStepProps {
  community: string;
  setCommunity: (value: string) => void;
  giveawayName: string;
  setGiveawayName: (value: string) => void;
  prizeDescription: string;
  setPrizeDescription: (value: string) => void;
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

export const GeneralStep: React.FC<GeneralStepProps> = ({
  community,
  setCommunity,
  giveawayName,
  setGiveawayName,
  prizeDescription,
  setPrizeDescription,
  photos,
  onPhotosChange,
}) => {
  const communityOptions = COMMUNITY_OPTIONS.map(option => ({
    label: option,
    value: option
  }));

  return (
    <FormLayoutGroup className={styles.formLayoutGroup} mode="vertical">
      <FormItem className={styles.formItem} top="Название розыгрыша *">
        <Input
          type="text"
          value={giveawayName}
          onChange={(e) => setGiveawayName(e.target.value)}
          placeholder="Введите название"
        />
      </FormItem>

      <FormItem className={styles.formItem} top="Сообщество *">
        <CustomSelect
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          options={communityOptions}
          placeholder="Выберите сообщество"
        />
      </FormItem>

      <FormItem className={styles.formItem} top="Описание приза *">
        <Input
          type="text"
          value={prizeDescription}
          onChange={(e) => setPrizeDescription(e.target.value)}
          placeholder="Введите описание приза"
        />
      </FormItem>

      <FormItem className={styles.formItem}>
        <div className={styles.photoUploadContainer}>
          <PhotoUpload
            onPhotosChange={onPhotosChange}
            maxPhotos={5}
            initialPhotos={photos}
          />
        </div>
      </FormItem>
    </FormLayoutGroup>
  );
}; 