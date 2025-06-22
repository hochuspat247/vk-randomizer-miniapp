// src/components/CommunityModalCard/CommunityModalWrapper.tsx
import React, { useState } from 'react';
import { communityModalMocks } from '@/mocks/CommunityModalCardMocks';
import styles from './CommunityModalWrapper.module.css';
import CommunityModalCard from '../CommunityModalCard/CommunityModalCard';

interface Props {
  /** Закрыть модалку (клик по фону или по вашей кнопке) */
  onClose: () => void;
}

const CommunityModalWrapper: React.FC<Props> = ({ onClose }) => {
  /** Шаг мастера */
  const [step, setStep] = useState<'select' | 'permission' | 'success'>('select');
  /** Выбранное сообщество */
  const [selected, setSelected] = useState('');

  const selectMock     = communityModalMocks.find(m => m.type === 'select')!;
  const permissionMock = communityModalMocks.find(m => m.type === 'permission')!;
  const successMock    = communityModalMocks.find(m => m.type === 'success')!;

  const handleSelectSubmit    = () => setStep('permission');
  const handlePermissionAllow = () => setStep('success');
  const handleBackToSelect    = () => setStep('select');

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Клики по карточке не закрывают модалку */}
      <div className={styles.cardWrapper} onClick={e => e.stopPropagation()}>
        {/* STEP 1 — выбор сообщества */}
        {step === 'select' && (
          <CommunityModalCard
            type="select"
            placeholder={selectMock.placeholder}
            options={selectMock.options}
            value={selected}
            onChange={setSelected}
            /** Кнопка «Подключить» */
            onSubmit={handleSelectSubmit}
          />
        )}

        {/* STEP 2 — разрешения */}
        {step === 'permission' && (
          <CommunityModalCard
            type="permission"
            communityName={selected}
            communityAvatar={permissionMock.communityAvatar}
            subscribers={permissionMock.subscribers}
            /** Кнопка «Разрешить» */
            onSubmit={handlePermissionAllow}
            /** «Другое сообщество» */
            onBack={handleBackToSelect}
          />
        )}

        {/* STEP 3 — успех */}
        {step === 'success' && (
          <CommunityModalCard
            type="success"
            communityName={selected}
            communityAvatar={successMock.communityAvatar}
          />
        )}
      </div>
    </div>
  );
};

export default CommunityModalWrapper;
