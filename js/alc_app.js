/**
* Author: Adenagbe Emmanuel Adedayo
* Version: 1.0.0
* Signature: emmadenagbe
* Email: emmadenagbe@gmail.com
* ALC Currency Converter
*/

'use strict';

$(document).ready(function () {
 getAllCurrencies();

});


function objectToArray(objects) {
    const results = Object.keys(objects).map(i => objects[i]);
    return results;
}

/*
|---------------------------------------------------------------------------------------------------------------
|                                               SERVICE WORKER SECTION HERE
|----------------------------------------------------------------------------------------------------------------
*/

// register services worker
if (navigator.serviceWorker) {
                    // register the services worker
                    registerServiceWorker();

                    // listen for controller change
                    navigator.serviceWorker.addEventListener('controllerchange', function () {
                                        window.location.reload();
                    });

} else {
                    console.log("Your Browser Doesnt's Support Service Worker");
}

// registering sw function
function registerServiceWorker() {
                    // register the service worker
                    navigator.serviceWorker.register('../alc_sw/sw.js').then(function (sw) {
                                        // check service worker controller
                                        if (!navigator.serviceWorker.controller) return;

                                        // on waiting state
                                        if (sw.waiting) {
                                        updateIsReady(sw.waiting);
                                        return;
                                        }

                                        // on installing state
                                        if (sw.installing) {
                                        trackInstalling(sw.installing);
                                        }

                                        // on updated found
                                        sw.addEventListener('updatefound', function () {
                                        trackInstalling(sw.installing);
                    console.log("Service Worker Registration Successful");
                                        });
                    }).catch(function(params) {

                    console.log("Service Worker Registration Failed");
                    });
}

// service worker track state
function trackInstalling(worker) {
                    worker.addEventListener('statechange', function () {
                    if (worker.state == 'installed') {
                    updateIsReady(worker);
 }
                    });
}

// update application 
function updateIsReady(sw) {
 pushUpdateFound();
}

// push updates and make an alert
function pushUpdateFound() {
    console.log('Service Worker found some updates.. !');
}


/*
|-----------------------------------------------------------------------------------------------------------------
|                                               INDEXED DB HERE
|-----------------------------------------------------------------------------------------------------------------
*/
if (!window.indexedDB) {
 console.log("Your Browser Doesn't Support a Stable Version Of IndexedDB");
}

// open database 
function openDatabase() {
                    // return db instances
                    const ALC_CURY_DB = 'alc_converter';
                    const alc_db = indexedDB.open(ALC_CURY_DB, 1);

                    // on error catch errors 
                    alc_db.onerror = (event) => {
                                        console.log('Error Opening Web Database');
                                        return false;
                    };

                    // check db version
                    alc_db.onupgradeneeded = function (event) {
                    // listen for the event response
                    var upgradeDB = event.target.result;

                    // create an objectStore for this database
                    var objectStore = upgradeDB.createObjectStore("alc_currencies");
                    };

                    // return db instance
                    return alc_db;
}

// Save to Database
function saveToDatabase(data) {
                    // initialise database
                    const db = openDatabase();

                    // on success add user
                    db.onsuccess = (event) => {

                    const query = event.target.result;

                    // check if currency already exist
                    const currency = query.transaction("alc_currencies").objectStore("alc_currencies").get(data.symbol);

                    // wait for users to arrive
                    currency.onsuccess = (event) => {

                    const dbData = event.target.result;

                    const store = query.transaction("alc_currencies", "readwrite").objectStore("alc_currencies");

                    if (!dbData) {
                    
                    // save data into currency object

                    store.add(data, data.symbol);

                    } else {
                    
                    // update data existing currency object
                    store.put(data, data.symbol);
                    };
               }
           }
}

