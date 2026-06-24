import sendMail from "./emailService.js";

const sendEmailFunc = async(to, subject, text, html) => {
    const result = await sendMail(to, subject, text, html);

    if(result.success){
        return true;
    }else{
        return false;
    }
}

export default sendEmailFunc;