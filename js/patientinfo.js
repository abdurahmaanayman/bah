var queryString = decodeURIComponent(window.location.search);
var ID = queryString.substring(11,25);

//check if patient id logged in or not by searching in table log in by id

var Name= queryString.substring(31);
var type= queryString.substring(6,7);

var sideNav=document.getElementById('sideNav');
var anchor=sideNav.getElementsByTagName('a');
    anchor[1].innerHTML=Name;
var database = firebase.database();
var ref = database.ref();

function getPatientData()
{
        document.getElementById("name").innerHTML="";
        document.getElementById("id").innerHTML="";
        document.getElementById("RoomNumber").innerHTML="";
        document.getElementById("BedNumber").innerHTML="";
        document.getElementById("SupervisorDoctorName").innerHTML="";
        document.getElementById("Tempearature").innerHTML="";
        document.getElementById("CoughRate").innerHTML="";
        document.getElementById("HeartRate").innerHTML="";
        document.getElementById("RespiratoryRate").innerHTML="";
        document.getElementById("BloodPressure").innerHTML="";
    ref.child("PatientInfo/"+ID).on("value", function(snapshot) {
        var data=snapshot.val();
        document.getElementById("name").innerHTML=data.name;
        document.getElementById("id").innerHTML=ID;
        document.getElementById("RoomNumber").innerHTML=data.RoomNumber;
        document.getElementById("BedNumber").innerHTML=data.BedNumber;
        document.getElementById("SupervisorDoctorName").innerHTML=data.SupervisorDoctorName;
        document.getElementById("Tempearature").innerHTML=data.Tempearature;
        document.getElementById("CoughRate").innerHTML=data.CoughRate;
        document.getElementById("HeartRate").innerHTML=data.HeartRate;
        document.getElementById("RespiratoryRate").innerHTML=data.RespiratoryRate;
        document.getElementById("BloodPressure").innerHTML=data.BloodPressure;

    });
}
getPatientData();

function sendQuestion()
{
    var question=document.getElementById("Question").value;
    if(type=="D"){
        var Questions = ref.child("Questions/"+ID+"/Doctor").push();
        Questions.set({
            ch:question
        });
    }
    else if(type=="P")
    {
        var Questions = ref.child("Questions/"+ID+"/Patient").push();
        Questions.set({
            ch:question
        });
    }
}

function getChatData()
{
    var chatLeft=document.getElementById("Left");
    var chatRight=document.getElementById("Right");
    ref.child("Questions/"+ID).on("value", function(snapshot) {
        var data=snapshot.val();
        
        var leftData=data['Patient'];
        var rightData=data['Doctor'];

        var leftKeys = Object.keys(leftData);
        var rightKeys = Object.keys(rightData);

        
        for(i=0;i<Math.min(leftKeys.length,rightKeys.length);i++)
        {
            var LK=leftKeys[i];
            var RK=rightKeys[i];
            var para = document.createElement("p");
            para.setAttribute("class", "left");
            para.innerHTML=leftData[LK].ch;
            chatLeft.appendChild(para);
            var para = document.createElement("p");
            para.setAttribute("class", "right");
            para.innerHTML=rightData[RK].ch;
            chatRight.appendChild(para);
        }

    });
}

getChatData();