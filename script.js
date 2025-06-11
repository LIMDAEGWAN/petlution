function showTab(tabId) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  contents.forEach((tab) => tab.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

function getFactor(ageGroup) {
  if (ageGroup === "senior") return 1.2;
  if (ageGroup === "inactive") return 1.0;
  if (ageGroup === "puppy") return 2.0;
  return 1.4;
}

function calculateMealOnly() {
  const weight = parseFloat(document.getElementById("mealOnlyWeight").value);
  const kcalPerPack = parseFloat(document.getElementById("mealOnlyType").value);
  const ageGroup = document.getElementById("mealOnlyAge").value;

  if (isNaN(weight) || weight <= 0) {
    alert("몸무게를 올바르게 입력해주세요.");
    return;
  }

  const factor = getFactor(ageGroup);
  const RER = 70 * Math.pow(weight, 0.75);
  const dailyCalories = RER * factor;
  const packs = Math.round(dailyCalories / kcalPerPack);

  document.getElementById("mealOnlyResult").innerHTML = `
    ✅ 총 필요 열량: <b>${dailyCalories.toFixed(1)} kcal</b><br>
    ✅ 1팩 열량: <b>${kcalPerPack} kcal</b><br>
    ✅ 추천 화식 급여량: <b>${packs} 팩</b>
  `;
}

function calculateWithKibble() {
  const weight = parseFloat(document.getElementById("kibbleWeight").value);
  const kcalPerPack = parseFloat(document.getElementById("kibbleMealType").value);
  const packCount = parseInt(document.getElementById("kibbleMealCount").value);
  const ageGroup = document.getElementById("kibbleAge").value;

  if (isNaN(weight) || weight <= 0 || isNaN(packCount) || packCount < 0) {
    alert("입력값을 올바르게 확인해주세요.");
    return;
  }

  const factor = getFactor(ageGroup);
  const RER = 70 * Math.pow(weight, 0.75);
  const dailyCalories = RER * factor;
  const mealCalories = packCount * kcalPerPack;
  const kibbleCalories = dailyCalories - mealCalories;

  document.getElementById("kibbleResult").innerHTML = `
    ✅ 총 필요 열량: <b>${dailyCalories.toFixed(1)} kcal</b><br>
    ✅ 오늘화식 제공 열량: <b>${mealCalories.toFixed(1)} kcal</b><br>
    ✅ 사료로 보충할 열량: <b>${kibbleCalories > 0 ? kibbleCalories.toFixed(1) : 0} kcal</b>
  `;
}