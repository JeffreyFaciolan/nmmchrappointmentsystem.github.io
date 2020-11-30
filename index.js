 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC7_DFu7In-kcVrZqsgBbrkx_63RCXNyIM",
    authDomain: "testforhtml-f81a6.firebaseapp.com",
    databaseURL: "https://testforhtml-f81a6.firebaseio.com",
    projectId: "testforhtml-f81a6",
    storageBucket: "testforhtml-f81a6.appspot.com",
    messagingSenderId: "400859498635",
    appId: "1:400859498635:web:ce95a17789758b630a6c8e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
document.getElementById("form").addEventListener("submit",(e)=>{
  var fullname = document.getElementById("fullname").value;
  var contactno = document.getElementById("contactno").value;
  var description = document.getElementById("description").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var documenttype = document.getElementById("documenttype").value;
  var method = document.getElementById("method").value;
  var emailaddress = document.getElementById("emailaddress").value;

  e.preventDefault();
  createTask(fullname,description, date, time, documenttype, contactno, method, emailaddress);
  form.reset();
});

function createTask(fullname,description, date, time, documenttype, contactno, method, emailaddress ){
 
  var task={
   
    fullname: fullname,
    description:description,
    date: date,
    time: time,
    documenttype: documenttype,
    contactno: contactno,
    method: method,
    emailaddress: emailaddress
  }
  let db= firebase.firestore().collection("tasks/");
  db.add(task).then(()=>{
    Swal.fire(
      'Good job!',
      'Task Added!',
      'success'
    )
    document.getElementById("cardSection").innerHTML='';
  readTask();
  })
  
}

function readTask(){
  
   firebase.firestore().collection("tasks").onSnapshot(function(snapshot) {
    document.getElementById("cardSection").innerHTML='';
    snapshot.forEach(function(taskValue) {
     
      document.getElementById("cardSection").innerHTML+=`
      <div class="card mb-3">
        <div class="card-body">
        <h6 class="card-title">Fullname:</h6>
          <p class="card-title">${taskValue.data().fullname}</p>
          <h6 class="card-title">Contact Number:</h6>
          <p class="card-text">${taskValue.data().contactno}</p>
          <h6 class="card-title">Type of Document:</h6>
          <p class="card-text">${taskValue.data().documenttype}</p>
          <h6 class="card-title">Method:</h6>
          <p class="card-text">${taskValue.data().method}</p>
          <h6 class="card-title">Email Address:</h6>
          <p class="card-text">${taskValue.data().emailaddress}</p>
          <h6 class="card-title">Special Instruction:</h6>
          <p class="card-text">${taskValue.data().description}</p>
          <h6 class="card-title">Time:</h6>
          <p class="card-text">${taskValue.data().time} am</p>
          <h6 class="card-title">Date:</h6>
          <p class="card-text">${taskValue.data().date}</p> 
          <p align="right">
            <button type="submit"  class="btn btn-info " onclick="deleteTask('${taskValue.id}')"><i class="fas fa-trash-alt"></i>Finished</button>
          </p>
        </div>
      </div>
  `
    });
   
});
  
}

function reset(){
  document.getElementById("firstSection").innerHTML=`
  <form class="border p-4 mb-4 " id="form">

  <div class="form-group">
    <label >Task</label>
    <input type="text" class="form-control" id="task" placeholder="Enter task">
  </div>

  <div class="form-group">
    <label>Description</label>
    <input type="text" class="form-control" id="description" placeholder="Description">
  </div>

  <button type="submit"  id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> ADD TASK</button>
  <button style="display: none" id="button2" class="btn btn-success"> Update Task</button>
  <button style="display: none" id="button3" class="btn btn-danger">Cancel</button>
</form>
  `;

  document.getElementById("form").addEventListener("submit",(e)=>{
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form.reset();
  });
}

function updateTask(id,name,description){
  document.getElementById("firstSection").innerHTML=`
  <form class="border p-4 mb-4 " id="form2">

  <div class="form-group">
    <label >Task</label>
    <input type="text" class="form-control" id="task" placeholder="Enter task">
  </div>

  <div class="form-group">
    <label>Description</label>
    <input type="text" class="form-control" id="description" placeholder="Description">
  </div>

  <button style="display: none"  id="button1" class="btn btn-primary">ADD TASK</button>
  <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync"></i> Update Task</button>
  <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i> Cancel</button>
</form>
  `;
  document.getElementById("form2").addEventListener("submit",(e)=>{
    e.preventDefault();
  });
  document.getElementById("button3").addEventListener("click",(e)=>{
    reset();
  });
  document.getElementById("button2").addEventListener("click",(e)=>{
    updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
  });
  document.getElementById("task").value=name;
  document.getElementById("description").value=description;
}

function updateTask2(id,name,description){
  var taskUpdated={
    task:name,
    description:description
  }
  let db= firebase.firestore().collection("tasks").doc(id);
  db.set(taskUpdated).then(()=>{
    Swal.fire(
      'Good job!',
      'Task Updated!',
      'success'
    )
  })

  document.getElementById("cardSection").innerHTML='';
  readTask();
  reset();
}
function deleteTask(id){
  firebase.firestore().collection("tasks").doc(id).delete().then(()=>{
    Swal.fire(
      'Good job!',
      'Task Removed!',
      'success'
    )
  })
  reset();
  document.getElementById("cardSection").innerHTML='';
  readTask();
}

