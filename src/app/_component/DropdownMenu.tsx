'use client';

import cn from 'classnames';

import styles from './dropdownMenu.module.scss';
import { LuLogOut } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';
import { useDropdownStore } from '@/store/dropdown';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface DropdownState {
  isOpen: boolean;
  setOpen(isOpen: boolean): void;
}
export const DropdownMenu = () => {
  let dropdownStore: DropdownState = useDropdownStore();
  const router = useRouter();

  return (
    <div
      className={
        dropdownStore.isOpen
          ? cn(styles['dropdown-menu'], styles['is-active'])
          : styles['dropdown-menu']
      }
    >
      <div
        className={styles['dropdown-menu-item']}
        onClick={() => {
          dropdownStore.setOpen(!dropdownStore.isOpen);
          router.replace('/profile');
        }}
      >
        <CgProfile />
        <span>내 프로필</span>
      </div>
      <div
        className={styles['dropdown-menu-item']}
        onClick={() => signOut({ redirectTo: '/' })}
      >
        <LuLogOut />
        <span>로그아웃</span>
      </div>
    </div>
  );
};
