import moment from 'moment'

export const compareDates = (date1, date2) => {
    const momentDate1 = moment(date1, 'YYYY-MM-DD');
    const momentDate2 = moment(date2, 'YYYY-MM-DD');

    if (momentDate1.isBefore(momentDate2)) {
        return 'before';
    } else if (momentDate1.isAfter(momentDate2)) {
        return 'after';
    } else {
        return 'same';
    }
}