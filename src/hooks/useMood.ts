import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';

export default function useMood() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent, channelId: string) => {
    e.preventDefault();
    if (!selectedMood) return;

    console.log('useMood handleSubmit channelId', channelId);

    setIsLoading(true);
    try {
      await fetch('/api/mood', {
        method: 'POST',
        body: JSON.stringify({ mood: selectedMood, channelId }),
      }).then(() => {
        router.push(`/channels/${channelId}/mood/response`);
      });
    } catch (error) {
      console.error('Mood selection failed:', error);
    }
  };

  return { handleSubmit, selectedMood, setSelectedMood, isLoading };
}
