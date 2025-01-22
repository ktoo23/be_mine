'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
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
  exportToBlob,
  TLShapeId,
} from 'tldraw';
import 'tldraw/tldraw.css';
import styles from './canvas-editor.module.scss';
import { FaArrowRight } from 'react-icons/fa6';

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

interface CustomTldrawEditorProps {
  imageShapeId: TLShapeId;
  onDone(result: Blob): void;
}

const CustomTldrawEditor = track(
  ({ imageShapeId, onDone }: CustomTldrawEditorProps) => {
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
              type="button"
              className={styles['custom-button']}
              data-isactive={editor.getCurrentToolId() === 'select'}
              onClick={() => editor.setCurrentTool('select')}
            >
              <TbPointer className={styles.icon} />
            </button>
            <button
              type="button"
              className={styles['custom-button']}
              data-isactive={editor.getCurrentToolId() === 'draw'}
              onClick={() => editor.setCurrentTool('draw')}
            >
              <LuPencil className={styles.icon} />
            </button>
            <button
              type="button"
              className={styles['custom-button']}
              data-isactive={editor.getCurrentToolId() === 'eraser'}
              onClick={() => editor.setCurrentTool('eraser')}
            >
              <BsEraser className={styles.icon} />
            </button>
            <button
              type="button"
              className={styles['custom-button']}
              data-isactive={editor.getCurrentToolId() === 'text'}
              onClick={() => editor.setCurrentTool('text')}
            >
              <IoTextOutline className={styles.icon} />
            </button>
            <button
              type="button"
              className={styles['custom-button']}
              onClick={() => helpers.insertMedia()}
            >
              <IoImageOutline className={styles.icon} />
            </button>
            <DoneButton imageShapeId={imageShapeId} onClick={onDone} />
          </div>
        </div>
        <CustomStylePanel cstyles={cstyles} />
      </>
    );
  },
);

const DoneButton = ({
  imageShapeId,
  onClick,
}: {
  imageShapeId: TLShapeId;
  onClick(result: Blob): void;
}) => {
  const editor = useEditor();

  return (
    <>
      <button
        className={styles['custom-button']}
        onClick={async () => {
          const blob = await exportToBlob({
            editor,
            ids: Array.from(editor.getCurrentPageShapeIds()),
            format: 'png',
            opts: {
              background: false, // true로 했더니 잘려진 에디터까지 같이 보였음 ㅠㅠㅠ
              bounds: editor.getShapePageBounds(imageShapeId)!,
              padding: 0,
              scale: 1,
            },
          });
          onClick(blob!);
        }}
      >
        <FaArrowRight className={styles.icon} />
      </button>
    </>
  );
};

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
          type="button"
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
              type="button"
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
              type="button"
              onClick={handleResetPosition}
              className={styles.slider}
            ></button>
            <button
              type="button"
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
          type="button"
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
            type="button"
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
      type="button"
      className={`${styles['custom-button']} ${
        isActive ? styles['is-active'] : ''
      }`}
      onClick={() => handleValueChange(DefaultTextAlignStyle, value)}
    >
      <Icon className={styles.icon} />
    </button>
  );
};

export default CustomTldrawEditor;
