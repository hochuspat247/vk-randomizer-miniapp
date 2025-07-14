import React, { useEffect } from 'react';
import { Icon28AddOutline } from '@vkontakte/icons';
import styles from './PhotoUpload.module.css';

interface PhotoUploadProps {
  onPhotosChange?: (photos: File[]) => void;
  maxPhotos?: number;
  initialPhotos?: File[];
  previewUrls?: string[];
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotosChange,
  maxPhotos = 3,
  initialPhotos = [],
  previewUrls = [],
}) => {
  const [photoFiles, setPhotoFiles] = React.useState<File[]>(initialPhotos);
  const [filePreviews, setFilePreviews] = React.useState<string[]>([]);

  // Генерация превью только для локальных файлов
  useEffect(() => {
    // Генерируем превью только если нет previewUrls и есть локальные файлы
    if (photoFiles.length > 0 && (!previewUrls || previewUrls.length === 0)) {
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
        setFilePreviews(previews);
      };
      generatePreviews();
    } else if (!photoFiles.length) {
      setFilePreviews([]);
    }
  }, [photoFiles]); // Убираем previewUrls из зависимостей!

  useEffect(() => {
    if (photoFiles.length > 0) {
      onPhotosChange?.(photoFiles);
    }
    // eslint-disable-next-line
  }, [photoFiles]);

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

  // Показываем либо previewUrls (если есть), либо filePreviews
  const previewsToShow = (previewUrls && previewUrls.length > 0) ? previewUrls : filePreviews;

  return (
    <div className={styles.container}>
      <div className={styles.label}>Фото (до {maxPhotos} шт) *</div>
      <div className={styles.photosContainer}>
        {previewsToShow.map((preview, index) => (
          <div key={index} className={styles.photoWrapper}>
            <img
              src={preview}
              alt={`Фото ${index + 1}`}
              className={styles.photo}
            />
            {/* Кнопка удаления только для локальных файлов */}
            {(!previewUrls || previewUrls.length === 0) && (
              <button
                type='button'
                className={styles.removeButton}
                onClick={() => removePhoto(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
        {previewsToShow.length < maxPhotos && (!previewUrls || previewUrls.length === 0) && (
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