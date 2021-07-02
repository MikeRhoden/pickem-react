import { useEffect } from 'react'
import { fetchEvent } from '../../services/activeEvent'

export default function FetchActiveEventWrapper({ setEvent }) {
    useEffect(() => {
        let mounted = true
            fetchEvent().then(data => {
                if (mounted) {     
                  if (data.id === '0-0') {
                    setEvent({ id: '0-0'})
                  } else {
                    const utcStart = new Date(data.Start)
                    const localStart = new Date( utcStart.getTime() - (utcStart.getTimezoneOffset() * 60000));
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