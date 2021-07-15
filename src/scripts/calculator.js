import { intervalToDuration, isSameMinute, isAfter, addMinutes } from 'date-fns';

import settings from './config/settings.js';
import messages from './config/messages.js';

function computeClockOutTime_Old(timeList = []) {
    if (timeList.length < 1 || timeList.length % 2 === 0)
        return messages.WRONG_NUMBER_ENTRIES;

    timeList = orderTimeList(timeList, true);

    let totalDuration = settings.DAILY_WORK_TIME;
    let tailIndex = timeList.length - 1;
    while (tailIndex > 0) {
        //totalDuration.subtract(moment.duration(timeList[tailIndex].diff(timeList[tailIndex - 1])));

        if (totalDuration.minutes < -1 * (settings.MAX_EXTRA(settings).minutes))
            return messages.EXCEEDS_MAX_ALLOWED;

        timeList.pop();
        timeList.pop();
        tailIndex -= 2;
    }

    if (totalDuration < 0)
        return '\nERROR: Extra hours: Not implemented.';

    return timeList[0].subtract(totalDuration);
}

function computeClockOutTime(timeList = []) {
    if (timeList.length < 1 && timeList.length % 2 === 0)
        return messages.WRONG_NUMBER_ENTRIES;

    timeList = orderTimeList(timeList, true); timeList.forEach(time => console.log(time.toLocaleString()));

    let totalDuration = settings.DAILY_WORK_TIME;
    let tailIndex = timeList.length - 1;

    while (tailIndex > 0) {
        const duration = intervalToDuration({ start: timeList[tailIndex], end: timeList[tailIndex - 1] });
        totalDuration -= (duration.hours * 60 + duration.minutes);

        if (totalDuration.minutes < -1 * (settings.MAX_EXTRA(settings).minutes))
            return messages.EXCEEDS_MAX_ALLOWED;

        timeList.pop();
        timeList.pop();
        tailIndex -= 2;
    }
    if (totalDuration < 0)
        return '\nERROR: Extra hours: Not implemented.';

    return addMinutes(timeList[0], totalDuration).toLocaleString();
}

function orderTimeList(timeList, reverse) {
    let orderedList = timeList;

    orderedList.sort((a, b) => {
        if (isSameMinute(a, b)) return 0;
        else if (isAfter(a, b)) return 1;
        else return -1;
    });

    return reverse ? orderedList.reverse() : orderedList;
}

// function printDuration(duration = moment.duration(1, 's'), isDebug = false, asMinutes = false) {
//     let timeToPrint = asMinutes ?
//         `${duration}min` :
//         `${duration.hours}:${duration.minutes}`;

//     return isDebug ? console.log(timeToPrint) : timeToPrint;
// }

computeClockOutTime(settings.TIME_LIST);