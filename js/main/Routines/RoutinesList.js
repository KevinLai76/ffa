class RoutinesList {
  constructor() {
    // Grab the container for the routines list
    this.routinesListContainer = document.querySelector(
      '.routines-list-container'
    );
    // Create our list of routines
    this.routinesList = document.createElement('ul');

    // Append list to the container
    this.routinesListContainer.append(this.routinesList);

    // add class names
    this.routinesList.classList.add('routines-list');

    RoutinesAdapter.getRoutines()
      .then(this.slapRoutinesOnDom.bind(this))
      .catch(err => console.log(err));
  }

  slapRoutinesOnDom = routines => {
    routines.data.forEach(this.slapOneRoutineOnDom);
  };

  slapOneRoutineOnDom = routineData => {
    // Create a new routine instance with that data, and the item you want to append it to
    let routineComponent = new Routine(routineData);
    // Use this routine component to create a new li
    let routineListItem = document.createElement('li');
    // append li to the routines list
    this.routinesList.append(routineListItem);
    // Give this a class name
    routineListItem.classList.add('routine-list-element');
    // give this a datasets for the routine's id and the athlete who created it's id
    routineListItem.dataset.routineId = routineComponent.id;

    // give data to li based on the RoutineComponent's Data
    routineListItem.innerHTML = `
      <h3>${routineComponent.name}</h3>
      <p class="routine-athlete-name" data-athlete-id="${
        routineComponent.athleteId
      }">  by ${routineComponent.athleteName} </p>
    `;
    routineListItem.querySelector('h3').style.pointerEvents = 'none';
  };
}
