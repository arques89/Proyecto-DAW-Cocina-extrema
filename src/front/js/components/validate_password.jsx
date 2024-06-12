import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaRegCircle } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";

export const ValidatePassword = ({ password, setValidationStatus }) => {
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿×÷Ç";

    const lower = useCallback((password) => /(?=.*[a-z])/.test(password), []);
    const upper = useCallback((password) => /(?=.*[A-Z])/.test(password), []);
    const number = useCallback((password) => /(?=.*[0-9])/.test(password), []);
    const special = useCallback((password) => new RegExp(`[${specialChars}]`).test(password), [specialChars]);
    const length = useCallback((password) => /(?=.{8,})/.test(password), []);

    useEffect(() => {
        const lowerValid = lower(password);
        const upperValid = upper(password);
        const numberValid = number(password);
        const specialValid = special(password);
        const lengthValid = length(password);

        setLowerValidated(lowerValid);
        setUpperValidated(upperValid);
        setNumberValidated(numberValid);
        setSpecialValidated(specialValid);
        setLengthValidated(lengthValid);

        setValidationStatus(lowerValid && upperValid && numberValid && specialValid && lengthValid);
    }, [password, lower, upper, number, special, length, setValidationStatus]);

    return (
        <div className="text-base tracking-wide pt-6 rounded-sm">
            <div className={`flex items-center ${lowerValidated ? 'text-light-green-700' : 'text-red-600'}`}>
                <span className='me-2 text-lg'>
                    {lowerValidated ? <FaRegCircleCheck /> : <FaRegCircle />}
                </span>
                At least one lowercase letter
            </div>
            <div className={`flex items-center ${upperValidated ? 'text-light-green-700' : 'text-red-600'}`}>
                <span className='me-2 text-lg'>
                    {upperValidated ? <FaRegCircleCheck /> : <FaRegCircle />}
                </span>
                At least one uppercase letter
            </div>
            <div className={`flex items-center ${numberValidated ? 'text-light-green-700' : 'text-red-600'}`}>
                <span className='me-2 text-lg'>
                    {numberValidated ? <FaRegCircleCheck /> : <FaRegCircle />}
                </span>
                At least one number
            </div>
            <div className={`flex items-center ${specialValidated ? 'text-light-green-700' : 'text-red-600'}`}>
                <span className='me-2 text-lg'>
                    {specialValidated ? <FaRegCircleCheck /> : <FaRegCircle />}
                </span>
                At least one special character
            </div>
            <div className={`flex items-center ${lengthValidated ? 'text-light-green-700' : 'text-red-600'}`}>
                <span className='me-2 text-lg'>
                    {lengthValidated ? <FaRegCircleCheck /> : <FaRegCircle />}
                </span>
                At least 8 characters
            </div>
        </div>
    );
};

ValidatePassword.propTypes = {
    password: PropTypes.string.isRequired,
    setValidationStatus: PropTypes.func.isRequired,
};
