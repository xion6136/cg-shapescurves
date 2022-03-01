class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        let left_bottom = {x:200, y:200};
        let right_top = {x:600, y:400};
        this.drawRectangle(left_bottom, right_top, [255, 0, 0, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let center = {x:400, y:300};
        let radius = 200;
        this.drawCircle(center, radius, [255, 0, 0, 255], ctx) 
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        let pt0 = {x:200, y:200};
        // Control Point 1
        let pt1 = {x:400, y:500};
        // Control Point 2
        let pt2 = {x:600, y:400};
        let pt3 = {x:700, y:200};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, [255, 0, 0, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        let center = {x:100, y:300};
        let radius = 100;
        this.drawCircle(center, radius, [255, 0, 0, 255], ctx)
        let pt1 = {x:200, y:350};
        let pt2 = {x:250, y:225};
        this.drawLine(pt1, pt2, [255, 0, 0, 255], ctx);
        let pt3 = {x:270, y:300};
        this.drawLine(pt2, pt3, [255, 0, 0, 255], ctx);
        let pt4 = {x:300, y:225};
        this.drawLine(pt3, pt4, [255, 0, 0, 255], ctx);
        let pt5 = {x:340, y:350};
        this.drawLine(pt4, pt5, [255, 0, 0, 255], ctx);
        let pt6 = {x:370, y:350};
        let pt7 = {x:370, y:225};
        let pt11 = {x:370, y:290};
        this.drawLine(pt6, pt7, [255, 0, 0, 255], ctx);
        let pt8 = {x:450, y:350};
        this.drawLine(pt6, pt8, [255, 0, 0, 255], ctx);
        let pt9 = {x:450, y:290};
        this.drawLine(pt9, pt11, [255, 0, 0, 255], ctx);
        let pt10 = {x:450, y:225};
        this.drawLine(pt7, pt10, [255, 0, 0, 255], ctx);
        let curvePt1 = {x:500, y:225};
        let curvePt2 = {x:600, y:400};
        let curvePt3 = {x:650, y:375};
        let curvePt4 = {x:700, y:225};
        this.drawBezierCurve(curvePt1, curvePt2, curvePt3, curvePt4, [255, 0, 0, 255], ctx);
        if(this.show_points) {
            this.drawPoint(pt1, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt2, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt3, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt4, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt5, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt6, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt7, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt8, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt9, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt10, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(pt11, 4, [96, 121, 66, 256], ctx);

        }
    }

    drawPoint(center, radius, color, ctx) {
        let number_of_points = this.num_curve_sections;
        let degree = 0;
        // In the case of 4 points; increment = 90
        let increment = 360 / number_of_points;

        // Radian => Degree
        // Angle in Radians = degrees * Math.PI / 180
        // Formula for new points coordinates:
        // x = center(x) + radius * cos(angle)
        // y = center(y) + radius * sin(angle)

        // Create a dynamic points object
        const points = {};
        let new_x = 0;
        let new_y = 0;
        let counter = 0;
        // Depending on the number of points specified, loop through it and get the correct
        // x and y coordinates for each points.
        while(number_of_points > 0) {
            new_x = center.x + radius * Math.cos((degree * Math.PI) / 180);
            new_y = center.y + radius * Math.sin((degree * Math.PI) / 180);
            points[counter] = {x:new_x, y:new_y};
            degree = degree + increment;
            counter++;
            number_of_points--;
        }

        // Set counter back to 0. In this specific case, counter is the reference to our points objects.
        // next_counter references the next point.
        // Loop through the number of points - 1 and connect the points together to form the circle.
        counter = 0;
        let next_counter = 1;
        number_of_points = this.num_curve_sections;
        while(counter < number_of_points - 1) {
            this.drawLine(points[counter], points[next_counter], color, ctx);
            counter++;
            next_counter++;
        }
        // This last line is to connect the very last point with the starting point.
        this.drawLine(points[counter], points[0], color, ctx);
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        // Just grab the corresponding coordinates from the given 2 points.
        let left_top = {x:left_bottom.x, y:right_top.y};
        let right_bottom = {x:right_top.x, y:left_bottom.y};

        // Connect the 4 points together via the drawLine function.
        this.drawLine(left_bottom, left_top, color, ctx);
        this.drawLine(left_top, right_top, color, ctx);
        this.drawLine(right_top, right_bottom, color, ctx);
        this.drawLine(right_bottom, left_bottom, color, ctx);

        // To be done 
        if(this.show_points) {
            this.drawPoint(left_top, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(right_bottom, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(left_bottom, 4, [96, 121, 66, 256], ctx);
            this.drawPoint(right_top, 4, [96, 121, 66, 256], ctx);
        }
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let number_of_points = this.num_curve_sections;
        let degree = 0;
        // In the case of 4 points; increment = 90
        let increment = 360 / number_of_points; 

        // Radian => Degree
        // Angle in Radians = degrees * Math.PI / 180
        // Formula for new points coordinates:
        // x = center(x) + radius * cos(angle)
        // y = center(y) + radius * sin(angle)

        // Create a dynamic points object 
        const points = {};
        let new_x = 0;
        let new_y = 0;
        let counter = 0;
        // Depending on the number of points specified, loop through it and get the correct
        // x and y coordinates for each points. 
        while(number_of_points > 0) {
            new_x = center.x + radius * Math.cos((degree * Math.PI) / 180);
            new_y = center.y + radius * Math.sin((degree * Math.PI) / 180);
            points[counter] = {x:new_x, y:new_y};
            degree = degree + increment;
            counter++;
            number_of_points--;
        } 

        // Set counter back to 0. In this specific case, counter is the reference to our points objects.
        // next_counter references the next point.
        // Loop through the number of points - 1 and connect the points together to form the circle.
        counter = 0;
        let next_counter = 1;
        number_of_points = this.num_curve_sections;
        while(counter < number_of_points - 1) {
            if(this.show_points) {
                this.drawPoint(points[counter], 4, [96, 121, 66, 256], ctx)
            }
            this.drawLine(points[counter], points[next_counter], color, ctx);
            counter++;
            next_counter++;
        }
        // This last line is to connect the very last point with the starting point. 
       this.drawLine(points[counter], points[0], color, ctx);
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let number_of_points = this.num_curve_sections;
        let t = 0;
        let t_increment = 1 / number_of_points;
        // Create a dynamic points object
        const points = {};
        let new_x = pt0.x;
        let new_x1 = pt1.x;
        let counter = 0;
        while(t < 1.0) {
            new_x = Math.pow((1-t), 3) * pt0.x + 3 * Math.pow((1-t), 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x;
            new_x1 = Math.pow((1-t), 3) * pt0.y + 3 * Math.pow((1-t), 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y;
            points[counter] = {x:new_x, y:new_x1};
            counter++;
            t = t + t_increment;
        }

        // Set counter back to 0. In this specific case, counter is the reference to our points objects.
        // next_counter references the next point.
        // Loop through the number of points - 1 and connect the points together to form the circle.
        counter = 0;
        let next_counter = 1;
        number_of_points = this.num_curve_sections;
        while(counter < number_of_points - 1) {
            this.drawLine(points[counter], points[next_counter], color, ctx);
            if(this.show_points) {
                this.drawPoint(points[counter], 4, [96, 121, 66, 256], ctx);
                this.drawPoint(pt1, 4, [256, 121, 256, 256], ctx);
                this.drawPoint(pt2, 4, [256, 121, 256, 256], ctx);
            }
            counter++;
            next_counter++;
        }
        if(this.show_points) {
            this.drawPoint(points[number_of_points - 1], 4, [96, 121, 66, 256], ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
}
