//ok so, the plan is to have all tags added in the Id meteoring
const key = "dc439c07940578bea7bddf0375c7074c";
const cityUrl = "https://api.openweathermap.org/data/2.5/weather?lat="

//ok so, idk why this is wrote in the end of the code, anyway we set
//a method, then we give it 2 functions in case of yes or not

const ifyes = here => {
    console.log(here)
    let {coords: { latitude, longitude, accuracy}} = here

    console.log(here, latitude, longitude, accuracy)
    aping(latitude, longitude)
}

const ifnot = nope => {
    console.log(nope)

    let missin = document.getElementById("meteoring")
    let err = document.createElement("h3")
    err.innerHTML = "sorry, autorize us"
    err.style.color=  "red";
    missin.appendChild(err)

}

const aping = (latitude,longitude) => {
    const complete = fetch( cityUrl + latitude + "&lon=" + longitude + "&appid=" + key );

//ok so, if we call:
//  complete.then(ini => console.log( ini.json() ) );
//  console.log(complete)
//we will get 2 promises, its a javascript pattern, it allow us to run asyncronous
//code easier and to handle errors, also time process
//we will get the first for a Json object
//while the second just for a response (which means the link)

    complete.then( yui => yui.json() ).then( lois => setmeteo(lois));
    complete.catch( noy => console.error(noy));
}

let num = 1;
let map = null;

const setmeteo = oggetto => {
    console.log(oggetto)
    const{
        main: { temp },
        name,
        weather: [{ icon }],
        sys: { country },
        coord: { lat,lon }
    } = oggetto;

    let containin = document.getElementById("meteoring");

    let niconico = document.createElement("div")
    niconico.innerHTML = name;

    let heat = document.createElement("h2")
    heat.innerHTML = Math.round(temp - 273.15) + "^";

    let immaggine = document.createElement("img")
    immaggine.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    let inni = document.createElement("h3")
    let dato = new Date()

    let minni = dato.getHours()
    let minni1 = dato.getMinutes()

    inni.innerHTML = minni + ":" + minni1;

    let giorno = document.createElement("h4")
    let datam = dato.getUTCDay()
    let mouss = dato.getUTCMonth()

    giorno.innerHTML = datam + "/" + mouss

    containin.appendChild(inni)
    containin.appendChild(giorno)
    containin.appendChild(immaggine)
    containin.appendChild(niconico)
    containin.appendChild(heat)

    console.log("welcome to " + name + " in " + country);
    
    let renderMap = () => {
        console.log("trying to get the map")
        mapboxgl.accessToken =
          "pk.eyJ1IjoidGhvbnluYXZhIiwiYSI6ImNrZzNsdWRhNDBidWMycHBhcTR1eGZyaTQifQ.okegKOUAoGX1DEegYhbFiQ";
        var map = new mapboxgl.Map({
          container: `map${num}`,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [lon, lat], // starting position [lng, lat]
          zoom: 9, // starting zoom
        });

        let marker1 = new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .addTo(map);

      };

    let structure = `
    <div class="card mt-4" style="width: 18rem;">
    
    <div id='map${num}' style='width: 100%; height: 300px;'></div>

        <div class="card-body">
            <h5 class="card-title">${temp}</h5>
            <img src="${"http://openweathermap.org/img/wn/" + icon + "@2x.png"}" alt="icon" class="img-thumbnail mx-auto border-0">
            <p class="card-text">${name}</p>
            <p class="card-text">${country}</p>
            <h5 class="card-title">${lat} and ${lon}</h5>
        </div>
    </div>`;

    let mappant = document.createElement("div");

    mappant.innerHTML = structure;
    containin.appendChild(mappant);
    renderMap()

}


navigator.geolocation.getCurrentPosition(ifyes, ifnot);

//ok so, we try for the button to add a different map 

let contenuto = document.getElementById("added")
let bottonato = document.getElementById("adbot")

