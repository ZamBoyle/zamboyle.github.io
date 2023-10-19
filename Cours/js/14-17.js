document.addEventListener("DOMContentLoaded", function () {
  function btnUpdateClick() {
    let btnUpdate = document.getElementById("btnUpdate");
    let btnSubmit = document.getElementById("btnSubmit");
    let form = document.getElementById("form");
    if (btnUpdate.getAttribute("mode") == "view") {
      setReadOnly(false);
      btnUpdate.setAttribute("mode", "edit");
      btnUpdate.setAttribute("aria-valuetext", "Sortir du mode édition");
      btnUpdate.value = "Sortir du mode édition";
      if (form.getAttribute("updated") == "true") {
        btnSubmit.removeAttribute("hidden");
      }
      addInputListeners();
    } else {
      setReadOnly(true);
      setInitialValues();
      btnUpdate.setAttribute("mode", "view");
      btnUpdate.setAttribute("aria-valuetext", "Passer en mode édition");
      btnUpdate.value = "Passer en mode édition";
      btnSubmit.setAttribute("hidden", "");
    }
  }

  function setInitialValues() {
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"').forEach((input) => {
      input.value = input.getAttribute("initial-value");
    });
    document.getElementById("form").setAttribute("updated", "false");
  }


  function setReadOnly(state) {
    document
      .querySelectorAll("input")
      .forEach((input) => (input.readOnly = state));
  }

  function addInputListeners() {
    document.querySelectorAll('input').forEach((input) => {
      input.addEventListener("input", function () {
        document.getElementById("btnSubmit").removeAttribute("hidden");
        document.getElementById("form").setAttribute("updated", "true");
      });
    });
  }

  btnUpdate.addEventListener("click", btnUpdateClick);
});
