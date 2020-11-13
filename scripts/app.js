// Main function for this application.
function main() {
    readJsonFile();
}

// Reads the JSON file, iterates over and processes the JSON objects.
function readJsonFile() {
    $.getJSON("data.json", function (json) {
        $.each(json, function (i, element) {
            var assignmentObj = createAssignmentObj(element);
            var assignmentHtml = createAssignmentHtml(assignmentObj);
            setAssignmentDiv(assignmentHtml);
        });
    });
}

// Creates the Assignment object.
function createAssignmentObj(element) {
    return new Assignment(element.id, element.company, element.logo, element.new,element.featured, element.position, 
        element.role, element.level, element.postedAt, element.contract, element.location, element.languages, element.tools);
}

// Creates the HTML for the Assignment object.
function createAssignmentHtml(assignment) {
    var layout = [];

    layout.push(
        "<div id='assignment'>",
            "<div class='well'>",
                "<div class='row'>",
                    "<div class='col-md-1'>",
                        "<img src=", assignment.logo, " />",
                    "</div>",
                    "<div class='col-md-11'>",
                        "<ul id='listOuter'>",
                            "<li>",
                                "<companyName onclick='temp()'>", assignment.company, "</companyName>",
                                isNew(assignment.isNew),
                                isFeatured(assignment.featured),
                            "</li>",
                            "<li>",
                                "<jobDescription>", assignment.position, "</jobDescription>");

                                layout.push(getFrameworks(assignment, false));
                                layout.push(getFrameworks(assignment, true));

                                layout.push(
                                "<frameworks onclick='addFilterParameter(this)'>", assignment.level, "</frameworks>",
                                "<frameworks>", assignment.role, "</frameworks>",
                            "</li>",
                            "<li>",
                                "<infoFirst>", assignment.postedAt, " <span>&#8226;</span> </infoFirst>",
                                "<info>", assignment.contract, " <span>&#8226;</span> </info>",
                                "<info>", assignment.location, "</info>",
                            "</li>",
                        "</ul>",
                    "</div>",
                "</div>",
            "</div>",
        "</div>",
    );

    return layout.join("");
}

// This was an attempt to implement the filter paramter buttons but I got stuck.
function addFilterParameter(element) {
    var text = element.innerHTML;
    var textObj = document.createElement("filterButton");
    textObj.innerHTML = text;
    document.getElementById("row1").appendChild(textObj);
}

// Creates and sets the Assignment object div.
function setAssignmentDiv(assignmentHtml) {
    var assignementDiv = document.createElement("div");
    assignementDiv.innerHTML = assignmentHtml;
    document.getElementById("mainLayout").appendChild(assignementDiv);
}

// Based on the boolean `isNew`, the "NEW!" tag is retrieved.
function isNew(isNew) {
    return (isNew) ? "<newTag>NEW!</newTag>" : "";
}

// Based on the boolean `isFeatured`, the "FEATURED" tag is retrieved.
function isFeatured(isFeatured) {
    return (isFeatured) ? "<featured>FEATURED</featured>" : "";
}

// Based on the value of the boolean `isLanguages`, the languages or the tools are iterated and retrieved.
function getFrameworks(assignment, isLanguages) {
    var frameworks = (isLanguages) ? assignment.languages : assignment.tools;
    var frameworksHtml = [];

    var len = frameworks.length;
    for (j = len - 1; j >= 0; j--) {
        frameworksHtml.push(
            "<frameworks>", frameworks[j], "</frameworks>"
        );
    }

    return frameworksHtml.join("");
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

