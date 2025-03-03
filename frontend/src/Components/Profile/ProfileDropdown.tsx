import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner } from 'reactstrap';

//import images
import defaultAvatar from "../../assets/images/users/avatar-default.jpg";
import { useGetUser } from 'functions/customHooks/useGetUser';
import { useToggleState } from 'functions/customHooks/state/useToggleState';
import { generateUrl } from 'functions/router/urlGenerator';
import { User } from 'type/entityTypes';
import { useTranslation } from 'react-i18next';
import { getEntityAttachmentUrl } from 'functions/files/entityAttachmentUrlResolver';

type UnitProps = {
    user: User|null,
    isLoading: boolean
};

export const ProfileDropdown = () => {
    const {user, isLoading} = useGetUser();

    return (
        <UnitProfileDropdown user={user} isLoading={isLoading} />
    )
};

export const UnitProfileDropdown = ({user, isLoading}: UnitProps) => {
    const {t} = useTranslation();

    //Dropdown Toggle
    const [isProfileDropdown, toggleProfileDropdown] = useToggleState(false);
    
    if(isLoading) {
        return <Spinner size="sm" style={{marginLeft: '15px', opacity: '.7'}} />
    }
    
    if(!user) {
        return <i className="ri-user-line ri-xl" style={{marginLeft: '15px', opacity: '.7'}}></i>;
    }

    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img 
                            className="rounded-circle header-profile-user" 
                            src={user?.avatar?.id ? getEntityAttachmentUrl(user.avatar.id): defaultAvatar}
                            alt={t('user_avatar')} 
                        />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user.firstName}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user.lastName}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">{t('welcome_user', {username: user.firstName})}</h6>
                    <DropdownItem className='p-0'>
                        <Link to={generateUrl('profile')} className="dropdown-item">
                            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">{t('profile')}</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className='p-0'>
                        <Link to={generateUrl('logout')} className="dropdown-item">
                            <i
                                className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle" data-key="t-logout">{t('logout')}</span>
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}
