export function totalPrice({basket, products}) {
    if (!basket || !products) return null;

    const priceOfProductsInBasket = basket?.map(
        (b) => products?.find((p) => p._id === b)?.price,
    );

    return priceOfProductsInBasket?.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}
