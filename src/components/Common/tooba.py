radius=eval(input('Enter the radius of the circle:'))
length=eval(input('Enter the length of the rectangle:'))
breadth=eval(input('Enter the breadth of the rectangle:'))
 
def area_of_circle():
  area=3.14*radius*radius
  return area
def area_of_recatngle():
 area1=length*breadth
 return area1

 print('Area of the circle is:',area_of_circle())
 print('Area of the rectangle is:',area_of_rectangle())