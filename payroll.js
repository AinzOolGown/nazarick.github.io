document.addEventListener('DOMContentLoaded', function() {
  const hourlyWage = 15;
  let totalPay = 0;
  let employeeIndex = 1;
  let payrollBody = document.getElementById('payroll-body');
  let totalPayParagraph = document.getElementById('total-pay');

  while(true) {
    let hours = prompt("Enter the number of hours worked for employee " + employeeIndex + " or -1 to finish:");
    
    if (hours === null || hours.trim() === "" || parseInt(hours) === -1) {
      if (employeeIndex === 1 && parseInt(hours) === -1) {
        alert("No employee data entered.");
      }
      break;
    }
    
    hours = parseInt(hours);
    if (isNaN(hours) || hours < 0) {
      alert("Please enter a valid number of hours.");
      continue;
    }

    let pay = 0;
    if (hours > 40) {
      pay = (40 * hourlyWage) + ((hours - 40) * hourlyWage * 1.5);
    } else {
      pay = hours * hourlyWage;
    }

    totalPay += pay;

    let row = payrollBody.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.textContent = employeeIndex;
    cell2.textContent = hours;
    cell3.textContent = `$${pay.toFixed(2)}`;

    employeeIndex++;
  }

  totalPayParagraph.textContent = `Total Pay: $${totalPay.toFixed(2)}`;
});
