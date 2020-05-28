const damageRange = 0.3;
let logIndex = 0;

const playerData ={
  name:"プレイヤー",
  hp:100,
  attack:5,
  defence:2,
}

const enemiesData = [
  {
    name:"スライム",
    hp:50,
    attack:3,
    defence:1,
  },
  {
    name:"フェアリー",
    hp:60,
    attack:4,
    defence:2,
  },
  {
    name:"ガーゴイル",
    hp:100,
    attack:5,
    defence:2,
  },
];


console.log(Math.floor(Math.random()*3))

const enemyData = enemiesData[Math.floor(Math.random()* enemiesData.length)]

playerData.maxHp = playerData.hp;
enemyData.maxHp = enemyData.hp;


function insertText(id,text){
  document.getElementById(id).textContent = text;
}

function damageCalculation(attack,defence){
  const maxDamage = attack * (1 + damageRange),
        minDamage = attack * (1 - damageRange),
        attackDamage = Math.floor(Math.random() * (maxDamage - minDamage)+ minDamage);

  const damage = attackDamage- defence;
  if(damage < 1){
    return 0
  } else{
    return damage;
  }
}

function insertLog(texts){
  const logsElement = document.getElementById("logs"),
        createLog = document.createElement("li");
  logIndex ++ ;
  createLog.innerHTML = logIndex+ ": " + texts;
  logsElement.insertBefore(createLog,logsElement.firstChild)
}


insertText("playerName",playerData.name);
insertText("currentPlayerHp",playerData.hp);
insertText("maxPlayerHp",playerData.hp);

insertText("enemyName",enemyData.name);
insertText("currentEnemyHp",enemyData.hp);
insertText("maxEnemyHp",enemyData.hp);

document.getElementById("attack").addEventListener("click",function(){
  let victory = false,
      defeat = false;

  const playerName = '<span style="color: blue;">' + playerData.name + "</span>",
        enemyName = '<span style="color: red;">' + enemyData.name + "</span>";


  
  const playerDamage = damageCalculation(playerData.attack,enemyData.defence);
  enemyData.hp -= playerDamage;
  insertText("currentEnemyHp",enemyData.hp);
  document.getElementById('currentEnemyHpGaugeValue').style.width = (enemyData.hp / enemyData.maxHp * 100) +"%";
  insertLog(playerName + "の攻撃！" + enemyName + "に" + playerDamage + "のダメージ");

  if(enemyData.hp <= 0){
    alert('勝利');
    victory= true;
    enemyData.hp = 0;
    insertText("currentEnemyHp",enemyData.hp);
    document.getElementById('currentEnemyHpGaugeValue').style.width = 0 + "%";
  }


  if(!victory){
    const enemyDamage = damageCalculation(enemyData.attack,playerData.defence);
    playerData.hp -= enemyDamage;
    insertText("currentPlayerHp",playerData.hp);
    document.getElementById('currentPlayerHpGaugeValue').style.width = (playerData.hp / playerData.maxHp * 100) +"%";
    insertLog(enemyName + "の攻撃！" + playerName + "に" + enemyDamage + "のダメージ");
    
    if(playerData.hp <=0){
      alert('敗北');
      defeat= true;
      playerData.hp = 0;
      insertText("currentPlayerHp",playerData.hp);
      document.getElementById('currentPlayerHpGaugeValue').style.width = 0 +"%";
    }
  }
  
  if (victory || defeat){
    this.classList.add("deactive");
  }

})
