var CELL_SIZE = 10;
var WIDTH = 600;
var HEIGHT = 600;
var COUNT_X = WIDTH / CELL_SIZE;
var COUNT_Y = HEIGHT / CELL_SIZE;
var DELAY = 500;

var playboard = matrix(COUNT_X, COUNT_Y, 0);
var newPlayboard = matrix(COUNT_X, COUNT_Y, 0);
//counts generations
var counter = 0;
//start/stop functionality
var isRunning = 0;
var intervalID;

var canvas = document.getElementById("drawingBoard");
var canvasContext = canvas.getContext("2d");
var button = document.getElementById("playButton");
var generationSpan = document.getElementById("counter");

button.onclick = function () {
    switch (isRunning) {
        case 0:
            intervalID = setInterval(function () {
                update();
            }, DELAY);
            isRunning = 1;
            break;
        default:
            clearInterval(intervalID);
            isRunning = 0;
    }
};


function applyGameLogic()
{

    for (var i = 0; i < COUNT_Y; i++)
    {
        for (var j = 0; j < COUNT_X; j++)
        {
            if (playboard[i][j] === 1) //cell is alive
            {
                handleLiveCell(i, j);
            } else
            {
                handleDeadCell(i, j);
            }
        }
    }
    counter++;
    copyGrid(newPlayboard, playboard);
}
function handleLiveCell(x, y)
{
    var count = countNeighbors(x, y);
    if (count < 2) // death by underpopulation
    {
        newPlayboard[x][y] = 0;
    } else if (count < 4) // lives for another generation
    {
        newPlayboard[x][y] = 1;
    } else // death by overpopulation
    {
        newPlayboard[x][y] = 0;
    }
}

function handleDeadCell(x, y)
{
    var count = countNeighbors(x, y);
    if (count === 3) // born by means of repopulation
    {
        newPlayboard[x][y] = 1;
    } else //no birth
    {
        newPlayboard[x][y] = 0;
    }
}
function countNeighbors(x, y)// returns the count of all neighbors that are alive
{
    var count = 0;
    for (var i = x - 1; i < x + 2; i++)
    {
        for (var j = y - 1; j < y + 2; j++)
        {
            if (playboard[(COUNT_Y + i) % COUNT_Y][(COUNT_X + j) % COUNT_X] === 1 && i !== x && j !== y)
            {
                count++;
            }
        }
    }
    return count;
}
function update()
{
    applyGameLogic();
    drawPlayboard();
}
function drawPlayboard()
{
    for (var i = 0; i < 60; i++)
    {
        for (var j = 0; j < 60; j++)
        {
            if (newPlayboard[i][j] === 1) {
                canvasContext.fillStyle = "#000";
            } else {
                canvasContext.fillStyle = "#eee";
                //context.clearRect();
            }
            canvasContext.fillRect(
                    j * CELL_SIZE + 1,
                    i * CELL_SIZE + 1,
                    CELL_SIZE - 1,
                    CELL_SIZE - 1);
        }
    }

    generationSpan.innerHTML = "current generation: " + counter;
}
for (var x = 0; x <= WIDTH; x += CELL_SIZE) {
    canvasContext.moveTo(0.5 + x, 0);
    canvasContext.lineTo(0.5 + x, HEIGHT);
}
for (var y = 0; y <= HEIGHT; y += CELL_SIZE) {
    canvasContext.moveTo(0, 0.5 + y);
    canvasContext.lineTo(WIDTH, 0.5 + y);
}
canvasContext.strokeStyle = "#fff";
canvasContext.stroke();
function copyGrid(source, destination) {
    for (var h = 0; h < COUNT_Y; h++) {
        /*
         for (var w = 0; w < Life.WIDTH; w++) {
         destination[h][w] = source[h][w];
         }
         */
        destination[h] = source[h].slice(0);
    }
}
function matrix(m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = 0;
        }
        mat[i] = a;
    }
    return mat;
}

