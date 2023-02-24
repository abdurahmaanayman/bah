document.getElementById('LoginButton').onclick = function() {
    var database = firebase.database();
    var ref = database.ref();
    //var DoctorData = ref.child("Doctor");
    var SSN=document.getElementById("SSN").value;
    var Password=document.getElementById("Password").value;
    var signinas = document.getElementById("signinas").value;
    if(SSN!="")
    {
        if(signinas=="patient"){
            ref.child("Patient").child(SSN).once("value", function(snapshot) {
                var data=snapshot.val();
                if(data.Password==Password||data==null)
                {
                    var ID=SSN;
                    var Fname=data.Fname;
                    var type="P";
                    
                    // insert id in table login and set value 1;

                    var queryString =  "?type=" +type+ "&ID=" + ID + "&Name=" +Fname+" "+data.Lname;
                    window.location.href = "patientinfo.html" + queryString;
                }
                else
                    document.getElementById("msg").style.display='block';
            });
        }
        else
        {
            ref.child("Doctor").child(SSN).once("value", function(snapshot) {
                var data=snapshot.val();
                if(data.Password==Password||data==null)
                {
                    var ID=SSN;
                    var Fname=data.Fname;
                    var type="D";
                    var queryString = "?type=" + type +"&ID=" + ID + "&Name="+Fname+" "+data.Lname;
                    window.location.href = "doctorinfo.html" + queryString;
                }
                else
                    document.getElementById("msg").style.display='block';
            });
        }

    }
    
}