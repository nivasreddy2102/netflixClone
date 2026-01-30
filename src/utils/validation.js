export const checkValidation=(name,email,password)=>{
    const nameCheck=/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(name);
const emailCheck =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const passwordCheck=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!nameCheck) return "Invalid Name Format";
    if(!emailCheck) return "Invalid Email Format";
    if(!passwordCheck) return "Invalid Password Format"

    return null;
}