'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Tldraw,
  TldrawUiIcon,
  track,
  useDefaultHelpers,
  useEditor,
  useRelevantStyles,
  DefaultTextAlignStyle,
  DefaultFontStyle,
  DefaultColorStyle,
  TldrawUiPopover,
  TldrawUiPopoverTrigger,
  TldrawUiPopoverContent,
} from 'tldraw';
import 'tldraw/tldraw.css';
import styles from './editor.module.scss';

import { TbPointer } from 'react-icons/tb';
import {
  LuAlignCenter,
  LuAlignLeft,
  LuPencil,
  LuAlignRight,
} from 'react-icons/lu';
import { BsEraser } from 'react-icons/bs';
import { IoTextOutline } from 'react-icons/io5';
import { IoImageOutline } from 'react-icons/io5';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { IconType } from 'react-icons';
import { useStyleChangeCallback } from '@/hooks/useStyleChangeCallback';

const CustomUi = track(() => {
  const editor = useEditor();
  const helpers = useDefaultHelpers();
  const cstyles = useRelevantStyles();

  // 스크롤 이벤트 막기
  useEffect(() => {
    if (!editor) return;
    editor.run(() => {
      editor.setCameraOptions({
        wheelBehavior: 'none',
      });
      editor.setCamera(editor.getCamera(), { reset: true });
    });
  }, [editor]);

  return (
    <>
      <div className={styles['custom-layout']}>
        <div className={styles['custom-toolbar']}>
          <button
            className={styles['custom-button']}
            data-isactive={editor.getCurrentToolId() === 'select'}
            onClick={() => editor.setCurrentTool('select')}
          >
            <TbPointer className={styles.icon} />
          </button>
          <button
            className={styles['custom-button']}
            data-isactive={editor.getCurrentToolId() === 'draw'}
            onClick={() => editor.setCurrentTool('draw')}
          >
            <LuPencil className={styles.icon} />
          </button>
          <button
            className={styles['custom-button']}
            data-isactive={editor.getCurrentToolId() === 'eraser'}
            onClick={() => editor.setCurrentTool('eraser')}
          >
            <BsEraser className={styles.icon} />
          </button>
          <button
            className={styles['custom-button']}
            data-isactive={editor.getCurrentToolId() === 'text'}
            onClick={() => editor.setCurrentTool('text')}
          >
            <IoTextOutline className={styles.icon} />
          </button>
          <button
            className={styles['custom-button']}
            onClick={() => helpers.insertMedia()}
          >
            <IoImageOutline className={styles.icon} />
          </button>
        </div>
      </div>
      <CustomStylePanel cstyles={cstyles} />
    </>
  );
});

interface Props {
  cstyles: ReturnType<typeof useRelevantStyles>;
}

const CustomStylePanel = ({ cstyles }: Props) => {
  if (!cstyles) return null;

  //<DefaultStylePanel>이 있지만 style을 custom할 수 없는 것 같아서 직접 css 적용
  return (
    <div className={styles['custom-style-panel']}>
      <div className={styles['custom-style-panel-content']}>
        <TextPickerButton cstyles={cstyles} />
        <ColorPickerButton cstyles={cstyles} />
        <AlignStylePicker cstyles={cstyles} />
      </div>
    </div>
  );
};

const ColorPickerButton = ({ cstyles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TldrawUiPopover id="colors" open={isOpen}>
      <TldrawUiPopoverTrigger>
        <button
          className={styles['custom-button']}
          onBlur={() => setIsOpen(false)}
        >
          <IoColorPaletteSharp className={styles.icon} />
        </button>
      </TldrawUiPopoverTrigger>
      <TldrawUiPopoverContent side="top" align="start">
        <ColorStylePicker cstyles={cstyles} />
      </TldrawUiPopoverContent>
    </TldrawUiPopover>
  );
};

