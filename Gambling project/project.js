// 1. deposit some money
// 2. determine the number of lines
// 3. collect a bet
// 4. spin the slot machine
// 5. check the user won
// 6. user won give money
// 7. lost to get back and play again

const prompt = require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT={
  A:2,
  B:4,
  C:6,
  D:8
}

const SYMBOLS_VALUES = {
  A:5,
  B:4,
  C:3,
  D:2
}

const deposit = () => {
  while(true){
  const depositAmount= prompt("Enter a deposit Amount : ");
  const numberdepositAmount= parseFloat(depositAmount);

  if(isNaN(numberdepositAmount)|| numberdepositAmount<=0){
    console.log("Invalid Deposit Amount, try again.")
  }
  else{
    return numberdepositAmount;
  }
}
};

const getNumberoflines=()=>{
  while(true){
    const lines= prompt("Enter a number of lines to bet on (1-3): ");
    const numberoflines= parseFloat(lines);
  
    if(isNaN(numberoflines)|| numberoflines<=0 || numberoflines>3){
      console.log("Wrong number of lines, try again.")
    }
    else{
      return numberoflines;
    }
  }
};

const getbet = (balance,lines) =>{
  while(true){
    const bet= prompt("Enter a total bet per line: ");
    const betAmount= parseFloat(bet);
  
    if(isNaN(betAmount)|| betAmount<=0 || betAmount> balance / lines){
      console.log("Invalid Bet Amount, try again.")
    }
    else{
      return betAmount;
    }
  }

};

const spin =()=>{
  const symbols=[];
  for (const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
    for(let i=0;i<count;i++){
      symbols.push(symbol);
    }
  }
  
  const reels=[];
  for(let i=0;i<COLS;i++){
    reels.push([]);
    const reelSymbols=[...symbols];
    for(let j=0;j<ROWS;j++){
      const randomindex=Math.floor(Math.random()* reelSymbols.length);
      const selectedSymbol=reelSymbols[randomindex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomindex, 1);

    }
  }
  return reels;
};
const transpose=(reels)=>{
  const rows=[];
  for(let i=0;i<ROWS;i++){
    rows.push([]);
    for(let j=0;j<COLS;j++){
      rows[i].push(reels[j][i]);
  }

  
}
return rows
}

const printrows=(rows)=>{
  for(const row of rows){
    let rowStrings="";
    for(const[i,symbol] of row.entries()){
      rowStrings+=symbol;
      if(i!=row.length-1){
        rowStrings+=" | ";
      }
    }
    console.log(rowStrings);
  }
}

const getwinning=(rows,bet,lines)=>{
  let winnings=0;
  for(let i=0;i<rows;i++){
    const symbols=rows[row];
    let allsame=true;

    for(const symbol of symbols){
      if(symbol !=symbols[0]){
        allsame=false;
        break;
      }
    }
    if(allsame){
      winnings+=bet *SYMBOLS_VALUES[symbols[0]]
    }
  }
  return winnings;

}

const game=()=>{
  let balance=deposit();
  while(true){
    console.log("You have a Balance of, $"+balance);
  const numberoflines= getNumberoflines();
  const bet=getbet(balance, numberoflines);
  balance-=bet*numberoflines;
  const reels=spin();
  const rows =transpose(reels);
  printrows(rows);
  const winnings=getwinning(rows, bet, numberoflines);
  balance+=winnings;
  console.log("You won, $"+ winnings.toString());   

  if(balance<=0){
    console.log("You ran out of money!");
    break;
  }
  const playagain= prompt("If you want to play again (Y/N)?");
  if(playagain!="y")break;
    
  }
};

game();


