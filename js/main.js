/* Za pomocą funkcji fetch pobierz dane z api https://www.blockchain.info/pl/ticker. Wyświetl ostatnią (last) wartrość kursu PLN/TBC w paragrafie z id exchange-rate */

function getExchangeData() {
    
    let exchangeRateSpan = document.getElementById('exchange-rate');
    let previousPrice = parseFloat(exchangeRateSpan.innerText);
    let rateArrow = document.getElementById('rate-arrow');
    
    console.log(previousPrice);
    
    fetch('https://blockchain.info/pl/ticker')
    .then(response=>response.json())
    .then(response=>{
        
        let lastPrice = response.PLN.last;
        
        document.getElementById('rate-arrow').className = 'fas fa-arrow-up';
        
        /* Napisz warunek, który sprawdzi czy nowa cena jest większa, mniejsza, lub równa poprzedniej */
        console.log(lastPrice);
        if(previousPrice>lastPrice && previousPrice !==0) {
            rateArrow.className = 'fas fa-arrow-down red';        
        } else if (previousPrice<lastPrice && previousPrice !==0) {
            rateArrow.className = 'fas fa-arrow-up green';
        } else {
            rateArrow.className = 'far fa-minus-square';
        }
         
        exchangeRateSpan.innerText = response.PLN.last;
    });
}

getExchangeData();

let exchangeInterval = setInterval(getExchangeData, 5000);


/* Delegacja eventów */

document.getElementById('interval-panel').addEventListener('click', function(e) {
    
    if(e.target && e.target.nodeName == 'BUTTON') {
        clearInterval(exchangeInterval);
        exchangeInterval = setInterval(getExchangeData, parseInt(e.target.value));
        document.getElementById('intertal-time').innerText = e.target.innerText;
        console.log(e.target.value);
    }
});
