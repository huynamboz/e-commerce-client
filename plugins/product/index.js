export default (context, inject, store) => {
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
}