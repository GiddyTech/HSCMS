 // Variables
 var ImageName, ImgUrl;
 var files = [];
 var reader;

  //Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 //Selection Process
 function selectImage(e) {

     var input = document.createElement('input');
     input.type= 'file';

     input.onchange = e => {
         files = e.target.files;
         reader = new FileReader();
         reader.onload = function() {
             document.getElementById("myimg").src = reader.result;  
         }
         reader.readAsDataURL(files[0]);
     }
     input.click();
 }

         //Upload Process

         // uploading Picture to Firebase Storage
     function uploadImage() {
         ImgName = document.getElementById('namebox').value;
         var uploadTask = firebase.storage().ref('Passport/'+ImgName).put(files[0]); 
         
         uploadTask.on('state_changed', function(snapshot){
             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%'; 
         },

     // error handling
         function(error) {
             alert('error in saving the image');
         },
 
     // submitting the image link to the database

         function(){
             uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                 ImgUrl = url;


                 firebase.database().ref('Passport/'+ImgName).set({
                     Name: ImgName,
                     Link: ImgUrl
                 });
             alert('image added successfully');    
             }
         );
     });
 } 

 // Retrieval Process
 document.getElementById('retrieve').onclick = function() {
     ImgName = document.getElementById('namebox').value;
     firebase.database().ref('Passport/' +ImgName).on('value', function(snapshot){
         document.getElementById('myimg').src = snapshot.val().Link; 
     });
 }