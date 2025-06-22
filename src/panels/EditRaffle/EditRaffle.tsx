// src/components/EditRaffle/EditRaffle.tsx
import React from 'react';
import { Panel, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

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

const EditRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  const nav = useRouteNavigator();

  // Все хуки
  const { formData, updateField, updateFields } = useFormData();
  const { currentStep, nextStep, prevStep }     = useSteps();
  const canProceed                              = useCanProceed(currentStep, formData);
  const progress                                = useProgress(formData);

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
    nav.push('/');
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
            communityOptions={formData.communityOptions}
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
            showInPartners={formData.showInPartners}
            setShowInPartners={v => updateField('showInPartners', v)}
            isPartners={formData.isPartners}
            setIsPartners={v => updateField('isPartners', v)}
            numberWinners={formData.numberWinners}
            setNumberWinners={v => updateField('numberWinners', v)}
            blackListSel={formData.blackListSel}
            setBlackListSel={v => updateField('blackListSel', v)}
            conditionOptions={formData.conditionOptions}
            communityTagOptions={formData.communityTagOptions}
            communityPartnersTags={formData.communityPartnersTags}
            blackListOptions={formData.blackListOptions}
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
        getHeaderClassName={() => styles.panelHeaderOverride}
        getContentClassName={() => styles.panelHeaderContentOverride}
      >
        <PanelHeaderContent>
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
              <button type="submit" className={styles.nextButton}>
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
