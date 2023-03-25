const req = new XMLHttpRequest();

const eventsList = document.getElementById('event-list');
const eventDetails = document.getElementById('event-details');
const spinner = document.getElementById('spinner');

const mainObjects = [eventsList, eventDetails, spinner];

// const homeRef = document.getElementById('home-ref');
// const eventSearch = document.getElementById('event-search');

const changeDisplayedDiv = (div) => {
    for (const o of mainObjects) {
        if (div === o) {
            o.classList.remove('hidden');
        } else {
            o.classList.add('hidden');
        }
    }
};

const getAllEvents = () => {
    req.onload = () => {
        changeDisplayedDiv(eventsList);
        processAllEventsData(req.responseText);
    };

    changeDisplayedDiv(spinner);
    const url = 'getjsondata.php';
    req.open('GET', url);
    req.send('');
};

const processAllEventsData = (res) => {
    const events = JSON.parse(res);

    for (const e of events) {
        const newEvent = document.createElement('li');
        newEvent.id = `event_${e.id}`;
        newEvent.classList.add('event');
        // TODO
        // newEvent.addEventListener('mouseover');

        newEvent.addEventListener('click', () => {
            req.onload = () => {
                processDetailedRequest(req.responseText);
            };

            const url = `getjsondata.php?id=${e.id}`;
            req.open('GET', url);
            req.send('');
        });

        newEvent.innerHTML = `
            <h1>${e.name}</h1>
            `;

        eventsList.appendChild(newEvent);
    }
};

const processDetailedRequest = (res) => {
    const event = JSON.parse(res)[0];

    changeDisplayedDiv(eventDetails);

    eventDetails.innerHTML = `
        <h1>${event.name}</h1>
        <p>${event.day}</p>
        <p>${event.month}</p>
        <p>${event.time}</p>
        <p>${event.category}</p>
        <p>${event.location}</p>
        <p>${event.notes}</p>
        `;

    const getWeatherButton = document.createElement('button');
    getWeatherButton.innerText = 'Get Weather';

    getWeatherButton.addEventListener('click', () => {
        const split = event.lon_lat.split(', ');
        const lat = split[0];
        const lon = split[1];

        console.log(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=020988c9e74cdbae26c47980fd637d35`
        );

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=020988c9e74cdbae26c47980fd637d35`
        )
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
            });
        // TODO catch
    });

    eventDetails.appendChild(getWeatherButton);
};

getAllEvents();
