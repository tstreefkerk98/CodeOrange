// Main function for this application.
function main() {
    // Reads the JSON file and adds the assignments to the body.
    readJsonFile();

    // Adds the clear event to the clear button.
    addClearButtonEvent();
}

// The following part of the code is responsible for parsing and showing the JSON objects

// Reads the JSON file, iterates over and processes the JSON objects.
function readJsonFile() {
    // This is a clone of the initial empty div in which the assignments from the JSON file will be inserted.
    var divTemplate = document.getElementById("assignment0").cloneNode(true);

    // Reads the JSON file.
    $.getJSON("data.json", function (json) {
        // Processes all the JSON file objects.
        $.each(json, function (i, element) {
            // For every JSON file object except the first one, clone the divTemplate and append it to the "assignments" div.
            if (i != 0) {
                var clone = document.createElement("div");
                clone = divTemplate.cloneNode(true);

                // Sets the id dynamically so that they can be accessed by id later on.
                clone.setAttribute("id", "assignment" + i);
                document.getElementById("assignments").appendChild(clone);
            }

            // Creates the assignment object. Variable is a temp variable as to avoid confusion with the variable in the next line.
            var assignmentObjTemp = createAssignmentObj(element);

            // Assign assignment object to the dynamically initialized var.
            eval('var assignmentObj' + i + ' = assignmentObjTemp;');

            // Insert the assignment object in the cloned divTemplate.
            insertObjAttributes(eval('assignmentObj' + i), i);
        });
    });
}

// Adds the assignment object attributes to the div template.
function insertObjAttributes(assignmentObj, assignmentNum) {
    // Get the cloned divTemplate by id.
    var assignmentDiv = document.getElementById("assignment" + assignmentNum);

    // Sets the logo source to the logo attribute of the assignment object.
    assignmentDiv.querySelector(".logo").src = assignmentObj.logo;

    // Sets the div in the assignmentDiv with class "company" to the company attribute of the assignment object.
    // The same is done for different attributes/classes.
    setDivByClass(assignmentDiv, assignmentObj, "company");

    setNew(assignmentDiv, assignmentObj);
    setFeatured(assignmentDiv, assignmentObj);

    setDivByClass(assignmentDiv, assignmentObj, "position");
    setDivByClass(assignmentDiv, assignmentObj, "level");
    setDivByClass(assignmentDiv, assignmentObj, "role");

    // Sets the div in the assignmentDiv with class "language0" to an index of the languages attribute of the assignment object.
    // The same is done for different indices and for the tools attribute.
    setDivByClassList(assignmentDiv, assignmentObj, "language0", "languages", 0);
    setDivByClassList(assignmentDiv, assignmentObj, "language1", "languages", 1);
    setDivByClassList(assignmentDiv, assignmentObj, "language2", "languages", 2);
    setDivByClassList(assignmentDiv, assignmentObj, "tools0", "tools", 0);
    setDivByClassList(assignmentDiv, assignmentObj, "tools1", "tools", 1);

    setDivByClass(assignmentDiv, assignmentObj, "postedAt");
    setDivByClass(assignmentDiv, assignmentObj, "contract");
    setDivByClass(assignmentDiv, assignmentObj, "location");
}

// Sets attributes in the div template based on the div class and the object attribute.
function setDivByClass(assignmentDiv, assignmentObj, divClass) {
    assignmentDiv.querySelector("." + divClass).innerHTML = assignmentObj[divClass];
}

// Sets the attributes in the div template based on the div class, the object attribute and the array index.
function setDivByClassList(assignmentDiv, assignmentObj, divClass, objAttribute, i) {
    assignmentDiv.querySelector("." + divClass).innerHTML = (assignmentObj[objAttribute][i]) ? assignmentObj[objAttribute][i] : "";
}

// Based on the isNew attribute of the assignmentObj it sets the .new class to "NEW!" or the .new class gets removed.
function setNew(assignmentDiv, assignmentObj) {
    if (assignmentObj.isNew) {
        assignmentDiv.querySelector(".new").innerHTML = "NEW!";
    } else {
        assignmentDiv.querySelector(".new").remove();
    }
}

// Based on the isNew attribute of the assignmentObj it sets the .featured class to "FEATURED" or the .featured class gets removed.
function setFeatured(assignmentDiv, assignmentObj) {
    if (assignmentObj.featured) {
        assignmentDiv.querySelector(".featured").innerHTML = "FEATURED";
    } else {
        assignmentDiv.querySelector(".featured").remove();
    }
}

// Creates the Assignment object.
function createAssignmentObj(element) {
    return new Assignment(element.id, element.company, element.logo, element.new, element.featured, element.position,
        element.role, element.level, element.postedAt, element.contract, element.location, element.languages, element.tools);
}

// Based on the boolean `isNew`, the "NEW!" tag is retrieved.
function isNew(isNew) {
    return (isNew) ? "NEW!" : "";
}

// Based on the boolean `isFeatured`, the "FEATURED" tag is retrieved.
function isFeatured(featured) {
    return (featured) ? "FEATURED" : "";
}

