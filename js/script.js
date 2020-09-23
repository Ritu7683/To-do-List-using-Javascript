// <div class="item">
//   <input type="checkbox">
//   <p><%=  newListItems[i]  %></p>
// </div>
var newTask = document.getElementById("new-task");
var addbutton = document.getElementById("adder");
var deletebutton = document.getElementById("delete");

function getData(){
	var data = new Array();
	var data_str = localStorage.getItem('todo');
	if (data_str != null){
		data = JSON.parse(data_str);
	}
	return data;
}

function writeOutToDoList(data) {
  var string = "";
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var itemstring = '<div class="item">' +
      '<input type="checkbox">' +
      '<p>' + item + '</p>' +
      '</div>';
    string += itemstring;
  }
  document.getElementById("list").innerHTML = string;
}

function addTask(){
  var data = getData();
	var task = newTask.value;
	if(task != "") {
		data.push(newTask.value);
		// extract item from local storage
		localStorage.setItem('todo', JSON.stringify(data));
		newTask.value="";

    writeOutToDoList(data);
		componentHandler.upgradeDom();
	}
	return false;
}

function load_list(){
	var data = getData();
	writeOutToDoList(data);
	componentHandler.upgradeDom();
}

function handleCheckboxes() {
	var indexes = [];
	var checkboxes = document.getElementsByTagName('input');
	for(var i=0;i<checkboxes.length;i++)	{
		if(checkboxes[i].checked)
			indexes.push(i);
	}
	return indexes;
}

function delete_items()
{
	var indexes = handleCheckboxes();
	var data = getData();

	for(var i=0;i<indexes.length;i++)	{
		data[indexes[i]] = null;
	}

	var new_data = new Array();
	for(i=0;i<data.length;i++)	{
		if(data[i] != null)
			new_data.push(data[i]);
	}

// add item in local storage
	localStorage.setItem('todo', JSON.stringify(new_data));
	writeOutToDoList(new_data);

	componentHandler.upgradeDom();
	// reloads dom
}
// Event listner first argument is event and second is funcion to be performed
addbutton.addEventListener("click", addTask);
deletebutton.addEventListener("click", delete_items);
