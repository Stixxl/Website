var playboard = new Array(62); // create additional row left up and down to simmplify the check of neighbors

function playGame()
{
    for (var i = 0; i < 62; i++)
{
    playboard[i] = new Array(62); // same reasoning as above
    for (var j = 0; j < 62; j++)
    {
        playboard[i][j] = false; // false == dead, true == alive
    }
}
playboard[10][10] = true;
playboard[10][11] = true;
playboard[10][12] = true;

while(true)
{

    setTimeout(drawPlayboard(), 1000);
}
}

function applyGameLogic()
{

    for (var i = 1; i < 61; i++)
    {
        for (var j = 1; j < 61; j++)
        {
            if (playboard[i][j]) //cell is alive
            {
                handleLiveCell(i, j);
            } else
            {
                handleDeadCell(i, j);
            }
        }
    }
}
function handleLiveCell(x, y)
{
    var count = countNeighbors(x, y);
    if (count < 2) // death by underpopulation
    {
        playboard[x][y] = false;
    } else if (count < 4) // lives for another generation
    {
        playboard[x][y] = true;
    } else // death by overpopulation
    {
        playboard[x][y] = false;
    }
}

function handleDeadCell(x, y)
{
    var count = countNeighbors(x, y);
    if (count === 3) // born by means of repopulation
    {
        playboard[x][y] = true;
    } else //no birth
    {
        playboard[x][y] = false;
    }
}
function countNeighbors(x, y)// returns the count of all neighbors that are true
{
    var count = 0;
    for (var i = x - 1; i < x + 2; i++)
    {
        for (var j = y - 1; j < y + 2; j++)
        {
            if (playboard[i][j] && i !== x && j !== y)
            {
                count++;
            }
        }
    }
    return count;
}

function drawPlayboard()
{
    var canvas = document.getElementById("drawingBoard");
    var canvasContext = canvas.getContext("2d");
        applyGameLogic();
    for(var i = 0; i < 60; i++)
    {
        for(var j = 0; j <60; j++)
        {
            canvasContext.arc(5 + 10 * i, 5 + 10 * j, 5, 0, 2* Math.PI);
            if(playboard[i][j])
            {
                canvasContext.fill();
            }
            else
            {
                canvasContext.stroke();
            }
        }
    }
}


