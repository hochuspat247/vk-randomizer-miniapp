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
import { useActiveCommunities, useCommunities } from '@/api/hooks';
import { VKApi } from '@/api/vkApi';

const EditRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  const nav = useRouteNavigator();
  const params = useParams();
  const raffleId = params?.id;

  // Состояние загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Все хуки
  const { formData, updateField, updateFields } = useFormData();
  const { currentStep, nextStep, prevStep }     = useSteps();
  const canProceed                              = useCanProceed(currentStep, formData);
  const progress                                = useProgress(formData);

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
    
    rafflesApi.getRaffleById(raffleId)
      .then((data) => {
        console.log('Raw API response:', data);
        
        // API возвращает {raffle: {...}}
        const raffle = data.raffle;
        console.log('Extracted raffle data:', raffle);
        
        if (!raffle) {
          throw new Error('Данные розыгрыша не найдены');
        }

        const comm = String(raffle.communityId);
        console.log('Community nickname for form:', comm);
        
        // Обновляем форму с данными с бэкенда
        const formUpdate = {
          community: comm,
          giveawayName: raffle.name || '',
          prizeDescription: raffle.description || '',
          photos: [],
          conditionOptions: [],
          communityTagOptions: [],
          participationConditions: [],
          requiredCommunities: [],
          communityPartnersTags: [],
          numberWinners: String(raffle.winnersCount || ''),
          blackListOptions: [],
          blackListSel: [],
          startDateTime: '',
          endDateTime: raffle.endTime || '',
          endByParticipants: raffle.mode === 'members',
          publishResults: false,
          onlySubscribers: false,
          isPartners: false,
          hideParticipantsCount: false,
          excludeMe: false,
          excludeAdmins: false,
          partnersTags: [],
          memberMax: raffle.memberCount || '',
          isSelectedStartTime: '',
          isSelectedEndTime: '',
          startDateLabel: '',
          endDateLabel: '',
        };
        
        console.log('Updating form with data:', formUpdate);
        updateFields({
        ...formUpdate,
        community: '',
      });
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
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Form data:', formData);
    // Возвращаемся к списку розыгрышей после завершения редактирования
    nav.push('/raffles');
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
            onPhotosChange={photos => updateField('photos', photos)}
            communityDisabled={true}
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

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formLayout}>
            {renderStepContent()}
          </div>

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
                type="button" 
                className={styles.nextButton}
                onClick={() => nav.push("/raffles")}
              >
                <span className={styles.buttonText}>Завершить</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </Panel>
  );
};

export default EditRaffle;
