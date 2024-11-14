import React, { useEffect, useRef, useState } from 'react';

// throttle: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
export default function useThrottle(
  callback: () => void,
  delay: number = 3000,
) {
  const throttling = useRef(false);

  return () => {
    if (!throttling.current) {
      throttling.current = true;
      callback(); // 콜백 실행
      setTimeout(() => {
        throttling.current = false; // 일정 시간이 지난 후 다시 호출 가능하도록
      }, delay);
    }
  };
}
