import pygame
import random
import sys
from enum import Enum

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH = 1200
WINDOW_HEIGHT = 800
FPS = 60
GRID_SIZE = 40
MAP_WIDTH = 30
MAP_HEIGHT = 20
CASTING_RANGE = 3

# Colors
COLOR_BACKGROUND = (34, 139, 34)  # Dark green forest
COLOR_WATER = (30, 144, 255)  # Dodger blue
COLOR_PLAYER = (255, 255, 0)  # Yellow
COLOR_TEXT = (255, 255, 255)  # White
COLOR_GOLD = (255, 215, 0)  # Gold
COLOR_RED = (255, 0, 0)  # Red
COLOR_GREEN = (0, 255, 0)  # Green

# Game States
class GameState(Enum):
    MAIN = 1
    FISHING = 2
    SHOP = 3
    INVENTORY = 4
    STATS = 5

# Fish Types
FISH_TYPES = [
    {"name": "Minnow", "value": 5, "chance": 0.5, "color": (100, 149, 237)},
    {"name": "Perch", "value": 15, "chance": 0.3, "color": (255, 165, 0)},
    {"name": "Trout", "value": 30, "chance": 0.15, "color": (192, 192, 192)},
    {"name": "Pike", "value": 60, "chance": 0.05, "color": (184, 134, 11)}
]

# Shop Items
SHOP_ITEMS = {
    "rod_upgrade": {"price": 100, "desc": "Catch better fish"},
    "boat": {"price": 200, "desc": "Walk on water"},
    "skill_luck": {"price": 150, "desc": "Better catch rates"}
}

# Water tiles
water_tiles = set([(x, y) for x in range(10, 25) for y in range(7, 15)])

class Player:
    def __init__(self):
        self.x = 5
        self.y = 5
        self.money = 500
        self.inventory = []
        self.rod_level = 1
        self.has_boat = False
        self.skills = []
    
    def move(self, dx, dy):
        new_x = self.x + dx
        new_y = self.y + dy
        
        if 0 <= new_x < MAP_WIDTH and 0 <= new_y < MAP_HEIGHT:
            if (new_x, new_y) in water_tiles and not self.has_boat:
                return False
            self.x = new_x
            self.y = new_y
            return True
        return False
    
    def near_water(self):
        for wx, wy in water_tiles:
            if abs(wx - self.x) <= CASTING_RANGE and abs(wy - self.y) <= CASTING_RANGE:
                return True
        return False
    
    def fish(self):
        if not self.near_water():
            return None
        
        roll = random.random()
        caught = None
        
        for f in FISH_TYPES:
            bonus = 0.02 * self.rod_level
            if "skill_luck" in self.skills:
                bonus += 0.03
            if roll < f["chance"] + bonus:
                caught = f.copy()
                break
        
        return caught
    
    def sell_fish(self):
        if not self.inventory:
            return 0
        total = sum(f["value"] for f in self.inventory)
        self.money += total
        self.inventory.clear()
        return total

