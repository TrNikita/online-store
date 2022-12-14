export function generateCreateError(message) {
    switch (message) {
        case 'CATEGORY_EXISTS':
            return 'Категория уже существует';
        case 'Category validation failed: name: Path `name` is required., path: Path `path` is required.':
            return 'Введите название категории';
        default:
            return 'Слишком много попыток входа. Попробуйте позже';
    }
}
