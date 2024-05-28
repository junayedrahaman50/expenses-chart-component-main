const amounts = document.querySelectorAll(".graph-money");
const days = document.querySelectorAll(".graph-day");
const bars = document.querySelectorAll(".graph-bar");
let populated = false;
// fetch data from json file
const url = "./data.json";
const expenses = [];
fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw Error("Could not fetch the data for that resource");
    }
    return res.json();
  })
  .then((data) => {
    expenses.push(...data);
    console.table(expenses);
    // fill data
    days.forEach((day, i) => (day.textContent = expenses[i].day));
    amounts.forEach(
      (amount, i) => (amount.textContent = `$${expenses[i].amount}`)
    );
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    // calculate height dynamically
    bars.forEach((bar, i) => {
      bar.style.height = `${(expenses[i].amount / total) * 100 * 6.54}px`;
      bar.style.backgroundColor = "hsl(10, 79%, 65%)";
    });
    // Highlight current day
    const currentDate = new Date();
    let dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0) {
      dayOfWeek = 6;
    } else {
      dayOfWeek -= 1;
    }
    bars[dayOfWeek].style.backgroundColor = "hsl(186, 34%, 60%)";
    console.log(total);
  })
  .catch((err) => {
    console.error(err.message);
  });

// show/hide amounts
bars.forEach((bar, i) => {
  bar.addEventListener("mouseenter", () => {
    amounts[i].style.opacity = 1;
  });
});
bars.forEach((bar, i) => {
  bar.addEventListener("mouseleave", () => {
    amounts[i].style.opacity = 0;
  });
});
