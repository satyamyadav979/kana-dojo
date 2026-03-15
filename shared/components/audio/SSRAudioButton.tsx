'use client';
import { useState, useEffect } from 'react';
import AudioButton from './AudioButton';
import { useAudioPreferences } from '@/features/Preferences';

interface SSRAudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'icon-only';
  disabled?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
  autoPlay?: boolean;
  autoPlayTrigger?: string | number;
}

const SSRAudioButton: React.FC<SSRAudioButtonProps> = props => {
  const [isClient, setIsClient] = useState(false);
  const { pronunciationEnabled } = useAudioPreferences();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render during SSR to prevent hydration mismatches
  if (!isClient) {
    return null;
  }

  if (!pronunciationEnabled) {
    return null;
  }

  // Temporarily disabled
  return null;
};

export default SSRAudioButton;