///////////////////////////////////////////////////////////////////////////////
bottonato.addEventListener("click", function(){
    num++
    let citta = contenuto.value.trim().toLowerCase()
    console.log(citta)

    based = "https://api.openweathermap.org/data/2.5/weather?q="
    
    let aped = `${based}${citta}&appid=${key}`;

    const iniz = fetch(aped).then( boca => boca.json()).then( subs => mappened( subs )).catch( error => errorare(error))

    const errorare = (nie) => {
        console.log("the error worked")
        console.log(nie)
    }

    const mappened = (black) => {
        
        const {
            coord: { lon, lat},
            main: { temp },
            weather: [{ icon, main }],
            name
        } = black;

        let bodi = document.getElementById("meteoring")

        let calidud = document.createElement("div")
        calidud.innerHTML = "la temperatura è " + temp

        bodi.appendChild(calidud)

        let niconi = document.createElement("img")
        niconi.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        let noci = document.createElement("div")
        noci.innerHTML = "this is the icon for the day " + name;

        bodi.appendChild(niconi)
        bodi.appendChild(noci)

        const mapboxo = () => {
            mapboxgl.accessToken = 
                "pk.eyJ1IjoibWlzdGVybGludXgiLCJhIjoiY2tnams0OGtzMDhqejJ4bGxmdWhia255YSJ9.htJI3nLHJoB62eOycK9KMA";

            var mappat = new mapboxgl.Map({
                container: `map${num}`,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [lon,lat],
                zoom: 8,
            })

            let marker1 = new mapboxgl.Marker()
                .setLngLat([lon, lat])
                .addTo(mappat);

        }

        let plataf = `
            <div class="card mt-4" style="width: 18rem;">
            
            <div id='map${num}' style='width: 100%; height: 300px;'></div>
        
                <div class="card-body">
                    <h5 class="card-title">${temp}</h5>
                    <img src="${"http://openweathermap.org/img/wn/" + icon + "@2x.png"}" alt="icon" class="img-thumbnail mx-auto border-0">
                    <p class="card-text">${name}</p>
                    <p class="card-text">${main}</p>
                    <h5 class="card-title">${lat} and ${lon} and the main which was ${main}</h5>
                </div>

                <button
                    id="delli"
                    type="button"
                >
                        delete?
                </button>

            </div>`;

        let manolo = document.createElement("div");

        manolo.innerHTML = plataf;
        bodi.appendChild(manolo);
        mapboxo()
        num++
//ok so, if we have an id in the created html 
        let deleterio = document.getElementById("delli")

        deleterio.addEventListener("click", function(){
            console.log("dovrebbe delte")
            bodi.removeChild(manolo)
        }) 


    }
})





//let how to get the URL for the 

let botoning = document.getElementById("bottone")
let inserito = document.getElementById("inserir");

//using the botton stuff here

botoning.addEventListener("click", function(){
    let citta = inserito.value.trim().toLowerCase();
    based = "https://api.openweathermap.org/data/2.5/weather?q="

    console.log(citta)

    let aping = `${based}${citta}&appid=${key}`;

    const started = fetch(aping)

    started.then(oltr => oltr.json()).then(occ => gettinin(occ))

    const gettinin = (sick) => {
        console.log(sick)

        const {
            name, 
            coord:{lon, lat},
            weather:[{description, icon, main}],
            main:{temp},
        } = sick;

        console.log(temp)

        let exercisin = document.getElementById("insirin")

        let calidud = document.createElement("div")
        calidud.innerHTML = "la temperatura è " + temp

        exercisin.appendChild(calidud)

        let niconi = document.createElement("img")
        niconi.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        niconi.innerHTML = "this is the icon for the day"

        exercisin.appendChild(niconi)

//ok so, from here we start the map stuff
//ok so, we start we the function and the structure

        let numero = 2;

        const mappato = () => {
//ok so, this is where we use the link from html and token, with the long/lat and the map
//is used in the structure html after
            console.log("function working")
            mapboxgl.accessToken =
              "pk.eyJ1IjoibWlzdGVybGludXgiLCJhIjoiY2tnams0OGtzMDhqejJ4bGxmdWhia255YSJ9.htJI3nLHJoB62eOycK9KMA";
            var map = new mapboxgl.Map({
              container: `map${numero}`,
              style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
              center: [lon, lat], // used from objects
              zoom: 9, // bigger means closer
            });

            let marker1 = new mapboxgl.Marker()
                .setLngLat([lon, lat])
                .addTo(map);

            numero++;
        };

        let basin = `
        <div class="card mt-4" style="width: 18rem;">
        
        <div id='map${numero}' style='width: 100%; height: 300px;'></div>
    
            <div class="card-body">
                <h5 class="card-title">${temp}</h5>
                <img src="${"http://openweathermap.org/img/wn/" + icon + "@2x.png"}" alt="icon" class="img-thumbnail mx-auto border-0">
                <p class="card-text">${name}</p>
                <p class="card-text">${description}</p>
                <h5 class="card-title">${lat} and ${lon} and the main which was ${main}</h5>
            </div>
        </div>`;

        let manolo = document.createElement("div");

        manolo.innerHTML = basin;
        exercisin.appendChild(manolo);
        mappato()

    }
})



