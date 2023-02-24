document.getElementById('AddDoctorbtn').onclick = function() {
    var database = firebase.database();
    var ref = database.ref();
    var DoctorData = ref.child("Doctor");
    var Fname=document.getElementById("Fname").value;
    var Lname=document.getElementById("Lname").value;
    var Email=document.getElementById("Email").value;
    var Password=document.getElementById("Password").value;
    var SSN=document.getElementById("SSN").value;
    
    if(Fname=="")
        alert("first name is required");
    else{
    DoctorData.child(SSN).set({
        Fname: Fname,
        Lname: Lname,
        Email: Email,
        NumberOfPatients: 0,
        Password: Password
    },function(error) {
        if (error) {
          alert("Data could not be saved." + error);
        } else {
            var queryString = "?type=" + "D" +"?ID=" + SSN + "&Name=" +Fname;
            window.location.href = "doctorinfo.html" + queryString;
        }
      });
    
}
}