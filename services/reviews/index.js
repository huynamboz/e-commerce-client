const filterReviewByProductId = (productId, listReview) => {
	return listReview.filter(review => review.product.id === productId);
}
export {
	filterReviewByProductId
}
