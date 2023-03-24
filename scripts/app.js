const req = new XMLHttpRequest();

const eventsList = document.getElementById('events');
const eventDetails = document.getElementById('event-details');

// const homeRef = document.getElementById('home-ref');
const eventSearch = document.getElementById('event-search');

const processDetailedRequest = (res) => {
    const event = JSON.parse(res)[0];

    eventsList.style.display = 'none';
    eventDetails.style.display = 'block';

    eventDetails.innerHTML = `
        <h1>${event.name}</h1>
        <p>${event.day}</p>
        <p>${event.month}</p>
        <p>${event.time}</p>
        <p>${event.category}</p>
        <p>${event.location}</p>
        <p>${event.notes}</p>
        `;
};

const processInitialRequest = (res) => {
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

const getInitialData = () => {
    req.onload = () => {
        processInitialRequest(req.responseText);
    };

    const url = 'getjsondata.php';
    req.open('GET', url);
    req.send('');
};

// homeRef.addEventListener('click', (e) => {
//     e.preventDefault();

//     eventsList.style.display = 'block';
//     eventDetails.style.display = 'none';
// });

// eventSearch.addEventListener('input', (e) => {
//     e.preventDefault();

//     if (eventSearch.value === '') {
//         for (const event of eventsList) {
//             event.style.display = 'block';
//         }
//         return;
//     }

//     for (const event of eventsList) {
//         h1 = document.querySelector('h1');
//         eventName = h1.innerText;

//         if (eventName.toLowerCase().includes(eventSearch.value.toLowerCase())) {
//             event.style.display = 'block';
//         }
//         else {
//             event.style.display = 'none';
//         }
//     }
// });

getInitialData();
