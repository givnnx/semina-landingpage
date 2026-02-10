import { getData } from '@/utils/fetchData';
import { EventData } from '@/components/molecules/EventCard';

export async function getDetailEvent(id: string): Promise<EventData | null> {
  try {
    const res = await getData(`api/v1/events/${id}`);
    if (res && res.data) {
        return res.data;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
