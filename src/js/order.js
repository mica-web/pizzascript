const crustSection = document.getElementById("js-crust-triggers");
const toppingsTarget = document.getElementById("js-toppings-target");
const submitButton = document.getElementById("js-submit");
const toppings = [];

const updateCrust = (text) => {
  const crustTarget = document.getElementById("js-crust-target");
  const targetParent = crustTarget.parentElement;

  // update span element with crust selection
  crustTarget.innerText = text + " crust";

  // if paragraph element is hidden, display it
  if (targetParent.hidden) {
    targetParent.removeAttribute("hidden");
  }
}

const updateToppings = (text, checked) => {

  if (checked) {
    // add the topping label to an unordered list
    toppings.push(text);
  } else {
    // remove the topping label from the list
    const position = toppings.indexOf(text);
    toppings.splice(position, 1);
  }

  const list = document.createElement("ul");

  for (value of toppings) {
    const listItem = document.createElement("li");
    listItem.innerText = value;
    list.appendChild(listItem);
  }

  toppingsTarget.innerHTML = ""; // clear out any previous lists
  toppingsTarget.appendChild(list);
}

const submitOrder = () => {
  // prevent submit button default behavior
  event.preventDefault();
  // hide form elements that are no longer useful
  crustSection.parentElement.setAttribute("hidden", true);
  submitButton.setAttribute("hidden", true);

  // create and display a success message
  const message = document.createElement("p");
  message.innerText = "🍕 Your order has been received and will be ready in 35 mins. 🎉";
  toppingsTarget.appendChild(message);
}

// listen for events on form inputs and submit button
const initOrderForm = () => {
  const toppingsSection = document.getElementById("js-toppings-triggers");
  const crustTriggers = crustSection.querySelectorAll("input");
  const toppingTriggers = toppingsSection.querySelectorAll("input");

  for (let trigger of crustTriggers) {
    trigger.onclick = () => {
      const label = trigger.nextElementSibling.innerText;
      updateCrust(label);
      // enable the submit button
      if (submitButton.disabled) {
        submitButton.removeAttribute("disabled");
      }
    }
  }

  for (let trigger of toppingTriggers) {
    trigger.onclick = () => {
      const label = trigger.nextElementSibling.innerText;
      const checked = trigger.checked;
      updateToppings(label, checked);
    }
  }

  submitButton.onclick = () => {
    submitOrder();
  }
}

initOrderForm();
