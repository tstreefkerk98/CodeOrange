// Main function for this application.
function main() {
    readJsonFile();
    addClearButtonEvent();
}

// The following part of the code is responsible for parsing and showing the JSON objects

// Reads the JSON file, iterates over and processes the JSON objects.
function readJsonFile() {
    var divTemplate = document.getElementById("assignment0").cloneNode(true);
    $.getJSON("data.json", function (json) {
        $.each(json, function (i, element) {
            if (i != 0) {
                var clone = document.createElement("div");
                clone = divTemplate.cloneNode(true);
                clone.setAttribute("id", "assignment" + i);
                document.getElementById("assignments").appendChild(clone);
            }
            var assignmentObjTemp = createAssignmentObj(element);
            eval('var assignmentObj' + i + ' = assignmentObjTemp;');
            insertObjAttributes(eval('assignmentObj' + i), i);
        });
    });
}

// Adds the assignment object attributes to the div template.
function insertObjAttributes(assignmentObj, assignmentNum) {
    var assignmentDiv = document.getElementById("assignment" + assignmentNum);
    assignmentDiv.querySelector(".logo").src = assignmentObj.logo;
    setDivByClass(assignmentDiv, assignmentObj, "company", "company");

    setNew(assignmentDiv, assignmentObj);
    setFeatured(assignmentDiv, assignmentObj);

    setDivByClass(assignmentDiv, assignmentObj, "position");
    setDivByClass(assignmentDiv, assignmentObj, "level");
    setDivByClass(assignmentDiv, assignmentObj, "role");

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
        filter();
    });
}

// Adds a filter parameter to the filter bar.
function addFilterParameter(element) {
    var filterText = element.innerHTML;
    if (isFilterAbsent(filterText)) {

        var listElement = document.createElement("li");
        listElement.classList.add("filterButton");
        listElement.setAttribute("id", filterText);

        var closeButton = document.createElement("span");
        closeButton.classList.add("close");
        closeButton.innerHTML = "&times;";

        var filterButton = filterText + closeButton.outerHTML;
        listElement.innerHTML = filterButton;

        document.getElementById("filterList").appendChild(listElement);
        addCloseButtonEvent(filterText);
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
        filter();
    });
}

// Filters the assignments based on the filter parameters present in the filter bar.
function filter() {
    // The amount of assignments, there are two text childnodes, not completely sure why they exist.
    var size = document.getElementById("assignments").childNodes.length - 2;

    var assignments = new Array(size);
    for (i = 0; i < size; i++) {
        assignments[i] = document.getElementById("assignment" + i);
    }

    var filterButtons = document.getElementsByClassName("filterButton");

    for (i = 0; i < size; i++) {
        var assignment = assignments[i];

        var level = assignment.querySelector(".level").innerHTML;
        var role = assignment.querySelector(".role").innerHTML;
        var language0 = assignment.querySelector(".language0").innerHTML;
        var language1 = assignment.querySelector(".language1").innerHTML;
        var language2 = assignment.querySelector(".language2").innerHTML;
        var tools0 = assignment.querySelector(".tools0").innerHTML;
        var tools1 = assignment.querySelector(".tools1").innerHTML;

        var assignmentAttributes = [level, role, language0, language1, language2, tools0, tools1];

        var count = 0;
        for (j = 0; j < filterButtons.length; j++) {
            var filterButton = filterButtons[j];

            var filterHtml = filterButton.innerHTML;
            var filterAttribute = filterHtml.substr(0, filterHtml.indexOf("<"));

            if (!assignmentAttributes.includes(filterAttribute)) {
                assignment.style.display = "none";
                break;
            } else {
                count++;
            }
        }
        if (count == filterButtons.length) {
            assignment.style.display = "initial";
        }
    }
}

// Waits for the DOM to be loaded, then calls main().
$(document).ready(function () {
    main();
})