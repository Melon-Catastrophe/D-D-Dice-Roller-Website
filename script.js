    var dieSelection = '';
    let ul = document.querySelector('#message-ul')
    var messages = [];
    var dieHistory = [0, 0];

    ul.style.paddingRight = ul.offsetWidth+ "px";

    function roll() {
        let dieNum = parseInt(dieSelection.slice(1))
        randNum = Math.floor(Math.random() * dieNum)
        randNum++
        
        if (isNaN(dieNum)) {
            document.querySelector("#die-text").textContent = ''
            document.querySelector("#message").textContent = "Please select a type of die before rolling."
        } else {
            document.querySelector("#die-text").textContent = randNum
        }

        messageHandler(dieNum, randNum)
    }

    function chooseDie(selection) {
        dieSelection = selection.textContent;
        let imgPath = 'Images/dnd/svg/' + dieSelection + '.svg'
        
        document.querySelector('#die').setAttribute('src', imgPath)
        document.querySelector('#die').style.visibility = 'visible'
        document.querySelector("#message").textContent = ''

        dieHistory.push(dieSelection)
        dieHistory.shift()
        console.log(dieHistory)
        if (dieHistory[0] != dieHistory[1]) {
            document.querySelector("#die-text").textContent = ''
        }

        if (dieSelection == "d4") {
            document.querySelector("#die-text").style.top = "54%"
        } else {
            document.querySelector("#die-text").style.top = "50%"
        }
    }

    function messageHandler(type, number) {
        let messagesContent = document.querySelector('#message-box').textContent

        messages = determineMessage(messages, type, number)

        while(ul.firstChild) {
            ul.removeChild(ul.firstChild)
        }
        messages.forEach(displayMessage)
        ul.scrollTop = ul.scrollHeight
    }

    function determineMessage(message, type, number) {
        if (type == 20 && type == number) {
            var multiCrit20 = false
            for (x of crit20Mess(1)) {
                if (messages.includes(x)) {
                    multiCrit20 = true
                }
            }
            
            if (multiCrit20 && Math.floor(Math.random() * 2) == 0) {
                messages.push("You sure are lucky today.")
            } else {
            messages.push(crit20Mess())
            }
        } else if (type == number) {
            messages.push(randPosMess())
        } else if (number == 1) {
            messages.push(randNegMess())
        }

        return messages
    }

    function displayMessage(item) {
        let message = document.createElement('li')
        message.textContent = item
        ul.appendChild(message);
    }

    function randPosMess() {
        let posMessages = ["Wow! Max Score!", "That was a great roll!", "I knew you had it in you!", "That was the roll of a century!"]

        let messageNumber = Math.floor(Math.random() * posMessages.length)
        return posMessages[messageNumber]
    }

    function randNegMess() {
        let negMessages = ["Yeesh.", "I'm sorry for your loss.", "Ew.", "I wish I didn't see that...", "A Critical Fail? Again!?", "Don't you wish you had advantage on that roll?", "Something bad is about to happen, I'm sure."]

        let messageNumber = Math.floor(Math.random() * negMessages.length)
        return negMessages[messageNumber]
    }
    
    function crit20Mess(x = 0) {
        let critMessages = ["A natural 20!? No way!", "I'll be mad if that 20 doesn't get you something good.", "You just rolled my best friend."]

        let messageNumber = Math.floor(Math.random() * critMessages.length)
        if (x == 1) {
            return critMessages
        } else {
            return critMessages[messageNumber]
        }
    }