
function editName()
{
   var newName = prompt("Please enter your new name.","");
   if (newName != null)
   {
     document.getElementById("name").innerHTML = newName.fontcolor("red");
   }
}

function editMajor()
{
	var newMajor = prompt("Please enter your new major.","");
	if (newMajor != null)
	{
		document.getElementById("major").innerHTML = newMajor.fontcolor("red");
	}
}

function editYear()
{
	var newYear = prompt("Please enter your new year.","");
	if (newYear != null)
	{
		document.getElementById("year").innerHTML = newYear.fontcolor("red");
	}
}
