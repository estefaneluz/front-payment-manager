export function sortDataByName(a, b) {
    return (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
}

export function orderData(state, setState, orderTable) {
    const ordered = [...state];
        ordered.sort(sortDataByName);

        if(orderTable === 'desc') {
            setState(ordered.reverse());
        }

        return setState(ordered);
}