// Class object used to proces the assignements.
class Assignment {
    constructor(id, company, logo, isNew, featured, position, role, level, postedAt, contract, location, languages, tools) {
        this.id = id;
        this.company = company;
        this.logo = logo;
        this.isNew = isNew;
        this.featured = featured;
        this.position = position;
        this.role = role;
        this.level = level;
        this.postedAt = postedAt;
        this.contract = contract;
        this.location = location;
        this.languages = languages;
        this.tools = tools;
    }
}

// The following part of the code is reponsible for filtering the assignments.

// Adds the event for clearing the filterList to the clear button.
function addClearButtonEvent() {
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function() {
        var filterList = document.getElementById("filterList");
        filterList.innerHTML = "";

        // When the filterButtons have been cleared, the filter function called to update the visibility of the assignments.
        filter();
    });
}

// Adds a filter parameter to the filter bar.
function addFilterParameter(element) {
    // Extracts the text of the desired filterButton.
    var filterText = element.innerHTML;

    // If the filterButton is not yet present, continue.
    if (isFilterAbsent(filterText)) {

        // Creates the list element which will be added to the "filterList" list.
        var listElement = document.createElement("li");

        // Sets the class of the listElement to "filterButton".
        listElement.classList.add("filterButton");

        // Sets the id of the listElement to the text it will contain.
        listElement.setAttribute("id", filterText);

        // Creates the closeButton part of the filterButton, this part can be pressed to remove the filterButton.
        var closeButton = document.createElement("span");

        // Sets the class of the closeButton to "close".
        closeButton.classList.add("close");

        // Sets the innerHTML to something similar to an 'x'.
        closeButton.innerHTML = "&times;";

        // Combines the filterText with the closeButton.
        var filterButton = filterText + closeButton.outerHTML;

        // Sets the innerHTML of the listElement to the filterButton.
        listElement.innerHTML = filterButton;

        // Appends the listElement to the "filterList" list.
        document.getElementById("filterList").appendChild(listElement);

        // Adds the close event to the close part of the listElement.
        addCloseButtonEvent(filterText);

        // A filter has been added, therefore we update the visibility of the assignments.
        filter();
    }
}

// Checks if the filter parameter clicked is already being filtered upon. If so return false, else true.
function isFilterAbsent(filterText) {
    var filterButtons = document.getElementsByClassName("filterButton");
    for (i = 0; i < filterButtons.length; i++) {
        if (filterButtons[i].innerHTML.includes(filterText)) {
            return false;
        }
    }
    return true;
}

// Adds the event to the closeButton part of the filter parameters (the little x that removes the filter parameter).
function addCloseButtonEvent(filterText) {
    var filterButton = document.getElementById(filterText);
    var closeButton = filterButton.querySelector(".close");

    closeButton.addEventListener("click", function () {
        filterButton.parentNode.removeChild(filterButton);

        // When a filter is removed, update the visibility of the assignments.
        filter();
    });
}

// Filters the assignments based on the filter parameters present in the filter bar.
function filter() {
    // The amount of assignments, there are two text childnodes, not completely sure why they exist but this explains the "- 2".
    var size = document.getElementById("assignments").childNodes.length - 2;

    // Creates the array with all the assignments present in the "assignments" div.
    var assignments = new Array(size);
    for (i = 0; i < size; i++) {
        assignments[i] = document.getElementById("assignment" + i);
    }

    // Retrieves all the filterButtons present.
    var filterButtons = document.getElementsByClassName("filterButton");

    // For all assignments.
    for (i = 0; i < size; i++) {
        var assignment = assignments[i];

        // Stores all the possible filter attributes of the assignment to variables.
        var level = assignment.querySelector(".level").innerHTML;
        var role = assignment.querySelector(".role").innerHTML;
        var language0 = assignment.querySelector(".language0").innerHTML;
        var language1 = assignment.querySelector(".language1").innerHTML;
        var language2 = assignment.querySelector(".language2").innerHTML;
        var tools0 = assignment.querySelector(".tools0").innerHTML;
        var tools1 = assignment.querySelector(".tools1").innerHTML;

        // Stores the filter attributes in an array so that we can use the "includes()" function later on. 
        var assignmentAttributes = [level, role, language0, language1, language2, tools0, tools1];

        // Keeps track of the amount of matches between assignment and filters.
        var count = 0;
        
        // For all filters.
        for (j = 0; j < filterButtons.length; j++) {
            var filterButton = filterButtons[j];

            // Get the filter attricute from the filter inner HTML.
            var filterHtml = filterButton.innerHTML;
            var filterAttribute = filterHtml.substr(0, filterHtml.indexOf("<"));

            // If the assignmentAttributes array does not contain a filter attribute, do not show the assignment and stop executing this for loop.
            // Else, increase the count.
            if (!assignmentAttributes.includes(filterAttribute)) {
                assignment.style.display = "none";
                break;
            } else {
                count++;
            }
        }

        // If the count (the amount of matches) equals the amount of filters, show the assignment.
        if (count == filterButtons.length) {
            assignment.style.display = "initial";
        }
    }
}

// Waits for the DOM to be loaded, then calls main().
$(document).ready(function () {
    main();
})