const tipPerPerson = document.querySelector("[data-tip-per-person]");
const totalTipPerPerson = document.querySelector("[data-total-tip]");
const resetBtn = document.querySelector("[data-form-reset]");
const billInput = document.querySelector("[data-bill-input]");
const customInput = document.querySelector("[data-custom-input]");
const tipBtns = document.querySelectorAll("[data-select-tip-btn]");
const numPplInput = document.querySelector("[data-people-input]");
const pplErrorMsg = document.querySelector("[data-error-msg-ppl]");
const billErrorMsg = document.querySelector("[data-error-msg-bill]");
const btnErrorMsg = document.querySelector("[data-error-msg-btn]");

resetBtn.addEventListener("click", clearForm);

tipBtns.forEach((tipBtn, index) => {
  tipBtn.addEventListener("click", (Event) => {
    handleTipBtns(Event, index);
  });
});

customInput.addEventListener("change", (Event) => {
  //On custom input click, remove click from buttons
  for (var i=0;i<tipBtns.length;i++) {
    if (tipBtns[i].classList.contains("tip-clicked")) {
      tipBtns[i].classList.remove("tip-clicked");
    }
  }
  //Get tip amount
    const customTipAmount = parseFloat(Event.target.value);

    //Validate and update error message
    if (isNaN(customTipAmount) || customTipAmount <= 0) {
      btnErrorMsg.classList.add("text-danger");
      btnErrorMsg.classList.remove("text-success");
      btnErrorMsg.textContent = "Can't be zero";
      return;
    } else {
      btnErrorMsg.classList.remove("text-danger");
      btnErrorMsg.classList.add("text-success");
      btnErrorMsg.textContent = "Cool";
    }
  //Update tips
  updateTips(true);
});

billInput.addEventListener("change", (Event) => {
  //Get bill amount
  const billAmount = parseFloat(Event.target.value);

  //Validate and update error message
  if (isNaN(billAmount) || billAmount < 0) {
    billErrorMsg.classList.add("text-danger");
    billErrorMsg.classList.remove("text-success");
    billErrorMsg.textContent = "Can't be less than zero";
    return;
  } else {
    billErrorMsg.classList.remove("text-danger");
    billErrorMsg.classList.add("text-success");
    billErrorMsg.textContent = "Lovely";
  }

  //update tips
  updateTips();
});

numPplInput.addEventListener("change", (Event) => {
  //Get number of people
  const numOfPpl = parseFloat(Event.target.value);

  //Validate and update error message
  if (isNaN(numOfPpl) || numOfPpl <= 0) {
    pplErrorMsg.classList.add("text-danger");
    pplErrorMsg.classList.remove("text-success");
    pplErrorMsg.textContent = "Can't be zero";
    return;
  } else {
    pplErrorMsg.classList.remove("text-danger");
    pplErrorMsg.classList.add("text-success");
    pplErrorMsg.textContent = "Nice";
  }

  //update tips
  updateTips();
});


function handleTipBtns (Event, index) {
  //Clear the custom input
  customInput.value = "";

  //Remove clicked class from all other buttons
  for (var i=0;i<tipBtns.length;i++) {
    if (tipBtns[i].classList.contains("tip-clicked")) {
      tipBtns[i].classList.remove("tip-clicked");
    }
  }

  //Make the current button clicked
  Event.target.classList.add("tip-clicked");
  
  //Update the tips
  updateTips();
}
function clearForm() {
  tipPerPerson.textContent = "0.00";
  totalTipPerPerson.textContent = "0.00";
  billInput.value = "";
  document.querySelector("[data-people-input]").value = "";
  customInput.value = "";
  billErrorMsg.classList.remove("text-danger","text-success");
  billErrorMsg.textContent = "";
  pplErrorMsg.classList.remove("text-danger","text-success");
  pplErrorMsg.textContent = "";
  for (var i=0;i<tipBtns.length;i++) {
    if (tipBtns[i].classList.contains("tip-clicked")) {
      tipBtns[i].classList.remove("tip-clicked");
    }
  }
}
function updateTips(useCustomTip = false) {
  //Get and confirm all input values
  const billAmount = parseFloat(billInput.value);
  const numOfPpl = parseFloat(numPplInput.value);
  const customTipAmount = parseFloat(customInput.value.replace("%",""));
  var clickedBtn;

  for (var i=0; i < tipBtns.length;i++) {
    if (tipBtns[i].classList.contains("tip-clicked")) {
      clickedBtn = parseFloat(tipBtns[i].textContent.replace("%",""));
    }
  }
  if (isNaN(clickedBtn) && !useCustomTip) return;
  if (isNaN(billAmount) || isNaN(numOfPpl)) return;
  //Calculate tip per person
  if (isNaN(clickedBtn) && useCustomTip) {
    calcTip(billAmount, customTipAmount, numOfPpl)
  } else {
    calcTip(billAmount, clickedBtn, numOfPpl);
  }
}
function calcTip (bill, tip, numberPpl) {
  const tipAmount = ((tip / 100) * bill);
  const totalTip = tipAmount * numberPpl;
  tipPerPerson.textContent = Math.round(tipAmount * 100) / 100;
  totalTipPerPerson.textContent = Math.round(totalTip * 100) / 100;
  // Math.round(total * 100) / 100
}