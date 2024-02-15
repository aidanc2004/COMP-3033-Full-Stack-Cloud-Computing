// Aidan Carey, COMP-3033 Assignment 5, Febuary 10 2024

let notice = $("#notice"); // Show errors to the user
let spinner = $("#spinner");
let results = $("#results")

spinner.hide(); // Hide spinner by default

function getData() {
    spinner.show();
    results.empty();

    let url = "https://data.novascotia.ca/resource/f35v-t3mg.json?";
    let service = $("#service").val();
    let region = $("#region").val();

    // If both inputs are missing
    if (!service && !region) {
        notice.text("Please enter an input.");
        cleanUp();
        return -1;
    }

    if (service) {
        // Validate length
        if ((3 >= service.length || service.length >= 50)) {
            notice.text("Service input must be greater than 3 and less than 50 characters long.");
            cleanUp();
            return -1;
        }
        // Add to URL
        url += `service=${service}&`;
    }
    if (region) {
        // Validate length
        if ((3 >= region.length || region.length >= 50)) {
            notice.text("Region input must be greater than 3 and less than 50 characters long.");
            cleanUp();
            return -1;
        }
        // Add to URL
        url += `region=${region}`
    }

    $.get(url, (data, status) => {
        // If it failed to get the data
        if (status != "success") {
            notice.text("Failed to get data.");
            cleanUp();
            return -1;
        }
        // If no results were found
        if (data.length == 0) {
            notice.text("No results found!");
            cleanUp();
            return -1;
        }
        
        // Show data to the user
        data.forEach(element => {
            addLocation(element);
        });

        notice.text("");
        cleanUp();
    });
}

function addLocation(element) {
    let location = $(`<li><strong>${element.service}, ${element.region}</strong><br>${element.postal_code}, ${element.office_address},<br>${element.tollfree}</li>`);

    results.append(location);
}

// Clear inputs, clear notice, hide spinner
function cleanUp() {
    $("#service").val("");
    $("#region").val("");

    spinner.hide();
}

$("button").on("click", getData);