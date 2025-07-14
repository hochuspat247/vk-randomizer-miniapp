// src/components/EditRaffle/EditRaffle.tsx
import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderContent, Spinner } from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { rafflesApi } from '@/api/raffle';

import BackIcon from '../../assets/icons/BackIcon';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIconProps';
import ProgressBadge from '../../components/ProgressBadge/ProgressBadge';
import { CreateRaffleText_Panel } from '../../constants/Texts/CreateRaffleText';
import styles from './EditRaffle.module.css';
import { CreateRaffleProps } from './types';

import { GeneralStep }   from './components/GeneralStep';
import { ConditionStep } from './components/ConditionStep';
import { DateTimeStep }  from './components/DateTimeStep';
import { AddonsStep }    from './components/AddonsStep';

import { useFormData }    from './hooks/useFormData';
import { useSteps }       from './hooks/useSteps';
import { useCanProceed }  from './hooks/useCanProceed';
import { useProgress }    from './hooks/useProgress';
import { useKeyboardVisible } from './hooks/useKeyboardVisible';
import { useActiveCommunities, useCommunities } from '@/api/hooks';
import { VKApi } from '@/api/vkApi';
import { communitiesApi } from '@/api/community';
import { CommunityCard } from '@/types/community';
import { usePlatformContext } from '@/contexts/PlatformContext';
import { CONDITION_OPTIONS } from './constants';

const EditRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  const nav = useRouteNavigator();
  const params = useParams();
  const raffleId = params?.id;
  const { userId } = usePlatformContext();
  // открыта ли клавиатура или нет
  const keyboardOpen = useKeyboardVisible();

  // Состояние загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Все хуки
  const { formData, updateField, updateFields } = useFormData();
  const { currentStep, nextStep, prevStep }     = useSteps();
  const canProceed                              = useCanProceed(currentStep, formData);
  const progress                                = useProgress(formData);

  const { data: communities } = useCommunities();
  const { activeIds } = useActiveCommunities();
  const [subscriberTags, setSubscriberTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Состояние для дополнительных данных сообщества
  const [additionalCommunityData, setAdditionalCommunityData] = useState<CommunityCard | null>(null);

  // Получаем никнеймы активных сообществ
    const activeCommunityTags = (communities || []).filter(c => activeIds.includes(c.id)).map(c => c.nickname.startsWith('@') ? c.nickname : '@' + c.nickname);

     // Подгружаем подписчиков выбранного сообщества
    useEffect(() => {
    const selected = (communities || []).find(c => String(c.id) === String(formData.community));
    if (selected) {
        VKApi.getCommunityMembers(selected.id).then(users => {
        setSubscriberTags(users.map(u => u.name)); // или u.nickname если есть
        });
    } else {
        setSubscriberTags([]);
    }
    }, [formData.community, communities]);

  // Загрузка данных сообщества по ID, если оно не найдено в активном списке
  useEffect(() => {
    if (formData.community && communities) {
      const foundInActive = communities.find(c => String(c.id) === String(formData.community));
      
      if (!foundInActive) {
        console.log('Community not found in active list, loading by ID:', formData.community);
        
        // Пробуем загрузить с бэкенда
        communitiesApi.getCardById(String(formData.community))
          .then(communityData => {
            if (communityData) {
              console.log('Loaded community data from backend:', communityData);
              setAdditionalCommunityData(communityData);
            } else {
              // Если не найдено на бэкенде, пробуем через VK API
              console.log('Community not found on backend, trying VK API');
              return VKApi.getGroupInfo(Number(formData.community));
            }
          })
          .then(vkGroupData => {
            if (vkGroupData) {
              console.log('Loaded community data from VK API:', vkGroupData);
              // Создаем объект CommunityCard из данных VK API
              const communityCard: CommunityCard = {
                id: String(vkGroupData.id),
                name: vkGroupData.name,
                nickname: vkGroupData.screen_name || `club${vkGroupData.id}`,
                avatarUrl: vkGroupData.photo_200 || '',
                membersCount: vkGroupData.members_count?.toLocaleString('ru-RU') || '0',
                adminType: 'member', // По умолчанию, так как мы не знаем роль
                status: 'yellow', // По умолчанию
                buttonDesc: '',
                stateText: '',
                vk_user_id: '',
                raffleCount: '0'
              };
              setAdditionalCommunityData(communityCard);
            }
          })
          .catch(error => {
            console.error('Error loading community data:', error);
            // Создаем fallback объект
            const fallbackCommunity: CommunityCard = {
              id: String(formData.community),
              name: `Сообщество ${formData.community}`,
              nickname: `club${formData.community}`,
              avatarUrl: '',
              membersCount: '0',
              adminType: 'member',
              status: 'yellow',
              buttonDesc: '',
              stateText: '',
              vk_user_id: '',
              raffleCount: '0'
            };
            setAdditionalCommunityData(fallbackCommunity);
          });
      } else {
        // Сообщество найдено в активном списке, очищаем дополнительные данные
        setAdditionalCommunityData(null);
      }
    }
  }, [formData.community, communities]);

  // Загрузка новых фото на сервер
  const handlePhotosChange = async (files: File[]) => {
    // Не сбрасываем photos, если files пустой и это не явное действие пользователя
    if (!files) return;
    if (files.length === 0) {
      // Только если пользователь явно удалил все фото
      updateField('photos', []);
      return;
    }
    setLoading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const res = await rafflesApi.uploadRafflePhoto(file);
        // абсолютный url для отображения
        const url = res.url.startsWith('http') ? res.url : `http://localhost:8000${res.url}`;
        urls.push(url);
      }
      updateField('photos', urls);
    } catch (e) {
      alert('Ошибка загрузки фото!');
    } finally {
      setLoading(false);
    }
  };

  // Загрузка реальных данных розыгрыша
  useEffect(() => {
    if (!raffleId) {
      console.log('No raffleId provided, skipping data load');
      setLoadError('ID розыгрыша не найден');
      setIsLoading(false);
      return;
    }

    console.log('Loading raffle with ID:', raffleId);
    
    // Сбрасываем ошибку при новой загрузке
    setLoadError(null);
    setIsLoading(true);
    
    rafflesApi.getRaffleById(raffleId, userId)
      .then((raffle) => {
        console.log('Raw API response:', raffle);
        // Теперь raffle - это объект напрямую, а не в обертке
        console.log('Extracted raffle data:', raffle);
        console.log('Photos from backend:', (raffle as any).photos);
        console.log('Photos type:', typeof (raffle as any).photos);
        console.log('Photos is array:', Array.isArray((raffle as any).photos));
        console.log('Community from backend:', (raffle as any).community_id);
        
        // Подробное логирование всех полей
        console.log('=== ALL API FIELDS ===');
        console.log('id:', (raffle as any).id);
        console.log('vk_user_id:', (raffle as any).vk_user_id);
        console.log('name:', (raffle as any).name);
        console.log('community_id:', (raffle as any).community_id);
        console.log('contest_text:', (raffle as any).contest_text);
        console.log('photos:', (raffle as any).photos);
        console.log('require_community_subscription:', (raffle as any).require_community_subscription);
        console.log('require_telegram_subscription:', (raffle as any).require_telegram_subscription);
        console.log('telegram_channel:', (raffle as any).telegram_channel);
        console.log('required_communities:', (raffle as any).required_communities);
        console.log('partner_tags:', (raffle as any).partner_tags);
        console.log('winners_count:', (raffle as any).winners_count);
        console.log('blacklist_participants:', (raffle as any).blacklist_participants);
        console.log('start_date:', (raffle as any).start_date);
        console.log('end_date:', (raffle as any).end_date);
        console.log('max_participants:', (raffle as any).max_participants);
        console.log('publish_results:', (raffle as any).publish_results);
        console.log('hide_participants_count:', (raffle as any).hide_participants_count);
        console.log('exclude_me:', (raffle as any).exclude_me);
        console.log('exclude_admins:', (raffle as any).exclude_admins);
        console.log('status:', (raffle as any).status);
        console.log('participants_count:', (raffle as any).participants_count);
        console.log('=== END API FIELDS ===');
        
        if (!raffle) {
          throw new Error('Данные розыгрыша не найдены');
        }

        // Обработка фото - убеждаемся что это массив строк
        let photos: string[] = [];
        if (Array.isArray((raffle as any).photos)) {
          photos = (raffle as any).photos.filter((photo: any) => typeof photo === 'string' && photo.trim() !== '');
        } else if (typeof (raffle as any).photos === 'string') {
          photos = [(raffle as any).photos];
        }
        
        console.log('Processed photos array:', photos);
        
        // Определяем условия участия на основе API полей
        const participationConditions: string[] = [];
        if ((raffle as any).require_community_subscription) {
          participationConditions.push(CONDITION_OPTIONS[0]); // 'Подписка на сообщество'
        }
        if ((raffle as any).require_telegram_subscription) {
          participationConditions.push(CONDITION_OPTIONS[1]); // 'Подписка на Telegram-канал'
        }
        
        // Определяем условия завершения розыгрыша
        const endByParticipants = !!(raffle as any).max_participants;
        
        // Определяем настройки дат и времени
        const startDateTime = (raffle as any).start_date || (raffle as any).startDateTime || '';
        const endDateTime = (raffle as any).end_date || (raffle as any).endDateTime || '';
        
        // Определяем, являются ли даты кастомными или стандартными
        let isSelectedStartTime = '';
        let isSelectedEndTime = '';
        let startDateLabel = '';
        let endDateLabel = '';
        
        if (startDateTime) {
          // Проверяем, соответствует ли дата одной из стандартных опций
          const startDate = new Date(startDateTime);
          const now = new Date();
          const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
          const sixHoursLater = new Date(now.getTime() + 6 * 60 * 60 * 1000);
          
          if (Math.abs(startDate.getTime() - now.getTime()) < 60000) { // в пределах минуты
            isSelectedStartTime = 'now';
            startDateLabel = 'Сразу';
          } else if (Math.abs(startDate.getTime() - oneHourLater.getTime()) < 60000) {
            isSelectedStartTime = '1hour';
            startDateLabel = 'Через 1 час';
          } else if (Math.abs(startDate.getTime() - sixHoursLater.getTime()) < 60000) {
            isSelectedStartTime = '6hours';
            startDateLabel = 'Через 6 часов';
          } else {
            isSelectedStartTime = 'custom';
            startDateLabel = 'Моя дата и время';
          }
        }
        
        if (endDateTime && !endByParticipants) {
          // Проверяем, соответствует ли дата одной из стандартных опций
          const endDate = new Date(endDateTime);
          const startDate = new Date(startDateTime);
          const oneDayLater = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
          const sevenDaysLater = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
          const fourteenDaysLater = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000);
          const oneMonthLater = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
          
          if (Math.abs(endDate.getTime() - oneDayLater.getTime()) < 60000) {
            isSelectedEndTime = '24hours';
            endDateLabel = 'Через 24 часа';
          } else if (Math.abs(endDate.getTime() - sevenDaysLater.getTime()) < 60000) {
            isSelectedEndTime = '7days';
            endDateLabel = 'Через 7 дней';
          } else if (Math.abs(endDate.getTime() - fourteenDaysLater.getTime()) < 60000) {
            isSelectedEndTime = '14days';
            endDateLabel = 'Через 14 дней';
          } else if (Math.abs(endDate.getTime() - oneMonthLater.getTime()) < 60000) {
            isSelectedEndTime = '1month';
            endDateLabel = 'Через месяц';
          } else {
            isSelectedEndTime = 'custom';
            endDateLabel = 'Моя дата и время';
          }
        }
        
        // Маппинг данных из raffle в formData
        const newFormData = {
          community: (raffle as any).community_id || (raffle as any).communityId || '',
          giveawayName: raffle.name || '',
          prizeDescription: (raffle as any).contest_text || (raffle as any).prizeDescription || (raffle as any).description || '',
          photos: photos, // Используем обработанный массив фото
          participationConditions: participationConditions, // Используем сгенерированные условия
          requiredCommunities: (raffle as any).required_communities || (raffle as any).requiredCommunities || [],
          numberWinners: String((raffle as any).winners_count || (raffle as any).numberWinners || raffle.winnersCount || ''),
          blackListSel: (raffle as any).blacklist_participants || (raffle as any).blackListSel || [],
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          publishResults: (raffle as any).publish_results ?? (raffle as any).publishResults ?? false,
          onlySubscribers: (raffle as any).require_community_subscription ?? (raffle as any).onlySubscribers ?? false,
          isPartners: (raffle as any).is_partners ?? (raffle as any).isPartners ?? false,
          hideParticipantsCount: (raffle as any).hide_participants_count ?? (raffle as any).hideParticipantsCount ?? false,
          excludeMe: (raffle as any).exclude_me ?? (raffle as any).excludeMe ?? false,
          excludeAdmins: (raffle as any).exclude_admins ?? (raffle as any).excludeAdmins ?? false,
          partnersTags: (raffle as any).partner_tags || (raffle as any).partnersTags || [],
          memberMax: (raffle as any).max_participants ? String((raffle as any).max_participants) : ((raffle as any).memberMax || ''),
          endByParticipants: endByParticipants, // Используем определенное значение
          conditionOptions: [],
          communityTagOptions: activeCommunityTags,
          communityPartnersTags: [],
          blackListOptions: subscriberTags,
          isSelectedStartTime: isSelectedStartTime,
          isSelectedEndTime: isSelectedEndTime,
          startDateLabel: startDateLabel,
          endDateLabel: endDateLabel,
          telegramChannel: (raffle as any).telegram_channel ? [(raffle as any).telegram_channel] : (raffle as any).telegramChannel || [],
        };
        
        console.log('New formData to be set:', newFormData);
        console.log('Photos in new formData:', newFormData.photos);
        console.log('Participation conditions:', newFormData.participationConditions);
        console.log('End by participants:', newFormData.endByParticipants);
        console.log('Member max:', newFormData.memberMax);
        console.log('Start date/time fields:', {
          startDateTime: newFormData.startDateTime,
          isSelectedStartTime: newFormData.isSelectedStartTime,
          startDateLabel: newFormData.startDateLabel
        });
        console.log('End date/time fields:', {
          endDateTime: newFormData.endDateTime,
          isSelectedEndTime: newFormData.isSelectedEndTime,
          endDateLabel: newFormData.endDateLabel
        });
        
        updateFields(newFormData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading raffle:', error);
        setLoadError(error.message || 'Ошибка загрузки розыгрыша');
        setIsLoading(false);
      });
  }, [raffleId]);

  useEffect(() => {
    console.log('formData updated:', formData);
  }, [formData]);

  console.log('EditRaffle render, formData:', formData, 'isLoading:', isLoading, 'error:', loadError);

  // Показываем ошибку загрузки
  if (loadError) {
    return (
      <Panel id={id} className={styles.panelOverride}>
        <PanelHeader className={styles.panelHeaderOverride}>
          <PanelHeaderContent className={styles.panelHeaderContentOverride}>
            <span className={styles.panelHeaderText}>Ошибка</span>
          </PanelHeaderContent>
        </PanelHeader>
        <div className={styles.container}>
          <div style={{ color: 'red', textAlign: 'center', padding: 24 }}>
            {loadError}
          </div>
        </div>
      </Panel>
    );
  }

  // Показываем спиннер во время загрузки
  if (isLoading) {
    return (
      <Panel id={id} className={styles.panelOverride}>
        <PanelHeader className={styles.panelHeaderOverride}>
          <PanelHeaderContent className={styles.panelHeaderContentOverride}>
            <span className={styles.panelHeaderText}>Загрузка...</span>
          </PanelHeaderContent>
        </PanelHeader>
        <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <Spinner size="m" />
          </div>
        </div>
      </Panel>
    );
  }

  // Навигация «назад»
  function handlePrev() {
    prevStep(() => nav.back());
  }

  // Навигация «вперёд»
  function handleNext() {
    nextStep();
  }

  // Submit на финальном шаге
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Saving form data:', formData);
    
    if (!raffleId) {
      console.error('No raffle ID for saving');
      return;
    }
    
    try {
      // Показываем индикатор загрузки
      setIsSaving(true);
      
      // Преобразуем данные формы в формат API
      const participationConditions = formData.participationConditions || [];
      const requireCommunitySubscription = participationConditions.includes('Подписка на сообщество');
      const requireTelegramSubscription = participationConditions.includes('Подписка на Telegram-канал');
      
      const updateData = {
        vk_user_id: userId,
        name: formData.giveawayName,
        community_id: formData.community,
        contest_text: formData.prizeDescription,
        photos: formData.photos,
        require_community_subscription: requireCommunitySubscription,
        require_telegram_subscription: requireTelegramSubscription,
        telegram_channel: formData.telegramChannel?.[0] || null,
        required_communities: formData.requiredCommunities,
        partner_tags: formData.partnersTags,
        winners_count: parseInt(formData.numberWinners) || 1,
        blacklist_participants: formData.blackListSel,
        start_date: formData.startDateTime,
        end_date: formData.endDateTime,
        max_participants: formData.endByParticipants && formData.memberMax ? parseInt(formData.memberMax) : null,
        publish_results: formData.publishResults,
        hide_participants_count: formData.hideParticipantsCount,
        exclude_me: formData.excludeMe,
        exclude_admins: formData.excludeAdmins,
      };
      
      console.log('Update data to send:', updateData);
      
      // Отправляем обновление на сервер
      await rafflesApi.updateRaffleById(raffleId, updateData);
      
      console.log('Raffle updated successfully');
      
      // Возвращаемся к списку розыгрышей после успешного сохранения
      nav.push('/raffles');
      
    } catch (error) {
      console.error('Error saving raffle:', error);
      alert('Ошибка сохранения розыгрыша: ' + (error as any).message);
    } finally {
      setIsSaving(false);
    }
  }

  // Рендерим нужный шаг, передавая updateField / updateFields
  const renderStepContent = () => {
    switch (currentStep) {
      case 'General':
        return (
          <GeneralStep
            community={formData.community}
            setCommunity={v => updateField('community', v)}
            giveawayName={formData.giveawayName}
            setGiveawayName={v => updateField('giveawayName', v)}
            prizeDescription={formData.prizeDescription}
            setPrizeDescription={v => updateField('prizeDescription', v)}
            photos={formData.photos}
            onPhotosChange={handlePhotosChange}
            communityDisabled={true}
            additionalCommunityData={additionalCommunityData}
          />
        );

      case 'Condition':
        return (
          <ConditionStep
            participationConditions={formData.participationConditions}
            setParticipationConditions={v => updateField('participationConditions', v)}
            requiredCommunities={formData.requiredCommunities}
            setRequiredCommunities={v => updateField('requiredCommunities', v)}
            partnersTags={formData.partnersTags}
            setPartnersTags={v => updateField('partnersTags', v)}
            isPartners={formData.isPartners}
            setIsPartners={v => updateField('isPartners', v)}
            numberWinners={formData.numberWinners}
            setNumberWinners={v => updateField('numberWinners', v)}
            blackListSel={formData.blackListSel}
            setBlackListSel={v => updateField('blackListSel', v)}
            conditionOptions={formData.conditionOptions}
            communityTagOptions={activeCommunityTags}
            communityPartnersTags={formData.communityPartnersTags}
            blackListOptions={subscriberTags}
            telegramChannel={formData.telegramChannel}
            setTelegramChannel={v => updateField('telegramChannel', v)}
          />
        );

      case 'DateTime':
        return (
          <DateTimeStep
            endByParticipants={formData.endByParticipants}
            setEndByParticipants={v => updateField('endByParticipants', v)}
            startDateTime={formData.startDateTime}
            setStartDateTime={v => updateField('startDateTime', v)}
            endDateTime={formData.endDateTime}
            setEndDateTime={v => updateField('endDateTime', v)}
            memberMax={formData.memberMax}
            setMemberMax={v => updateField('memberMax', v)}
            isSelectedStartTime={formData.isSelectedStartTime}
            setIsSelectedStartTime={v => updateField('isSelectedStartTime', v)}
            isSelectedEndTime={formData.isSelectedEndTime}
            setIsSelectedEndTime={v => updateField('isSelectedEndTime', v)}
            startDateLabel={formData.startDateLabel}
            setStartDateLabel={v => updateField('startDateLabel', v)}
            endDateLabel={formData.endDateLabel}
            setEndDateLabel={v => updateField('endDateLabel', v)}
          />
        );

      case 'Addons':
        return (
          <AddonsStep
            publishResults={formData.publishResults}
            setPublishResults={v => updateField('publishResults', v)}
            hideParticipantsCount={formData.hideParticipantsCount}
            setHideParticipantsCount={v => updateField('hideParticipantsCount', v)}
            onlySubscribers={formData.onlySubscribers}
            setOnlySubscribers={v => updateField('onlySubscribers', v)}
            excludeMe={formData.excludeMe}
            setExcludeMe={v => updateField('excludeMe', v)}
            excludeAdmins={formData.excludeAdmins}
            setExcludeAdmins={v => updateField('excludeAdmins', v)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Panel id={id} className={styles.panelOverride}>
      <PanelHeader
        before={
          <div onClick={handlePrev} className={styles.backIcon}>
            <BackIcon />
          </div>
        }
        className={styles.panelHeaderOverride}
      >
        <PanelHeaderContent className={styles.panelHeaderContentOverride}>
          <span className={styles.panelHeaderText}>
            {CreateRaffleText_Panel}
          </span>
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.container}>
        <ProgressBadge type={currentStep} progress={progress} />

        <form 
            className={styles.formContainer} 
            onSubmit={handleSubmit}
        >
          <div className={styles.formLayout}>
            {renderStepContent()}
          </div>

          {!keyboardOpen && (
            <div className={styles.navigationContainer}>
                {currentStep !== 'General' && (
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={handlePrev}
                >
                    <ChevronLeftIcon />
                    <span className={styles.buttonText}>Назад</span>
                </button>
                )}

                {currentStep !== 'Addons' ? (
                <button
                    type="button"
                    className={styles.nextButton2}
                    disabled={!canProceed}
                    onClick={handleNext}
                >
                    <span className={styles.buttonText}>Далее</span>
                    <ChevronRightIcon />
                </button>
                ) : (
                <button 
                    type="submit" 
                    className={styles.nextButton}
                    disabled={isSaving}
                >
                    <span className={styles.buttonText}>
                      {isSaving ? 'Сохранение...' : 'Завершить'}
                    </span>
                </button>
                )}
            </div> 
            )}
        </form>
        {isSaving && (
          <div className={styles.loadingOverlay}>
            <Spinner size="l" />
            <div style={{ marginTop: 16, color: '#fff', textAlign: 'center' }}>
              Сохранение изменений...
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default EditRaffle;
