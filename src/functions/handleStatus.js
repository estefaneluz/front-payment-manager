import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export const handleStatus = (status, date) => {
    if(status) {
        return {
            text: "Pago",
            className: "green"
        }
    } else {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const formatedDate =  dayjs(Number(date)).format('YYYY-MM-DD');
 
        if(dayjs(currentDate).isSameOrBefore(dayjs(formatedDate))){
            return {
                text: "Pendente",
                className: "blue"
            }
        } else {
            return {
                text: "Vencido",
                className: "red"
            }
        }
    }
}