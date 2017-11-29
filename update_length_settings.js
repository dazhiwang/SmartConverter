//metric
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Metric_setting").addEventListener("click", Metric_handler);
});

function Metric_handler() {
  localStorage.setItem("length", "metric");
}

//kilometer
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Kilometer_setting").addEventListener("click", Kilometer_handler);
});

function Kilometer_handler() {
  localStorage.setItem("length", "km");
}

//meter
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Meter_setting").addEventListener("click", Meter_handler);
});

function Meter_handler() {
  localStorage.setItem("length", "m");
}

//centimeter
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Centimeter_setting").addEventListener("click", Centimeter_handler);
});

function Centimeter_handler() {
  localStorage.setItem("length", "cm");
}

//millimeter
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Millimeter_setting").addEventListener("click", Millimeter_handler);
});

function Millimeter_handler() {
  localStorage.setItem("length", "mm");
}

//imperial
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Imperial_setting").addEventListener("click", Imperial_handler);
});

function Imperial_handler() {
  localStorage.setItem("length", "imperial");
}

//Mile
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Mile_setting").addEventListener("click", Mile_handler);
});

function Mile_handler() {
  localStorage.setItem("length", "mi");
}

//Yard
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Yard_setting").addEventListener("click", Yard_handler);
});

function Yard_handler() {
  localStorage.setItem("length", "yd");
}

//foot
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Foot_setting").addEventListener("click", Foot_handler);
});

function Foot_handler() {
  localStorage.setItem("length", "ft");
}

//inch
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("Inch_setting").addEventListener("click", Inch_handler);
});

function Inch_handler() {
  localStorage.setItem("length", "in");
}

