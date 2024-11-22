// 인벤토리와 관련된 요소 가져오기
const inventoryToggle = document.getElementById("inventory-toggle");
const inventory = document.getElementById("inventory");
const closeInventory = document.getElementById("close-inventory");
const itemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");
const createItemButton = document.getElementById("create-item");
const availableItemsList = document.getElementById("available-items");

// 사용 가능한 아이템 목록 (미리 정의된 아이템)
const availableItems = ["물병", "열쇠", "칼", "손전등", "책","삽"];

// 사용 가능한 아이템 목록 렌더링
function renderAvailableItems() {
  availableItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    availableItemsList.appendChild(listItem);
  });
}

// 초기 목록 렌더링
renderAvailableItems();

// 인벤토리 열기/닫기 기능
inventoryToggle.addEventListener("click", () => {
  inventory.style.display = "flex";
});

closeInventory.addEventListener("click", () => {
  inventory.style.display = "none";
});

// 아이템 생성 버튼 기능
createItemButton.addEventListener("click", () => {
  const itemName = itemInput.value.trim(); // 입력값 가져오기
  if (itemName === "") {
    alert("아이템 이름을 입력해주세요!");
    return;
  }

  // 입력값이 목록에 있는지 확인
  if (!availableItems.includes(itemName)) {
    alert("사용할 수 없는 아이템입니다! 목록을 확인해주세요.");
    return;
  }

  const newItem = createItem(itemName);
  itemList.appendChild(newItem);
  itemInput.value = ""; // 입력값 초기화
});

// 아이템 생성 함수 (제거 버튼 포함)
function createItem(name) {
  const listItem = document.createElement("li");

  // 아이템 이름
  const itemName = document.createElement("span");
  itemName.textContent = name;

  // 제거 버튼
  const removeButton = document.createElement("button");
  removeButton.textContent = "❌";
  removeButton.style.marginLeft = "10px";
  removeButton.addEventListener("click", () => {
    listItem.remove();
  });

  listItem.appendChild(itemName);
  listItem.appendChild(removeButton);

  return listItem;
}
