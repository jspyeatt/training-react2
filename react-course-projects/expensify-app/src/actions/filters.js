export const setTextFilter = (textValue = '') => ({
    type: 'SET_TEXT_FILTER',
    text: textValue
});
export const setSortByAmount = () => ({
    type: 'SET_SORT_BY',
    sortBy: 'amount'
});
export const setSortByDate = () => ({
    type: 'SET_SORT_BY',
    sortBy: 'date'
});
export const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    startDate: date
});
export const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    endDate: date
});