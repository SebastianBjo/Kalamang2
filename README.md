# 🎣 KalaMang - European Forest Fishing Adventure

A text-based fishing simulation game where you explore a European forest, fish in lakes, and build your wealth by catching and selling fish!

## 📋 Game Overview

**KalaMang** is an interactive command-line fishing game that combines exploration, resource management, and fishing mechanics. Navigate through a forest, discover water areas, and catch various fish species to sell and earn money.

## 🎮 How to Launch the Game

### Prerequisites
- Python 3.6 or higher installed on your system
- Terminal or Command Prompt access

### Installation & Launch

1. **Download the game file**
   - Ensure `main.py` is in your desired directory

2. **Open Terminal/Command Prompt**
   - Navigate to the directory containing `main.py`
   - On Windows: Press `Win + R`, type `cmd`, and navigate to the folder
   - On Mac/Linux: Open Terminal and use `cd` command

3. **Run the game**
   ```bash
   python main.py
   ```
   Or on some systems:
   ```bash
   python3 main.py
   ```

4. **Start playing!**
   - The game will display a welcome message and the map
   - Type commands to interact with the game

## 🕹️ Game Controls

### Movement Commands
- **w** - Move up
- **a** - Move left
- **s** - Move down
- **d** - Move right

### Fishing & Economy
- **fish** - Cast your line and try to catch fish (must be near water)
- **sell** - Sell all fish in your inventory for money
- **shop** - Visit the shop to buy upgrades

### Information
- **map** - Display the current map
- **stats** - Show your character statistics
- **help** - Display available commands
- **quit** - Exit the game

## 🌍 Game Map

- 🧍 **Player** - Your character position
- 🌊 **Water** - Lake/river where you can fish
- 🌲 **Forest** - Trees covering the landscape

The map is 40 units wide and 20 units tall. The water area is located in the center-right portion of the map.

## 🐟 Fish Species

There are 4 types of fish you can catch, each with different values and catch rates:

| Fish | Value | Catch Rate | Difficulty |
|------|-------|-----------|------------|
| 🐟 Minnow | $5 | 50% | Very Easy |
| 🐠 Perch | $15 | 30% | Easy |
| 🎣 Trout | $30 | 15% | Medium |
| 🦈 Pike | $60 | 5% | Hard |

## 💰 Shop & Upgrades

Visit the shop using the **shop** command to purchase upgrades:

### 1. Rod Upgrade ($100)
- **Effect**: Increases your chance to catch better fish
- **Benefit**: Each rod level adds 2% bonus catch chance
- **Stackable**: Yes - upgrade multiple times

### 2. Boat ($200)
- **Effect**: Allows you to walk on water
- **Benefit**: Access fishing spots in the middle of the lake
- **One-time Purchase**: Only need to buy once

### 3. Luck Skill ($150)
- **Effect**: Adds a small bonus to catch rare fish
- **Benefit**: +3% catch chance bonus
- **One-time Purchase**: Only need to buy once

## 📊 Game Statistics

Check your progress with the **stats** command:
- **Money** - Your current wealth
- **Rod Level** - Current fishing rod upgrade level
- **Boat** - Whether you own a boat (Yes/No)
- **Fish in Inventory** - Number of fish you're carrying
- **Skills** - Active skill bonuses

## 🎯 Gameplay Strategy

### For Beginners:
1. Start fishing near the water (west side of the lake)
2. Catch Minnows and Perch to build up money
3. Once you have $100, upgrade your rod
4. Continue fishing and selling to accumulate wealth

### For Advanced Players:
1. Save up $200 for a boat to access the center of the lake
2. With a boat, you can fish for rarer species (Trout & Pike)
3. Buy the Luck Skill ($150) to increase rare fish catches
4. Maximize profits by focusing on high-value fish

### Fishing Tips:
- You must be within 3 tiles of water to cast your line
- You cannot walk on water without a boat
- Higher rod levels improve your chances of catching rarer fish
- The Luck Skill stacks with rod level bonuses

## 🔄 Game Loop

1. **Explore** - Move around the forest using WASD
2. **Fish** - When near water, use the fish command
3. **Earn** - Catch fish and sell them for money
4. **Upgrade** - Buy upgrades to improve your fishing ability
5. **Repeat** - Continue fishing and upgrading to maximize wealth

## 🎨 Visual Elements

The game uses emoji characters for visual representation:
- 🧍 Player character
- 🌊 Water/Lake
- 🌲 Forest/Trees
- 🐟 Fish caught
- 💰 Money
- 🎣 Fishing rod
- 🚤 Boat
- 🎒 Inventory

## 📈 Game Features

✅ **Exploration** - Navigate a 40x20 forest map
✅ **Fishing System** - Catch fish with variable success rates
✅ **Economy** - Buy and sell items
✅ **Progression** - Upgrade equipment and skills
✅ **Inventory Management** - Track caught fish
✅ **Statistics Tracking** - Monitor your progress
✅ **Interactive Shop** - Purchase upgrades
✅ **Dynamic Catch Rates** - Better equipment = better catches

## 🐛 Troubleshooting

### Game won't start
- Ensure Python 3.6+ is installed
- Check that `main.py` is in the current directory
- Try using `python3 main.py` instead of `python main.py`

### Can't catch fish
- Make sure you're within 3 tiles of water
- Use the **map** command to see water locations
- Try moving closer to the blue water area

### Can't walk on water
- You need to buy a boat first
- Visit the shop and purchase "boat" for $200

### Unknown command error
- Type **help** to see all available commands
- Commands are case-insensitive (w, W, or W all work)

## 🎮 Game Objectives

- **Beginner Goal**: Catch 10 fish and earn $500
- **Intermediate Goal**: Upgrade your rod to level 5 and buy a boat
- **Advanced Goal**: Catch 50 fish and accumulate $2000
- **Master Goal**: Unlock all upgrades and catch all fish species

## 📝 Notes

- Progress is only saved during your current session
- The game ends when you type **quit**
- There's no game over condition - play as long as you want!
- Experiment with different strategies to find your playstyle

## 🎉 Enjoy the Game!

Have fun exploring the European forest and catching fish. Good luck, and may your catches be plentiful!

---

**Game Version**: 1.0  
**Last Updated**: 2024  
**Made with ❤️ for fishing enthusiasts**
