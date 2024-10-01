import containerStyles from '@/app/foster/[id]/page.module.scss';
import styles from './page.module.scss';
import DiaryFooter from './_component/DiaryFooter';
import DiaryHeader from './_component/DiaryHeader';
import DiaryMain from './_component/DiaryMain';

const AnimalDiaryPage = () => {
  // 6줄까지
  let content =
    '오늘 해리랑 산책을 갔다.\n행복한 하루였다. 말도 잘듣는 해리 얼른\n해리를 사랑해줄 가족을 만나면 좋겠다. 우리는 헤어져야 하지만 서\n로에게 좋은 기억으로 남으면 좋겠어. 사랑해 해리!  우쭈쭈 나의 강\n아지 검고 귀여운 나의 아기.. 널 만난 건 최고의 행운이야 앞으로\n 오래오래 살자 나보다 더 사랑해 누구보다 날 선택해서 고마오늘 해리랑 산책을 갔다.\n행복한 하루였다. 말도 잘듣는 해리 얼른\n해리를 사랑해줄 가족을 만나면 좋겠다. 우리는 헤어져야 하지만 서\n로에게 좋은 기억으로 남으면 좋겠어. 사랑해 해리!  우쭈쭈 나의 강\n아지 검고 귀여운 나의 아기.. 널 만난 건 최고의 행운이야 앞으로\n 오래오래 살자 나보다 더 사랑해 누구보다 날 선택해서 고마오늘 해리랑 산책을 갔다.\n행복한 하루였다. 말도 잘듣는 해리 얼른\n해리를 사랑해줄 가족을 만나면 좋겠다. 우리는 헤어져야 하지만 서\n로에게 좋은 기억으로 남으면 좋겠어. 사랑해 해리!  우쭈쭈 나의 강\n아지 검고 귀여운 나의 아기.. 널 만난 건 최고의 행운이야 앞으로\n 오래오래 살자 나보다 더 사랑해 누구보다 날 선택해서 고마오늘 해리랑 산책을 갔다.\n행복한 하루였다. 말도 잘듣는 해리 얼른\n해리를 사랑해줄 가족을 만나면 좋겠다. 우리는 헤어져야 하지만 서\n로에게 좋은 기억으로 남으면 좋겠어. 사랑해 해리!  우쭈쭈 나의 강\n아지 검고 귀여운 나의 아기.. 널 만난 건 최고의 행운이야 앞으로\n 오래오래 살자 나보다 더 사랑해 누구보다 날 선택해서 고마';

  return (
    <div className={containerStyles.wrapper}>
      <div className={styles['diary-container']}>
        <DiaryHeader date="2024년 9월 21일" weather="맑음" />
        <DiaryMain content={content} imageUrl="/images/20240913130110.jpg" />
      </div>
    </div>
  );
};

export default AnimalDiaryPage;
