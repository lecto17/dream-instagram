'use client';
import ScrollableBar from '../carousel/ScrollableBar';
import DatePresenter from './DatePresenter';
import { useRouter, useSearchParams } from 'next/navigation';
import { getDateYYYYMMDDWithDash } from '@/utils/utils';

const useDateList = () => {
  const router = useRouter();
  // const dateParam = useSearchParams().get('date');
  // const year = Number(dateParam?.slice(0, 4));
  // const month = Number(dateParam?.slice(4, 6));
  // const day = Number(dateParam?.slice(6, 8));
  // const date = new Date(`${year}-${month}-${day}`);

  const date = new Date();
  const dateParam = useSearchParams().get('date');

  // 주차 별로 고정된 날짜를 출력하는게 좋을지 고민 필요
  const getRecentDates = () => {
    const BEFORE_DAYS = 4;

    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - (BEFORE_DAYS - i));
      return newDate;
    });
  };

  const handleClick = (date: Date) => {
    const today = getDateYYYYMMDDWithDash(date).replaceAll('-', '');
    router.push(`?date=${today}`);
  };

  return { dates: getRecentDates(), dateParam, handleClick };
};

export default function DateList() {
  const { dates, dateParam, handleClick } = useDateList();

  return (
    <ScrollableBar
      sliderClass="w-full flex items-center"
      infinite={false}
    >
      {dates.map((_date, idx) => {
        const _formattedDate = getDateYYYYMMDDWithDash(_date).replaceAll(
          '-',
          '',
        );
        return (
          <DatePresenter
            key={idx}
            date={_date}
            onClick={() => handleClick(_date)}
            isSelected={_formattedDate === dateParam}
          />
        );
      })}
    </ScrollableBar>
  );
}
