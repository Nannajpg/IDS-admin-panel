import {useSelector} from 'react-redux'

function useEventsOptions() {
    const events = useSelector(state => state.events.eventsAll);
    return events.map((event) => ({
        id: event.id,
        name: event.eventName,
    }));
}

export default useEventsOptions;