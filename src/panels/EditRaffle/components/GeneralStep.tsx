import React, { useMemo } from 'react';
import { FormItem, Input, CustomSelect, FormLayoutGroup } from '@vkontakte/vkui';
import PhotoUpload from '@components/PhotoUpload/PhotoUpload';
import { useCommunities } from '@/api/hooks';
import styles from './GeneralStep.module.css';
import { GeneralStepProps } from '../types';


export const GeneralStep: React.FC<GeneralStepProps> = ({
  community,
  setCommunity,
  giveawayName,
  setGiveawayName,
  prizeDescription,
  setPrizeDescription,
  photos,
  onPhotosChange,
  communityDisabled = false,
}) => {
  const { data: communities } = useCommunities();
  const selectedCommunity = communities?.find(c => c.nickname === community);
  const communityName = selectedCommunity?.name || '';
  console.log('community:', community);
  console.log('communities:', communities);
  console.log('selectedCommunity:', selectedCommunity);

  const communityOptions = useMemo(() => {
    if (!communities) return [];
    return communities.map(community => ({
      label: community.name,
      value: community.id
    }));
  }, [communities]);

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
        <Input
          value={communityName}
          disabled
          placeholder="Сообщество"
        />
      </FormItem>

      <FormItem className={styles.formItem} top="текст конкурсного поста *">
        <Input
          type="text"
          value={prizeDescription}
          onChange={(e) => setPrizeDescription(e.target.value)}
          placeholder="Введите текст конкурсного поста"
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