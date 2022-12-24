export function generateAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Пароль введен некорректно';
        case 'EMAIL_EXISTS':
            return 'Пользователь с данным email уже существует';
        case 'EMAIL_NOT_FOUND':
            return 'Email не найден';
        case 'admin password incorrect':
            return 'Admin password incorrect';
        default:
            return 'Слишком много попыток входа. Попробуйте позже';
    }
}
