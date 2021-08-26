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

    return new Promise( (resolve, reject) => {
        
        const url = `https://spreadsheets.google.com/feeds/list/${config.spreadsheetId}/${config.tabs.creditCards}/public/values?alt=json`

        fetch(url)
            .then(data => data.json())
            .then(jsonData => {
            
                const entry = jsonData.feed.entry;

                const creditCards = {
                    cards: [],
                    statementBalance: {
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
                    },
                    payments: {
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
                    },
                    spendingTotal: {
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
                    },
                    interest: {
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
                    }
                };

                for (let i = 0; i < entry.length; i = i + 4) {
                    creditCards.cards.push(entry[i].title.$t);
                    for (let j = 0; j < 4; ++j) {

                        //find the object we are inserting into
                        const field = entry[i+j].gsx$field.$t;
                        if (field === 'Statement Balance') {
                            creditCards.statementBalance.jan.push(entry[i+j].gsx$january.$t);
                            creditCards.statementBalance.feb.push(entry[i+j].gsx$febuary.$t);
                            creditCards.statementBalance.mar.push(entry[i+j].gsx$march.$t);
                            creditCards.statementBalance.apr.push(entry[i+j].gsx$april.$t);
                            creditCards.statementBalance.may.push(entry[i+j].gsx$may.$t);
                            creditCards.statementBalance.jun.push(entry[i+j].gsx$june.$t);
                            creditCards.statementBalance.jul.push(entry[i+j].gsx$july.$t);
                            creditCards.statementBalance.aug.push(entry[i+j].gsx$august.$t);
                            creditCards.statementBalance.sep.push(entry[i+j].gsx$september.$t);
                            creditCards.statementBalance.oct.push(entry[i+j].gsx$october.$t);
                            creditCards.statementBalance.nov.push(entry[i+j].gsx$november.$t);
                            creditCards.statementBalance.dec.push(entry[i+j].gsx$december.$t);
                        }
                        else if (field === 'Payments') {
                            creditCards.payments.jan.push(entry[i+j].gsx$january.$t);
                            creditCards.payments.feb.push(entry[i+j].gsx$febuary.$t);
                            creditCards.payments.mar.push(entry[i+j].gsx$march.$t);
                            creditCards.payments.apr.push(entry[i+j].gsx$april.$t);
                            creditCards.payments.may.push(entry[i+j].gsx$may.$t);
                            creditCards.payments.jun.push(entry[i+j].gsx$june.$t);
                            creditCards.payments.jul.push(entry[i+j].gsx$july.$t);
                            creditCards.payments.aug.push(entry[i+j].gsx$august.$t);
                            creditCards.payments.sep.push(entry[i+j].gsx$september.$t);
                            creditCards.payments.oct.push(entry[i+j].gsx$october.$t);
                            creditCards.payments.nov.push(entry[i+j].gsx$november.$t);
                            creditCards.payments.dec.push(entry[i+j].gsx$december.$t);
                        }
                        else if (field === 'Spending Total') {
                            creditCards.spendingTotal.jan.push(entry[i+j].gsx$january.$t);
                            creditCards.spendingTotal.feb.push(entry[i+j].gsx$febuary.$t);
                            creditCards.spendingTotal.mar.push(entry[i+j].gsx$march.$t);
                            creditCards.spendingTotal.apr.push(entry[i+j].gsx$april.$t);
                            creditCards.spendingTotal.may.push(entry[i+j].gsx$may.$t);
                            creditCards.spendingTotal.jun.push(entry[i+j].gsx$june.$t);
                            creditCards.spendingTotal.jul.push(entry[i+j].gsx$july.$t);
                            creditCards.spendingTotal.aug.push(entry[i+j].gsx$august.$t);
                            creditCards.spendingTotal.sep.push(entry[i+j].gsx$september.$t);
                            creditCards.spendingTotal.oct.push(entry[i+j].gsx$october.$t);
                            creditCards.spendingTotal.nov.push(entry[i+j].gsx$november.$t);
                            creditCards.spendingTotal.dec.push(entry[i+j].gsx$december.$t);
                        }
                        else if (field === 'Interest') {
                            creditCards.interest.jan.push(entry[i+j].gsx$january.$t);
                            creditCards.interest.feb.push(entry[i+j].gsx$febuary.$t);
                            creditCards.interest.mar.push(entry[i+j].gsx$march.$t);
                            creditCards.interest.apr.push(entry[i+j].gsx$april.$t);
                            creditCards.interest.may.push(entry[i+j].gsx$may.$t);
                            creditCards.interest.jun.push(entry[i+j].gsx$june.$t);
                            creditCards.interest.jul.push(entry[i+j].gsx$july.$t);
                            creditCards.interest.aug.push(entry[i+j].gsx$august.$t);
                            creditCards.interest.sep.push(entry[i+j].gsx$september.$t);
                            creditCards.interest.oct.push(entry[i+j].gsx$october.$t);
                            creditCards.interest.nov.push(entry[i+j].gsx$november.$t);
                            creditCards.interest.dec.push(entry[i+j].gsx$december.$t);
                        }
                    }
                }

                return resolve(creditCards);
        });
    });
    
    // For this we need to get a little more creative
    // Each credit card needs 4 rows to get all its data
    // How are we going to manage this?
    /**
     * 
     * If i'm not careful, this object is going to get very verbose and very hard to index when we display the results
     * My thoughts are keep each card field as its own object
     * cards: [capitalOne, openSky, usaa, etc]
     * statementBal: {
     *      Jan: [123, 433, 212, 1000, ],
     *      etc
     * },
     * 
     * Display the total we paid in USAA interest this year
     * We need to find the index of USAA in cards array, then add the values

     */
};

export const getSpendingOverviewData = function () {

};

export const getSpendingGranularData = function () {

};
