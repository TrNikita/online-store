export function generateCreateError(message) {
    const productError = message.indexOf('Product validation');
    if (productError !== -1)
        return 'Название, категория, бренд и цена обязательны для заполнения';

    const categoryError = message.indexOf('Category validation');
    if (categoryError !== -1) return 'Введите название категории';

    switch (message) {
        case 'CATEGORY_EXISTS':
            return 'Категория уже существует';
        case 'PRODUCT_EXISTS':
            return 'Продукт уже существует';
    }
}
