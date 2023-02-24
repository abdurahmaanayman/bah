var database = firebase.database();
var ref = database.ref();
var Patient = ref.child("Patient");
document.getElementById('AddPatientButton').onclick = function() {
    var Fname=document.getElementById("Fname").value;
    var Lname=document.getElementById("Lname").value;
    var Email=document.getElementById("Email").value;
    var Password=document.getElementById("Password").value;
    var Address=document.getElementById("Address").value;
    var phone=document.getElementById("Phone").value;
    var Age=document.getElementById("Age").value;
    var SSN=document.getElementById("SSN").value;
    var combobox=document.getElementById("doctor");
    var id = combobox[combobox.selectedIndex].id;
    if(Fname=="")
        alert("first name is required");
    else{
        var referance = database.ref('Doctor/'+id+'/NumberOfPatients');    
        referance.once("value", function(snap) {
            var data = snap.val();
            data++;
            referance.set(data);
        });

        var docName = combobox[combobox.selectedIndex].value;
        console.log(docName);
        var PatientInfo = ref.child("PatientInfo");
        PatientInfo.child(SSN).set({
        BedNumber : 0,
        BloodPressure : 0,
        CoughRate : 0,
        HeartRate : 0,
        RespiratoryRate : 0,
        RoomNumber : 0,
        SupervisorDoctorName : docName,
        Tempearature : 0,
        name : Fname+" "+Lname
        });

        id=parseInt(id);
        Patient.child(SSN).set({
            Fname: Fname,
            Lname: Lname,
            Phone: phone,
            Address: Address,
            DoctorID:id,
            Age:Age,
            Email: Email,
            Password: Password
        },function(error) {
            if (error) {
            alert("Data could not be saved." + error);
            } else {
                var queryString = "?type=" + "P" +"&ID=" + SSN + "&Name=" +Fname;
                window.location.href = "patientinfo.html" + queryString;
            }
        });
    }
}

function getDoctorData()
{
    ref.child("Doctor").on("value", function(snapshot) {
        var data=snapshot.val();
        console.log(data);
        var keys = Object.keys(data);
        var combobox=document.getElementById("doctor");
        combobox.innerHTML = "";
        for(i=0;i<keys.length;i++)
        {
            var k=keys[i];
            if(data[k].NumberOfPatients<10){
                var option = document.createElement("option");
                
                var doctorName=data[k].Fname+" "+data[k].Lname;
                option.text = doctorName;
                option.id=k;
                combobox.add(option);
            }
        }

    });
}
getDoctorData();