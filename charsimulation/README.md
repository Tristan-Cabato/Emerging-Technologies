# Preview
<div style="margin-bottom: 2rem; text-align:center;">
    <img src="app/resources/Screenshot 2026-02-01 141204.png" alt="Preview" width="600" height="200">
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
        <img src="app/resources/Screenshot 2026-02-01 135129.png" alt="Concept Draft" width="600" height="200">
        <span style="padding: 20%"> Here was the rough idea for it </span>
    </div>
</div>

# Features:
- Randomizes character display and the number of characters to be displayed 
    - 1 to c.length()
- Character movement (every 1.2 seconds)
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
<div style="margin-bottom:4rem;">
</div>
<hr>

<div style="text-align: center;"> If you are curious about the character list, here it is:
    <ul style="font-weight: bold; color: hotpink"> 7 Stars
        <li> Fu Hua (Honkai Impact 3rd) </li>
    </ul>
    <ul style="font-weight: bold; color: red"> 6 Stars
        <li> </li>
    </ul>
    <ul style="font-weight: bold; color: yellow"> 5 Stars
        <li> Silverwolf (Honkai: Star Rail)</li>
    </ul>
    <ul style="font-weight: bold; color: purple"> 4 Stars
        <li> Jianxin (Wuthering Waves) </li>
    </ul>
    <ul style="font-weight: bold; color: violet"> 3 Stars
        <li> </li>
    </ul>
    <ul style="font-weight: bold; color: blue"> 2 Stars
        <li> </li>
    </ul>
    <ul style="font-weight: bold; color: grey"> 1 Star
        <li> </li>
    </ul>
</div>

