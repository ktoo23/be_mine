'use client';

import { Image as Iimage } from '@/model/Image';
import NextImage from 'next/image';
import cn from 'classnames';

import styles from './main.module.scss';
import { useEffect, useState } from 'react';

type Props = {
  image: Iimage;
};

export const DiaryImage = ({ image }: Props) => {
  const [orientation, setOrientation] = useState('landscape');

  useEffect(() => {
    const img = new Image();
    img.src = image.imageUrl;
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      if (aspectRatio > 1.33) {
        // 16:9 비율 기준으로 넓은 가로형
        setOrientation('landscape');
      } else if (aspectRatio >= 0.636 && aspectRatio < 0.75) {
        // 7:11 비율 (중간 정도의 세로형 비율)
        setOrientation('moderate-tall'); // 중간 세로형 비율
      } else if (aspectRatio > 0.75) {
        setOrientation('portrait'); // 일반적인 세로 비율 (4:3)
      } else {
        setOrientation('square'); // 정사각형
      }
    };
  }, [setOrientation]);

  return (
    <div className={cn(styles['diary-image'], styles[`${orientation}`])}>
      <NextImage
        sizes="(max-width: 720px) 350px, (max-width: 1420px) 617px, 555px"
        fill
        src={image.imageUrl}
        alt="동물 이미지"
      />
    </div>
  );
};
