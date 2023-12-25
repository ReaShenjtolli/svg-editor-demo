type EventData = {
    id: number, 
    event_type: string, 
    event_action: string
}

function saveEvents(events: EventData) {
    localStorage.setItem('svgEvents', JSON.stringify(events))
}

function getEvents() {
    let storedEvents = localStorage.getItem('svgEvents');
    return storedEvents ? JSON.parse(storedEvents) : null;
}


function generateInnerId(svgElement: string) {

    let currentEvents = getEvents();

    let maxId = currentEvents[svgElement] ?
        Math.max(...currentEvents[svgElement].map((event: EventData) => event.id || 0)) :
        0;

    return maxId + 1;
}

export function addOrModifyEvents(svgElement: string, eventData: EventData) {
    let currentEvents = getEvents();

    if (!eventData.id) {
        eventData.id = generateInnerId(svgElement);
    }

    if (!currentEvents[svgElement]) {
        currentEvents[svgElement] = [];
    }

    let eventIndex = currentEvents[svgElement].findIndex((event: EventData) => event.id === eventData.id);

    if (eventIndex >= 0) {
        currentEvents[svgElement][eventIndex] = eventData;
    } else {
        currentEvents[svgElement].push(eventData);
    }

    const events = currentEvents;
    saveEvents(events);
}


export function deleteEvent(svgElement: string, id: number) {
    let currentEvents = getEvents();

    if (currentEvents[svgElement]) {
        currentEvents[svgElement] = currentEvents[svgElement].filter((event: EventData) => !(event.id === id));
        const events = currentEvents;
        saveEvents(events);
    }
}

export function receiveEvents(svgElement: string) {
    let currentEvents = getEvents()

    return currentEvents[svgElement] ?? []
}

export function receiveAllEventType(svgElement: string) {
    let currentEvents = getEvents();
    const svgElementEvent = currentEvents[svgElement];

    if (!svgElementEvent) {
        return [];
    }

    return svgElementEvent.map((event: EventData) => event.event_type);
}