const ColorStylePicker = ({ cstyles }: Props) => {
  const color = cstyles?.get(DefaultColorStyle);
  const handleValueChange = useStyleChangeCallback();
  const colors = [
    { value: 'black', icon: 'color' },
    { value: 'grey', icon: 'color' },
    { value: 'blue', icon: 'color' },
    { value: 'light-blue', icon: 'color' },
    { value: 'yellow', icon: 'color' },
    { value: 'orange', icon: 'color' },
    { value: 'green', icon: 'color' },
    { value: 'light-green', icon: 'color' },
    { value: 'red', icon: 'color' },
    { value: 'white', icon: 'color' },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const handleScrollToEnd = () => {
    if (sliderRef.current) {
      const maxScrollLeft =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth; // 최대 스크롤 위치 계산
      sliderRef.current.scrollLeft = maxScrollLeft; // 스크롤 위치를 맨 끝으로 이동
    }
  };

  const handleResetPosition = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  };

  return (
    <>
      {color !== undefined && (
        <div
          className={styles['color-style-panel']}
          id="color-style-panel"
          ref={sliderRef}
        >
          {colors.map((item) => (
            <button
              onClick={() => handleValueChange(DefaultColorStyle, item.value)}
              className={styles['color-button']}
              key={item.value}
            >
              <div
                className={styles['color-icon']}
                style={{
                  backgroundColor: item.value.replace('-', ''),
                  border:
                    color?.type === 'shared' && color.value === item.value
                      ? '4px solid #fff'
                      : '2px solid #fff',
                }}
              ></div>
            </button>
          ))}
          <div className={styles['slider-container']}>
            <button
              onClick={handleResetPosition}
              className={styles.slider}
            ></button>
            <button
              onClick={handleScrollToEnd}
              className={styles.slider}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

const TextPickerButton = ({ cstyles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TldrawUiPopover id="fonts" open={isOpen}>
      <TldrawUiPopoverTrigger>
        <button
          className={`${styles['custom-button']} ${
            isOpen ? styles['is-active'] : ''
          }`}
          onBlur={() => {
            setIsOpen(false);
          }}
        >
          <IoTextOutline className={styles.icon} />
        </button>
      </TldrawUiPopoverTrigger>
      <TldrawUiPopoverContent side="top" align="start">
        <TextStylePicker cstyles={cstyles} />
      </TldrawUiPopoverContent>
    </TldrawUiPopover>
  );
};

const TextStylePicker = ({ cstyles }: Props) => {
  const fonts = [
    { value: 'draw', icon: 'font-draw' },
    { value: 'sans', icon: 'font-sans' },
    { value: 'serif', icon: 'font-serif' },
    { value: 'mono', icon: 'font-mono' },
  ];
  const handleValueChange = useStyleChangeCallback();
  const font = cstyles?.get(DefaultFontStyle);

  return (
    <>
      <div className={styles['text-style-panel']}>
        {fonts.map((item) => (
          <button
            key={item.value}
            className={`${styles['font-button']} ${
              (font?.type === 'shared' && font.value) === item.value
                ? styles['is-active']
                : ''
            }`}
            onClick={() => handleValueChange(DefaultFontStyle, item.value)}
          >
            <TldrawUiIcon icon={item.icon} className={styles['font-icon']} />
          </button>
        ))}
      </div>
    </>
  );
};

const AlignStylePicker = ({ cstyles }: Props) => {
  return (
    <>
      <TextAlignButton value="end" icon={LuAlignRight} cstyles={cstyles} />
      <TextAlignButton value="middle" icon={LuAlignCenter} cstyles={cstyles} />
      <TextAlignButton value="start" icon={LuAlignLeft} cstyles={cstyles} />
    </>
  );
};

interface TextAlignButtonProps extends Props {
  value: 'end' | 'middle' | 'start';
  icon: IconType;
}

const TextAlignButton = ({
  cstyles,
  value,
  icon: Icon,
}: TextAlignButtonProps) => {
  const align = cstyles?.get(DefaultTextAlignStyle);
  const isActive = align?.type === 'shared' && align.value === value;
  const handleValueChange = useStyleChangeCallback();
  // styles를 부모 따로 자식 따로 구했더니 속성이 공유가 안됨.. 자식에게 전달해야 함

  return (
    <button
      className={`${styles['custom-button']} ${
        isActive ? styles['is-active'] : ''
      }`}
      onClick={() => handleValueChange(DefaultTextAlignStyle, value)}
    >
      <Icon className={styles.icon} />
    </button>
  );
};

const CanvasEditor = () => {
  // 동적으로 배경화면 지정
  const handleMount = () => {
    const backgroundElement = document.querySelector(
      '.tl-background',
    ) as HTMLDivElement;
    if (backgroundElement) {
      backgroundElement.style.backgroundImage =
        "url('/images/20240913130110.jpg')";
      backgroundElement.style.backgroundSize = 'cover';
      backgroundElement.style.backgroundPosition = 'center';
      backgroundElement.style.backgroundRepeat = 'no-repeat';
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '400px',
        height: '600px',
        inset: 100,
      }}
      className={styles.editor}
    >
      <Tldraw persistenceKey="example" hideUi onMount={handleMount}>
        <CustomUi />
      </Tldraw>
    </div>
  );
};

export default CanvasEditor;
