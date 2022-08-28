import * as moment from "moment";

export const sumAllDayPrice = (price:number,diference:number) => {
    let end = diference || diference + 1;
    let total_cost = 0;
    if (diference >= 18) {
        total_cost = (end - 17) * price * 0.85 + sumAllDayPrice(price,17);
    } else if (diference >= 10) {
        total_cost = (end - 9) * price * 0.9 + sumAllDayPrice(price,9);
    } else if (diference >= 5) {
        total_cost = (end - 4) * price * 0.95 + sumAllDayPrice(price,4);
    } else {
        total_cost = end * price;
    }
    return total_cost
}







