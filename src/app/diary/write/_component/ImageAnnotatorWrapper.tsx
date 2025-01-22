'use client';
import { useState } from 'react';
import 'tldraw/tldraw.css';
import { ImageAnnotationEditor } from './ImageAnnotationEditor';
import { ImageExport } from './ImageExport';
import { ImagePicker } from './ImagePicker';
import { AnnotatorImage } from './types';

import styles from './image-annotator.module.scss';
import { PostForm } from './PostForm';

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

  switch (state.phase) {
    case 'pick':
      return (
        <div>
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
          <p className={styles.title}>게시할 이미지를 마음껏 꾸며보세요!</p>
          <ImageAnnotationEditor
            // remount tldraw if the image/id changes:
            key={state.id}
            image={state.image}
            onDone={(result) => setState({ phase: 'export', result })}
          />
        </div>
      );
    case 'export':
      return (
        <div className={styles['image-annotator']}>
          <ImageExport
            result={state.result}
            onMoveToForm={(result) => setState({ phase: 'form', result })}
            onStartAgain={() => setState({ phase: 'pick' })}
          />
        </div>
      );
    case 'form':
      return <PostForm result={state.result} />;
  }
}
