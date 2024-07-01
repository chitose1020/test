//--------------------定数部--------------------

//--------------------変数部--------------------
//状況
let tet = "option";
//fps測定用
let fps = 60;
let fps_t = 1000 / fps;
let tet_gameloop = 2;
let F = 0;
let last_time = 0;
let time_now = 0;
let FPS = 0;
//設定用
let key_op;
let op_page = 1;
let max_page = 1;
//操作感度
let ARR = 10;
let DAS = 3;
let SDF = 20;
//キーコン
let keycon = [
'ArrowRight',
'ArrowLeft',
'ArrowUp',
'ArrowDown',
'c',
'x',
'z',
'v',
'b'
];
//ミノスキン
let skin_load = 0;
let tet_skin_ID = 0;
const tet_skins = [
 [
 "tet_skin1-1.png",
 "tet_skin1-2.png",
 "tet_skin1-3.png",
 "tet_skin1-4.png",
 "tet_skin1-5.png",
 "tet_skin1-6.png",
 "tet_skin1-7.png",
 "tet_skin1-8.png",
 ]
];
let tet_skin = [];
//フィールド
const firld_x = 10;
const field_y = 50;
const block_size = 30;
//キャンバス
const canvasID = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const canvas_x = canvas.width;
const canvas_y = canvas.height;
const c_x = canvas_x / 2;
const c_y = canvas_y / 2;
c_fx = c_x - block_size * 5;
c_fy = c_y - block_size * 40;
//--------------------関数部--------------------
function load_skin(ID){
 tet_skin = [];
  for(let i = 0; i < 8;i++){
   tet_skin[i] = new Image();
   tet_skin[i].src = tet_skins[ID][i];
    tet_skin[i].onload = () => {
     skin_load++;
     console.log(skin_load);
    };
  }
}
//初期化
function tet_reset(){
 tet = '初期化';
//スキンのロード
skin_load = 0;
load_skin(tet_skin_ID);
//オプション非表示,盤面表示
 document.getElementById("option_back").style.display = "none";
 document.getElementById("tetris").style.display = "block";
 tet = "通常";
}
function reset(){
 document.getElementById("option_back").style.display = "block";
 document.getElementById("tetris").style.display = "none";
 tet = "option";
}
//--------------------ゲーム内処理--------------
function tick(id){
 F++;
//オプション
  if(tet == "option" || tet == "keycon"){
//オプション/感度
   document.querySelector("#ARR").textContent = ARR;
   document.querySelector("#DAS").textContent = DAS;
   document.querySelector("#SDF").textContent = SDF;
//キーコン
   document.querySelector("#key_r").textContent = keycon[0];
   document.querySelector("#key_l").textContent = keycon[1];
   document.querySelector("#key_h").textContent = keycon[2];
   document.querySelector("#key_s").textContent = keycon[3];
   document.querySelector("#key_ho").textContent = keycon[4];
   document.querySelector("#key_rr").textContent = keycon[5];
   document.querySelector("#key_rl").textContent = keycon[6];
   document.querySelector("#key_re").textContent = keycon[7];
   document.querySelector("#key_reop").textContent = keycon[8];
//FPS設定
   document.getElementById("fps_sel").onchange = () => {
    fps = document.getElementById("fps_sel").value;
   }
//ページ数
   document.querySelector("#page").textContent = op_page + "/" + max_page;
  }else{
//--------------------テトリス処理--------------
    if(tet == "通常"){
//--------------------描画----------------------
//キャンバスクリア
ctx.clearRect(0,0,canvas_x,canvas_y);
//フィールド描画
      for(let y = field_y; y >= 0; y--){
       var d_y = y * block_size + c_fy;
        for(let x = 0; x < 10; x++){
         d_x = x * block_size + c_fx;
          if(y > 30){
           ctx.strokeStyle = "black";
           ctx.lineWidth = 1;
           ctx.strokeRect(d_x, d_y, block_size,block_size);
          }
        }
      }
//枠
     ctx.strokeStyle = "#555";
     ctx.lineWidth = 5;
     ctx.strokeRect(c_fx - 2,c_y - block_size * 9 - 2,block_size * 10 + 4,block_size * 20 + 4);
//試しにブロック描画
      if(skin_load > 7){
        for(let i = 0; i < 8; i++){
         ctx.drawImage(tet_skin[i],c_x,c_y + block_size * i);
        }
      }
    }
  }
}
//--------------------ゲームループ--------------
function gameloop(id){
//FPSの調整
var time_now = Date.now();
var F2 = Math.floor((time_now - last_time) * fps / 1000);
if(F < F2){
 tick(id);
}
//FPS関係
   document.querySelector("#fps").textContent = FPS;
    if(time_now - last_time > 1000){
     FPS = F;
     F = 0;
     last_time = time_now;
    }
//ループ
   if(id < tet_gameloop){
   requestAnimationFrame(() => {
    gameloop(id);
   });
  }
}

//--------------------イベント------------------
//オプション/感度
document.querySelector('#arr1').addEventListener('click', () => {
  if(ARR > 1){
   ARR--;
  }
});
document.querySelector('#arr2').addEventListener('click', () => {
  if(ARR < 10){
   ARR++;
  }
});
document.querySelector('#das1').addEventListener('click', () => {
  if(DAS > 0){
   DAS--;
  }
});
document.querySelector('#das2').addEventListener('click', () => {
  if(DAS < 50){
   DAS++;
  }
});
document.querySelector('#sdf1').addEventListener('click', () => {
  if(SDF > 1){
   SDF--;
  }
});
document.querySelector('#sdf2').addEventListener('click', () => {
  if(SDF < 20){
   SDF++;
  }
});
//キーコン
document.querySelector('#k_r').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[0] = "...";
   key_op = 0;
  }
});
document.querySelector('#k_l').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[1] = "...";
   key_op = 1;
  }
});
document.querySelector('#k_h').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[2] = "...";
   key_op = 2;
  }
});
document.querySelector('#k_s').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[3] = "...";
   key_op = 3;
  }
});
document.querySelector('#k_ho').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[4] = "...";
   key_op = 4;
  }
});
document.querySelector('#k_rr').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[5] = "...";
   key_op = 5;
  }
});
document.querySelector('#k_rl').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[6] = "...";
   key_op = 6;
  }
});
document.querySelector('#k_re').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[7] = "...";
   key_op = 7;
  }
});
document.querySelector('#k_reop').addEventListener('click', () => {
  if(tet != "keycon"){
   tet = 'keycon';
   keycon[8] = "...";
   key_op = 8;
  }
});
document.querySelector('#play').addEventListener('click', () => {
 tet_reset();
});
//キーイベント
document.addEventListener('keydown',(e) => {
  if(tet == "keycon"){
   keycon[key_op] = e.key;
   tet = "option";
  }
});
//--------------------実行----------------------
reset();
 gameloop(0);
 gameloop(1);
