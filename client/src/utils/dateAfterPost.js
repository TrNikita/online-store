export function dateAfterPost(date) {
    const months = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];

    const parseDate = Date.parse(date);
    const formatDate = new Date(parseDate);
    const dateNow = new Date();
    const timeDifMinutes = (Date.now() - Number(parseDate)) / 60000;

    const dateToHoursMinutes =
        formatDate.getHours() +
        ':' +
        (formatDate.getMinutes() < 10
            ? '0' + formatDate.getMinutes()
            : formatDate.getMinutes());

    const dateToDayMonth =
        (formatDate.getDate() < 10
            ? '0' + formatDate.getDate()
            : formatDate.getDate()) +
        ' ' +
        months[formatDate.getMonth()];

    const dateToDayMonthYear =
        (formatDate.getDate() < 10
            ? '0' + formatDate.getDate()
            : formatDate.getDate()) +
        '.' +
        (formatDate.getMonth() < 9
            ? '0' + (formatDate.getMonth() + 1)
            : formatDate.getMonth() + 1) +
        '.' +
        formatDate.getFullYear();

    switch (true) {
        case timeDifMinutes < 1:
            return '1 минуту назад';
        case timeDifMinutes < 5:
            return '5 минут назад';
        case timeDifMinutes < 10:
            return '10 минут назад';
        case timeDifMinutes < 30:
            return '30 минут назад';
        case formatDate.getDate() === dateNow.getDate() &&
            formatDate.getMonth() === dateNow.getMonth() &&
            formatDate.getFullYear() === dateNow.getFullYear():
            return 'Сегодня в ' + dateToHoursMinutes;
        case formatDate.getFullYear() === dateNow.getFullYear():
            return dateToDayMonth + ' в ' + dateToHoursMinutes;
        default:
            return dateToDayMonthYear;
    }
}
