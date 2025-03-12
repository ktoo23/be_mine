'use client';

import Image from 'next/image';
import styles from './main.module.scss';
import { PiCatFill, PiDogFill, PiHandsClapping } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const Main: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles['section-wrapper']}>
      <section className={styles['section-1']}>
        <h1 className="visually-hidden">메인 섹션</h1>
        <div className={styles.overlay}>
          <motion.div
            className={styles['main-title']}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span>
              <strong>B</strong>e <strong>M</strong>y <strong>F</strong>amily
            </span>
            <p>
              평생 함께할 가족을 찾아 떠나는 여정, <br />
              함께 해주실래요?
            </p>
          </motion.div>
        </div>
      </section>

      <section className={styles['section-2']}>
        <h1 className="visually-hidden">섹션2</h1>
        <figure className={styles['bg-img']}>
          <Image src="/images/sec2_bg.png" alt="" fill={true} priority />
          <figcaption className="visually-hidden">배경 이미지</figcaption>
        </figure>
        <motion.div className={styles.content}>
          <strong className={styles.title}>
            가족을 찾을 때까지만 <br />
            댁에 머물러도 될까요?
          </strong>
          <p className={styles.description}>
            유기동물의 약 절반이 죽음에 다다르는 냉혹한 현실. <br />
            <span className={styles.bold}>
              생명을 구하는 영웅이 되어주세요!
            </span>
          </p>
          <div className={styles['button-wrapper']}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              aria-label="강아지 임시보호하기"
              onClick={() => router.push('/foster')}
            >
              <p className={styles.icon}>
                <PiDogFill />
              </p>
              <span>
                내 주인이 <br />
                되어주세요!
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              aria-label="고양이 임시보호하기"
              onClick={() => router.push('/foster')}
            >
              <p className={styles.icon}>
                <PiCatFill />
              </p>
              <span>
                내 집사가 <br />
                되어주세요.
              </span>
            </motion.button>
          </div>
        </motion.div>
      </section>

      <section className={styles['section-3']}>
        <h1 className="visually-hidden">섹션3</h1>
        <figure className={styles['bg-img']}>
          <Image src="/images/sec3_bg.jpg" alt="" fill={true} priority />
          <figcaption className="visually-hidden">배경 이미지</figcaption>
        </figure>
        <div className={styles.content}>
          <strong className={styles.title}>
            생명을 구한 영웅들의 <br />
            후일담이 듣고 싶다면?
          </strong>
          <p className={styles.description}>
            그들의 이야기를 들어보세요! <br />
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            aria-label="임보 일기 보러가기"
            onClick={() => router.push('/diary')}
          >
            임보 일기 보러가기
          </motion.button>
        </div>
      </section>

      <section className={styles['section-4']}>
        <h1 className="visually-hidden">섹션4</h1>
        <div className={styles.content}>
          <motion.span
            className={styles.animation}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          >
            <PiHandsClapping />
          </motion.span>
          <strong className={styles.title}>
            잠깐! <br /> 임시보호가 필요한 이유
          </strong>

          <div className={styles['reason-cards']}>
            <div className={styles.card}>
              <h3 className={styles['card-title']}>현실</h3>
              <p>
                국내에서 한 해 23만 마리의 반려동물이 새 가족으로 등록되는 동안,
                한 편에서는 13만 마리가 버려집니다. 그리고 그 중 약 절반이 이른
                죽음을 맞이합니다.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles['card-title']}>문제</h3>
              <p>
                안타깝게도 현재 국내 유기동물 관리 시스템 상 인력과 자원의
                부족함으로 인해 많은 보호소에서 안락사를 시행하고 있습니다.
                하루에 입양가는 동물보다 버려지는 동물이 훨씬 많기에, 매일 수백
                마리의 동물들이 철창 안에서 이른 죽음을 맞이합니다.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles['card-title']}>희망</h3>
              <p>
                한 번 임보를 시작한 동물이 다시 길거리로 돌아가거나 안락사를
                당하는 확률은 매우 낮습니다. 소요되는 기간이 다를 뿐, 임보
                동물들은 결국에는 새 가족을 찾아갑니다.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles['card-title']}>해결</h3>
              <p>
                임시보호는 오늘 당장 한 생명을 구할 수 있는 가장 빠르고 확실한
                방법입니다. 충분한 시간과 여건만 갖춰진다면 모든 유기동물이 새
                가족을 찾아갈 수 있습니다.
              </p>
            </div>
          </div>

          <p className={styles.bold}>
            나로 인해 한 생명이 이 세상을 살아갈 기회가 주어진다면, 얼마나
            뿌듯한 일일까요?
          </p>
        </div>
      </section>
    </div>
  );
};

export default Main;
