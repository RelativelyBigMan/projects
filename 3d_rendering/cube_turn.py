import pygame  as pg 
import math
import time
background_colour = (255, 255, 255) 
black = (0, 0, 0) 
screen = pg.display.set_mode((1000, 1000)) 
screen.fill(background_colour)
vertices = [
    (-1, -1, -1),
    (-1, -1, 1),
    (-1, 1, -1),
    (-1, 1, 1),
    (1, -1, -1),
    (1, -1, 1),
    (1, 1, -1),
    (1, 1, 1)
]



edges = [
    (0,1), (1,3), (2,3), (2,0),
    (5,7), (4,6), (6,7), (4,5),
    (0,4), (1,5), (2,6), (3,7)
]


def rotate_x(angle):
    cos_angle = math.cos(angle)
    sin_angle = math.sin(angle)

    mat_x_axis = [
    [1,0,0],
    [0, cos_angle, -sin_angle],
    [0, sin_angle, cos_angle]
    ]

    return mat_x_axis

def rotate_y(angle):
    cos_angle = math.cos(angle)
    sin_angle = math.sin(angle)

    mat_y_axis = [
    [cos_angle,0,sin_angle],
    [0, 1, 0],
    [-sin_angle, 0, cos_angle]
    ]

    return mat_y_axis

def rotate_z(angle):
    cos_angle = math.cos(angle)
    sin_angle = math.sin(angle)

    mat_z_axis = [
    [cos_angle,-sin_angle,0],
    [sin_angle, cos_angle, 0],
    [0, 0, 1]
    ]

    return mat_z_axis



def dot_mutiply_mat(mat,coord):
    rotated_point = []
    for row in mat:
        res = row[0] * coord[0] + row[1] * coord[1] + row[2] * coord[2] 
        rotated_point.append(res)
    return tuple(rotated_point)

def rotate_vertices(coords):

    rotated_vertices = []
    x_mat = rotate_z(6)

    for coord in coords:
        rotated_vertices.append(dot_mutiply_mat(x_mat, coord))
    return rotated_vertices

print(rotate_vertices(vertices))  

# print(rotate_coord(x_mat, vertices[1]))
# pg.draw.line(screen, black, (0,100), (500,700),6)

def draw_image(vertices,edges):

    def get_2d_image(vertices):
        projected_coords = []
        scale_factor = 100
        screen_center_x, screen_center_y = 500,500
        FOV = 4
        for coord in vertices:
            x,y,z = coord
            projected_x = (x * FOV / FOV + z) * scale_factor + screen_center_x
            projected_y = (y * FOV / FOV + z) * scale_factor + screen_center_y
            projected_coords.append((projected_x,projected_y))
        return projected_coords
        
    projected_coords = get_2d_image(vertices)
    # print(projected_coords)
    # print(edges)
    for edge in edges:
        print("these are projected",projected_coords[edge[0]], projected_coords[edge[1]])
        pg.draw.line(screen, black, projected_coords[edge[0]], projected_coords[edge[1]],6)
        
    pg.display.flip() 
    
vertices = rotate_vertices(vertices)
draw_image(vertices,edges)

 













running = True
while running:
    time.sleep(1)
    screen.fill(background_colour)
    vertices = rotate_vertices(vertices)
    draw_image(vertices,edges)
    
    for event in pg.event.get(): 
      
        # Check for QUIT event       
        if event.type == pg.QUIT: 
            running = False


