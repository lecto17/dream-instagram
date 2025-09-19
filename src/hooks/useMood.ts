import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useMood() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsLoading(true);
    try {
      console.log('Selected mood:', selectedMood);
      setTimeout(() => {
        router.push('/mood/response');
      }, 1000);
    } catch (error) {
      console.error('Mood selection failed:', error);
    }
  };

  return { handleSubmit, selectedMood, setSelectedMood, isLoading };
}
