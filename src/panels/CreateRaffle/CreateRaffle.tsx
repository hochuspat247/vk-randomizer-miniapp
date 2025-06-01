import React, { useState, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import Select from '../../components/Select/Select';
import styles from './CreateRaffle.web.module.css';
import Input from '../../components/Input/Input';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';
import BackIcon from '../../assets/icons/BackIcon';
import { CreateRaffleText_Panel } from '../../constants/Texts/CreateRaffleText';
import ProgressBadge from '../../components/ProgressBadge/ProgressBadge';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIconProps';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';

interface CreateRaffleProps {
  id: string;
}

type CreateRaffleStep = 'General' | 'Condition' | 'DateTime' | 'Addons';

const CreateRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [currentStep, setCurrentStep] = useState<CreateRaffleStep>('General');

  // Form states
  const [community, setCommunity] = useState('');
  const [giveawayName, setGiveawayName] = useState('');
  const [prizeDescription, setPrizeDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);

  const [showInPartners, setShowInPartners] = useState(false);
  const [isPartners, setIsPartners] = useState(false);
  const [numberWinners, setNumberWinners] = useState('');
  const [blackListSel, setBlackListSel] = useState<string[]>([]);

  const [publishResults, setPublishResults] = useState(false);
  const [hideParticipantsCount, setHideParticipantsCount] = useState(false);
  const [onlySubscribers, setOnlySubscribers] = useState(false);
  const [excludeMe, setExcludeMe] = useState(false);
  const [excludeAdmins, setExcludeAdmins] = useState(false);

  const communityOptions = ['Мемы дня', 'Игровые новости', 'Кулинарные рецепты'];
  const blackList = ['@klecke', '@,ldel', '@l;vl', '@klecke', '@,ldel', '@l;vl'];
  const [participationConditions, setParticipationConditions] = useState<string[]>([]);
  const [requiredCommunities, setRequiredCommunities] = useState<string[]>([]);

  const conditionOptions = [
    'лайк',
    'Сделать репост записи',
    'Оставить комментарий',
    'Отметить друзей',
  ];

  const communityTagOptions = ['@mscw_runclub', '@m_culture', '@mscw_runclub', '@m_culture'];

  useEffect(() => {
    let newProgress = 0;

    if (currentStep === 'General') {
      if (community) newProgress += 25;
      if (giveawayName.trim()) newProgress += 25;
      if (prizeDescription.trim()) newProgress += 25;
      if (photos.length > 0) newProgress += 25;
    }

    if (currentStep === 'Condition') {
      if (participationConditions.length > 0) newProgress += 25;
      if (requiredCommunities.length > 0) newProgress += 25;
      if (numberWinners.trim() !== '') newProgress += 25;
      if (blackListSel.length > 0) newProgress += 25;
    }

    if (currentStep === 'Addons') {
      if (publishResults) newProgress += 100;
      if (hideParticipantsCount) newProgress += 100;
      if (onlySubscribers) newProgress += 100;
      if (excludeAdmins) newProgress += 100;
    }

    setProgress(newProgress);
  }, [
    community,
    giveawayName,
    prizeDescription,
    photos,
    currentStep,
    participationConditions,
    requiredCommunities,
    numberWinners,
    blackListSel,
    publishResults,
    hideParticipantsCount,
    onlySubscribers,
    excludeAdmins,
  ]);

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('community', community);
    formData.append('giveawayName', giveawayName);
    formData.append('prizeDescription', prizeDescription);
    photos.forEach(photo => formData.append('photos', photo));

    console.log('Form data:', {
      community,
      giveawayName,
      prizeDescription,
      photosCount: photos.length,
    });
  };

  const handlePhotosChange = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'General':
        return (
          <>
            <div className={styles.formField}>
              <Select
                title="Сообщество проведения"
                placeholder="Выберите сообщество"
                options={communityOptions}
                onChange={setCommunity}
                value={community}
              />
            </div>

            <Input
              title="Название розыгрыша"
              placeholder="Введите название"
              type="input"
              value={giveawayName}
              onChange={(e) => setGiveawayName(e.target.value)}
            />

            <Input
              title="Описание приза"
              placeholder="Введите описание"
              type="textarea"
              value={prizeDescription}
              onChange={(e) => setPrizeDescription(e.target.value)}
            />

            <PhotoUpload
              onPhotosChange={handlePhotosChange}
              maxPhotos={3}
              initialPhotos={photos}
            />
          </>
        );

      case 'Condition':
        return (
          <div className={styles.conditionContainer}>
            <div className={styles.formField1}>
              <Select
                title="Обязательные условия участия"
                placeholder="Выберите условия"
                options={conditionOptions}
                onChange={setParticipationConditions}
                value={participationConditions}
                multiple={true}
              />
            </div>

            <div className={styles.formField2}>
              <Select
                title="Введите теги обязательных сообществ"
                placeholder="Выберите сообщества"
                options={communityTagOptions}
                onChange={setRequiredCommunities}
                value={requiredCommunities}
                multiple={true}
                allowInput={true}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <CustomCheckbox
                label="Отображать их в Партнерах"
                checked={showInPartners}
                onChange={setShowInPartners}
                showAdditionalIcon={true}
              />

              <CustomCheckbox
                label="Дополнительная опция"
                checked={isPartners}
                onChange={setIsPartners}
                showAdditionalIcon={false}
              />
            </div>

            <Input
              title="Количество победителей"
              placeholder="Введите количество"
              type="input"
              value={numberWinners}
              onChange={(e) => setNumberWinners(e.target.value)}
            />

            <div className={styles.selectCont}>
              <Select
                title="Черный список участников"
                placeholder="Выберите или введите тег"
                options={blackList}
                onChange={setBlackListSel}
                value={blackListSel}
                multiple={true}
                allowInput={true}
              />
            </div>
          </div>
        );

      case 'DateTime':
        return (
          <div>
            <h3>Шаг 3: Выбор победителей</h3>
          </div>
        );

      case 'Addons':
        return (
          <div className={styles.addonsContainer}>
            <span className={styles.addonsTitle}>Дополнительно</span>

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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Panel id={id} className={styles.panelOverride}>
      <PanelHeader
        before={
          <div onClick={(e) => handlePrevStep(e as any)} className={styles.backIcon}>
            <BackIcon />
          </div>
        }
        getHeaderClassName={() => styles.panelHeaderOverride}
        getContentClassName={() => styles.panelHeaderContentOverride}
      >
        <PanelHeaderContent>
          <span className={styles.panelHeaderText}>{CreateRaffleText_Panel}</span>
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.container}>
        <ProgressBadge type={currentStep} progress={progress} />

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formLayout}>{renderStepContent()}</div>

          {currentStep === 'General' && (
            <button
              type="button"
              className={styles.nextButton}
              disabled={progress < 100}
              onClick={handleNextStep}
            >
              <span className={styles.nextText}>Далее</span>
              <ChevronRightIcon />
            </button>
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
                  className={styles.nextButton}
                  // disabled={progress < 100}
                  onClick={handleNextStep}
                >
                  <span className={styles.buttonText}>Далее</span>
                </button>
              ) : (
                <button type="button" className={styles.nextButton}>
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