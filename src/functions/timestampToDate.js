import dayjs from 'dayjs';

function timestampToDate(timestamp) {
    const date = new Date(Number(timestamp));

    return dayjs(date).format('DD/MM/YYYY');
}

export default timestampToDate;