// fetch from database
function fetchFromDatabase(symbol, amount) {
                    // initialise database
                    const db = openDatabase();

                    // on success add user
                    db.onsuccess = (event) => {

                    //add event listener on Convet Button
                    document.getElementById('btn_converter').addEventListener('click', () => {

                    $("#result").html("");

                    });

                    // console.log('database has been openned !');
                    const query = event.target.result;

                    // check if already exist symbol
                    const currency = query.transaction("alc_currencies").objectStore("alc_currencies").get(symbol);

                    // wait for users to arrive
                    currency.onsuccess = (event) => {

                    const data = event.target.result;
                    // console.log(data);

                    if (data == null) {
                        $(".error_msg").append(`<div class="result_output"><p p style="color:red;">Opps!You are currently offline... please check your internet connection and try again,Thank You.</span></div>`);
                    //console.log("Opps!You are currently offline... please check your internet connection and try again,Thank You.")
                     setTimeout((e) => { 

                     $(".error_msg").html("");

                    }, 1000 * 3);

                    return;
                    }

                    let _pairs_split = symbol.split('_');
                    let cur_from = _pairs_split[0];
                    let cur_to = _pairs_split[1];
                    let opt_curr_from = document.getElementById('currency_from');
                    let curr_amt_text = opt_curr_from.options[opt_curr_from.selectedIndex].innerHTML;
                    let opt_curr_to = document.getElementById('currency_to');
                    let result_to = opt_curr_to.options[opt_curr_to.selectedIndex].innerHTML;
                        $("#result").append(`<div id="result_output" style="color: #448aff;"><b>${amount} </b> <b> ${curr_amt_text}</b> = <b>${(amount * data.value).toFixed(2)} ${result_to}</b></div>`);
                    }
                    }
}


/*
|----------------------------------------------------------------------------------------------------------------
|                                                     CURRENCY API HERE
|----------------------------------------------------------------------------------------------------------------
*/
// getting  all currencies 
const getAllCurrencies = (e) => {
                    // ES6  here..
                    /*
                    |------------------------------------------
                    Pls Note All result are fetched in json as per currency converter Documentation
                    
                    |------------------------------------------
                    */
                    $.get('https://free.currencyconverterapi.com/api/v5/currencies', (data) => {
                    // If empty Result

                    if (!data) console.log("Could not fetch any data,Try again Later");

                    // convert json_result to array
                        const json_result = objectToArray(data.results);
                   
                    // looping through the result
                    for (let val of json_result) {
                    // using template leteral
                        //console.log(val.id);

                     $("#currency_from").append(`<option value="${val.id}">(${val.currencyName})</option>`);
                    $("#currency_to").append(`<option value="${val.id}">(${val.currencyName})</option>`);
                                        }
                    });
}



// convert currencies
// this funtion convert value selected from currency_from id and currency_to id with the amount and sent to the api to get conversion request
function CurrencyConverter() {
                    let currency_from = $("#currency_from").val();
                    let currency_to = $("#currency_to").val();
                    let amount = $("#convert_amount").val();

                    //add event listener on Convet Button
                    document.getElementById('btn_converter').addEventListener('click', () => {
                        $("#result_output").hide();
                    });

                    // restrict user for converting same currency
                    if (currency_from == currency_to) {
                        $(".error_msg").html(`<div id="result_output"><p style="color:red;">Oops,You cannot convert to the same currency,kindly select another currency from the select option,Thank You</span></div>`);
                    return false;
                    }

                    // build query 
                    let body = `${currency_from}_${currency_to}`;
                    let query = { q: body};

                    // convert currencies
                    $.get('https://free.currencyconverterapi.com/api/v5/convert', query, (data) => {
                    
                    // convert to object array
                    const pairs = objectToArray(data.results);

                    
                     // iterate pairs
                    $.each(pairs, function (index, val) {
                    
                        //console.log(data.results)

                     let opt_curr_from = document.getElementById('currency_from');
                     let curr_amt_text = opt_curr_from.options[opt_curr_from.selectedIndex].innerHTML;
                     let opt_curr_to = document.getElementById('currency_to');
                     let result_to = opt_curr_to.options[opt_curr_to.selectedIndex].innerHTML;
                    
                     //console.log(amount*val.val.toFixed(2))
                    $("#result").append(`<div id="result_output" style="color: #448aff;"><b>${amount} </b> <b> ${curr_amt_text}</b> = <b>${(amount * val.val).toFixed(2)} ${result_to}</b></div>`);

                  let object = { symbol: body,value: val.val};

                   // Save result to Database
                    saveToDatabase(object);
});
                    }).fail((err) => {
                    
                    // check currencies from indexedDB
                    fetchFromDatabase(body, amount);
                    });

                    // void form
                    return false;
}
