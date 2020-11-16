// Main function for this application.
function main() {
    readJsonFile();
}

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

    setDivByClass(assignmentDiv, assignmentObj, "position", "position");
    setDivByClass(assignmentDiv, assignmentObj, "framework1", "level");
    setDivByClass(assignmentDiv, assignmentObj, "framework2", "role");

    setDivByClassList(assignmentDiv, assignmentObj, "framework3", "languages", 0);
    setDivByClassList(assignmentDiv, assignmentObj, "framework4", "languages", 1);
    setDivByClassList(assignmentDiv, assignmentObj, "framework5", "languages", 2);
    setDivByClassList(assignmentDiv, assignmentObj, "framework6", "tools", 0);
    setDivByClassList(assignmentDiv, assignmentObj, "framework7", "tools", 1);

    setDivByClass(assignmentDiv, assignmentObj, "postedAt", "postedAt");
    setDivByClass(assignmentDiv, assignmentObj, "contract", "contract");
    setDivByClass(assignmentDiv, assignmentObj, "location", "location");
}

// Sets attributes in the div template based on the div class and the object attribute.
function setDivByClass(assignmentDiv, assignmentObj, divClass, objAttribute) {
    assignmentDiv.querySelector("." + divClass).innerHTML = assignmentObj[objAttribute];
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

$(document).ready(function () {
    main();
})





