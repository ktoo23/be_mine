'use client';

import React from 'react';
import Slider from 'react-slick';
import cn from 'classnames';
import { Image as Iimage } from '@/model/Image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './imageSlider.module.scss';

import { FosterImage } from './Image';

type Props = {
  images: Iimage[];
};

export const ImageSlider = ({ images }: Props) => {
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
        {images.map((image) => (
          <FosterImage key={image.imageId} image={image} />
        ))}
      </Slider>
    </div>
  );
};
