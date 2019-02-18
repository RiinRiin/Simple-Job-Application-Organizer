// Gmail API call

const request = require('request-promise');

function listLabels() {        
    request.get('https://www.googleapis.com/gmail/v1/users/me/labels', {
        auth: {
            // point to the accessToken's storage location 
            bearer: require('../passport/googleStrategy').accessToken
        }
    }).then(res => {
        // Parse the response as a JSON, then loop through the list and return the list names
        JSON.parse(res).labels.forEach(label => {
            console.log(label.name);
        })
    })
}

// function listMessages() {
//     request.get('https://www.googleapis.com/gmail/v1/users/me/messages/?labels=IMPORTANT&q=application', {
//         auth: {
//             // point to the accessToken's storage location 
//             bearer: require('../passport/googleStrategy').accessToken
//         }
//     }).then(res => {
//         // Parse the response as a JSON, then loop through the list and return the list names
//         JSON.parse(res).messages.forEach(msg => {
//             displayMessage(msg.id);
//         })
//     })
// };

// function displayMessage(id) {
//     request.get('https://www.googleapis.com/gmail/v1/users/me/messages/' + id, {
//         auth: {
//             // point to the accessToken's storage location 
//             bearer: require('../passport/googleStrategy').accessToken
//         }
//     }).then(res => {
//         // Parse the response as a JSON, then loop through the list and return the list names
//         console.log(res);
//     })
// };

module.exports = {
    listLabels
};

