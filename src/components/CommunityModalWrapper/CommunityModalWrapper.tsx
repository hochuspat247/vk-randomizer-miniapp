// src/components/CommunityModalCard/CommunityModalWrapper.tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { communityModalMocks } from '@/mocks/CommunityModalCardMocks';
import styles from './CommunityModalWrapper.module.css';
import CommunityModalCard from '../CommunityModalCard/CommunityModalCard';

interface Props {
  onClose: () => void;
}

const CommunityModalWrapper: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<'select' | 'permission' | 'success'>('select');
  const [selected, setSelected] = useState('');

  const selectMock     = communityModalMocks.find(m => m.type === 'select')!;
  const permissionMock = communityModalMocks.find(m => m.type === 'permission')!;
  const successMock    = communityModalMocks.find(m => m.type === 'success')!;

  const handleSelectSubmit    = () => setStep('permission');
  const handlePermissionAllow = () => setStep('success');
  const handleBackToSelect    = () => setStep('select');

  // Собираем всё в один узел
  const modal = (
    <div className={styles.overlay} onClick={() => {
    console.log('klkk');
    onClose();
  }}>
      <div className={styles.cardWrapper} onClick={e => e.stopPropagation()}>
        {step === 'select' && (
          <CommunityModalCard
            type="select"
            placeholder={selectMock.placeholder}
            options={selectMock.options}
            value={selected}
            onChange={setSelected}
            onSubmit={handleSelectSubmit}
          />
        )}
        {step === 'permission' && (
          <CommunityModalCard
            type="permission"
            communityName={selected}
            communityAvatar={permissionMock.communityAvatar}
            subscribers={permissionMock.subscribers}
            onSubmit={handlePermissionAllow}
            onBack={handleBackToSelect}
          />
        )}
        {step === 'success' && (
          <CommunityModalCard
            type="success"
            communityName={selected}
            communityAvatar={successMock.communityAvatar}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );

  // Портал “выносит” его прямо в <body>
  return ReactDOM.createPortal(modal, document.body);
};

export default CommunityModalWrapper;
