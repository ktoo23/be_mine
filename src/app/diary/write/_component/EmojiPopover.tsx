import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FaRegSmile } from 'react-icons/fa';
import styles from './editor.module.scss';
import cn from 'classnames';

interface EmojiPopoverProps {
  onEmojiSelect: (emoji: any) => void;
}

export const EmojiPopover = ({ onEmojiSelect }: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onOpenChange = () => {
    setPopoverOpen((prevState) => !prevState);
  };

  const onSelect = (emoji: any) => {
    onEmojiSelect(emoji);
    setPopoverOpen(false);
  };

  return (
    <>
      <button type="button" disabled={false} onClick={onOpenChange}>
        <FaRegSmile className={styles.icon} />
      </button>
      <div
        className={cn(
          styles.popover,
          popoverOpen ? styles['is-active'] : undefined,
        )}
      >
        <Picker data={data} onEmojiSelect={onSelect} />
      </div>
    </>
  );
};
