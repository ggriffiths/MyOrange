
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
	var newYear = prompt("Please a new picture url.","");
	if (newYear != null)
	{
		document.getElementById("year").innerHTML = "<h3 style='color:red;line-height:75%'>" +  newYear + "</h3>";
		writeCookie('year', newYear, 3);
	}
}

function displayUserData(){

	var displayName = "";
	var major = "";
	var year = "";
	var urlStr = 'http://localhost:8000/api/findUser/'+readCookie('currentUser');
	$.ajax({ 
	    type: 'GET', 
	    url: urlStr, 
	    dataType: 'json',
	    success: function (data) { 
	    	displayName = data.displayName;
			major = data.major;
			year = data.year;

			writeCookie('year', year, 3);
			writeCookie('major', major, 3);
			writeCookie('displayName', displayName, 3);

			document.getElementById("name").innerHTML = "<h1>" +  displayName + "</h1>";
			document.getElementById("major").innerHTML = "<h3>" +  major + "</h3>";
			document.getElementById("year").innerHTML = "<h3>" +  year + "</h3>";
	    }
	});



}