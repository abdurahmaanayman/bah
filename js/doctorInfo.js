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
ID = parseInt(ID);
function getPatientData()
{
    ref.child("Patient").orderByChild('DoctorID').equalTo(ID).on('value', function(snapshot) {
        var data = snapshot.val();
        var keys = Object.keys(data);
        var patientCount= document.getElementById("patientCount");
        patientCount.innerHTML=keys.length;
        var table = document.getElementById('patientInfo');
        var rowCount = table.rows.length;
        for (var x=rowCount-1; x>0; x--) 
        {
            table.deleteRow(x);
        }
        
        for(i=0;i<keys.length;i++)
        {
            var k=keys[i];
            var row = table.insertRow(i+1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = i+1;
            cell2.innerHTML = data[k].Fname+" "+data[k].Lname;
            cell3.innerHTML = "Normal";
            cell4.innerHTML = "see all";
            cell4.setAttribute("class","btn-danger");
            cell4.setAttribute("id","row"+i);
            adds(i,k,Name);
        }
    });
}
getPatientData();
function adds(i,k,name){
    document.getElementById("row"+i).addEventListener('click',function(){
        var queryString = "?type=" +"D" + "&ID=" + k + "&Name="+name;
        window.location.href = "patientinfo.html" + queryString;
    });
}

function patientStatus()
{

}