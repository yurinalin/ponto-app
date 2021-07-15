const settings = {
    // HOURS * 60 + MINUTES
    DAILY_WORK_TIME: 8 * 60 + 48,
    MAX_PUNCHES_PER_DAY: 8,
    MAX_WORKTIME_ALLOWED: 10 * 60,
    MAX_EXTRA: (settings) => { return settings.MAX_WORKTIME_ALLOWED - settings.DAILY_WORK_TIME },
    TIME_LIST: [
        new Date(2021, 4, 31, 7, 58),
        new Date(2021, 4, 31, 12, 5),
        new Date(2021, 4, 31, 13, 7),
    ]
}

export default settings;