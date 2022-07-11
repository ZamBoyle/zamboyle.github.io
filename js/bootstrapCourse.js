//Quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function() {
    blindcode = "<p>Comme vous le savez peut-être, le secteur du numérique est porteur d’emploi et l’avenir s’annonce de plus en plus digital.</p><p>Mais saviez-vous que toute une gamme de métiers du numérique est accessible aux personnes aveugles et malvoyantes ?</p><p>Grâce à quelques adaptations et outils spécifiques, les personnes déficientes visuelles peuvent devenir développeur·euse web, spécialiste data, helpdesk informatique, consultant·e en accessibilité, etc.</p><p>Ainsi, pour contribuer à l’inclusion de tous, Eqla propose en 2020, avec le soutien du Digital Belgium Skills Fund, de Bruxelles Formation et du Fonds Social Européen, une formation professionnelle innovante en Belgique nommée « BlindCode».</p> <p>Elle s’adresse aux jeunes et aux adultes intéressés par le numérique, et souhaitant s’orienter vers le métier de développeur.se web et mobile, ou se préparer à poursuivre des études supérieures en informatique.</p>";
    blindcodeImg = "<img class='img-fluid float-left' src='../Images/BlindCode.png' alt='Logo d''Eqla' />" + blindcode;
    loremipsum = "<span class='font-weight-bold'>Le Lorem Ipsum</span> est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.";
    bootstrap = "Bootstrap est une collection d'outils utiles à la création du design de sites et d'applications web. C'est un ensemble qui contient des codes HTML et CSS, des formulaires, boutons, outils de navigation et autres éléments interactifs, ainsi que des extensions JavaScript en option. Wikipédia";
    textSample = "Ceci est du texte de test. ";

    replaceInnertHTML(".blindcode", blindcode);
    replaceInnertHTML(".blindcodeImg", blindcodeImg);
    replaceInnertHTML(".loremipsum", loremipsum);
    replaceInnertHTML(".bootstrap", bootstrap);
    replaceInnertHTML(".textSample", textSample);
    replaceInnertHTML(".textSample-2", textSample.repeat(2));
    replaceInnertHTML(".textSample-3", textSample.repeat(3));
    replaceInnertHTML(".textSample-4", textSample.repeat(4));
    replaceInnertHTML(".textSample-5", textSample.repeat(5));

    var people = [
        { id: "1", Name: "Piette", Firstname: "Johnny", Age: 46 },
        { id: "2", Name: "Dupont", Firstname: "Patrick", Age: 28 },
        { id: "3", Name: "Jacques", Firstname: "Gabriel", Age: 6 },
        { id: "4", Name: "Colin", Firstname: "Victorine", Age: 18 },
        { id: "5", Name: "Catrain", Firstname: "Vincent", Age: 48 },
    ];
    var columns = ["id", "Nom", "Prénom", "Age"];

    document.querySelectorAll("[mytable]").forEach(function(div) {
        var tableclass = div.getAttribute("tableclass");
        var theadclass = div.getAttribute("theadclass");
        var caption = div.getAttribute("caption");
        div.innerHTML = getTable(tableclass, theadclass, caption, columns, people);
    });
});

function replaceInnertHTML(target, innerHTML) {
    document.querySelectorAll(target).forEach(function(x) {
        x.innerHTML = innerHTML;
    });
}

function getTable(tableclass = "", theadclass = "", caption = "", columns, people) {
    var theadclassTmp = theadclass != null ? `class="${theadclass}"` : "";
    var thead = `<thead ${theadclassTmp}>${getHeadColumns(columns)}</thead>`;

    var tbody = `<tbody>${getRows(people)}</tbody>`;
    var captiontmp = caption != null ? `<caption>${caption}</caption>` : "";
    var tableclasstmp = tableclass != null ? `class="${tableclass}"` : "";
    var table = `
        <table ${tableclasstmp} comment="J'ai été généré en Javascript. Si vous êtes curieux, voir le fichier /bootstrap/js/site.js">
        ${captiontmp}
        ${thead}
        ${tbody}
        </table>
    `;
    return table;
}

function getHeadColumns(headColumns) {
    var columns = "<tr>";
    headColumns.forEach(column => { columns += `<th scope="col">${column}</th>`; });
    columns += "</tr>";
    return columns;
}

function getRows(people) {
    var rows = "";
    people.forEach(person => {
        rows += `
            <tr>
                <th scope="row">${person.id}</th>
                <td>${person.Name}</td>
                <td>${person.Firstname}</td>
                <td>${person.Age}</td>
            </tr>
        `;
    });
    return rows;
}

function CopyToClipboard(id) {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}