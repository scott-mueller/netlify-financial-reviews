import { googleSheetsConfig as config } from '../config/googleSheets';


export const getIncomeData = function () {

    return new Promise( (resolve, reject) => {
        
        const url = `https://spreadsheets.google.com/feeds/list/${config.spreadsheetId}/${config.tabs.incomes}/public/values?alt=json`

        fetch(url)
            .then(data => data.json())
            .then(jsonData => {
            
                const entry = jsonData.feed.entry;

                if (entry.length > 13) {
                    //We have a problem
                }
                
                const incomes = {
                    headings: [],
                    catagories: [],
                    jan: [],
                    feb: [],
                    mar: [],
                    apr: [],
                    may: [],
                    jun: [],
                    jul: [],
                    aug: [],
                    sep: [],
                    oct: [],
                    nov: [],
                    dec: []
                };

                //Format the headings
                for (let i = 0; i < Object.keys(entry[0]).length; ++i) {
                    let key = Object.keys(entry[0])[i];
                    if (key.includes('gsx$')) {
                        if(key !== 'gsx$month') {
                            incomes.catagories.push(entry[0][key].$t);
                            incomes.headings.push(key);
                        }
                    }
                }

                for (let j = 1; j < entry.length; ++j) {
                    const arrToPushTo = entry[j].title.$t.toLowerCase();
                    for (let k = 0; k < incomes.headings.length; ++k) {
                        incomes[arrToPushTo].push(entry[j][incomes.headings[k]].$t);
                    }
                }

                //Lets make these headings human readable
                for (let l = 0; l < incomes.headings.length; ++l) {
                    let newHeading = incomes.headings[l].replace('gsx$', '');
                    //Lets do this a few times to catch all the hyphens
                    newHeading = newHeading.replace('-', ' ');
                    newHeading = newHeading.replace('-', ' ');
                    newHeading = newHeading.replace('-', ' ');
                    incomes.headings[l] = newHeading;
                }

                return resolve(incomes);
        });
    });
};

export const getBillsData = function () {

    return new Promise( (resolve, reject) => {
        
        const url = `https://spreadsheets.google.com/feeds/list/${config.spreadsheetId}/${config.tabs.bills}/public/values?alt=json`

        fetch(url)
            .then(data => data.json())
            .then(jsonData => {
            
                const entry = jsonData.feed.entry;

                const bills = {
                    billNames: [],
                    jan: [],
                    feb: [],
                    mar: [],
                    apr: [],
                    may: [],
                    jun: [],
                    jul: [],
                    aug: [],
                    sep: [],
                    oct: [],
                    nov: [],
                    dec: []
                };

                for (let i = 0; i < entry.length; ++i) {
                    bills.billNames.push(entry[i].title.$t);

                    bills.jan.push(entry[i].gsx$jan.$t);
                    bills.feb.push(entry[i].gsx$feb.$t);
                    bills.mar.push(entry[i].gsx$mar.$t);
                    bills.apr.push(entry[i].gsx$apr.$t);
                    bills.may.push(entry[i].gsx$may.$t);
                    bills.jun.push(entry[i].gsx$jun.$t);
                    bills.jul.push(entry[i].gsx$jul.$t);
                    bills.aug.push(entry[i].gsx$aug.$t);
                    bills.sep.push(entry[i].gsx$sep.$t);
                    bills.oct.push(entry[i].gsx$oct.$t);
                    bills.nov.push(entry[i].gsx$nov.$t);
                    bills.dec.push(entry[i].gsx$dec.$t);
                }

                return resolve(bills);
        });
    });
};

export const getCreditCardData = function () {

};

export const getSpendingOverviewData = function () {

};

export const getSpendingGranularData = function () {

};