//ok so we start with the version
//after the navigator.geolocation.getCurrentPosition(function for the accepting, error message)
//ok so, the navigator still doesnt pass the geolocation object.
//we get the variables from the object without the json object yet
//after getting the json from showWeatherinfo we go trought the second option

//ok so, we both need the Id of the botton and the id from the form:

let viendo = document.getElementById("aver")
let presed = document.getElementById("abot")

abot.addEventListener("click", function (){
    //value from input
    let valot = aver.value.trim().toLowerCase() ;
    //base of the url
    based = "https://api.openweathermap.org/data/2.5/weather?q="
    
    console.log(valot)
    //we create the api to fetch later
    let aping = `${based}${valot}&appid=${key}`;

    const iniz = fetch(aping).then( boca => boca.json()).then( subs => mapped( subs )).catch( error => errorare(error))

    const errorare = (nie) => {
        console.log("the error worked")
        console.log(nie)
    }

    const mapped = (black) => {
        
        const {
            coord: { lon, lat},
            main: { temp },
            weather: [{ icon, main }],
            name
        } = black;

        let bodi = document.getElementById("lily")

        let calidud = document.createElement("div")
        calidud.innerHTML = "la temperatura è " + temp

        bodi.appendChild(calidud)

        let niconi = document.createElement("img")
        niconi.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        let noci = document.createElement("div")
        noci.innerHTML = "this is the icon for the day " + name;

        bodi.appendChild(niconi)
        bodi.appendChild(noci)

        var numeron = 3;

        const mapboxo = () => {
            mapboxgl.accessToken = 
                "pk.eyJ1IjoibWlzdGVybGludXgiLCJhIjoiY2tnams0OGtzMDhqejJ4bGxmdWhia255YSJ9.htJI3nLHJoB62eOycK9KMA";

            var mappat = new mapboxgl.Map({
                container: `map${numeron}`,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [lon,lat],
                zoom: 8,
            })

            let marker1 = new mapboxgl.Marker()
                .setLngLat([lon, lat])
                .addTo(mappat);

            numeron++;
        }

        let plataf = `
            <div class="card mt-4" style="width: 18rem;">
            
            <div id='map${numeron}' style='width: 100%; height: 300px;'></div>
        
                <div class="card-body">
                    <h5 class="card-title">${temp}</h5>
                    <img src="${"http://openweathermap.org/img/wn/" + icon + "@2x.png"}" alt="icon" class="img-thumbnail mx-auto border-0">
                    <p class="card-text">${name}</p>
                    <p class="card-text">${main}</p>
                    <h5 class="card-title">${lat} and ${lon} and the main which was ${main}</h5>
                </div>
            </div>`;

        

        let manolo = document.createElement("div");

        manolo.innerHTML = plataf;
        bodi.appendChild(manolo);
        mapboxo()

    }
})


