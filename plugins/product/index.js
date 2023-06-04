export default (context, inject, store) => {
	const getNameCategory = (id) => {
		let category = store.state.categories.find(category => category.id === id);
		return category.name;
	};
	const formatPrice = (price) => {
		let formatter = new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
			minimumFractionDigits: 0
			});
		let formatted = formatter.format(price);
		return formatted;
	}
	inject("product",{
		formatPrice: formatPrice
	});
	inject("category",{
		getNameCategory: getNameCategory
	});
}