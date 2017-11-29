//metric
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Metric_setting").addEventListener("click", Metric_handler);
  });
  
  function Metric_handler() {
    localStorage.setItem("weight", "metric");
  }
  
  //Kilogram
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Kilogram_setting").addEventListener("click", Kilogram_handler);
  });
  
  function Kilogram_handler() {
    localStorage.setItem("weight", "kg");
  }
  
  //gram
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Gram_setting").addEventListener("click", Gram_handler);
  });
  
  function Gram_handler() {
    localStorage.setItem("weight", "g");
  }
  
  //imperial
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Imperial_setting").addEventListener("click", Imperial_handler);
  });
  
  function Imperial_handler() {
    localStorage.setItem("weight", "imperial");
  }
  
  //pound
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Pound_setting").addEventListener("click", Pound_handler);
  });
  
  function Pound_handler() {
    localStorage.setItem("weight", "lb");
  }
  
  //ounce
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Ounce_setting").addEventListener("click", Ounce_handler);
  });
  
  function Ounce_handler() {
    localStorage.setItem("weight", "oz");
  } 
  