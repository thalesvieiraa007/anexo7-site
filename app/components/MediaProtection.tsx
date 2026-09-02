'use client';

import { useEffect } from 'react';

function isMediaTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest('img, video, picture'));
}

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
}

export function MediaProtection() {
  useEffect(() => {
    const blockMediaMenu = (event: MouseEvent) => {
      if (isMediaTarget(event.target)) event.preventDefault();
    };

    const blockMediaDrag = (event: DragEvent) => {
      if (isMediaTarget(event.target)) event.preventDefault();
    };

    const blockSaveShortcut = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') event.preventDefault();
    };

    document.addEventListener('contextmenu', blockMediaMenu);
    document.addEventListener('dragstart', blockMediaDrag);
    window.addEventListener('keydown', blockSaveShortcut);

    return () => {
      document.removeEventListener('contextmenu', blockMediaMenu);
      document.removeEventListener('dragstart', blockMediaDrag);
      window.removeEventListener('keydown', blockSaveShortcut);
    };
  }, []);

  return null;
}
