import { useState } from 'react';

export function useImageViewer() {
  const [isViewerVisible, setViewerVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const openViewer = (index: number = 0) => {
    setInitialIndex(index);
    setViewerVisible(true);
  };

  const closeViewer = () => {
    setViewerVisible(false);
  };

  return { isViewerVisible, initialIndex, openViewer, closeViewer };
}