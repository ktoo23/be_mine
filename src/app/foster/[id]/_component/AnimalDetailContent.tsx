import styles from './animalDetailContent.module.scss';

export const AnimalDetailContent = () => {
  return (
    <div className={styles['animal-section-content']}>
      <strong className={styles.title}>구조사연</strong>
      <p className={styles.description}>
        2024. 1월 꼬물이시절 너랑이는같이잡혀온 나랑이와. 같이 피부병걸려서.
        안락사를 시키겠다고 주무관이 말을했습니다. 피부병은 치료하면
        낫을수있는데 치료도 해주지않고 안락사를 시키겠다해서 급히 구조하게
        되었고습니다. 그후 피부병깨끗이 나았습니다 사랑이 있는 가정에서 집밥
        먹여줄 엄빠. 간절히 찾고 있습니다. 도와주십시요
      </p>
      <strong className={styles.title}>성격 및 특징</strong>
      <p className={styles.description}>
        어미없이 보호소에 잡혀와 성장한 아이지만 사람좋아하고 매우 깨발랄한
        성격입니다..
      </p>
    </div>
  );
};
