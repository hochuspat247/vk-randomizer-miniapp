import React, { useMemo } from 'react';
import { FormItem, Input, CustomSelect, FormLayoutGroup, ConfigProvider } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import PhotoUpload from '@components/PhotoUpload/PhotoUpload';
import { useCommunities } from '@/api/hooks';
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
  const { data: communities } = useCommunities();

  const communityOptions = useMemo(() => {
    if (!communities) return [];
    return communities.map(community => ({
      label: community.name,
      value: community.name
    }));
  }, [communities]);

  return (
    <FormLayoutGroup className={styles.formLayoutGroup} mode="vertical">
      <ConfigProvider colorScheme="dark">
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
      </ConfigProvider>


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