import dayjs from 'dayjs';

function timestampToDate(timestamp, mask) {
    const date = new Date(Number(timestamp));

    return dayjs(date).format(mask);
}

export default timestampToDate;