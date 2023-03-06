import blessed from 'blessed';
import BlessedContrib from 'blessed-contrib';
import contrib from 'blessed-contrib';
import fs from 'fs';
const screen = blessed.screen()

const desktop_before_full = blessed.box({
    top: 6,
    left: 46,
    width: '31%',
    height: '39%',
    content: 'C:\>',
    tags: true,
    border: {
        type: 'line'
    },
    inputOnFocus: true,
    focusable: true,
})

const computer = blessed.text({
    screen,
    top: 3,
    left: 30,
    width: '100%',
    content: fs.readFileSync('./ascii_images/computer.txt', 'utf8'),

})
const coding_file = blessed.text({
    screen,
    top: 0,
    left: 0,
    width: '8%',
    height: '28%',
    draggable: true,
    content: fs.readFileSync('./ascii_images/file.txt', 'utf8'),

})

const tutorial_file = blessed.text({
    screen,
    top: 10,
    left: 0,
    width: '8%',
    height: '28%',
    draggable: true,
    clickable: true,
    input: true,
    content: fs.readFileSync('./ascii_images/tut.txt', 'utf8'),
})
const desktop_view = blessed.text({
    screen,
    top: 1,
    left: 104,
    content: fs.readFileSync('./ascii_images/desktop.txt', 'utf8'),
});
screen.append(computer)

screen.append(desktop_before_full)


desktop_before_full.on('click', function(data) {
    
    [computer, desktop_before_full].forEach((item) => {
        screen.remove(item)
    });
    [desktop_view,coding_file, tutorial_file].forEach((item) => {
        screen.append(item)
    })
    screen.render();

});
tutorial_file.on('click', function(data) {
    [tutorial_file, coding_file, desktop_view].forEach((item) => {
        item.hide()
    });
    const tutorial_file_content = blessed.text({
        screen,
        top: 0,
        left: 0,
        width: '100%',
        border: {
            type: 'line'
        },

        height: '100%',
        content: `Õpetus faili sisu!\nMinim reprehenderit consequat officia commodo aliquip excepteur. Quis ullamco proident dolore reprehenderit nostrud commodo officia. Reprehenderit minim ad labore Lorem sint nostrud dolore. Nisi aliqua labore commodo cillum et. Ex culpa est incididunt nostrud. Duis esse in irure anim. Officia anim consectetur enim quis proident minim ipsum tempor nostrud quis.

Anim do deserunt aliquip nulla cillum proident ullamco consectetur non enim. Sit dolore exercitation occaecat irure dolor aute consectetur eu voluptate deserunt culpa. Exercitation quis officia reprehenderit laboris ex aliquip sit mollit pariatur. Consequat laboris fugiat occaecat sit et mollit. Mollit ullamco anim ea sunt nostrud ea pariatur proident magna labore irure dolor Lorem.

Commodo sunt id deserunt mollit id elit excepteur Lorem sit culpa consequat. Aute nulla proident non ea nostrud voluptate minim nisi in nulla culpa in in sit. Exercitation non excepteur consequat sunt quis eu incididunt nisi ut ipsum. Deserunt ea voluptate velit anim enim do aute anim velit laboris consequat officia sint amet. Est id quis tempor eiusmod pariatur elit. Adipisicing ex nisi in aliquip sit eiusmod deserunt officia nulla id exercitation.

Minim nisi irure ut adipisicing reprehenderit adipisicing esse exercitation consequat proident eu aliquip. Aute non est esse nisi irure quis deserunt magna. Do culpa laboris qui nulla culpa occaecat irure dolore. Fugiat ad ex deserunt ullamco tempor. Dolor qui laboris  aliquip voluptate eu dolor ullamco tempor ut. Nisi adipisicing culpa officia cillum non ullamco. Consectetur dolore mollit ullamco deserunt quis elit magna tempor irure ipsum adipisicing aute.`
    });
    const close_button = blessed.button({
        screen,
        parent: tutorial_file_content,
        top: "89%",
        left: 0,
        width: '3%',
        height: '10%',
        content: 'X',
        border: {
            type: 'line'
        },
        style: {
            bg: 'red',
            fg: 'white',
            hover: {
                bg: 'green',
                fg: 'white'
            }
        }
    });
    screen.append(tutorial_file_content)
    close_button.on('click', function(data) {
        [tutorial_file_content, close_button].forEach((item) => {
            item.hide()
        });
        [tutorial_file, coding_file, desktop_view].forEach((item) => {
            item.show()
        })
        screen.render();
    });
       

    screen.render();
    return;
});

coding_file.on('click', function(data) {
    [tutorial_file, coding_file, desktop_view].forEach((item) => {
        item.hide()
    });
    const coding_file_content = blessed.text({
        screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        tags: true,
        border: {
            type: 'line'
        },
        content: fs.readFileSync('./tekst/python.txt', 'utf8') || "eMpty",
    });
    // coding_file_content.focus()
    // coding_file_content.setContent(fs.readFileSync('./tekst/python.txt', 'utf8') || "eMpty")
    /* coding_file_content.on('submit', function(data) {
        coding_file_content.setContent("Run")
    }); */
    const close_button = blessed.button({
        screen,
        parent: coding_file_content,
        top: "89%",
        left: 0,
        width: '3%',
        height: '10%',
        content: 'X',
        border: {

            type: 'line'
        },
        style: {
            bg: 'red',
            fg: 'white',
            hover: {
                bg: 'green',
                fg: 'white'
            }
        }
    });
    screen.append(coding_file_content)
    close_button.on('click', function(data) {
        [coding_file_content, close_button].forEach((item) => {
            item.hide()
        });
        [tutorial_file, coding_file, desktop_view].forEach((item) => {
            item.show()
        })
        screen.render();
    });
    screen.render();
});

screen.key(['return', 'enter'], function(ch, key) {
    // console.log(desktop_view.position)
});
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
return process.exit(0);
});

screen.render()