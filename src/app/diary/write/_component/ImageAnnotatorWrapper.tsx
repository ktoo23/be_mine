'use client';

import { useState } from 'react';
import 'tldraw/tldraw.css';
import { ImageAnnotationEditor } from './ImageAnnotationEditor';
import { ImageExport } from './ImageExport';
import { ImagePicker } from './ImagePicker';
import { AnnotatorImage } from './types';

import styles from './image-annotator.module.scss';
import { PostForm } from './PostForm';

type Phase = 'pick' | 'annotate' | 'export' | 'form';

type State =
  | {
      phase: 'pick';
    }
  | {
      phase: 'annotate';
      id: string;
      image: AnnotatorImage;
    }
  | {
      phase: 'export';
      result: Blob;
    }
  | {
      phase: 'form';
      result: Blob;
    };

export default function ImageAnnotatorWrapper() {
  const [state, setState] = useState<State>({ phase: 'pick' });

  // 현재 단계에 따라 스텝 인디케이터 클래스 지정 함수
  const getStepClass = (stepPhase: Phase) => {
    const currentPhase = state.phase;

    if (stepPhase === currentPhase) {
      return `${styles.step} ${styles.active}`;
    } else if (
      (stepPhase === 'pick' &&
        ['annotate', 'export', 'form'].includes(currentPhase)) ||
      (stepPhase === 'annotate' && ['export', 'form'].includes(currentPhase)) ||
      (stepPhase === 'export' && currentPhase === 'form')
    ) {
      return `${styles.step} ${styles.completed}`;
    }

    return styles.step;
  };

  // 단계별 타이틀 텍스트
  const getPhaseTitle = () => {
    switch (state.phase) {
      case 'pick':
        return (
          <h2 className={styles.title}>
            <span className={styles.highlight}>일기 작성</span>를 위한 이미지
            선택
            <span className={styles.subtitle}>
              소중한 추억이 담긴 사진을 선택해 주세요
            </span>
          </h2>
        );
      case 'annotate':
        return (
          <h2 className={styles.title}>
            이미지를 <span className={styles.highlight}>마음껏 꾸며</span>
            보세요!
            <span className={styles.subtitle}>
              다양한 도구를 활용해 사진을 꾸밀 수 있어요
            </span>
          </h2>
        );
      case 'export':
        return (
          <h2 className={styles.title}>
            꾸며진 이미지 <span className={styles.highlight}>미리보기</span>
            <span className={styles.subtitle}>
              마음에 드시나요? 수정하거나 게시할 수 있어요
            </span>
          </h2>
        );
      case 'form':
        return (
          <h2 className={styles.title}>
            임보 일기 <span className={styles.highlight}>작성하기</span>
            <span className={styles.subtitle}>
              여러분의 소중한 이야기를 들려주세요
            </span>
          </h2>
        );
    }
  };

  // 모든 단계에 공통으로 표시되는 스텝 인디케이터
  const StepIndicator = () => (
    <div className={styles['step-indicator']}>
      <div className={getStepClass('pick')}>
        <div className={styles['step-number']}>1</div>
        <div className={styles['step-label']}>이미지 선택</div>
      </div>
      <div className={getStepClass('annotate')}>
        <div className={styles['step-number']}>2</div>
        <div className={styles['step-label']}>이미지 꾸미기</div>
      </div>
      <div className={getStepClass('export')}>
        <div className={styles['step-number']}>3</div>
        <div className={styles['step-label']}>미리보기</div>
      </div>
      <div className={getStepClass('form')}>
        <div className={styles['step-number']}>4</div>
        <div className={styles['step-label']}>게시하기</div>
      </div>
    </div>
  );

  switch (state.phase) {
    case 'pick':
      return (
        <div className={styles['image-annotator']}>
          <StepIndicator />
          {getPhaseTitle()}
          <ImagePicker
            onChooseImage={(image) =>
              setState({
                phase: 'annotate',
                image,
                id: Math.random().toString(36),
              })
            }
          />
        </div>
      );
    case 'annotate':
      return (
        <div className={styles['image-annotator']}>
          <StepIndicator />
          {getPhaseTitle()}
          <div className={styles['image-editor-container']}>
            <div className={styles['editor-header']}>
              <span className={styles['header-title']}>이미지 에디터</span>
              <span className={styles['tools-info']}>
                펜, 도형, 텍스트 도구를 활용해 보세요
              </span>
            </div>
            <ImageAnnotationEditor
              // remount tldraw if the image/id changes:
              key={state.id}
              image={state.image}
              onDone={(result) => setState({ phase: 'export', result })}
            />
          </div>
        </div>
      );
    case 'export':
      return (
        <div className={styles['image-annotator']}>
          <StepIndicator />
          {getPhaseTitle()}
          <ImageExport
            result={state.result}
            onMoveToForm={(result) => setState({ phase: 'form', result })}
            onStartAgain={() => setState({ phase: 'pick' })}
          />
        </div>
      );
    case 'form':
      return (
        <div className={styles['image-annotator']}>
          <StepIndicator />
          {getPhaseTitle()}
          <PostForm result={state.result} />;
        </div>
      );
  }
}
