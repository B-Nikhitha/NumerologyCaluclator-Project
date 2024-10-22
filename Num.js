document.getElementById('calculate-btn').addEventListener('click', function() {
    const dob = document.getElementById('dob').value.split('');
    const gender = document.getElementById('gender').value;

    // Predefined planetary associations and struggling combinations
    const p = ['0', 'Sun', 'Moon', 'Jupiter', 'Rahu/Uranus', 'Mercury', 'Venus', 'Ketu/Neptune', 'Shani/Saturn', 'Mangal/Mars'];
    const sc = ['1/8', '2/8', '3/6', '8/8', '4/8', '2/9', '4/4', '1/6'];

    const lg = [['4', '9', '2'], ['3', '5', '7'], ['8', '1', '6']];
    const lgn = [['Rahu', 'Mars', 'Moon'], ['Jupiter', 'Mercury', 'Ketu'], ['Saturn', 'Sun', 'Venus']];

    // Calculate Driver Number
    const dr = parseInt(dob[0]) + parseInt(dob[1]);

    // Calculate Conductor Number
    let c = 0;
    for (let i = 0; i < dob.length; i++) {
        if (!isNaN(parseInt(dob[i]))) {
            c += parseInt(dob[i]);
        }
    }
    let v = 0;
    while (c > 0) {
        v += c % 10;
        c = Math.floor(c / 10);
    }

    // Planetary associations
    const pn1 = p[dr];
    const pn2 = p[v];

    // Struggling combination
    const strugglingCombination = sc.includes(`${dr}/${v}`);

    // Kua Number Calculation
    let kv;
    if (gender === '1') {
        kv = Math.abs(parseInt(dob[6]) + parseInt(dob[7]) + parseInt(dob[8]) + parseInt(dob[9]) - 11);
    } else {
        kv = parseInt(dob[6]) + parseInt(dob[7]) + parseInt(dob[8]) + parseInt(dob[9]) + 4;
    }

    // Lo-Shu Grid Calculation
    const nlg = [['', '', ''], ['', '', ''], ['', '', '']];
    const allDigits = dob + dr + v + kv;
    for (let ch of allDigits) {
        for (let i = 0; i < lg.length; i++) {
            for (let j = 0; j < lg[0].length; j++) {
                if (ch === lg[i][j]) {
                    nlg[i][j] += ch;
                }
            }
        }
    }

    // Generate Lo-Shu Grid in HTML format
    let loShuGridHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        loShuGridHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            if(nlg[i][j]===''){
                loShuGridHTML += `<td>${lg[i][j]} <br> (${lgn[i][j]}) <br> _</td>`;
            }
            else{
            loShuGridHTML += `<td>${lg[i][j]} <br> (${lgn[i][j]}) <br> ${nlg[i][j]}</td>`;
            }
        }
        loShuGridHTML += '</tr>';
    }
    loShuGridHTML += '</table>';

    // Generate Planes of Expression
    let planesOfExpression = '';
    if (nlg[0][0] && nlg[0][1] && nlg[0][2]) planesOfExpression += 'Mental Plane<br>';
    if (nlg[1][0] && nlg[1][1] && nlg[1][2]) planesOfExpression += 'Emotional/Soul Plane<br>';
    if (nlg[2][0] && nlg[2][1] && nlg[2][2]) planesOfExpression += 'Practical Plane<br>';
    if (nlg[0][0] && nlg[1][0] && nlg[2][0]) planesOfExpression += 'Thought Plane<br>';
    if (nlg[0][1] && nlg[1][1] && nlg[2][1]) planesOfExpression += 'Will Plane<br>';
    if (nlg[0][2] && nlg[1][2] && nlg[2][2]) planesOfExpression += 'Action Plane<br>';
    if (nlg[0][0] && nlg[1][1] && nlg[2][2]) planesOfExpression += 'Gold Plane<br>';
    if (nlg[0][2] && nlg[1][1] && nlg[2][0]) planesOfExpression += 'Silver Plane<br>';

    // Display Results
    document.getElementById('result').innerHTML = `
        <h2>Results:</h2>
        <p>Driver Number: ${dr}</p>
        <p>Conductor Number: ${v}</p>
        <p>Kua Number: ${kv}</p>
        <p>Planetary Associations: ${dr} (${pn1}) / ${v} (${pn2})</p>
        ${strugglingCombination ? "<p>Struggling Combination</p>" : ""}
        <br>
        <h3>Lo-Shu Grid</h3>
        ${loShuGridHTML}
        <br>
        <h3>Planes of Expression</h3>
        ${planesOfExpression}
    `;
});
