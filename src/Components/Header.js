import PropTypes from 'prop-types'
import Button from "./Button";
import {useLocation} from 'react-router-dom'


const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h2>{title}</h2>
            {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'}
                                                  text={showAdd ? 'Close' : 'Add'}
                                                  onClick={onAdd}/>}
        </header>
    );
};

Header.defaultProps = {
    title: "This is the default",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;