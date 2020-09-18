// Write your JavaScript code here!
window.addEventListener("load", function() {
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
      });
   });

   let fuelLi = document.getElementById('fuelStatus');
   let cargoLi = document.getElementById('cargoStatus');
   let launchStatus = document.getElementById('launchStatus');
   let element = document.querySelector('#faultyItems');
   let launch = document.querySelector('#launchStatus');
   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {
      event.preventDefault();

      let pilot = document.querySelector("input[name=pilotName]");
      let copilot = document.querySelector("input[name=copilotName]");
      let fuel = document.querySelector("input[name=fuelLevel]");
      let cargo = document.querySelector("input[name=cargoMass]");

      if (pilot.value === '' || copilot.value === '' || fuel.value === '' || cargo.value === '' ) {
         alert("All fields are required!");
      } else if (Number(pilot.value) || Number(copilot.value) || isNaN(fuel.value) || isNaN(cargo.value)) {
         alert("Please enter valid data-type in fields");
      } else {
         element.style.visibility = "visible";
         launchStatus.innerHTML = 'Shuttle Is Ready for Launch';
         launch.style.color = "green";
         if (fuel.value < 10000 && cargo.value > 10000) {
            fuelLi.innerHTML = 'Fuel level too low for launch';
            cargoLi.innerHTML = 'Cargo mass too high for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launch.style.color = "red";
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
