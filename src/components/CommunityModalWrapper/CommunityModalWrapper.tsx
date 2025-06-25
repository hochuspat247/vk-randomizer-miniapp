// src/components/CommunityModalCard/CommunityModalWrapper.tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useCommunityModals } from '@/hooks/useCommunityModals';
import styles from './CommunityModalWrapper.module.css';
import CommunityModalCard from '../CommunityModalCard/CommunityModalCard';

interface Props {
  onClose: () => void;
}

const CommunityModalWrapper: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<'select' | 'permission' | 'success'>('select');
  const [selected, setSelected] = useState('');
  const { data: modals, loading, error } = useCommunityModals();

  const selectMock = modals?.find(m => m.type === 'select');
  const permissionMock = modals?.find(m => m.type === 'permission');
  const successMock = modals?.find(m => m.type === 'success');

  const handleSelectSubmit = () => setStep('permission');
  const handlePermissionAllow = () => setStep('success');
  const handleBackToSelect = () => setStep('select');

  const modal = (
    <div className={styles.overlay} onClick={() => {
      onClose();
    }}>
      <div className={styles.cardWrapper} onClick={e => e.stopPropagation()}>
        {loading && <div style={{ padding: 24, textAlign: 'center' }}>Загрузка...</div>}
        {error && <div style={{ color: 'red', padding: 24, textAlign: 'center' }}>{error}</div>}
        {!loading && !error && step === 'select' && selectMock && (
          <CommunityModalCard
            type="select"
            placeholder={selectMock.placeholder}
            options={selectMock.options}
            value={selected}
            onChange={setSelected}
            onSubmit={handleSelectSubmit}
          />
        )}
        {!loading && !error && step === 'permission' && permissionMock && (
          <CommunityModalCard
            type="permission"
            communityName={permissionMock.communityName}
            communityAvatar={permissionMock.communityAvatar}
            subscribers={permissionMock.subscribers}
            onSubmit={handlePermissionAllow}
            onBack={handleBackToSelect}
          />
        )}
        {!loading && !error && step === 'success' && successMock && (
          <CommunityModalCard
            type="success"
            communityName={successMock.communityName}
            communityAvatar={successMock.communityAvatar}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default CommunityModalWrapper;
