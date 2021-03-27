firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;

    document.getElementById('auth-state').innerHTML = '<button type="button" class="btn btn-dark" role="button" aria-pressed="true" onclick="logout()">' + name + '</button>';
  } else {
    // No user is signed in.
    document.getElementById('auth-state').innerHTML = '<a href="./login.html" class="btn btn-dark" role="button" aria-pressed="true">Log In</a>'
  }
});

function logout() {
  firebase.auth().signOut().then(() => {
    location = 'index.html';
  }).catch((error) => {
    console.error("Error", error);
  });
}

// Reference messages collection
var messagesRef = firebase.database().ref('Registration');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  var regNum = 'Ek' + Math.random().toString(10).substr(2, 10);

  // Get values
  const name = getInputVal('namee');
  const soo = getInputVal('soo');
  const nationality = getInputVal('nationality');
  const sex = getInputVal('sex');
  const age = getInputVal('age');
  const phone = getInputVal('phone');
  const pml = getInputVal('pml');
  const psl = getInputVal('psl');
  const medic = getSelection('medic');
  const nameOfDrug = getSelection('message1')
  const daily = getSelection('daily');
  const name1 = getSelection('message2')
  const smokeOption = getSelection('smokeOption');
  const name2 = getSelection('message3')
  const alcoholOption = getSelection('alcoholOption');
  const name3 = getSelection('message4')
  const sleepOption = getSelection('sleepOption');
  const name4 = getSelection('message5')
  // Save message
  saveMessage(regNum, name, soo, nationality, sex, age, phone, pml, psl, medic, nameOfDrug, daily, name1, smokeOption, name2, alcoholOption, name3, sleepOption, name4);

  // Show alert
  document.getElementById('message').innerText = 'Your message has been sent. Your registration Number is ' + regNum + 'Chat with any of our Health agents for immediate response to your health condition';
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 100 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },100000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(reg, name, soo, nationality, sex, age, phone, pml, psl, medic, nameOfDrug, daily, name1, smokeOption, name2, alcoholOption, name3, sleepOption, name4){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    regNum: reg,
    name: name,
    state:soo,
    nationality:nationality,
    sex:sex,
    age:age,
    phone: phone,
    pml:pml,
    psl:psl,
    medic:medic,
    nameOfDrug:nameOfDrug,
    daily:daily,
    name1: name1,
    smokeOption : smokeOption,
    name2: name2,
    alcoholOption: alcoholOption,
    name3: name3,
    sleepOption: sleepOption,
    name4: name4
  });
}






