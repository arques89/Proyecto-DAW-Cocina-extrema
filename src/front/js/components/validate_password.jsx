import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { arrows_exclamation } from 'react-icons-kit/linea/arrows_exclamation';
import { arrows_circle_check } from 'react-icons-kit/linea/arrows_circle_check';

export const ValidatePassword = ({ password }) => {
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);
  
    useEffect(() => {

      const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿×÷Ç";

      const lower = new RegExp('(?=.*[a-z])');
      const upper = new RegExp('(?=.*[A-Z])');
      const number = new RegExp('(?=.*[0-9])');
      const special = new RegExp(`[${specialChars}]`);
      const length = new RegExp('(?=.{8,})');
  
      setLowerValidated(lower.test(password));
      setUpperValidated(upper.test(password));
      setNumberValidated(number.test(password));
      setSpecialValidated(special.test(password));
      setLengthValidated(length.test(password));
    }, [password]);
  
    return (
      <div className="text-base tracking-wide pt-6 rounded-sm">
        <div className={`flex items-center ${lowerValidated ? 'text-light-green-700' : 'text-red-600'}`}>
          <span className='me-2 text-lg'>
            <Icon icon={lowerValidated ? arrows_circle_check : arrows_exclamation} size={24} />
          </span>
          At least one lowercase letter
        </div>
        <div className={`flex items-center ${upperValidated ? 'text-light-green-700' : 'text-red-600'}`}>
          <span className='me-2 text-lg'>
            <Icon icon={upperValidated ? arrows_circle_check : arrows_exclamation} size={24} />
          </span>
          At least one uppercase letter
        </div>
        <div className={`flex items-center ${numberValidated ? 'text-light-green-700' : 'text-red-600'}`}>
          <span className='me-2 text-lg'>
            <Icon icon={numberValidated ? arrows_circle_check : arrows_exclamation} size={24} />
          </span>
          At least one number
        </div>
        <div className={`flex items-center ${specialValidated ? 'text-light-green-700' : 'text-red-600'}`}>
          <span className='me-2 text-lg'>
            <Icon icon={specialValidated ? arrows_circle_check : arrows_exclamation} size={24} />
          </span>
          At least one special character
        </div>
        <div className={`flex items-center ${lengthValidated ? 'text-light-green-700' : 'text-red-600'}`}>
          <span className='me-2 text-lg'>
            <Icon icon={lengthValidated ? arrows_circle_check : arrows_exclamation} size={24} />
          </span>
          At least 8 characters
        </div>
      </div>
    );
  };
  
  ValidatePassword.propTypes = {
    password: PropTypes.string.isRequired,
  };
  