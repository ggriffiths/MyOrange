// change the display name
function editName()
{
   var newName = prompt("Please enter your new name.","");
   if (newName != null)
   {
     document.getElementById("name").innerHTML = "<h1>" +  newName + "</h1>";
     writeCookie('displayName', newName, 3);
   }
}

// change the major
function editMajor()
{
	var newMajor = prompt("Please enter your new major.","");
	if (newMajor != null)
	{
		document.getElementById("major").innerHTML = "<h3>" +  newMajor + "</h3>";
		writeCookie('major', newMajor, 3);
	}
}

// change the year
function editYear()
{
	var newYear = prompt("Please enter your new year.","");
	if (newYear != null)
	{
		document.getElementById("year").innerHTML = "<h3>" +  newYear + "</h3>";
		writeCookie('year', newYear, 3);
	}
}

// change the picture
function editPicture()
{
	var newPicture = prompt("Please a new picture url.","");
	if (newPicture != null)
	{
		document.getElementById("picture").src = newPicture;
		writeCookie('picture', newPicture, 3);
	}
}

// add a course the the course array
/*function addCourses()
{
	var newCourse = prompt("Add a courses by title (i.e. CIS 252)","");
	if (newCourse != null)
	{
		var newList = document.getElementById("courses");
		newList.push(newCourse);
		writeCookie('courses', newList, 3);
		//newList.toString();
		document.getElementById("courses").innerHTML = newList.toString();
	}
} 

// remove a course from the course array
function removeCourse()
{
	var remCourse = prompt("Which course would you like to remove?","");
	var theArray = document.getElementById("courses");
	var i = 0;
	
	for (i=0; i<theArray.length; i++)
	{
		if (remCourse == theArray[i])
			theArray.splice(i,1);
	}
	
	writeCookie('courses', theArray, 3);
	document.getElementById("courses").innerHTML = newList.toString();
}*/

// pulls the user data from the database to populate the fields
function displayUserData(){

	var displayName = "";
	var major = "";
	var year = "";
	var picture = "http://upload.wikimedia.org/wikipedia/en/thumb/3/30/OttotheOrange.svg/248px-OttotheOrange.svg.png";
	//var courses = "";
	var urlStr = 'http://localhost:8000/api/findUser/'+readCookie('currentUser');
	$.ajax({ 
	    type: 'GET', 
	    url: urlStr, 
	    dataType: 'json',
	    success: function (data) { 
	    	displayName = data.displayName;
			major = data.major;
			year = data.year;
			picture = data.picture;
			//courses = data.courses;

			writeCookie('year', year, 3);
			writeCookie('major', major, 3);
			writeCookie('displayName', displayName, 3);
			writeCookie('picture', picture, 3);
			//writeCookie('courses', courses, 3);

			document.getElementById("name").innerHTML = "<h1>" +  displayName + "</h1>";
			document.getElementById("major").innerHTML = "<h3>" +  major + "</h3>";
			document.getElementById("year").innerHTML = "<h3>" +  year + "</h3>";
			document.getElementById("picture").src = picture;
			//document.getElementById("courses").innerHTML = "<h4>" + courses + "</h4>";
	    }
	});



}