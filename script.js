async function fetchMenuData() {
	try{
		const response = await fetch('./data.json');
		if (!response.ok){
			throw new Error('데이터를 불러오는데 실패했습니다.')
		}
		const menuData = await response.json(); 
		return menuData.menu;
	} catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function createMenuHTML(item) {
	return`
	 <li class="menu-item" data-type="${item.type}">
      <img src="${item.image}" alt="${item.name}" class="menu-image">
      <div class="menu-info">
        <h3 class="menu-name">${item.name}</h3>
        <p class="menu-price">${item.price.toLocaleString()}원</p>
        <p class="menu-description">${item.description}</p>
      </div>
    <li>

	`;
}
//질문 왜 매개변수에 typeall이 들어간지
async function displayMenu( type = 'all' ) {
	const menuContainer = document.querySelector('.menu-list');
	const menuItems = await fetchMenuData();

	//메뉴 비우기
	menuContainer.innerHTML = '';

	let filteredItems;
	if(type.toLowerCase() === 'all'){
		filteredItems = menuItems;
	}else {
		filteredItems = menuItems.filter(item => 
			item.type.toLowerCase() === type.toLowerCase())
	};

}

if (filterdItems.length > 0) {
	let menuHTML = '';
	filteredItems.forEach(item => {
		menuHTML += createMenuHTML(item);
	});
	menuContainer.innerHTML = menuHTML;
}else {
	menuContainer.innerHTML = '<p class="no-items">해당 카테고리에 메뉴가 없습니다.</p>'
}

function setupTypeButtons() {
	const typeButtons = document.querySelectorall('.type-item a');

	typeButtons.forEach(button => {
		button.addEventListener('click', function() {
			typeButtons.forEach(btn => {
				btn.classList.remove('active');
			});
			this.classList.add('active');

			const menuType = this.textContext;

			displayMenu(menuType);
		})
	})
}

