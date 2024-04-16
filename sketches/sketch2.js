function goldMinesSketch(p) {
    let canvasWidth, canvasHeight;
    let minesData = [];
    let tooltip = '';

    p.setup = () => {
        canvasWidth = p.windowWidth * 0.75;
        canvasHeight = canvasWidth;
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvasDivTwo');
        p.background(50);

        // load data
        p.loadJSON('/goldmines.json', (data) => {
            minesData = data;
        });
    };

    p.draw = () => {
        p.background(135, 206, 250);
        drawMines();
        displayTooltip();
    };
    

    function drawMines() {

        tooltip = '';
    
        const chkCrown = document.getElementById('chkCrown').checked;
        const chkPrivate = document.getElementById('chkPrivate').checked;
        const chkGood = document.getElementById('chkGood').checked;
        const chkModerate = document.getElementById('chkModerate').checked;
        const chkPoor = document.getElementById('chkPoor').checked;
    
        minesData.forEach(mine => {
            const { x, y } = latLongToCanvas(mine.lat, mine.long);
    
            // mine should be displayed based on the checkbox status
            if ((mine.LandOwner.trim() === 'Crown' && chkCrown) ||
                (mine.LandOwner.trim() === 'Private' && chkPrivate)) {
    
                let shapeColor;
    
                // color based on the LandOwner
                if (mine.LandOwner.trim() === 'Crown') {
                    shapeColor = 'green';
                } else if (mine.LandOwner.trim() === 'Private') {
                    shapeColor = 'red';
                }
    
                let shape;
    
                // shape based on the escape potential
                if ((mine.Escape_pot.trim() === 'Good' && chkGood) ||
                    (mine.Escape_pot.trim() === 'Moderate' && chkModerate) ||
                    (mine.Escape_pot.trim() === 'Poor' && chkPoor)) {
    
                    if (mine.Escape_pot.trim() === 'Good') {
                        shape = 'circle';
                    } else if (mine.Escape_pot.trim() === 'Moderate') {
                        shape = 'square';
                    } else if (mine.Escape_pot.trim() === 'Poor') {
                        shape = 'triangle';
                    }
    
                    p.fill(shapeColor);
                    p.noStroke();
    
                    // draw shape based on type
                    if (shape === 'circle') {
                        p.ellipse(x, y, 7, 7);
                    } else if (shape === 'square') {
                        p.square(x - 3.5, y - 3.5, 7);
                    } else if (shape === 'triangle') {
                        p.triangle(x, y - 3.5, x - 3.5, y + 3.5, x + 3.5, y + 3.5);
                    }
    
                    // check if the mouse is hovering over the mine
                    if (p.dist(p.mouseX, p.mouseY, x, y) <= 3.5) { 
                        // only update tooltip when hovering over mine
                        tooltip = `Lat: ${mine.lat.toFixed(2)}, Long: ${mine.long.toFixed(2)}`;
                    }
                }
            }
        });
    }
    
    
    

    function displayTooltip() {
        if (tooltip) {
            p.fill(255);
            p.noStroke();
            p.textSize(12);
            p.text(tooltip, p.mouseX + 10, p.mouseY + 10);
        }
    }


    function latLongToCanvas(lat, long) {
        let x = p.map(long, -66.3, -59.8, 0, canvasWidth);
        let y = p.map(lat, 43.0, 47.0, canvasHeight, 0);
        return { x, y };
    }
}

export {goldMinesSketch};
