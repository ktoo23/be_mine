'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import cn from 'classnames';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './imageSlider.module.scss';

export const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
  };
  return (
    <div className={cn('slider-container', styles.container)}>
      <Slider {...settings}>
        <div className={styles['image-card']}>
          <Image
            src="/images/20240913130110.jpg"
            alt="동물 이미지"
            width={16} // 16:9 비율
            height={9}
            layout="responsive" // 반응형으로 크기 조정
          />
        </div>
        <div className={styles['image-card']}>
          <Image
            src="/images/20240913130110.jpg"
            alt="동물 이미지"
            width={16}
            height={9}
            layout="responsive"
          />
        </div>
        <div className={styles['image-card']}>
          <Image
            src="/images/20240913130110.jpg"
            alt="동물 이미지"
            width={16}
            height={9}
            layout="responsive"
          />
        </div>
      </Slider>
    </div>
  );
};
