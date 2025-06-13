import React, { useEffect } from 'react';
import { Icon28AddOutline } from '@vkontakte/icons';
import styles from './PhotoUpload.module.css';

interface PhotoUploadProps {
  onPhotosChange?: (photos: File[]) => void;
  maxPhotos?: number;
  initialPhotos?: File[]; // Добавляем пропс для начальных фото
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  onPhotosChange, 
  maxPhotos = 3,
  initialPhotos = []
}) => {
  const [photoFiles, setPhotoFiles] = React.useState<File[]>(initialPhotos);
  const [photoPreviews, setPhotoPreviews] = React.useState<string[]>([]);

  // Генерация превью для фото
  useEffect(() => {
    const generatePreviews = async () => {
      const previews = await Promise.all(
        photoFiles.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve(event.target?.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      );
      setPhotoPreviews(previews);
    };

    generatePreviews();
  }, [photoFiles]);

  useEffect(() => {
    onPhotosChange?.(photoFiles);
  }, [photoFiles, onPhotosChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newFiles = [...photoFiles];
      
      files.slice(0, maxPhotos - photoFiles.length).forEach(file => {
        newFiles.push(file);
      });
      
      setPhotoFiles(newFiles);
    }
  };

  const removePhoto = (index: number) => {
    const newFiles = [...photoFiles];
    newFiles.splice(index, 1);
    setPhotoFiles(newFiles);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>Фото (до {maxPhotos} шт) *</div>
      
      <div className={styles.photosContainer}>
        {photoPreviews.map((preview, index) => (
          <div key={index} className={styles.photoWrapper}>
            <img 
              src={preview} 
              alt={`Фото ${index + 1}`} 
              className={styles.photo}
            />
            <button 
              type='button'
              className={styles.removeButton}
              onClick={() => removePhoto(index)}
            >
              ×
            </button>
          </div>
        ))}
        
        {photoPreviews.length < maxPhotos && (
          <label className={styles.uploadButton}>
            <Icon28AddOutline />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;