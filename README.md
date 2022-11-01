# Intoduction 
Dish-poll is a simple react.js app, it provide user with voting system by which user can choose three dishes for vote which will rank those dishes according to their point.

# App.js
app.js uses one state variable(isLoggedIn) where it checks if user already logged in and set it to false if not, for checking already logged in user app checks for 'username' value in localstorage if there is any value then the app will assume user to be logged in and will set isLogged variable to 'true', then isLoggedIn conditionally render Login component page if it is set it to false, otherwise user it App.js renders Content Component.

# Login.js
Login.js has one prop from app.js and  2 state variables which get set when user enter username and password in login form, then it validates the information given by the user(username, password) and checks if any user with username and password match in users.json if yes then it set the prop to true, and set the localstorage with key 'username' to user's username,
prop is basicaly a function which sets the isLogged in state, which will render the content component in app 

# Content.js
Content.js content the main logic of this app where user get to vote for their selected dishes content.js has 4 state variables = [allDishes, selectedDishes, currentDishes, resultArray]
using component's useEffect function app perform an API call to fetch dish data from backend in json format and store this data in alldishes variable, when allDishes get all data set it triggers the render funtion and in return section of component it renders all the dishes using alldishes.map
and send individual dish to Card component to render it, now from here user see all the dishes in its browser, now Card component takes only 2 props and does not posess any state variables, card takes a dish(information about a dish) and a funtion from content, this call back function triggers whenever user click on select button in dish card for voting. so whenever user click on the select button, it calls this funtion with dish agrument, now dish argument is same dish prop which card component gets from Content component, now this function (cardClickHandle) will set the selected dish in state varible called currentSelection, before setting currentSElection cardClickHandle check's if dish already selected, by checking dish in selectedDishes(state variable), if it exists then it means that user has already selected this dish and now user want this dish to be removed from selection.
selectedDishes is a state variable and it keep tracks of every selected dishes, selectedDishes can have 3 dishes because app have 3 ranks with different points, but selectedDishes is dynamic and can have more or less rank, we initialize this varibles using array with size 3 and fill it with 0(false Value), but it can be initialize with more value, for example if we want to have 4rth rand with point 5, we can do it by initializing it with array of size 4 and providing 4rth point in variable ranks(const variable of array with points as elements).
so when the currentSelection set the dish value, this change in state(currentSelection) triggers Modal.js to render.



# Modal.js
Modal.js is a dialog which gets triggered when user click on select button in dish card, Modal have no state variables, but it gets 4 props from parent(content.js), Modal gets selectedDishes from content.js, so if there is any dishes already selected by user the modal will render those dishes in that particular rank, for example user first time click select for dish1 then selectedDishes at this point will be filled with zero and will have size 3, modal will loop throgh every element of selectedDishes array, and for every element will render their respective card accordingly, if elemet is 0 then modal will render not selected with default image, if a dish exist in selectedDishes the modal will render that dishs to its rank, selectedDishes keep dishes in rank using index, for example selecetedDishes[1] will have rank 2 dish, selectedDishes[0] will have rank 1 dish(because array have 0 based index we minus rant by 1). so Modal box provide user with 3 rank option, when user click choose then modal calls
selectHandle(selectHandle is a prop from content.js) with arugument index and currentSelection, if user clicks outside the modal box the currentSelection gets set to false value, and it render off modal component.
now selectHanle perform certain login and then adds the dish to selectedDishes(state) in its respective rank according to index given by the Modal.js component, and it also sets css classes to those card to appear differnt in website.


# Vote Function
so after users has selected 3 dishes for vote user then can click on Vote button which is below header and above content component, vote button click triggers voteHandle funtion which will set the state variable resultArray by deriving elements from selectedDishes and allDishes, so after sorting the elements according to their points function sets the resultArray state, this change in state will trigger resultArray to render all the elements in return funtion using map, resultArray have one property called isSelected, every dish current user selected for vote has its property isSelected to true in resultArray, which cause that dish card in reault tab to have diffrent css class and will appear differently



 