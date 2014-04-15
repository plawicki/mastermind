exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
    var newGame = function () {
        req.session.puzzle.ile = 0;
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        req.session.puzzle.data = data;
        return {
            "retMsg": "Zainicjalizowano gre size: "+puzzle.size+" dim: "+puzzle.dim+" max: "+puzzle.max
        };

    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    /*
     * req.params[2] === wartość size
     * req.params[4] === wartość dim
     * req.params[6] === wartość max
     */
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
    if (req.params[4]) {
        req.session.puzzle.dim = req.params[4];
    }
    if (req.params[6]) {
        req.session.puzzle.max = req.params[6];
    }
    res.json(newGame());
};

exports.mark = function (req, res) {
    var markAnswer = function () {
        var move = req.params[0].split('/');
        move = move.slice(0, move.length - 1);
        console.log("move " + move);
        console.log("rnd " + req.session.puzzle.data);

        req.session.puzzle.ile++;
        console.log(req.session.puzzle.ile);

        // liczba kropek czarnych i bialych
        var oznacznia = "";
        var zgadnietych = 0;
        // wygrana, przegrana
        var stan = "";

        var size = req.session.puzzle.size;
        var data =req.session.puzzle.data;

        var flagOdg = [], flagStr = [];

        // sprawdzanie czarnych kropek
        for(var i=0; i<size; i++)
        {
            //inicjalizacja
            flagStr[i] = false;

            if(data[i] == parseInt(move[i]))
            {
                oznacznia += "+ ";
                zgadnietych++;
                flagOdg[i] = true;
                flagStr[i] = true;
            }
        }

        for(var i=0; i<size; i++)
        {
            for(var j=0; j<size; j++)
            {
                if(move[i] == data[j] && !flagOdg[i] && !flagStr[j])
                {
                    oznacznia += "- ";
                    flagOdg[i] = true;
                    flagStr[j] = true;
                    break;
                }

            }
        }

        if(zgadnietych == size)
            stan = "WYGRALES";
        else if (req.session.puzzle.ile >= req.session.puzzle.max)
            stan = "PRZEGRALES";


        return {
            "retVal": oznacznia,
            "retMsg": stan
        };
    };
    res.json(markAnswer());
};
