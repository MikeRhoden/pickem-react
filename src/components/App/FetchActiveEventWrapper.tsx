import { useEffect } from 'react'
import { IEvent } from '../../models/IEvent'
import { fetchEvent } from '../../services/activeEvent'

interface IFetchActiveEventWrapper {
  setEvent: React.Dispatch<React.SetStateAction<IEvent>>;
}

export default function FetchActiveEventWrapper(props: IFetchActiveEventWrapper): null {
  const setEvent = props.setEvent
  useEffect(() => {
    let mounted = true
    fetchEvent().then(data => {
      if (mounted) {
        if (data.id === '0-0') {
          setEvent({ id: '0-0', maxUnits: 0, start: new Date(), name: '' })
        } else {
          const utcStart = new Date(data.Start)
          const localStart = new Date(utcStart.getTime() - (utcStart.getTimezoneOffset() * 60000));
          setEvent({
            id: data.EventId,
            start: localStart,
            maxUnits: data.MaxUnits,
            name: data.Name
          })
        }
      }
    })
    return () => {
      mounted = false
    }
  }, [setEvent])
  return null;
}