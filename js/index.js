console.log('running');
// grab the body
let body = document.querySelector('body');
// User log in state - now Current User
// let currentUser = null;
let currentUser = null;

// master controller for the nav and main-body
let page;

document.addEventListener('DOMContentLoaded', event => {
  page = new Page();
  page.togglePageState();
  // add event listenrs
  body.addEventListener('click', event => {
    navClickEventListener(event);
    homeClickEventListener(event);
    athleteClickEventListener(event);
  });
  temp();
});

// Handle Nav Bar 'click' Event Listeners
function navClickEventListener(event) {
  // landing & app variables
  let [navLanding, mainLanding, navApp, mainApp] = [
    page.nav.landing,
    page.main.landing,
    page.nav.app,
    page.main.app
  ];
  // debugger
  /******** APP NAV EVENT HANDLERS ***********/
  // if our target is the home button
  if (event.target === navApp.homeButton) {
    // Home Button
    // set app state
    let appState = event.target.innerText;
    // toggle the state of our main component
    mainApp.toggleAppState(appState);
    // toggle the state of the home page
    mainApp.homePage.swapState('index', '');
  } else if (event.target === navApp.profileButton) {
    // Profile Button
    mainApp.toggleAppState('athletes');
    AthletesAdapter.getOneAthlete(currentUser.id).then(data => {
      mainApp.athletesPage.swapState('show', data);
    });
  } else if (event.target === navApp.athleteButton) {
    // Athletes Button
    let appState = event.target.innerText;
    mainApp.toggleAppState(appState);
    mainApp.athletesPage.swapState('index', '');
    // toggle 'add/remove friends' button states & hide current user
    page.main.app.athletesPage.athletesList.toggleAddOrRemoveFriendsButton();
  } else if (event.target === navApp.logOutButton) {
    // set the user to falsey value, null
    currentUser = null;
    // change the state of the page
    page.state = 'landing';
    // trigger the page toggler
    page.togglePageState();
    /******** LANDING NAV EVENT HANDLERS ***********/
  } else if (event.target === navLanding.linkToRegisterButton) {
    // Link to Register Page Button
    // set app state
    let appState = 'registration-page';
    // toggle the state of the landing page
    mainLanding.toggleLandingPageState(appState);
    // change the state of the landing page's nav bar
    navLanding.isLoggingIn = false;
    // call the logInOrRegister
    navLanding.logInOrRegister();
  } else if (event.target === navLanding.linkToLogInButton) {
    // Link to Log In Page Button
    // set app state
    let appState = 'login-page';
    // change the state of the main page
    mainLanding.toggleLandingPageState(appState);
    // change the state of the landing page's nav bar
    navLanding.isLoggingIn = true;
    // call logInOrRegister
    navLanding.logInOrRegister();
  }
}

// Handle Home Page 'click' Event Listenrs
function homeClickEventListener(event) {
  // landing & app variables
  let [navApp, mainApp] = [page.nav.app, page.main.app];
  // if the event.target's class name is 'routine-list-element'
  if (event.target.classList.contains('routine-list-element')) {
    // get the routine's id from the dataset
    let routineId = event.target.dataset['routineId'];
    // fetch that routine
    RoutinesAdapter.getOneRoutine(routineId).then(data => {
      // Use main to get into your home page, and use it's swapState method
      // pass it the 'show' state
      mainApp.homePage.swapState('show', data);
    });

    console.log('yes');
  }
}

function athleteClickEventListener(event) {
  let [navApp, mainApp] = [page.nav.app, page.main.app];
  // view signed in athlete's profile
  if (event.target.classList.contains('btn-view-profile')) {
    let athleteId = event.target.dataset.athleteId;
    AthletesAdapter.getOneAthlete(athleteId).then(data => {
      mainApp.athletesPage.swapState('show', data);
    });
  }
  // athletes page add/remove buttons
  if (event.target.classList.contains('btn-add-friend')) {
    // make request to add friend

    // toggle-swap add/Remove buttons
    page.main.app.athletesPage.athletesList.toggleAddOrRemoveFriendsButton();
  }
  if (event.target.classList.contains('btn-remove-friend')) {
    // make request to destroy friendship

    // toggle-swap add/Remove buttons
    page.main.app.athletesPage.athletesList.toggleAddOrRemoveFriendsButton();
  }
}

// TEMP
function temp() {
  document.querySelector('.athletes').lastElementChild.remove();
}
