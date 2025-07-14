import React, { useMemo } from 'react';
import { FormItem, Input, CustomSelect, FormLayoutGroup } from '@vkontakte/vkui';
import PhotoUpload from '@components/PhotoUpload/PhotoUpload';
import { useCommunities } from '@/api/hooks';
import styles from './GeneralStep.module.css';
import { GeneralStepProps } from '../types';
import { CommunityCard } from '@/types/community';


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
  additionalCommunityData = null,
}) => {
  const { data: communities } = useCommunities();
  
  // Ищем сообщество в активном списке
  const selectedCommunity = communities?.find(c => {
    const match = String(c.id) === String(community);
    console.log(`Comparing community ID: ${c.id} (${typeof c.id}) with ${community} (${typeof community}) = ${match}`);
    return match;
  });
  
  // Используем дополнительные данные, если сообщество не найдено в активном списке
  const finalCommunityData = selectedCommunity || additionalCommunityData;
  const communityName = finalCommunityData?.name || `Сообщество ${community}`;
  
  console.log('community:', community);
  console.log('communities:', communities);
  console.log('selectedCommunity:', selectedCommunity);
  console.log('additionalCommunityData:', additionalCommunityData);
  console.log('finalCommunityData:', finalCommunityData);
  console.log('photos in GeneralStep:', photos);
  console.log('Available community IDs:', communities?.map(c => c.id));
  console.log('Photos count:', photos.length, 'Photos empty:', photos.length === 0);

  const communityOptions = useMemo(() => {
    const options = [];
    
    // Добавляем активные сообщества
    if (communities) {
      options.push(...communities.map(community => ({
        label: community.name,
        value: community.id
      })));
    }
    
    // Добавляем дополнительное сообщество, если оно не в активном списке
    if (additionalCommunityData && !communities?.find(c => String(c.id) === String(additionalCommunityData.id))) {
      options.unshift({
        label: `${additionalCommunityData.name} (неактивное)`,
        value: additionalCommunityData.id
      });
    }
    
    // Если текущее сообщество не найдено нигде, добавляем fallback
    if (community && !finalCommunityData) {
      options.unshift({
        label: `Сообщество ${community}`,
        value: community
      });
    }
    
    return options;
  }, [communities, community, additionalCommunityData, finalCommunityData]);

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
          onChange={(e) => {setCommunity(e.target.value);}}
          placeholder="Сообщество"
          options={communityOptions}
        />
        {finalCommunityData && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {finalCommunityData.membersCount} участников
            {finalCommunityData.adminType && ` • ${finalCommunityData.adminType}`}
          </div>
        )}
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
            initialPhotos={[]}
            previewUrls={photos}
          />
        </div>
      </FormItem>
    </FormLayoutGroup>
  );
}; 