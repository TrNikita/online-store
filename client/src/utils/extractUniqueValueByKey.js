export function extractUniqueValueByKey(items, key) {
    const valueFromItemsByKey = items.map((i) => i[key]);
    const uniqueValue = [...new Set(valueFromItemsByKey)]; // оставляем уникальные
    return uniqueValue.reduce((acc, curr) => {
        const obj = {};
        obj._id = curr;
        obj.name = curr;
        acc.push(obj);
        return acc;
    }, []); // приводим к формату {_id: 'Apple', name: 'Apple'}
}
