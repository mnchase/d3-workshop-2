
const getAge = date_string => {
    const birthdate = new Date(date_string);

    const epoch = 1970;
    const current_time = Date.now();
    const time_at_birthdate = birthdate.getTime();
    
    const age_date_from_epoch = new Date(current_time - time_at_birthdate);
    const age_years_from_epoch = age_date_from_epoch.getUTCFullYear()

    return Math.abs(age_years_from_epoch - epoch);
}