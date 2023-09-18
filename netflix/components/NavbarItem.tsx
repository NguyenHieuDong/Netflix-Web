interface NavbarItemProps {
    label : string;
}

const NavbarItem:React.FC<NavbarItemProps> = ({label}) => {
    return (
        <div className ='text-back cursor-pointer hover:text-black-300 transition duration-500'>
            {label}
        </div>
    )
}
export default NavbarItem;