class Renderer {
    constructor(canvas, num_curve_sections) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
    }

    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }
    
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawRectangle(framebuffer);
                break;
            case 1:
                this.drawCirle(framebuffer);
                break;
            case 2:
                this.drawBezierCurve(framebuffer);
                break;
            case 3:
                this.drawName(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    drawRectangle(framebuffer) {
        console.log("Draw Rectangle");
    }

    drawCirle(framebuffer) {
        console.log("Draw Circle");
    }

    drawBezierCurve(framebuffer) {
        console.log("Draw Bezier Curve");
    }

    drawName(framebuffer) {
        console.log("Draw Name");
    }
};
