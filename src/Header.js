import './Header.css'


const Header = ({isLoggedIn}) => {
    const logoutHandle = () =>{
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="header">
            <div className="navbar">
               
                <div className="nav-links">
                    {isLoggedIn && <><h4 className="">{localStorage.getItem('username')}</h4>
                    <span onClick={logoutHandle} className="register-btn">Logout</span>
                    </>}
                </div>
                
            </div>
        </div>
    )
}

export default Header;