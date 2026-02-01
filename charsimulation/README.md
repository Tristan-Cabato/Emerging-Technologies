# Preview
<div align="center">
    <img src="./public/resources/Screenshot 2026-02-01 141204.png" alt="Preview" width="600">
    <p><em>Web Preview</em></p>
</div>

# What is this?
A prototype/attempt of my character homescreen system, inspired by dormitory systems in gacha games.

<div align="center">
    <img src="https://i.namu.wiki/i/X78eIsWbZ3EA_hRPbQgWdmyBga0LcsHqBMLGWG3L1BfFQd1F_9RRJ1gqvte4gAY-OVHKxvdKDic32T3kFH3CRw.webp" alt="Girls Frontline" width="600">
    <p><em>Girls Frontline Dorm Screen</em></p>
</div>

A school project which requires the usage of the following:
- ✅ Components
- ✅ Props  
- ✅ Tailwind CSS
- ✅ Lucide React

<div align="center">
    <img src="./public/resources/Screenshot 2026-02-01 135129.png" alt="Concept Draft" width="600">
    <p><em>Here was the rough idea for it</em></p>
</div>

# Features:
- 🎲 Randomizes character display and the number of characters to be displayed (1-20)
- 🏃 Character movement (every 0.8-1.2 seconds)
- 🖱️ Draggable character bubbles
- 📖 Explanation button
- 🔄 Character redraw button
- 🔢 Character count
- ✨ Lightweight transition on redraw

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

---

## Character List

If you are curious about the character list, here it is:

**Star Rarity:** 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1

### 🎮 Honkai Impact 3rd
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Fu Hua | Vill-V | Bronie | Wendy | Tsavorae | Vita | Natasha Cioara |

### 🌟 Genshin Impact
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Furina de Fontaine | Sandrone | Xianyun | Layla | Ineffa | Mona | Ajax |

### 🚂 Honkai: Star Rail
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Silverwolf | Castorice | Kafka | Xueyi | Hanya | Blade | Fu Xuan |

### 🌊 Wuthering Waves
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Phrolova | Mornye | Zani | Jianxin | Zhezhi | Changli | Xiangli Yao |

### 🦊 Zenless Zone Zero
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Yanagi Tsukishiro | Zhu Yuan | Sunna | Qingyi | Trigger | Orphie Magnusson | Ye Shunguang |

### 📚 Blue Archive
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Joumae Saori | Rio Tsukatsuki | Kayoko Oniata | Kikyou Kiryuu | Nagusa Goryou | Fuyu Wakasa | Reijo Kayama |

### 🛡️ Arknights
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Mudrock | Jessica | Skadi | Silence | FEater | Skyfire | Deepcolor |

### 🔬 Arknights: Endfield
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Snowshine | Xaihi | Da Pan | Estella | Fluorite | Last Rite | Endministrator |

### 🐎 Umamusume: Pretty Derby
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Narita Taishin | Cheval Grand | Fenomeno | Twin Turbo | Biwa Hayahide | Satono Diamond | Nakayama Festa |

### ⭐ Stella Sora
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Sapphire | Laru | Freesia | Cosette | Shimiao | Mystique | Coronis |

### 🎤 Project SEKAI
| 🌟 7 | 🌟 6 | 🌟 5 | 🌟 4 | 🌟 3 | 🌟 2 | 🌟 1 |
|------|------|------|------|------|------|------|
| Ena Shinonome | Mafuyu Asahina | Mizuki Akiyama | Shizuku Hinomori | Haruka Kiritani | Honami Mochizuki | Kanade Yoisaki |

PS. I didn't know READMEs don't support full CSS styling so I compromised with this old ah design
