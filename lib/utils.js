export const getFormattedDate = (data) =>{
    var date = new Date(data);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if (month<10){
        month='0'+month;
    }
    var year = date.getFullYear();

    return day + '\\' + month + '\\' + year;

}