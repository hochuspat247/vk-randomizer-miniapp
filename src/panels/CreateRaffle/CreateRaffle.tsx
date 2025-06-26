import React, { useState, useCallback, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import BackIcon from '../../assets/icons/BackIcon';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIconProps';
import ProgressBadge from '../../components/ProgressBadge/ProgressBadge';
import { CreateRaffleText_Panel } from '../../constants/Texts/CreateRaffleText';
import styles from './CreateRaffle.web.module.css';

import { CreateRaffleProps, CreateRaffleStep, FormData } from './types';
import { useProgress } from './hooks/useProgress';
import { isStepComplete, getMissingFields } from './utils/validationUtils';
import { GeneralStep } from './components/GeneralStep';
import { ConditionStep } from './components/ConditionStep';
import { DateTimeStep } from './components/DateTimeStep';
import { AddonsStep } from './components/AddonsStep';
import { validateDateTime } from './utils/dateTimeUtils';
import { useCommunities, useActiveCommunities } from '@/api/hooks';
import { VKApi } from '@/api/vkApi';
import { rafflesApi } from '@/api/raffle';
import { RaffleCard } from '@/types/raffle';
import persikImage from '@/assets/images/persik.png';

const CreateRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [currentStep, setCurrentStep] = useState<CreateRaffleStep>('General');

  // Состояния формы
  const [formData, setFormData] = useState<FormData>({
    community: '',
    giveawayName: '',
    prizeDescription: '',
    photos: [],
    participationConditions: [],
    requiredCommunities: [],
    numberWinners: '',
    blackListSel: [],
    startDateTime: new Date().toISOString(),
    endDateTime: new Date().toISOString(),
    publishResults: false,
    onlySubscribers: false,
    isPartners: false,
    hideParticipantsCount: false,
    excludeMe: false,
    excludeAdmins: false,
    partnersTags: [],
    memberMax: "",
    startDateLabel: '',
    endDateLabel: '',
    isSelectedStartTime: "",
    isSelectedEndTime: "",
    telegramChannel: [],
    endByParticipants: false,
  });

  const progress = useProgress(formData);

  const { data: communities } = useCommunities();
  const { activeIds } = useActiveCommunities();
  const [subscriberTags, setSubscriberTags] = useState<string[]>([]);

  // Получаем никнеймы активных сообществ
  const activeCommunityTags = (communities || []).filter(c => activeIds.includes(c.id)).map(c => c.nickname.startsWith('@') ? c.nickname : '@' + c.nickname);

  // Подгружаем подписчиков выбранного сообщества
  useEffect(() => {
    const selected = (communities || []).find(c => c.id === formData.community);
    if (selected) {
      VKApi.getCommunityMembers(selected.id).then(users => {
        setSubscriberTags(users.map(u => u.name)); // или u.nickname если есть
      });
    } else {
      setSubscriberTags([]);
    }
  }, [formData.community, communities]);

  const handleNextStep = (e: React.MouseEvent) => {
    // e.preventDefault();
    // if (!isStepComplete(currentStep, formData)) {
    //   const missing = getMissingFields(currentStep, formData);
    //   alert(`Заполните обязательные поля: ${missing.join(', ')}`);
    //   return;
    // }
    const steps: CreateRaffleStep[] = ['General', 'Condition', 'DateTime', 'Addons'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    const steps: CreateRaffleStep[] = ['General', 'Condition', 'DateTime', 'Addons'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      routeNavigator.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (progress < 100) {
      alert('Заполните все обязательные поля!');
      return;
    }
    // Найти выбранное сообщество
    const selectedCommunity = (communities || []).find(c => String(c.id) === String(formData.community));
    console.log('selectedCommunity:', selectedCommunity, 'formData.community:', formData.community, 'communities:', communities);
    // Получить фото розыгрыша
    let imageSrc = '';
    if (formData.photos && formData.photos.length > 0) {
      imageSrc = URL.createObjectURL(formData.photos[0]);
    }
    if (!imageSrc) {
      imageSrc = persikImage;
    }
    // Формируем объект для API
    const raffleCard: RaffleCard = {
      raffleId: String(Date.now()),
      name: formData.giveawayName,
      textRaffleState: 'Активно',
      winnersCount: Number(formData.numberWinners),
      mode: formData.endByParticipants ? 'members' : 'time',
      timeLeft: '14Д 0Ч',
      progress: 0,
      lastModified: new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      modifiedBy: 'Администратор',
      statusСommunity: 'connected',
      statusNestedCard: 'green',
      statusNestedText: 'Все работает',
      nickname: selectedCommunity?.nickname || '',
      membersCountNested: selectedCommunity?.membersCount || '100K',
      adminType: selectedCommunity?.adminType === 'owner' ? 'owner' : 'admin',
      imageSrc,
      channelAvatarSrc: selectedCommunity?.avatarUrl || '',
      channelName: selectedCommunity?.name || '',
      description: formData.prizeDescription,
      endTime: formData.endDateTime,
      communityId: selectedCommunity?.id,
    };
    try {
      const response = await rafflesApi.createRaffleCard(raffleCard) as { raffle: RaffleCard };
      routeNavigator.push(`/previewpanel/${response.raffle.raffleId}`);
    } catch (e) {
      alert('Ошибка при создании розыгрыша!');
    }
  };

  const handlePhotosChange = useCallback((photos: File[]) => {
    setFormData(prev => ({ ...prev, photos }));
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'General':
        return (
          <GeneralStep
            community={formData.community}
            setCommunity={(value) => setFormData({ ...formData, community: value })}
            giveawayName={formData.giveawayName}
            setGiveawayName={(value) => setFormData({ ...formData, giveawayName: value })}
            prizeDescription={formData.prizeDescription}
            setPrizeDescription={(value) => setFormData({ ...formData, prizeDescription: value })}
            photos={formData.photos}
            onPhotosChange={handlePhotosChange}
          />
        );

      case 'Condition':
        return (
          <ConditionStep
            participationConditions={formData.participationConditions}
            setParticipationConditions={(value) => setFormData({ ...formData, participationConditions: Array.isArray(value) ? value : [value] })}
            requiredCommunities={formData.requiredCommunities}
            setRequiredCommunities={(value) => setFormData({ ...formData, requiredCommunities: Array.isArray(value) ? value : [value] })}
            partnersTags={formData.partnersTags}  
            setPartnersTags={(value) => setFormData({ ...formData, partnersTags: Array.isArray(value) ? value : [value] })} 
            isPartners={formData.isPartners}
            setIsPartners={(value) => setFormData({ ...formData, isPartners: value })}
            numberWinners={formData.numberWinners}
            setNumberWinners={(value) => setFormData({ ...formData, numberWinners: value })}
            blackListSel={formData.blackListSel}
            setBlackListSel={(value) => setFormData({ ...formData, blackListSel: Array.isArray(value) ? value : [value] })}
            telegramChannel={formData.telegramChannel || []}
            setTelegramChannel={(value) => setFormData({ ...formData, telegramChannel: Array.isArray(value) ? value : [value] })}
            communityTagOptions={activeCommunityTags}
            blackListOptions={subscriberTags}
          />
        );

      case 'DateTime':
        return (
          <DateTimeStep
            endByParticipants={formData.endByParticipants}
            setEndByParticipants={value => setFormData(prev => ({ ...prev, endByParticipants: value }))}
            startDateTime={formData.startDateTime}
            setStartDateTime={value => setFormData(prev => ({ ...prev, startDateTime: value }))}
            endDateTime={formData.endDateTime}
            setEndDateTime={value => setFormData(prev => ({ ...prev, endDateTime: value }))}
            memberMax={formData.memberMax}
            setMemberMax={value => setFormData(prev => ({ ...prev, memberMax: value }))}
            isSelectedStartTime={formData.isSelectedStartTime}
            setIsSelectedStartTime={value => setFormData(prev => ({ ...prev, isSelectedStartTime: value }))}
            isSelectedEndTime={formData.isSelectedEndTime}
            setIsSelectedEndTime={value => setFormData(prev => ({ ...prev, isSelectedEndTime: value }))}

            startDateLabel={formData.startDateLabel}
            setStartDateLabel={value => setFormData(prev => ({ ...prev, startDateLabel: value }))}

            endDateLabel={formData.endDateLabel}
            setEndDateLabel={value => setFormData(prev => ({ ...prev, endDateLabel: value }))}
          />        
        );

      case 'Addons':
        return (
          <AddonsStep
            publishResults={formData.publishResults}
            setPublishResults={(value) => setFormData({ ...formData, publishResults: value })}
            hideParticipantsCount={formData.hideParticipantsCount}
            setHideParticipantsCount={(value) => setFormData({ ...formData, hideParticipantsCount: value })}
            onlySubscribers={formData.onlySubscribers}
            setOnlySubscribers={(value) => setFormData({ ...formData, onlySubscribers: value })}
            excludeMe={formData.excludeMe}
            setExcludeMe={(value) => setFormData({ ...formData, excludeMe: value })}
            excludeAdmins={formData.excludeAdmins}
            setExcludeAdmins={(value) => setFormData({ ...formData, excludeAdmins: value })}
          />
        );

      default:
        return null;
    }
  };

  // валидация даты начала и конца розыгрыша
  const canProceed = (() => {
    if (currentStep === 'DateTime') {
      if (formData.endByParticipants) {
        // По участникам: memberMax обязательно и > 0
        return !!formData.memberMax && Number(formData.memberMax) > 0;
      } else {
        // По дате: стандартная валидация дат
        return (
          !!formData.startDateTime &&
          !!formData.endDateTime &&
          validateDateTime(formData.startDateTime, formData.endDateTime)
        );
      }
    } else {
      return isStepComplete(currentStep, formData);
    }
  })();

  return (
    <Panel id={id} className={styles.panelOverride}>
      <PanelHeader
        before={
          <div onClick={(e) => handlePrevStep(e as any)} className={styles.backIcon}>
            <BackIcon />
          </div>
        }
        className={styles.panelHeaderOverride}
      >
        <PanelHeaderContent className={styles.panelHeaderContentOverride}>
          <span className={styles.panelHeaderText}>{CreateRaffleText_Panel}</span>
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.container}>
        <ProgressBadge type={currentStep} progress={progress} />

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formLayout}>{renderStepContent()}</div>

          {currentStep === 'General' && (
            <div className={styles.navigationContainer}>
              <button
                type="button"
                className={styles.nextButton}
                disabled={!isStepComplete(currentStep, formData)}
                onClick={handleNextStep}
              >
                <span className={styles.nextText}>Далее</span>
                <ChevronRightIcon />
              </button>
            </div>
          )}

          {currentStep !== 'General' && (
            <div className={styles.navigationContainer}>
              <button type="button" className={styles.backButton} onClick={handlePrevStep}>
                <ChevronLeftIcon />
                <span className={styles.buttonText}>Назад</span>
              </button>

              {currentStep !== 'Addons' ? (
                <button
                  type="button"
                  className={styles.nextButton2}
                  disabled={!canProceed}
                  onClick={handleNextStep}
                >
                  <span className={styles.buttonText}>Далее</span>
                  <ChevronRightIcon />
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.nextButton}
                  disabled={progress < 100}
                  onClick={() => routeNavigator.push("/previewpanel")}
                >
                  <span className={styles.buttonText}>Завершить</span>
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </Panel>
  );
};

export default CreateRaffle;