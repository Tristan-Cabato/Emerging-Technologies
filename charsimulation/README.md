<head>
    <style>
        /* ======= Star Colors ======== */
        .tier7 { color: hotpink; }
        .tier6 { color: red; }
        .tier5 { color: yellow; }
        .tier4 { color: purple; }
        .tier3 { color: violet; }
        .tier2 { color: blue; }
        .tier1 { color: gray; }
    </style>
</head>

# Preview
<div style="margin-bottom: 2rem; text-align:center;">
    <img src="./public/resources/Screenshot 2026-02-01 141204.png" alt="Preview" width="600" height="200">
    Web Preview
</div>

# What is this?
<div style="margin-bottom: 2rem;">
    <li> A prototype/attempt of my character homescreen system, inspired by dormitory systems in gacha games</li>
    <div align="center">
        <img src="https://i.namu.wiki/i/X78eIsWbZ3EA_hRPbQgWdmyBga0LcsHqBMLGWG3L1BfFQd1F_9RRJ1gqvte4gAY-OVHKxvdKDic32T3kFH3CRw.webp" alt="Girls Frontline" width="600" height="200">
        Girls Frontline Dorm Screen
    </div>
    <div style="margin-top: 1rem;">
        <li> A school project which requires the usage of the following:</li>
    </div>
    <div style="padding-left: 3rem;">
        > Components <br>
        > Props <br>
        > Tailwind CSS <br>
        > Lucide React <br>
        <img src="./public/resources/Screenshot 2026-02-01 135129.png" alt="Concept Draft" width="600" height="200">
        <span style="padding: 20%"> Here was the rough idea for it </span>
    </div>
</div>

# Features:
- Randomizes character display and the number of characters to be displayed 
    - 1 to c.length() [Limited to 20]
- Character movement (every 0.8-1.2 seconds)
- Draggable character bubbles
- Explanation button
- Character redraw button
- Character count
- Lightweight transition on redraw
<div style="margin-bottom:2rem;"></div>

# Nitpicks:
- Display size is fixed and non-responsive
- The vertical collision of characters just keep changing in my end so I didn't bother
- Probably should have used canvas instead of divs
- No collision checks between characters
- The rarity is just for fluff, it's not weighted
- Supposedly this was supposed to be just a horizontal movement check but that would just cause 11 characters stacking on each other
- Transition via the redraw button fires twice because of React Strict mode
- I genuinely don't know why the sidebar colors mismatch the navigation bar, it's the same variable. And no it's not because of the blur filter.
- The characters aren't actually props, those are data. The only props are the character count, info popup, header buttons, and the character count footer
- I don't think it needs an expert to know why having a lot of online image calls as a program backbone is a bad idea
<div style="margin-bottom:4rem;">
</div>
<hr>

<div style="text-align: center;"> If you are curious about the character list, here it is: 
    <div style="font-weight: bold;"> Stars: <span class="tier7"> 7 </span>| <span class="tier6"> 6 </span>| <span class="tier5"> 5 </span>| <span class="tier4"> 4 </span>| <span class="tier3"> 3 </span>| <span class="tier2"> 2 </span>| <span class="tier1"> 1 </span> | 
    </div>
</div><br>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px;">
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Honkai Impact 3rd </span> 
        <text class="tier7"> Fu Hua </text>
        <text class="tier6"> Vill-V </text>
        <text class="tier5"> Bronie </text>
        <text class="tier4"> Wendy </text>
        <text class="tier3"> Tsavorae </text>
        <text class="tier2"> Vita </text>
        <text class="tier1"> Natasha Cioara </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Genshin Impact </span> 
        <text class="tier7"> Furina de Fontaine </text>
        <text class="tier6"> Sandrone </text>
        <text class="tier5"> Xianyun </text>
        <text class="tier4"> Layla </text>
        <text class="tier3"> Ineffa </text>
        <text class="tier2"> Mona </text>
        <text class="tier1"> Ajax </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Honkai: Star Rail </span> 
        <text class="tier7"> Silverwolf </text>
        <text class="tier6"> Castorice </text>
        <text class="tier5"> Kafka </text>
        <text class="tier4"> Xueyi </text>
        <text class="tier3"> Hanya </text>
        <text class="tier2"> Blade </text>
        <text class="tier1"> Fu Xuan </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;">
        <span style="border: solid white; padding: 2px;"> Wuthering Waves </span>
        <text class="tier7"> Phrolova </text>
        <text class="tier6"> Mornye </text>
        <text class="tier5"> Zani </text>
        <text class="tier4"> Jianxin </text>
        <text class="tier3"> Zhezhi </text>
        <text class="tier2"> Changli </text>
        <text class="tier1"> Xiangli Yao </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Zenless Zone Zero </span>
        <text class="tier7"> Yanagi Tsukishiro </text>
        <text class="tier6"> Zhu Yuan </text>
        <text class="tier5"> Sunna   </text>
        <text class="tier4"> Qingyi </text>
        <text class="tier3"> Trigger </text>
        <text class="tier2"> Orphie Magnusson </text>
        <text class="tier1"> Ye Shunguang </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Blue Archive </span>
        <text class="tier7"> Joumae Saori </text>
        <text class="tier6"> Rio Tsukatsuki </text>
        <text class="tier5"> Kayoko Oniata </text>
        <text class="tier4"> Kikyou Kiryuu </text>
        <text class="tier3"> Nagusa Goryou </text>
        <text class="tier2"> Fuyu Wakasa </text>
        <text class="tier1"> Reijo Kayama </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Arknights </span>
        <text class="tier7"> Mudrock </text>
        <text class="tier6"> Jessica </text>
        <text class="tier5"> Skadi </text>
        <text class="tier4"> Silence </text>
        <text class="tier3"> FEater </text>
        <text class="tier2"> Skyfire </text>
        <text class="tier1"> Deepcolor </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Arknights: Endfield </span>
        <text class="tier7"> Snowshine </text>
        <text class="tier6"> Xaihi </text>
        <text class="tier5"> Da Pan </text>
        <text class="tier4"> Estella </text>
        <text class="tier3"> Fluorite </text>
        <text class="tier2"> Last Rite </text>
        <text class="tier1"> Endministrator </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Umamusume: Pretty Derby </span>
        <text class="tier7"> Narita Taishin </text>
        <text class="tier6"> Cheval Grand </text>
        <text class="tier5"> Fenomeno </text>
        <text class="tier4"> Twin Turbo </text>
        <text class="tier3"> Biwa Hayahide </text>
        <text class="tier2"> Satono Diamond </text>
        <text class="tier1"> Nakayama Festa </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Stella Sora </span>
        <text class="tier7"> Sapphire </text>
        <text class="tier6"> Laru </text>
        <text class="tier5"> Freesia </text>
        <text class="tier4"> Cosette </text>
        <text class="tier3"> Shimiao </text>
        <text class="tier2"> Mystique </text>
        <text class="tier1"> Coronis </text>
    </div><br>
    <div style="font-weight: bold; font-size: 16px; display: flex; flex-direction:column; text-align: center;"> 
        <span style="border: solid white; padding: 2px"> Project SEKAI </span>
        <text class="tier7"> Ena Shinonome </text>
        <text class="tier6"> Mafuyu Asahina </text>
        <text class="tier5"> Mizuki Akiyama </text>
        <text class="tier4"> Shizuku Hinomori </text>
        <text class="tier3"> Haruka Kiritani </text>
        <text class="tier2"> Honami Mochizuki </text>
        <text class="tier1"> Kanade Yoisaki </text>
    </div>
</div>

