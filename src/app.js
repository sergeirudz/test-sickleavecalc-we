const form = document.querySelector('#form');
const income = document.querySelector('#income');
const days = document.querySelector('#days');
const checkbox = document.querySelector('#checkbox');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!income.value || !days.value) {
    const data = {
      emp_comp_day: 0,
      emp_comp_sum: 0,
      employer_daily_allowance: 0,
      gov_comp_day: 0,
      gov_comp_sum: 0,
      government_daily_allowance: 0,
    };
    setData(data);
    return null;
  }
  if (days.value <= 3) {
    const data = {
      emp_comp_day: 0,
      emp_comp_sum: 0,
      employer_daily_allowance: 0,
      gov_comp_day: 0,
      gov_comp_sum: 0,
      government_daily_allowance: 0,
    };
    setData(data);
    return null;
  }

  const result = sickLeaveCompensation(days.value, income.value);
  setData(result);
});

function sickLeaveCompensation(sickDays, salary) {
  let dailyAllowance = salary / 30;
  let employerCompensationDays;
  let employerCompensationSum;
  let employerDailyAllowance;

  let governmentCompensationDays;
  let governmentCompensationSum;
  let governmentDailyAllowance;

  let totalCompensationSum;
  let totalCompensationDays;

  if (sickDays >= 182 && checkbox.checked === false) {
    sickDays = 182;
  }

  if (sickDays >= 240 && checkbox.checked === true) {
    sickDays = 240;
  }

  if (sickDays <= 8) {
    employerCompensationDays = sickDays - 3;
    employerCompensationSum = employerCompensationDays * dailyAllowance;
    employerDailyAllowance = employerCompensationSum / employerCompensationDays;

    governmentCompensationDays = 0;
    governmentCompensationSum = 0;
    governmentDailyAllowance = 0;

    totalCompensationSum = employerCompensationDays * dailyAllowance;
    totalCompensationDays = employerCompensationDays;
  }

  if (sickDays > 8) {
    employerCompensationDays = 5;
    employerCompensationSum = employerCompensationDays * dailyAllowance;
    employerDailyAllowance = employerCompensationSum / employerCompensationDays;

    governmentCompensationDays = sickDays - 8;
    governmentCompensationSum = governmentCompensationDays * dailyAllowance;
    governmentDailyAllowance =
      governmentCompensationSum / governmentCompensationDays;

    totalCompensationSum =
      employerCompensationDays * dailyAllowance +
      governmentCompensationDays * dailyAllowance;
    totalCompensationDays =
      employerCompensationDays + governmentCompensationDays;
  }

  return {
    emp_comp_day: employerCompensationDays,
    emp_comp_sum: employerCompensationSum,
    employer_daily_allowance: employerDailyAllowance,
    gov_comp_day: governmentCompensationDays,
    gov_comp_sum: governmentCompensationSum,
    government_daily_allowance: governmentDailyAllowance,
    total_compensation_sum: totalCompensationSum,
    total_compensation_day: totalCompensationDays,
  };
}

function setData(data) {
  const employerCompensatesDays = document.querySelector(
    '#employer_compensates_days'
  );
  const employerCompensatesSum = document.querySelector(
    '#employer_compensates_sum'
  );
  const employerDailyAllowance = document.querySelector(
    '#employer_daily_allowance'
  );

  const governmentCompensatesDays = document.querySelector(
    '#government_compensates_days'
  );
  const governmentCompensatesSum = document.querySelector(
    '#government_compensates_sum'
  );

  const governmentDailyAllowance = document.querySelector(
    '#government_daily_allowance'
  );
  const totalCompensationDays = document.querySelector(
    '#total_compensation_day'
  );
  const totalCompensationSum = document.querySelector(
    '#total_compensation_sum'
  );

  const {
    emp_comp_day,
    emp_comp_sum,
    employer_daily_allowance,
    gov_comp_day,
    gov_comp_sum,
    government_daily_allowance,
  } = data;

  employerCompensatesDays.textContent = emp_comp_day;
  employerCompensatesSum.textContent = formatCurrency(emp_comp_sum);
  employerDailyAllowance.textContent = formatCurrency(employer_daily_allowance);

  governmentCompensatesDays.textContent = gov_comp_day;
  governmentCompensatesSum.textContent = formatCurrency(gov_comp_sum);
  governmentDailyAllowance.textContent = formatCurrency(
    government_daily_allowance
  );

  totalCompensationDays.textContent = emp_comp_day + gov_comp_day;
  totalCompensationSum.textContent = formatCurrency(
    emp_comp_sum + gov_comp_sum - (emp_comp_sum + gov_comp_sum) * 0.2
  );
}

function formatCurrency(number) {
  var number = number.toString(),
    euros = number.split('.')[0],
    cents = (number.split('.')[1] || '') + '00';
  euros = euros
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3}(?!$))/g, '$1,')
    .split('')
    .reverse()
    .join('');
  return euros + '.' + cents.slice(0, 2) + '€';
}

function netSalary(grossSalary) {
  let netSalary = 0;
  netSalary = grossSalary - grossSalary * 0.2;
  return netSalary;
}
