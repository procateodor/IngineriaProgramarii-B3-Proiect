$(document).ready(function () {
    $('.menu').click(function () {
        $('.responsive-menu').toggleClass('toggle');
    });

    var date_input = $('input[name="date"]');
    var options = {
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);

    var location = window.location.href;

    var sub = document.getElementById('subscribe');
    sub.style.display = 'none';

    var sub2 = document.getElementById('no-subscribe');
    sub2.style.display = 'none';

    $.ajax({
        type: 'GET',
        url: location + '/teme_json',
        success: data => {
            if (data) {
                var group = document.getElementById('group');

                data.forEach(element => {
                    var a = document.createElement('a');
                    a.href = `${window.location.href}/${element.numeTema}`;
                    a.className = 'list-group-item list-group-item-action flex-column align-items-start';

                    var div = document.createElement('div');
                    div.className = 'd-flex w-100 justify-content-between';

                    var h5 = document.createElement('h5');
                    h5.className = 'mb-1';
                    h5.innerText = element.numeTema;

                    var small1 = document.createElement('small');
                    var deadline = element.deadline;
                    small1.innerText = `Termen limită: ${deadline}`;

                    div.appendChild(h5);
                    div.appendChild(small1);

                    var p = document.createElement('p');
                    p.className = 'mb-1';
                    p.innerText = element.enunt;

                    var small2 = document.createElement('small');
                    small2.innerText = `Număr exerciții: ${element.nrExercitii}`;

                    // var small3 = document.createElement('small');
                    // small3.innerText = `Extensie fisier: .${element.extensieFisier}`;

                    a.appendChild(div);
                    a.appendChild(p);
                    a.appendChild(small2);
                    // a.appendChild(small3);

                    group.appendChild(a);
                });
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: `${window.location.href}/is-subscribed`,
        success: data => {
            if (data === 'YES') {
                sub.style.display = 'unset';
            } else {
                sub2.style.display = 'unset';
            }

            var sub11 = document.getElementById('sub');
            var subb11 = document.getElementById('subb');

            sub11.onclick = event => {
                event.preventDefault();

                sub.style.display = 'none';
                sub2.style.display = 'unset';

                $.ajax({
                    type: 'POST',
                    url: `${window.location.href}/unsubscribe`,
                    success: data => {
                        if(data === 'valid') {
                            var subscribeStatus = 'Te-ai dezabonat cu succes!';

                            var p = document.getElementById('subscribe-status');
                            p.innerText = subscribeStatus;
                            setTimeout(() => {
                                p.innerText = '';
                            }, 2000);

                        } else {
                            var subscribeStatus = 'Dezabonarea a eșuat. Reîncearcă.';
                            var p = document.getElementById('subscribe-status');
                            p.innerText = subscribeStatus;
                            setTimeout(() => {
                                p.innerText = '';
                            }, 2000);
                            sub2.style.display = 'none';
                            sub.style.display = 'unset';
                        }
                    }
                });
            }

            subb11.onclick = event => {
                event.preventDefault();

                sub2.style.display = 'none';
                sub.style.display = 'unset';

                $.ajax({
                    type: 'POST',
                    url: `${window.location.href}/subscribe`,
                    success: data => {
                        if(data === 'valid') {
                            var subscribeStatus = 'Te-ai abonat cu succes!';

                            var p = document.getElementById('subscribe-status');
                            p.innerText = subscribeStatus;
                            setTimeout(() => {
                                p.innerText = '';
                            }, 2000);

                        } else {
                            var subscribeStatus = 'Abonarea a eșuat. Reîncearcă.';
                            var p = document.getElementById('subscribe-status');
                            p.innerText = subscribeStatus;
                            setTimeout(() => {
                                p.innerText = '';
                            }, 2000);
                            sub2.style.display = 'unset';
                            sub.style.display = 'none';
                        }
                    }
                });
            }
        }
    });

    var add = document.getElementById('add');
    var exercitii = 1;

    add.onclick = event => {
        event.preventDefault();
        exercitii++;

        var row = document.createElement('div');
        row.classList.add('row');

        var nameEx = document.createElement('div');
        nameEx.classList.add('col-md-12');
        nameEx.innerText = `Exercițiul ${exercitii}`;

        var enunt = document.createElement('div');
        enunt.classList.add('col-md-12');

        var lbEnunt = document.createElement('label');
        lbEnunt.innerText = 'Enunț';

        var textarea = document.createElement('textarea');
        textarea.classList.add('form-control');
        textarea.classList.add('enunt-exercitiu');
        textarea.setAttribute('cols', '30');
        textarea.setAttribute('rows', '4');

        enunt.appendChild(lbEnunt);
        enunt.appendChild(textarea);

        var extensie = document.createElement('div');
        extensie.classList.add('col-md-4');

        var grp = document.createElement('div');
        grp.classList.add('form-group');

        var lbExt = document.createElement('label');
        lbExt.innerText = 'Extensie fișier acceptat';

        var select = document.createElement('select');
        select.classList.add('form-control');
        select.classList.add('extensie');

        var option1 = document.createElement('option');
        option1.value = '';
        option1.innerText = 'Extensie';
        option1.setAttribute('selected', 'selected');
        option1.setAttribute('disabled', 'disabled');

        var option2 = document.createElement('option');
        option2.value = 'cpp';
        option2.innerText = 'C++';

        var option3 = document.createElement('option');
        option3.value = 'c';
        option3.innerText = 'C';

        var option4 = document.createElement('option');
        option4.value = 'java';
        option4.innerText = 'Java';

        var option5 = document.createElement('option');
        option5.value = 'py';
        option5.innerText = 'Python';

        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);
        select.appendChild(option5);

        grp.appendChild(lbExt);
        grp.appendChild(select);

        extensie.appendChild(grp);

        row.appendChild(nameEx);
        row.appendChild(enunt);
        row.appendChild(extensie);

        var form = document.getElementById('form');

        form.insertBefore(row, form.childNodes[form.childNodes.length - 6]);
    }


    var form = document.getElementById('form');

    form.onsubmit = event => {
        event.preventDefault();

        var numeMaterie = document.getElementById('numeMaterie').innerText;
        var nume = document.getElementById('nume');
        var enunt = document.getElementById('enunt');
        var deadline = document.getElementById('deadline');

        var err = document.getElementById('err');
        var btn = document.getElementById('btn');

        var add = document.getElementById('add');

        var extesii = document.getElementsByClassName('extensie');

        var extensiiTeme = [];

        for (let index = 0; index < extesii.length; index++) {
            const element = extesii[index];
            extensiiTeme[index] = element.value;
        }

        var enunturi = document.getElementsByClassName('enunt-exercitiu');

        var enunturiTeme = [];

        for (let index = 0; index < enunturi.length; index++) {
            const element = enunturi[index];
            enunturiTeme[index] = element.value;
        }

        var data = {
            numeTema: nume.value,
            deadline: deadline.value,
            enunt: enunt.value,
            nrExercitii: exercitii,
            extensiiFisiere: extensiiTeme,
            cerinteExercitii: enunturiTeme
        };

        err.innerHTML = '&nbsp;';
        nume.setAttribute('disabled', 'disabled');
        enunt.setAttribute('disabled', 'disabled');
        deadline.setAttribute('disabled', 'disabled');
        add.setAttribute('disabled', 'disabled');
        btn.setAttribute('disabled', 'disabled');
        btn.innerText = 'Se valideaza..';

        for (let index = 0; index < enunturi.length; index++) {
            const element = enunturi[index];
            element.setAttribute('disabled', 'disabled');
        }

        for (let index = 0; index < extesii.length; index++) {
            const element = extesii[index];
            element.setAttribute('disabled', 'disabled');
        }

        $.ajax({
            type: 'POST',
            url: window.location.href + '/createTema',
            data: data,
            success: data => {
                if (data === 'valid') {
                    err.classList.add('success');
                    err.innerHTML = 'Tema a fost adaugată cu succes!';

                    setTimeout(() => {
                        window.location.href = window.location.href;
                    }, 400);
                } else {
                    err.classList.remove('success');
                    err.innerHTML = data;

                    for (let index = 0; index < enunturi.length; index++) {
                        const element = enunturi[index];
                        element.setAttribute('disabled', 'disabled');
                    }

                    for (let index = 0; index < extesii.length; index++) {
                        const element = extesii[index];
                        element.setAttribute('disabled', 'disabled');
                    }

                    nume.removeAttribute('disabled');
                    enunt.removeAttribute('disabled');
                    add.removeAttribute('disabled');
                    deadline.removeAttribute('disabled');
                    btn.removeAttribute('disabled');
                    btn.innerText = 'Creare materie';
                }
            }
        });
    }

    var btn = document.getElementById("logOutBtn");
    btn.onclick = () => {
        $.ajax({
            type: "POST",
            url: "/sign-out",
            success: data => {
                if (data === "valid") {
                    window.location.href = "/";
                }
            }
        })
    };

});