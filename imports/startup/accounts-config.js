import { Accounts } from 'meteor/accounts-base';  

Accounts.ui.config({ 
    requestPermissions: {}, 
    requestOfflineToken: {}, 
    passwordSignupFields: 'USERNAME_AND_EMAIL', 
}); 

// Accounts.emailTemplates.siteName = "Jailbreak Raffle Dapp";
// Accounts.emailTEmplates.from = "Corey Petty <cpetty@novetta.com>";

// Accounts.emailTemplates.verifyEmail = {
//     subject() {
//         return "[Jailbreak Raffle Dapp] Verify Your Email Address";
//     },
//     text(user, url) {
//         let emailAddress = user.emails[0].address,
//             urlWithoutHash = url.replace( '#/', '' ),
//             supportEmail = "cpetty@novetta.com",
//             emailBody = `To verify your email address (${emailAddress}) visit visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`

//         return emailBody;
//     }
// }