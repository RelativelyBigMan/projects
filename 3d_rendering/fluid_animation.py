import pygame  as pg 
import math
clock = pg.time.Clock()
background_colour = (255, 255, 255) 
black = (0, 0, 0) 
WINDOW_SIZE = 1000
screen = pg.display.set_mode((WINDOW_SIZE, WINDOW_SIZE)) 
screen.fill(background_colour)




pg.display.flip() 

running = True
x,y = (WINDOW_SIZE//2,WINDOW_SIZE//2)
while running:
    clock.tick(60)
    y+=10
    screen.fill(background_colour)
    pg.draw.circle(surface=screen, color=black, center=(x,y), radius=100)
    pg.display.flip() 
    for event in pg.event.get():    
        if event.type == pg.QUIT: 
            running = False