class Game:
    def __init__(self):
        self.screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        pygame.display.set_caption("🎣 KalaMang - Fishing Adventure")
        self.clock = pygame.time.Clock()
        self.font_large = pygame.font.Font(None, 48)
        self.font_medium = pygame.font.Font(None, 32)
        self.font_small = pygame.font.Font(None, 24)
        
        self.player = Player()
        self.state = GameState.MAIN
        self.message = ""
        self.message_timer = 0
        self.fishing_time = 0
        self.fishing_success = False
        self.selected_shop_item = 0
        self.selected_inventory_index = 0
    
    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            
            if event.type == pygame.KEYDOWN:
                if self.state == GameState.MAIN:
                    if event.key == pygame.K_w:
                        self.player.move(0, -1)
                    elif event.key == pygame.K_s:
                        self.player.move(0, 1)
                    elif event.key == pygame.K_a:
                        self.player.move(-1, 0)
                    elif event.key == pygame.K_d:
                        self.player.move(1, 0)
                    elif event.key == pygame.K_SPACE:
                        self.start_fishing()
                    elif event.key == pygame.K_f:
                        self.state = GameState.FISHING
                    elif event.key == pygame.K_h:
                        self.state = GameState.SHOP
                    elif event.key == pygame.K_i:
                        self.state = GameState.INVENTORY
                    elif event.key == pygame.K_t:
                        self.state = GameState.STATS
                
                elif self.state == GameState.FISHING:
                    if event.key == pygame.K_SPACE:
                        self.fishing_success = True
                        self.fishing_time = 0
                    elif event.key == pygame.K_ESCAPE:
                        self.state = GameState.MAIN
                
                elif self.state == GameState.SHOP:
                    if event.key == pygame.K_UP:
                        self.selected_shop_item = max(0, self.selected_shop_item - 1)
                    elif event.key == pygame.K_DOWN:
                        self.selected_shop_item = min(len(SHOP_ITEMS) - 1, self.selected_shop_item + 1)
                    elif event.key == pygame.K_RETURN:
                        self.buy_item(list(SHOP_ITEMS.keys())[self.selected_shop_item])
                    elif event.key == pygame.K_ESCAPE:
                        self.state = GameState.MAIN
                
                elif self.state == GameState.INVENTORY:
                    if event.key == pygame.K_ESCAPE:
                        self.state = GameState.MAIN
                    elif event.key == pygame.K_s:
                        total = self.player.sell_fish()
                        if total > 0:
                            self.message = f"Sold fish for ${total}!"
                            self.message_timer = 120
                        else:
                            self.message = "No fish to sell!"
                            self.message_timer = 120
                
                elif self.state == GameState.STATS:
                    if event.key == pygame.K_ESCAPE:
                        self.state = GameState.MAIN
        
        return True
    
    def start_fishing(self):
        if not self.player.near_water():
            self.message = "Too far from water!"
            self.message_timer = 120
            return
        self.state = GameState.FISHING
        self.fishing_time = 0
        self.fishing_success = False
    
    def buy_item(self, item_name):
        item = SHOP_ITEMS[item_name]
        if self.player.money < item["price"]:
            self.message = "Not enough money!"
            self.message_timer = 120
            return
        
        self.player.money -= item["price"]
        
        if item_name == "rod_upgrade":
            self.player.rod_level += 1
            self.message = f"Rod upgraded to level {self.player.rod_level}!"
        elif item_name == "boat":
            self.player.has_boat = True
            self.message = "You got a boat!"
        elif item_name == "skill_luck":
            if "skill_luck" not in self.player.skills:
                self.player.skills.append("skill_luck")
                self.message = "Luck skill acquired!"
            else:
                self.message = "You already have this skill!"
                self.player.money += item["price"]  # Refund
        
        self.message_timer = 120
    
    def update(self):
        if self.message_timer > 0:
            self.message_timer -= 1
        
        if self.state == GameState.FISHING:
            self.fishing_time += 1
            if self.fishing_time > 300:  # 5 seconds
                caught = self.player.fish()
                if caught:
                    self.player.inventory.append(caught)
                    self.message = f"Caught {caught['name']} worth ${caught['value']}!"
                else:
                    self.message = "Nothing bit this time."
                self.message_timer = 120
                self.state = GameState.MAIN
    
    def draw(self):
        self.screen.fill(COLOR_BACKGROUND)
        
        if self.state == GameState.MAIN:
            self.draw_main()
        elif self.state == GameState.FISHING:
            self.draw_fishing()
        elif self.state == GameState.SHOP:
            self.draw_shop()
        elif self.state == GameState.INVENTORY:
            self.draw_inventory()
        elif self.state == GameState.STATS:
            self.draw_stats()
        
        # Draw message
        if self.message_timer > 0:
            msg_surf = self.font_small.render(self.message, True, COLOR_GOLD)
            self.screen.blit(msg_surf, (20, 20))
        
        pygame.display.flip()
    
    def draw_main(self):
        # Draw map
        map_x = 50
        map_y = 100
        
        for y in range(MAP_HEIGHT):
            for x in range(MAP_WIDTH):
                rect = pygame.Rect(map_x + x * GRID_SIZE, map_y + y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
                
                if (x, y) in water_tiles:
                    pygame.draw.rect(self.screen, COLOR_WATER, rect)
                else:
                    pygame.draw.rect(self.screen, (0, 100, 0), rect)
                
                pygame.draw.rect(self.screen, (50, 50, 50), rect, 1)
        
        # Draw player
        player_rect = pygame.Rect(map_x + self.player.x * GRID_SIZE, map_y + self.player.y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
        pygame.draw.rect(self.screen, COLOR_PLAYER, player_rect)
        player_text = self.font_medium.render("🧍", True, COLOR_PLAYER)
        self.screen.blit(player_text, (player_rect.x + 5, player_rect.y + 5))
        
        # Draw UI
        title = self.font_large.render("🎣 KalaMang", True, COLOR_GOLD)
        self.screen.blit(title, (50, 20))
        
        # Stats bar
        stats_text = f"💰 ${self.player.money} | 🎣 Rod Lv.{self.player.rod_level} | 🚤 {'Yes' if self.player.has_boat else 'No'} | 🎒 {len(self.player.inventory)}"
        stats_surf = self.font_small.render(stats_text, True, COLOR_TEXT)
        self.screen.blit(stats_surf, (50, 750))
        
        # Controls
        controls = [
            "WASD: Move | SPACE: Fish",
            "H: Shop | I: Inventory | T: Stats"
        ]
        for i, ctrl in enumerate(controls):
            ctrl_surf = self.font_small.render(ctrl, True, COLOR_TEXT)
            self.screen.blit(ctrl_surf, (800, 100 + i * 30))
    
    def draw_fishing(self):
        # Draw water
        pygame.draw.rect(self.screen, COLOR_WATER, (100, 100, 1000, 500))
        
        # Draw fishing bar
        bar_width = 400
        bar_height = 50
        bar_x = (WINDOW_WIDTH - bar_width) // 2
        bar_y = 300
        
        pygame.draw.rect(self.screen, (100, 100, 100), (bar_x, bar_y, bar_width, bar_height))
        
        # Target zone (green area)
        target_x = bar_x + 150
        target_width = 100
        pygame.draw.rect(self.screen, COLOR_GREEN, (target_x, bar_y, target_width, bar_height))
        
        # Hook position (moving red bar)
        hook_pos = (self.fishing_time % 400) / 400 * bar_width
        pygame.draw.rect(self.screen, COLOR_RED, (bar_x + hook_pos - 5, bar_y, 10, bar_height))
        
        # Instructions
        instr = self.font_medium.render("Press SPACE when RED is in GREEN!", True, COLOR_TEXT)
        self.screen.blit(instr, (WINDOW_WIDTH // 2 - 250, 200))
        
        # Timer
        time_left = max(0, (300 - self.fishing_time) // 60)
        timer = self.font_small.render(f"Time: {time_left}s", True, COLOR_TEXT)
        self.screen.blit(timer, (WINDOW_WIDTH // 2 - 50, 450))
        
        # ESC to cancel
        esc_text = self.font_small.render("ESC: Cancel", True, COLOR_TEXT)
        self.screen.blit(esc_text, (WINDOW_WIDTH // 2 - 80, 500))
    
    def draw_shop(self):
        title = self.font_large.render("🏪 SHOP", True, COLOR_GOLD)
        self.screen.blit(title, (WINDOW_WIDTH // 2 - 150, 50))
        
        items = list(SHOP_ITEMS.items())
        for i, (key, item) in enumerate(items):
            color = COLOR_GOLD if i == self.selected_shop_item else COLOR_TEXT
            text = f"{'▶ ' if i == self.selected_shop_item else '  '}{key.upper()} - ${item['price']}"
            surf = self.font_medium.render(text, True, color)
            self.screen.blit(surf, (150, 200 + i * 80))
            
            desc = self.font_small.render(item["desc"], True, COLOR_TEXT)
            self.screen.blit(desc, (200, 250 + i * 80))
        
        controls = self.font_small.render("UP/DOWN: Select | ENTER: Buy | ESC: Back", True, COLOR_TEXT)
        self.screen.blit(controls, (150, 700))
    
    def draw_inventory(self):
        title = self.font_large.render("🎒 INVENTORY", True, COLOR_GOLD)
        self.screen.blit(title, (WINDOW_WIDTH // 2 - 200, 50))
        
        if not self.player.inventory:
            empty = self.font_medium.render("Empty", True, COLOR_TEXT)
            self.screen.blit(empty, (WINDOW_WIDTH // 2 - 80, 300))
        else:
            for i, fish in enumerate(self.player.inventory):
                text = f"{fish['name']} - ${fish['value']}"
                surf = self.font_small.render(text, True, fish["color"])
                self.screen.blit(surf, (200, 150 + i * 40))
        
        money_text = self.font_medium.render(f"Total Value: ${sum(f['value'] for f in self.player.inventory)}", True, COLOR_GOLD)
        self.screen.blit(money_text, (200, 600))
        
        controls = self.font_small.render("S: Sell All | ESC: Back", True, COLOR_TEXT)
        self.screen.blit(controls, (200, 700))
    
    def draw_stats(self):
        title = self.font_large.render("📊 STATS", True, COLOR_GOLD)
        self.screen.blit(title, (WINDOW_WIDTH // 2 - 150, 50))
        
        stats = [
            f"Money: ${self.player.money}",
            f"Rod Level: {self.player.rod_level}",
            f"Boat: {'Yes' if self.player.has_boat else 'No'}",
            f"Fish Caught: {len(self.player.inventory)}",
            f"Skills: {', '.join(self.player.skills) if self.player.skills else 'None'}"
        ]
        
        for i, stat in enumerate(stats):
            surf = self.font_medium.render(stat, True, COLOR_TEXT)
            self.screen.blit(surf, (200, 200 + i * 80))
        
        esc_text = self.font_small.render("ESC: Back", True, COLOR_TEXT)
        self.screen.blit(esc_text, (200, 700))
    
    def run(self):
        running = True
        while running:
            running = self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(FPS)
        
        pygame.quit()
        sys.exit()

if __name__ == "__main__":
    game = Game()
    game.run()
