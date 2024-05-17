function validate(field, label) {
  if (!field) {
    showError("Error: " + label);

    return false;
  }
  return true;
}

function showError(error) {
  setStatus(error);
  setTimeout(() => setStatus(""), 3000);
}
