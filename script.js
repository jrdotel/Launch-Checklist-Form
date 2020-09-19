/*
Becca and Atticus

Thank you so much for all your help!

I've learned so much, and this was definitely a huge learning moment. 

I appreciate that you both really help me understand how to manage my script
to ensure that it doesn't get out of hand. And Becca, thank for helping me through
this on!!!

-Julio
*/


// Write your JavaScript code here!
window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const destination = document.getElementById("missionTarget");
         //Will randomly select a planet
         let index = Math.floor(Math.random()*json.length);
         destination.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">
         `;
      });
   });

////Variables for 'form'////
   let fuelLi = document.getElementById('fuelStatus');
   let cargoLi = document.getElementById('cargoStatus');
   let launchStatus = document.getElementById('launchStatus');
   let element = document.querySelector('#faultyItems');
   let launch = document.querySelector('#launchStatus');
   let form = document.querySelector("form");
////'form'////
   form.addEventListener("submit", function(event) {
      event.preventDefault();
////Declarations for variables to hold value////
      let pilot = document.querySelector("input[name=pilotName]");
      let copilot = document.querySelector("input[name=copilotName]");
      let fuel = document.querySelector("input[name=fuelLevel]");
      let cargo = document.querySelector("input[name=cargoMass]");
////Check that all fields are filled////
      if (pilot.value === '' || copilot.value === '' || fuel.value === '' || cargo.value === '' ) {
         alert("All fields are required!");
////Check that all values are correct types////
      } else if (Number(pilot.value) || Number(copilot.value) || isNaN(fuel.value) || isNaN(cargo.value)) {
         alert("Please enter valid data-type in fields");
////Check that fuel and cargo are acceptable values////
      } else {
         element.style.visibility = "visible";
         launchStatus.innerHTML = 'Shuttle Is Ready for Launch';
         launch.style.color = "green";
         //If fuel is too low and cargo too high
         if (fuel.value < 10000 && cargo.value > 10000) {
            fuelLi.innerHTML = 'Fuel level too low for launch';
            cargoLi.innerHTML = 'Cargo mass too high for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launch.style.color = "red";
         //Either fuel is too low or cargo too high
         } else {
            if (fuel.value < 10000 || cargo.value > 10000) {
               launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
               launch.style.color = "red";
               if (fuel.value < 10000) {
                  fuelLi.innerHTML = 'Fuel level too low for launch';
               } else if (cargo.value > 10000) {
                  cargoLi.innerHTML = 'Cargo mass too high for launch';
               }
            }
         }
      }
   });
});