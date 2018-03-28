 "use strict";

function app(people){
	let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
	switch(searchType){
		case 'yes':
			searchByFullName(people);
			break;
		case 'no': 
			searchByTraits(people);
			break;
		default:
			alert("Wrong! Please try again, following the instructions dummy. :)");
			app(people);
		break;
	}
}

function displayTraits(person, people) {
	let message = ""; 
	for (let i = 0; i < people.length; i++) {
		if(people[i].id === person) {
			for (var key in people[i]) {
				if (people[i].hasOwnProperty(key)) {
					message += key + ": " + people[i][key] + "\r\n";
				}
			}
		}
		
	}
	alert(message);
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function restart(displayThisError) {
	alert(displayThisError);
	app(people);
}

function makeArray(inputString) {
	inputString.trim();
	return inputString.split(" ");
}

function matchWord(word, search) {
	if(lowerCase(word).includes(lowerCase(search))) {
		return true;
	}else{
		return false;
	}
}

function echo(toEcho) {
	console.log(toEcho);
}

function lowerCase(word) {
	return word.toLowerCase();
}

function searchByTraits(people) {
	let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
	let filtered = people;
	let displayThesePeople = [];
	let choices = makeArray(userSearchChoice);

	for (let i = 0; i < choices.length; i++) {
		if(choices[i].includes("height")) {
			filtered = searchByHeight(filtered);	
		}
		else if(choices[i].includes("weight")) {
			filtered = searchByWeight(filtered);	
		}
		else if(choices[i].includes("eye")) {
			filtered = searchByEyeColor(filtered);	
		}
		else if(choices[i].includes("gender")) {
			filtered = searchByGender(filtered);
		}
		else if(choices[i].includes("age")) {
			filtered = searchByAge(filtered);
		}
		else if(choices[i].includes("occupation")) {
			filtered = searchByOccupation(filtered);	
		} else {
			alert("Please choose valid input!");
			app(people);
		}
	}

	if(filtered.length <= 1) {
		alert("Please choose valid input!");
		app(people);
	} else {
		displayPeople(filtered);
		app(people);
	}
}

function searchByHeight(people) {
	let userInputHeight = prompt("what is the persons height?");
	let newArray = people.filter(function (el) {
		if(el.height == userInputHeight) {
			return true;
		}
	});
	return newArray;
}

function searchByWeight(people) {
	let userInputWeight = prompt("How much does the person weigh?");
	let newArray = people.filter(function (el) {
		if(el.weight == userInputWeight) {
		return true;
		}
	});
	return newArray;
}

function searchByEyeColor(people) {
	let userInputWeight = prompt("What is the persons eye color?");
	let newArray = people.filter(function (el) {
		if(el.eyeColor == userInputWeight) {
		return true;
		}
	});
	return newArray;
}

function searchByGender(people){
	let userInputGender = prompt("what is the persons gender?");
	let newArray = people.filter(function (el){
		if(el.gender == userInputGender){
			return el.gender;
		}
	});
	return newArray;
}
	function searchByAge(people){
		let userInputAge = prompt("how old is the person?");
		 
		let newArray = people.filter(function (el){
			if(el.age === userInputAge){
				return true;
			}
		});
		return newArray;
	}

	function seachByEyeColor(people){
		let userInputEyeColor = prompt("what is the persons eye color?");

		let newArray = people.filter(function (el){
			if(el.eyecolor == userInputEyeColor){
				return el.eyecolor;
			}
		});
		return newArray;
	}
	function seachByOccupation(people){
		let userInputOccupation = prompt("what is the persons occupation?");

		let newArray = people.filter(function (el){
			if(el.occupation == userInputOccupation){
				return true;
			}
		});
		return newArray; 
	}

function searchByAge(people){
	let userInputAge = prompt("what is the persons age?");
	let d = new Date();
	let currentYear = d.getFullYear();
	let newArray = people.filter(function (el){
		let userAgeSplit = el.dob.split("/");
		if((currentYear - userAgeSplit[2]) == userInputAge){
			return true;
		}
	});
	return newArray;
}

function searchByOccupation(people){
	let userInputOccupation = prompt("what is the persons occupation?");
	let newArray = people.filter(function (el){
		if(el.occupation == userInputOccupation){
			return el.occupation;
		}
	});
	return newArray;
}

function searchByFullName(people) {
	let userSearchChoice = prompt("Please enter in first and last name");
	let userSearchSplit = makeArray(userSearchChoice);
	if (userSearchSplit.length > 2) {
		restart("Error, please put in first and last name only");
	} else {
		for(let i = 0; i < people.length; i++) {
			if(matchWord(userSearchSplit[0], people[i].firstName) && matchWord(userSearchSplit[1], people[i].lastName)) {
				mainMenu(people[i].id, people);
			}
		}
	}	
}

function buildDescendants(personID, people) {
	// TODO: tidy this up, extremely slooppy currently
	let descendants = [];
	if(people.length <= 0) {
		//console.log("Empty");
		return descendants;
	} else {
		descendants = people.filter(function (el) {
			for(let i = 0; i < el.parents.length; i++){
				if(el.parents[i] === personID) {
					return true;
				}
			}
		});
		for (let i = 0; i < descendants.length; i++){
			descendants = descendants.concat(buildDescendants(descendants[i].id, people));
		}
	}
	return descendants;
}

function buildFamily(personID, people) {
	let person = getIndex(personID, people);
	let family = [];
	for(var el in people) {
		if(people[el].lastName === people[person].lastName && people[el].firstName != people[person].firstName) {
			//console.log(people[el].firstName + " " + people[el].lastName);
			family.push(people[el]);
		}
	}
	for (let i = 0; i < people[person].parents.length; i++) {
		family.push(people[person].parents);
	}
	return family;
}

function search(input, people) {
	makeArray(input);
	console.log(input);
}


function echoName(person, people) {
	for (let i = 0; i < people.length; i++) {
		if(people[i].id === person) {
			return people[i].firstName + " " + people[i].lastName;
		}	
	}
}

function getIndex(person, people) {
	for (let i = 0; i < people.length; i++) {
		if(people[i].id === person) {
			return i;
		}	
	}
}

function mainMenu(person, people){
	if(!person){
		alert("Could not find that individual.");
		return app(people); // restart
	}

	var displayOption = prompt("Found " + echoName(person, people) + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

	switch(displayOption){
		case "info":
			displayTraits(person, people);
			break;
		case "family":
			// TODO: get person's family
			let family = buildFamily(person, people);
			displayPeople(family);
			break;
		case "descendants":
			let descendants = buildDescendants(person, people);
			displayPeople(descendants);
			break;
		case "restart":
			app(people);
			break;
		case "quit":
			return
		default:
			return mainMenu(person, people); // ask again
	}
}



// alerts a list of people
function displayPeople(people){
	alert(people.map(function(person){
		return person.firstName + " " + person.lastName;
	}).join("\n"));
}

function displayPerson(person){
	// print all of the information about a person:
	// height, weight, age, name, occupation, eye color.
	var personInfo = "First Name: " + person.firstName + "\n";
	personInfo += "Last Name: " + person.lastName + "\n";
	// TODO: finish getting the rest of the information to display
	alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
	do{
		var response = prompt(question).trim();
	} while(!response || !valid(response));
	return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
	return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
	return true; // default validation only
}
