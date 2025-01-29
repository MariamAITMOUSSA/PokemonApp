import InputOutlinedIcon from '@mui/icons-material/InputOutlined';

const Header = () => {
    return (
        <header>
            <div className="header-name">
                Pokemon <b>[CORNER]</b>
            </div>
            <div className="header-action">
                <InputOutlinedIcon></InputOutlinedIcon>
            </div>
        </header>
    )
}

export default Header; 