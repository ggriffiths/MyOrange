
function editName()
{
   var newName = prompt("Please enter your new name.","");
   if (newName != null)
   {
     document.getElementById("name").innerHTML = "<h1>" +  newName + "</h1>";
     writeCookie('displayName', newName, 3);
   }
}

function editMajor()
{
	var newMajor = prompt("Please enter your new major.","");
	if (newMajor != null)
	{
		document.getElementById("major").innerHTML = "<h3>" +  newMajor + "</h3>";
		writeCookie('major', newMajor, 3);
	}
}

function editYear()
{
	var newYear = prompt("Please enter your new year.","");
	if (newYear != null)
	{
		document.getElementById("year").innerHTML = "<h3>" +  newYear + "</h3>";
		writeCookie('year', newYear, 3);
	}
}

function editPicture()
{
	var newPicture = prompt("Please a new picture url.","");
	if (newPicture != null)
	{
		document.getElementById("picture").src = newPicture;
		writeCookie('picture', newPicture, 3);
	}
}

/*function editCourses()
{
	var newPicture = prompt("Add or remove any courses by title (i.e. CIS 252)","courses");
	if (newPicture != null)
	{
		document.getElementById("courses").src = newCourses;
		writeCookie('courses', newCourses, 3);
	}
}*/

function displayUserData(){

	var displayName = "";
	var major = "";
	var year = "";
	var picture = "";
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
			//document.getElementById("courses").innerHTML = 
	    }
	});



}