/*
navigator.geolocation.getCurrentPosition(onSuccess, onError);

let arrCities = [];

const onError = error => {
    console.error(error.message);
    errorAlert(error.message);
};

const onSuccess = (located) => {
    console.log("indeeding")
    //let {coord: {latitude, longitude}} = located;
    callWeather(latitude, longitude);
    changeMap(latitude, longitude);
}

const changeMap = (lat, lon) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZ2VzcjkyIiwiYSI6ImNrZzhiNG8weTBma2syeW52dDNrbDh0bzgifQ.f17Czkz9pV4iYe33N9g0PQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: [lon, lat], 
        zoom: 9 
    });
    // const createMarker = new mapboxgl.Marker().setLgnLat([lon, lat]).addTo(map);
};

const callWeather = (lat, lon)=> {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`).then(response => onSuccesResponse(response)).catch(error => onError(error))
};

const onSuccesResponse = response => response.json().then(infoWeather => {
    weather = infoWeather;
    changeAll();
}).catch(error => onError(error));

const changeAll = (city = weather, isMyCity = true) => {
    const {main: {temp}} = city;
    const {name} = city;
    const {weather: [{icon, description}]} = city;
    const {sys: {country}} = city;
    changeIcon(icon, isMyCity);
    changeTemp(temp, isMyCity);
    changeTempDesc(description, isMyCity);
    changeLocation(name, country, isMyCity);
    pushFavorites(city);
    addFavorites()
};

const changeIcon = (icon, isMyCity) => {
    let id = "icon";
    if (!isMyCity) id = id.concat("Search");
    const imgIcon = document.getElementById(id);
    imgIcon.src = `${"http://openweathermap.org/img/wn/" + icon + "@2x.png"}`;
};

const changeTemp = (value, isMyCity) => {
    let id = "pTemp";
    if (!isMyCity) id = id.concat("Search");
    const pTemp = document.getElementById(id);
    pTemp.innerText = `${(value-273.15).toFixed(2)} °C`;
};

const changeTempDesc = (description, isMyCity) => {
    let id = "description";
    if (!isMyCity) id = id.concat("Search");
    const pDesc = document.getElementById(id);
    pDesc.innerText = fisrtCapital(description);
};

const fisrtCapital = (word) => {
    let words = word.split(" ");
    let results = words.map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1);
    });
    results =results.join(" ");
    return results
};

const changeLocation = (location, country, isMyCity) => {
    let id = "location";
    if (!isMyCity) id = id.concat("Search");
    const pLoc = document.getElementById(id)
    pLoc.innerText = `${location}, ${country}`;
};

const pushFavorites = (city) => {
    if (!arrCities.includes(city)) arrCities.push(city);
}

var numeron = 4;

const mapboxo = () => {
    mapboxgl.accessToken = 
        "pk.eyJ1IjoibWlzdGVybGludXgiLCJhIjoiY2tnams0OGtzMDhqejJ4bGxmdWhia255YSJ9.htJI3nLHJoB62eOycK9KMA";

    var mappat = new mapboxgl.Map({
        container: `map${numeron}`,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lon,lat],
        zoom: 8,
    })

    let marker1 = new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(mappat);

    numeron++;
}

let plataf = `
    <div class="card mt-4" style="width: 18rem;">
    
    <div id='map${numeron}' style='width: 100%; height: 300px;'></div>

        <div class="card-body">
            <h5 class="card-title">${temp}</h5>
            <img src="${"http://openweathermap.org/img/wn/" + icon + "@2x.png"}" alt="icon" class="img-thumbnail mx-auto border-0">
            <p class="card-text">${name}</p>
            <p class="card-text">${main}</p>
            <h5 class="card-title">${lat} and ${lon} and the main which was ${main}</h5>
        </div>
    </div>`;



let manolo = document.createElement("div");

manolo.innerHTML = plataf;
bodi.appendChild(manolo);
mapboxo()

*/