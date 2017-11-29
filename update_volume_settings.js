//metric
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Metric_setting").addEventListener("click", Metric_handler);
  });
  
  function Metric_handler() {
    localStorage.setItem("volume", "metric");
  }
  
  //Liter
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Liter_setting").addEventListener("click", Liter_handler);
  });
  
  function Liter_handler() {
    localStorage.setItem("volume", "L");
  }
  
  //Milliter
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Milliliter_setting").addEventListener("click", Milliliter_handler);
  });
  
  function Milliliter_handler() {
    localStorage.setItem("volume", "mL");
  }
  
  //imperial
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Imperial_setting").addEventListener("click", Imperial_handler);
  });
  
  function Imperial_handler() {
    localStorage.setItem("volume", "imperial");
  }
  
  //pint
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Pint_setting").addEventListener("click", Pint_handler);
  });
  
  function Pint_handler() {
    localStorage.setItem("volume", "pt");
  }
  
  //gallon
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Gallon_setting").addEventListener("click", Gallon_handler);
  });
  
  function Gallon_handler() {
    localStorage.setItem("volume", "gal");
  } 
  