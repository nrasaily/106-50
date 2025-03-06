
function saveTask(){
    console.log("saving task...");

    // get values

    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    console.log(title, description, color, date, status, budget);

    //build an object


    let taskToSave = new Task(title, description, color, date, status, budget);
    console.log(taskToSave);
    // save the server
    $.ajax(
        {
            type: "POST", // this is a type of request
            url: "http://fsdiapi.azurewebsites.net/api/tasks/",
            data: JSON.stringify(taskToSave),
            contentType: "application/json",
            success: function(response)
            {
                console.log(response);
            },
            error: function(error)
            {
                console.log(error);
            }

        }
    )

    //display task
    displayTask(taskToSave);
}

function testRequests()
{
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net",
        success: function (response)
        {
            console.log(response);
        },
        error: function(error)
        {
            console.log(error);
        }
        
    })
}



function displayTask(task)
{
    let syntax = `
    <div class = "task" style="border-color:${task.color}">
    <div class + "info">
    <h3>${task.title}</h3>
    </div>
    <p>${task.desc}<p>
    <label class="status">${task.status}</label>
    <div class="dateBudget">
    
    <label>${task.startdate}</label>
    <label>${task.budget}</label>
    </div>
    </div>`;
    $(".pendingTask").append(syntax);
}

function loadTask(){
    //get http://fsdiapi.azurewebsites.net/api/tasks/
    //console.log the response from the server
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        success: function(res)
        {
            console.log(res)
            let data = JSON.parse(res); // im from json to js
            console.log(data);
            //bring the only element that belongs to you
            for(let i=0; i<data.length;i++)
            {
                let task = data[i];
                if(task.name=="Nars")
                {
                    displayTask(task);
                }
            }
        },
        error: function(error)
        {
            console.log(error)
        }
    })
}

function init(){
    console.log("im in init function");
    //load data
    loadTask();
    //hook events

    $("#btnSave").click(saveTask);

    // new code change

    
}
window.onload=init;