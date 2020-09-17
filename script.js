// Write your JavaScript code here!
window.addEventListener("load", function() {
   let json = [];
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
   response.json().then(function(json) {
      const destination = document.getElementById("missionTarget");
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
      index = (index + 1) % json.length;
      });
   });


   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilot = document.querySelector("input[name=pilotName]");
      let copilot = document.querySelector("input[name=copilotName]");
      let fuel = document.querySelector("input[name=fuelLevel]");
      let cargo = document.querySelector("input[name=cargoMass]");

      let pilotLi = document.getElementById('pilotStatus');
      let coPilotLi = document.getElementById('copilotStatus');
      let fuelLi = document.getElementById('fuelStatus');
      let cargoLi = document.getElementById('cargoStatus');
      let launchStatus = document.getElementById('launchStatus');
      let element = document.querySelector('#faultyItems');
      let launch = document.querySelector('#launchStatus');

      if (pilot.value === '' || copilot.value === '' || fuel.value === '' || cargo.value === '' ) {
         alert("All fields are required!");
         event.preventDefault();
      }
      if (Number(pilot.value)) {
         alert("Pilot's name type should be a string");
         event.preventDefault();
      }
      if (Number(copilot.value)) {
         alert("Co-pilot's name type should be a string");
         event.preventDefault();
      }
      if (isNaN(fuel.value)) {
         alert("Please enter a number for Fuel Level");
         event.preventDefault();
      }
      if (isNaN(cargo.value)) {
         alert("Please enter a number for Cargo Mass");
         event.preventDefault();
      }

      
      if (fuel.value < 10000 && cargo.value > 10000) {
         element.style.visibility = "visible";
         pilotLi.innerHTML = `${pilot.value} is ready for launch`;
         coPilotLi.innerHTML = `${copilot.value} is ready for launch`;
         fuelLi.innerHTML = 'Fuel level too low for launch';
         cargoLi.innerHTML = 'Cargo mass too high for launch';
         launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
         launch.style.color = "red";
      }


      if (fuel.value < 10000 || cargo.value > 10000) {
         element.style.visibility = "visible";
         pilotLi.innerHTML = `${pilot.value} is ready for launch`;
         coPilotLi.innerHTML = `${copilot.value} is ready for launch`;
         if (fuel.value < 10000) {
            fuelLi.innerHTML = 'Fuel level too low for launch';
            cargoLi.innerHTML = 'Cargo mass low enough for launch';
         } else if (cargo.value > 10000) {
            fuelLi.innerHTML = 'Fuel level high enough for launch';
            cargoLi.innerHTML = 'Cargo mass too high for launch';
         }
         launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
         launch.style.color = "red";
      }


      if (fuel.value > 10000 && cargo.value < 10000) {
         element.style.visibility = "visible";
         pilotLi.innerHTML = `${pilot.value} is ready for launch`;
         coPilotLi.innerHTML = `${copilot.value} is ready for launch`;
         fuelLi.innerHTML = 'Fuel level high enough for launch';
         cargoLi.innerHTML = 'Cargo mass low enough for launch';
         launchStatus.innerHTML = 'Shuttle Is Ready for Launch';
         launch.style.color = "green";
      }
   });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${json[index].name}</li>
   <li>Diameter: ${json[index].diameter}</li>
   <li>Star: ${json[index].star}</li>
   <li>Distance from Earth: ${json[index].distance}</li>
   <li>Number of Moons: ${json[index].moons}</li>
</ol>
<img src="${json[index].image}">
*/
